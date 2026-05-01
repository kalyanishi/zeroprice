import { auth, currentUser } from '@clerk/nextjs/server';
import type { PostgrestError } from '@supabase/supabase-js';
import { supabaseAdmin } from '@/lib/supabase';

type ApplicationTable = 'application_submissions' | 'application_submission_versions';

export interface ApplicantIdentity {
  clerkUserId: string | null;
  clerkEmail: string | null;
}

export function normalizeApplicantEmail(value: string | null | undefined) {
  const normalized = value?.trim().toLowerCase();
  return normalized ? normalized : null;
}

export async function getApplicantIdentity(): Promise<ApplicantIdentity> {
  // Always return a mock identity in frontend-only mode
  return {
    clerkUserId: 'user_mock_123',
    clerkEmail: 'user@example.com',
  };
}

export function applicationBelongsToApplicant(
  record: Record<string, unknown> | null | undefined,
  identity: ApplicantIdentity,
) {
  if (!record) return false;

  const recordClerkUserId =
    typeof record.clerk_user_id === 'string' ? record.clerk_user_id : null;
  const recordApplicantEmail = normalizeApplicantEmail(
    typeof record.applicant_email === 'string' ? record.applicant_email : null,
  );

  return Boolean(
    (identity.clerkUserId && recordClerkUserId === identity.clerkUserId) ||
      (identity.clerkEmail && recordApplicantEmail === identity.clerkEmail),
  );
}

function isMissingColumnError(error: PostgrestError | null, columnName: string) {
  if (!error) return false;

  const combined = `${error.message ?? ''} ${error.details ?? ''} ${error.hint ?? ''}`.toLowerCase();
  return combined.includes('column') && combined.includes(columnName.toLowerCase());
}

export async function insertWithOptionalClerkUserId(
  table: ApplicationTable,
  payload: Record<string, unknown>,
  clerkUserId: string | null,
  selectClause: string,
) {
  if (clerkUserId) {
    const withClerkUserId = await supabaseAdmin
      .from(table)
      .insert([{ ...payload, clerk_user_id: clerkUserId }])
      .select(selectClause)
      .single();

    if (!isMissingColumnError(withClerkUserId.error, 'clerk_user_id')) {
      return withClerkUserId;
    }
  }

  return supabaseAdmin
    .from(table)
    .insert([payload])
    .select(selectClause)
    .single();
}

export async function getLatestApplicationForApplicant(identity: ApplicantIdentity) {
  if (identity.clerkUserId) {
    const byClerkUserId = await supabaseAdmin
      .from('application_submissions')
      .select('*')
      .eq('clerk_user_id', identity.clerkUserId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!isMissingColumnError(byClerkUserId.error, 'clerk_user_id')) {
      if (byClerkUserId.data || !identity.clerkEmail) {
        return byClerkUserId;
      }
    }
  }

  if (!identity.clerkEmail) {
    return { data: null, error: null };
  }

  return supabaseAdmin
    .from('application_submissions')
    .select('*')
    .eq('applicant_email', identity.clerkEmail)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
}