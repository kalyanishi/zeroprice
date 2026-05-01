import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import {
  applicationBelongsToApplicant,
  getApplicantIdentity,
  insertWithOptionalClerkUserId,
} from '@/lib/application-auth';
import { Resend } from 'resend';
import ApplicationAdminEmail from '@/emails/ApplicationAdminEmail';
import ApplicationConfirmationEmail from '@/emails/ApplicationConfirmationEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const identity = await getApplicantIdentity();
  if (!identity.clerkUserId || !identity.clerkEmail) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const applicantEmail = identity.clerkEmail;

  // Verify the application belongs to this user
  const { data: existing } = await supabaseAdmin
    .from('application_submissions')
    .select('*')
    .eq('id', id)
    .single();

  if (!applicationBelongsToApplicant(existing as Record<string, unknown> | null, identity)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const body = await req.json();

  // Count existing versions so we can assign the next version number
  const { count } = await supabaseAdmin
    .from('application_submission_versions')
    .select('*', { count: 'exact', head: true })
    .eq('application_id', id);

  const nextVersion = (count ?? 0) + 1;

  // Save this edit as a new snapshot in version history
  await insertWithOptionalClerkUserId(
    'application_submission_versions',
    {
      application_id: id,
      user_id:        null,
      version_number: nextVersion,
      snapshot:       { ...body, applicantEmail },
    },
    identity.clerkUserId,
    'id',
  );

  // Update the main application record
  const { error } = await supabaseAdmin
    .from('application_submissions')
    .update({
      updated_at:                new Date().toISOString(),

      applicant_name:            body.applicantName,
      applicant_email:           applicantEmail,
      applicant_org:             body.applicantOrg,
      applicant_phone:           body.applicantPhone || null,

      solution_title:            body.solutionTitle,
      category:                  body.category,
      implementation_readiness:  body.implementationReadiness,
      team_composition:          body.teamComposition,
      incorporation_cert_url:    body.incorporationCertUrl || null,
      website_url:               body.websiteUrl || null,

      mechanism_of_action:       body.mechanismOfAction,
      novelty:                   body.novelty,
      category_specific_details: body.categorySpecificDetails || null,

      baseline_plan:             body.baselinePlan,
      baseline_data_source:      body.baselineDataSource?.length
                                   ? JSON.stringify(body.baselineDataSource)
                                   : null,
      baseline_duration:         body.baselineDuration,
      control_strategy:          body.controlStrategy || null,
      accreditation_compliance:  body.accreditationCompliance,
      deployment_status:         body.deploymentStatus,
      deployment_map_url:        body.deploymentMapUrl || null,
      risk_mitigation:           body.riskMitigation,

      total_cost_inr:            body.totalCostInr ? parseFloat(body.totalCostInr) : null,
      total_cost_explanation:    body.totalCostExplanation || null,
      financials_url:            body.financialsUrl || null,
      unit_cost_inr:             body.unitCostInr ? parseFloat(body.unitCostInr) : null,
      unit_cost_explanation:     body.unitCostExplanation || null,
      regulatory_compliance:     body.regulatoryCompliance,
      scalability:               body.scalability,
      business_plan_url:         body.businessPlanUrl || null,
      willing_to_share_data:     body.willingToShareData,
      policy_alignment:          body.policyAlignment || null,

      community_engagement:      body.communityEngagement || null,
      community_participants:    body.communityParticipants || null,
      community_adoption:        body.communityAdoption || null,
      social_co_benefits:        body.socialCoBenefits || null,
      behavioural_change:        body.behaviouralChange || null,
      equity_inclusion:          body.equityInclusion || null,
      replicable_models:         body.replicableModels || null,
      other_files_urls:          body.otherFilesUrls?.length
                                   ? JSON.stringify(body.otherFilesUrls)
                                   : null,

      prior_funding:             body.priorFunding,
      funding_details:           body.fundingDetails || null,
    })
    .eq('id', id);

  if (error) {
    console.error('Application update error:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }

  // Fetch reference_id + applicant details for the edit confirmation email
  const { data: updated } = await supabaseAdmin
    .from('application_submissions')
    .select('reference_id, applicant_name, applicant_email, solution_title, category')
    .eq('id', id)
    .single();

  if (updated) {
    const adminEmail = process.env.ADMIN_EMAIL ?? 'zeroprize@policyandgovernance.in';
    const displayRef = updated.reference_id ?? id;
    const emailResults = await Promise.allSettled([
      resend.emails.send({
        from: 'Zero Prize <noreply@policyandgovernance.in>',
        to: [adminEmail],
        subject: `Application Edited: ${updated.solution_title} (${updated.category.toUpperCase()})`,
        react: ApplicationAdminEmail({
          applicantName:  updated.applicant_name,
          applicantEmail: updated.applicant_email,
          applicantOrg:   body.applicantOrg,
          solutionTitle:  updated.solution_title,
          category:       updated.category,
          applicationId:  `${displayRef} — Edit #${nextVersion - 1}`,
        }),
      }),
      resend.emails.send({
        from: 'Zero Prize <noreply@policyandgovernance.in>',
        to: [applicantEmail],
        subject: `Your Zero Prize Application has been updated — ${updated.solution_title}`,
        react: ApplicationConfirmationEmail({
          applicantName: updated.applicant_name,
          solutionTitle: updated.solution_title,
          category:      updated.category,
          applicationId: displayRef,
        }),
      }),
    ]);
    emailResults.forEach((r, i) => {
      if (r.status === 'rejected') console.error(`Edit email ${i} failed:`, r.reason);
      else if ((r.value as { error?: unknown }).error) console.error(`Edit email ${i} Resend error:`, (r.value as { error?: unknown }).error);
    });
  }

  return NextResponse.json({ success: true, applicantEmail });
}
