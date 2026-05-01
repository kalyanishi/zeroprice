'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  // Contact
  applicantName: string;
  applicantEmail: string;
  applicantOrg: string;
  applicantPhone: string;
  // S1
  solutionTitle: string;
  category: string;
  implementationReadiness: string;
  teamComposition: string;
  incorporationCertUrl: string;
  websiteUrl: string;
  // S2
  mechanismOfAction: string;
  novelty: string;
  categorySpecificDetails: string;
  // S3
  baselinePlan: string;
  baselineDataSource: string[];
  baselineDuration: string;
  controlStrategy: string;
  accreditationCompliance: string;
  deploymentStatus: string;
  deploymentMapUrl: string;
  riskMitigation: string;
  // S4
  totalCostInr: string;
  totalCostExplanation: string;
  financialsUrl: string;
  unitCostInr: string;
  unitCostExplanation: string;
  regulatoryCompliance: string;
  scalability: string;
  businessPlanUrl: string;
  willingToShareData: string;
  policyAlignment: string;
  // S5 (optional)
  communityEngagement: string;
  communityParticipants: string;
  communityAdoption: string;
  socialCoBenefits: string;
  behaviouralChange: string;
  equityInclusion: string;
  replicableModels: string;
  otherFilesUrls: string[];
  // S6
  priorFunding: string;
  fundingDetails: string;
}

interface ApplicationRecord {
  id: string;
  created_at: string;
  updated_at: string;
  reference_id: string | null;
  applicant_name: string;
  applicant_email: string;
  applicant_org: string;
  applicant_phone: string | null;
  solution_title: string;
  category: string;
  implementation_readiness: string;
  team_composition: string;
  incorporation_cert_url: string | null;
  website_url: string | null;
  mechanism_of_action: string;
  novelty: string;
  category_specific_details: string;
  baseline_plan: string;
  baseline_data_source: string[];
  baseline_duration: string;
  control_strategy: string | null;
  accreditation_compliance: string;
  deployment_status: string;
  deployment_map_url: string | null;
  risk_mitigation: string;
  total_cost_inr: string | null;
  total_cost_explanation: string | null;
  financials_url: string | null;
  unit_cost_inr: string | null;
  unit_cost_explanation: string | null;
  regulatory_compliance: string;
  scalability: string;
  business_plan_url: string | null;
  willing_to_share_data: string;
  policy_alignment: string | null;
  community_engagement: string | null;
  community_participants: string | null;
  community_adoption: string | null;
  social_co_benefits: string | null;
  behavioural_change: string | null;
  equity_inclusion: string | null;
  replicable_models: string | null;
  other_files_urls: string[];
  prior_funding: string;
  funding_details: string | null;
  status: string;
}

interface VersionRecord {
  id: string;
  version_number: number;
  created_at: string;
}

const INIT: FormState = {
  applicantName: '', applicantEmail: '', applicantOrg: '', applicantPhone: '',
  solutionTitle: '', category: '', implementationReadiness: '', teamComposition: '', incorporationCertUrl: '', websiteUrl: '',
  mechanismOfAction: '', novelty: '', categorySpecificDetails: '',
  baselinePlan: '', baselineDataSource: [], baselineDuration: '', controlStrategy: '',
  accreditationCompliance: '', deploymentStatus: '', deploymentMapUrl: '', riskMitigation: '',
  totalCostInr: '', totalCostExplanation: '', financialsUrl: '',
  unitCostInr: '', unitCostExplanation: '',
  regulatoryCompliance: '', scalability: '', businessPlanUrl: '',
  willingToShareData: '', policyAlignment: '',
  communityEngagement: '', communityParticipants: '', communityAdoption: '',
  socialCoBenefits: '', behaviouralChange: '', equityInclusion: '',
  replicableModels: '', otherFilesUrls: [],
  priorFunding: '', fundingDetails: '',
};

const STEPS = [
  { id: 1, label: 'Your Details',           sub: 'Who is applying?' },
  { id: 2, label: 'Solution Overview',      sub: 'Section 1 — Eligibility' },
  { id: 3, label: 'Technical Innovation',   sub: 'Section 2 — Technology' },
  { id: 4, label: 'Impact Verification',    sub: 'Section 3 — Measurement' },
  { id: 5, label: 'Feasibility',            sub: 'Section 4 — Economics' },
  { id: 6, label: 'Community Impact',       sub: 'Section 5 — Optional' },
  { id: 7, label: 'Review & Submit',        sub: 'Section 6 + Declaration' },
];

const CATEGORY_LABELS: Record<string, string> = {
  air: 'Air Quality', water: 'Water Pollution', land: 'Land Pollution',
};

const DEPLOYMENT_STATUS_OPTIONS = [
  { value: 'implemented',  label: 'Already implemented (pilot or ongoing deployment)' },
  { value: 'approved',     label: 'Approved site identified; deployment scheduled' },
  { value: 'proposed',     label: 'Proposed site identified; permissions in progress' },
  { value: 'tbd',          label: 'Site to be finalised (with justification provided)' },
];

const READINESS_OPTIONS = [
  { value: 'ready',        label: 'Ready for Implementation' },
  { value: 'deployed',     label: 'Deployed' },
  { value: 'operational',  label: 'Operationalised' },
];

const BASELINE_SOURCE_OPTIONS = [
  { value: 'historic',      label: 'Historic datasets (government / ULB / CPCB / NMCG / PCB, etc.)' },
  { value: 'pre_intervention', label: 'Pre-intervention monitoring conducted by applicant' },
  { value: 'combination',   label: 'Combination of historic data + pre-intervention monitoring' },
  { value: 'during_pilot',  label: 'Baseline data to be collected during pilot' },
];

const BASELINE_DURATION_OPTIONS = [
  { value: 'less_2w',    label: 'Less than 2 weeks' },
  { value: '2_4w',       label: '2–4 weeks' },
  { value: '1_3m',       label: '1–3 months' },
  { value: 'more_3m',    label: 'More than 3 months' },
  { value: 'tbd',        label: 'Not yet determined' },
];

// ─── UI helpers ───────────────────────────────────────────────────────────────

const inputCls =
  'w-full bg-white border border-gray-200 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#1D9770]/30 focus:border-[#1D9770]';

const textareaCls = inputCls + ' resize-none';

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {children}
      {required && <span className="ml-1 text-[#1D9770]">*</span>}
    </label>
  );
}

function Hint({ children }: { children: React.ReactNode }) {
  return <p className="mt-1.5 text-xs text-gray-400 leading-relaxed">{children}</p>;
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1.5 text-xs text-rose-400">{msg}</p>;
}

function Field({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mb-6 ${className}`}>{children}</div>;
}

function Divider() {
  return <div className="border-t border-gray-100 my-6" />;
}

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1D9770]/10 border border-[#1D9770]/20 mb-5">
      <span className="w-1.5 h-1.5 rounded-full bg-[#1D9770]" />
      <span className="text-xs font-semibold text-[#1D9770] tracking-wide">{children}</span>
    </div>
  );
}

function RadioCard({
  value, current, onChange, children,
}: { value: string; current: string; onChange: (v: string) => void; children: React.ReactNode }) {
  const active = current === value;
  return (
    <label
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all select-none ${
        active ? 'border-[#1D9770] bg-[#1D9770]/5' : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      <input type="radio" value={value} checked={active} onChange={() => onChange(value)} className="sr-only" />
      <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all flex items-center justify-center ${active ? 'border-[#1D9770]' : 'border-gray-300'}`}>
        {active && <span className="w-2 h-2 rounded-full bg-[#1D9770]" />}
      </span>
      <span className="text-sm text-gray-700">{children}</span>
    </label>
  );
}

function CheckboxCard({
  value, checked, onChange, children,
}: { value: string; checked: boolean; onChange: (v: string, c: boolean) => void; children: React.ReactNode }) {
  return (
    <label
      className={`flex items-start gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all select-none ${
        checked ? 'border-[#1D9770] bg-[#1D9770]/5' : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      <input type="checkbox" checked={checked} onChange={(e) => onChange(value, e.target.checked)} className="sr-only" />
      <span className={`mt-0.5 w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${checked ? 'border-[#1D9770] bg-[#1D9770]' : 'border-gray-300'}`}>
        {checked && (
          <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
            <path d="M1.5 5.5L3.5 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="text-sm text-gray-700 leading-snug">{children}</span>
    </label>
  );
}

// ─── File Upload component ────────────────────────────────────────────────────

function FileUpload({
  folder, label, accept, hint, currentUrl, onUrl, uploading, onUploading,
}: {
  folder: string; label: string; accept: string; hint?: string;
  currentUrl: string; onUrl: (url: string) => void;
  uploading: boolean; onUploading: (v: boolean) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', folder);
      const res = await fetch('/api/apply/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) onUrl(data.url);
      else alert(data.error ?? 'Upload failed');
    } catch {
      alert('Upload failed. Please try again.');
    } finally {
      onUploading(false);
      if (ref.current) ref.current.value = '';
    }
  }, [folder, onUrl, onUploading]);

  return (
    <div>
      <Label>{label}</Label>
      {currentUrl ? (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#1D9770]/10 border border-[#1D9770]/30">
          <svg className="w-4 h-4 text-[#1D9770] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
          </svg>
          <a href={currentUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[#1D9770] hover:underline flex-1 truncate">
            File uploaded — click to view
          </a>
          <button type="button" onClick={() => onUrl('')} className="text-gray-400 hover:text-red-500 text-xs transition-colors">
            Remove
          </button>
        </div>
      ) : (
        <div
          className="border-2 border-dashed border-gray-200 rounded-xl px-5 py-6 text-center cursor-pointer hover:border-[#1D9770]/40 transition-all group"
          onClick={() => !uploading && ref.current?.click()}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <svg className="w-6 h-6 animate-spin text-[#1D9770]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <p className="text-sm text-gray-400">Uploading…</p>
            </div>
          ) : (
            <>
              <svg className="w-8 h-8 text-gray-300 group-hover:text-gray-400 mx-auto mb-2 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <p className="text-sm text-gray-400">Click to upload</p>
              {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
            </>
          )}
        </div>
      )}
      <input ref={ref} type="file" accept={accept} onChange={handleChange} className="hidden" />
    </div>
  );
}

// ─── Review row ───────────────────────────────────────────────────────────────

function ReviewRow({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div className="py-3 border-b border-gray-100 last:border-0">
      <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">{label}</p>
      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words">{value}</p>
    </div>
  );
}

function ReviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4 rounded-2xl border border-gray-100 bg-gray-50 overflow-hidden">
      <div className="px-5 py-3 border-b border-gray-100 bg-white">
        <p className="text-xs font-semibold text-[#1D9770] uppercase tracking-wider">{title}</p>
      </div>
      <div className="px-5">{children}</div>
    </div>
  );
}

// ─── DB → FormState mapper ────────────────────────────────────────────────────

function mapAppToForm(app: ApplicationRecord): FormState {
  return {
    applicantName:           app.applicant_name,
    applicantEmail:          app.applicant_email,
    applicantOrg:            app.applicant_org,
    applicantPhone:          app.applicant_phone ?? '',
    solutionTitle:           app.solution_title,
    category:                app.category,
    implementationReadiness: app.implementation_readiness,
    teamComposition:         app.team_composition,
    incorporationCertUrl:    app.incorporation_cert_url ?? '',
    websiteUrl:              app.website_url ?? '',
    mechanismOfAction:       app.mechanism_of_action,
    novelty:                 app.novelty,
    categorySpecificDetails: app.category_specific_details,
    baselinePlan:            app.baseline_plan,
    baselineDataSource:      (() => { const v = app.baseline_data_source as unknown; if (!v) return []; if (Array.isArray(v)) return v as string[]; try { return JSON.parse(v as string) as string[]; } catch { return []; } })(),
    baselineDuration:        app.baseline_duration,
    controlStrategy:         app.control_strategy ?? '',
    accreditationCompliance: app.accreditation_compliance,
    deploymentStatus:        app.deployment_status,
    deploymentMapUrl:        app.deployment_map_url ?? '',
    riskMitigation:          app.risk_mitigation,
    totalCostInr:            app.total_cost_inr ?? '',
    totalCostExplanation:    app.total_cost_explanation ?? '',
    financialsUrl:           app.financials_url ?? '',
    unitCostInr:             app.unit_cost_inr ?? '',
    unitCostExplanation:     app.unit_cost_explanation ?? '',
    regulatoryCompliance:    app.regulatory_compliance,
    scalability:             app.scalability,
    businessPlanUrl:         app.business_plan_url ?? '',
    willingToShareData:      app.willing_to_share_data,
    policyAlignment:         app.policy_alignment ?? '',
    communityEngagement:     app.community_engagement ?? '',
    communityParticipants:   app.community_participants ?? '',
    communityAdoption:       app.community_adoption ?? '',
    socialCoBenefits:        app.social_co_benefits ?? '',
    behaviouralChange:       app.behavioural_change ?? '',
    equityInclusion:         app.equity_inclusion ?? '',
    replicableModels:        app.replicable_models ?? '',
    otherFilesUrls:          (() => { const v = app.other_files_urls as unknown; if (!v) return []; if (Array.isArray(v)) return v as string[]; try { return JSON.parse(v as string) as string[]; } catch { return []; } })(),
    priorFunding:            app.prior_funding,
    fundingDetails:          app.funding_details ?? '',
  };
}

const STATUS_STYLES: Record<string, { label: string; bg: string; text: string }> = {
  pending:      { label: 'Submitted — Awaiting Review', bg: 'bg-amber-50',     text: 'text-amber-700'  },
  under_review: { label: 'Under Review',                bg: 'bg-blue-50',      text: 'text-blue-700'   },
  shortlisted:  { label: 'Shortlisted',                 bg: 'bg-[#1D9770]/10', text: 'text-[#1D9770]'  },
  selected:     { label: 'Selected',                    bg: 'bg-[#1D9770]/20', text: 'text-[#1D9770]'  },
  rejected:     { label: 'Not Progressed',              bg: 'bg-gray-100',     text: 'text-gray-500'   },
};

// ─── Auth Gate ────────────────────────────────────────────────────────────────

function AuthGate({ onSignIn }: { onSignIn: () => void }) {
  return (
    <main className="flex-1 flex items-center justify-center px-6 py-20">
      <div className="max-w-sm w-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#1D9770]/10 border border-[#1D9770]/20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-[#1D9770]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Apply for Zero Prize</h1>
        <p className="text-gray-400 text-sm leading-relaxed mb-8">
          Sign in with Google to start your application or continue where you left off.
          Your progress is automatically linked to your account.
        </p>
        <button
          onClick={onSignIn}
          className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium text-sm transition-all shadow-sm"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>
        <p className="mt-4 text-xs text-gray-400">
          Your data is encrypted and stored securely. We never share your information.
        </p>
      </div>
    </main>
  );
}

// ─── Applicant Dashboard ──────────────────────────────────────────────────────

function DashboardView({
  user, app, versions, onEdit, onSignOut,
}: {
  user: { emailAddresses?: Array<{ emailAddress: string }> } | null | undefined;
  app: ApplicationRecord;
  versions: VersionRecord[];
  onEdit: () => void;
  onSignOut: () => void;
}) {
  const status = STATUS_STYLES[app.status] ?? STATUS_STYLES['pending'];
  const canEdit = !['shortlisted', 'selected', 'rejected'].includes(app.status);
  const catLabels: Record<string, string> = { air: 'Air Quality', water: 'Water Pollution', land: 'Land Pollution' };
  return (
    <main className="flex-1 px-5 sm:px-8 py-10">
      <div className="max-w-2xl mx-auto">
        {/* Greeting header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-sm text-gray-400 mb-1">Signed in as {user?.emailAddresses?.[0]?.emailAddress ?? 'your account'}</p>
            <h1 className="text-2xl font-bold text-gray-900">My Application</h1>
          </div>
          <button
            onClick={onSignOut}
            className="text-xs text-gray-400 hover:text-gray-700 transition-colors px-3 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300"
          >
            Sign out
          </button>
        </div>

        {/* Application card */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden mb-6">
          {/* Status bar */}
          <div className={`px-5 py-3 ${status.bg} border-b border-gray-100 flex items-center justify-between`}>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${
                app.status === 'pending' || app.status === 'under_review' ? 'bg-amber-400'
                : app.status === 'rejected' ? 'bg-gray-400'
                : 'bg-[#1D9770]'
              }`} />
              <span className={`text-xs font-semibold ${status.text}`}>{status.label}</span>
            </div>
            {canEdit && (
              <button
                onClick={onEdit}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-gray-200 text-xs font-medium text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-all shadow-sm"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Application
              </button>
            )}
          </div>

          {/* Details */}
          <div className="px-5 py-5">
            <h2 className="text-lg font-bold text-gray-900 mb-1">{app.solution_title}</h2>
            <p className="text-sm text-gray-500 mb-4">{app.applicant_org}</p>
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#1D9770]/10 text-[#1D9770] border border-[#1D9770]/20">
                {catLabels[app.category] ?? app.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                Submitted {new Date(app.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
            {app.status === 'pending' && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                <p className="text-xs text-amber-700 leading-relaxed">
                  Your application has been received and is awaiting initial review. We&apos;ll be in touch soon.
                </p>
              </div>
            )}
            {app.status === 'under_review' && (
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                <p className="text-xs text-blue-700 leading-relaxed">
                  Your application is currently under detailed review by our evaluation panel.
                </p>
              </div>
            )}
            {app.status === 'shortlisted' && (
              <div className="p-4 rounded-xl bg-[#1D9770]/10 border border-[#1D9770]/20">
                <p className="text-xs text-[#1D9770] leading-relaxed">
                  Congratulations! Your application has been shortlisted. Our team will reach out with next steps shortly.
                </p>
              </div>
            )}
            {app.status === 'rejected' && (
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-xs text-gray-500 leading-relaxed">
                  Thank you for applying. Unfortunately your application did not progress to the next stage this time.
                </p>
              </div>
            )}
          </div>

          {/* Reference ID */}
          <div className="px-5 pb-5">
            <p className="text-xs text-gray-400 mb-1">Reference ID</p>
            <p className="font-mono text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2 break-all">{app.reference_id ?? app.id}</p>
          </div>
        </div>

        {/* Version / submission history */}
        {versions.length > 0 && (
          <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Submission History</p>
            </div>
            <div className="divide-y divide-gray-100">
              {versions.map((v) => (
                <div key={v.id} className="flex items-center justify-between px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#1D9770]/10 border border-[#1D9770]/20 text-[#1D9770] text-xs font-bold flex items-center justify-center">
                      {v.version_number}
                    </span>
                    <span className="text-sm text-gray-700">
                      {v.version_number === 1 ? 'Initial submission' : `Edit #${v.version_number - 1}`}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(v.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>({ ...INIT });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState('');
  const [uploading, setUploading] = useState<Record<string, boolean>>({});

  // Mock Auth + view state
  const [view, setView]             = useState<'loading' | 'auth' | 'dashboard' | 'form'>('loading');
  const user = { emailAddresses: [{ emailAddress: 'applicant@zeroprize.local' }] };
  const userLoaded = true;
  const userId = 'mock-user-id';
  const getToken = async () => 'mock-token';
  const signOut = async () => setView('auth');
  const client = null;
  const [existingApp, setExistingApp] = useState<ApplicationRecord | null>(null);
  const [versions, setVersions]     = useState<VersionRecord[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const signedInApplicantEmail = 'applicant@zeroprize.local';
  const applicantEmailValue = signedInApplicantEmail || form.applicantEmail;


  const set = useCallback(<K extends keyof FormState>(key: K, val: FormState[K]) => {
    setForm((p) => ({ ...p, [key]: val }));
    setErrors((p) => { const n = { ...p }; delete n[key]; return n; });
  }, []);

  const setUpFile = useCallback((key: string, v: boolean) => setUploading((p) => ({ ...p, [key]: v })), []);

  const toggleCheckbox = useCallback((field: 'baselineDataSource', val: string, checked: boolean) => {
    setForm((p) => ({
      ...p,
      [field]: checked ? [...p[field], val] : p[field].filter((v) => v !== val),
    }));
  }, []);

  const loadApp = useCallback(async () => {
    setView('loading');
    try {
      const token = await getToken();
      const res = await fetch('/api/apply/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.application) {
        setExistingApp(data.application);
        setVersions(data.versions ?? []);
        setView('dashboard');
      } else {
        setView('form');
      }
    } catch {
      setView('form');
    }
  }, [getToken]);

  const handleSignIn = useCallback(async () => {
    if (!client) return;
    try {
      await client.signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/apply',
      });
    } catch (error) {
      console.error('Google sign-in failed:', error);
      alert('Could not start Google sign-in. Please try again.');
    }
  }, [client]);

  const handleSignOut = useCallback(async () => {
    await signOut();
    setExistingApp(null);
    setVersions([]);
    setView('auth');
  }, [signOut]);

  const handleStartEdit = useCallback(() => {
    if (!existingApp) return;
    setForm(mapAppToForm(existingApp));
    setStep(1);
    setErrors({});
    setIsEditMode(true);
    setView('form');
  }, [existingApp]);

  const handleCancelEdit = useCallback(() => {
    setIsEditMode(false);
    setForm({ ...INIT });
    setStep(1);
    setErrors({});
    setView('dashboard');
  }, []);

  useEffect(() => {
    if (!userLoaded) return;
    if (userId) {
      loadApp();
    } else {
      setView('auth');
    }
  }, [userLoaded, userId, loadApp]);

  // Per-step validation
  const validate = (s: number): boolean => {
    const e: Record<string, string> = {};
    if (s === 1) {
      if (!form.applicantName.trim()) e.applicantName = 'Full name is required';
      if (!applicantEmailValue.trim()) e.applicantEmail = 'Email address is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(applicantEmailValue)) e.applicantEmail = 'Enter a valid email';
      if (!form.applicantOrg.trim()) e.applicantOrg = 'Organisation name is required';
    }
    if (s === 2) {
      if (!form.solutionTitle.trim()) e.solutionTitle = 'Solution title is required';
      if (!form.category) e.category = 'Please select a category';
      if (!form.implementationReadiness) e.implementationReadiness = 'Please select readiness status';
      if (!form.teamComposition.trim()) e.teamComposition = 'Team composition is required';
    }
    if (s === 3) {
      if (!form.mechanismOfAction.trim()) e.mechanismOfAction = 'This field is required';
      if (!form.novelty.trim()) e.novelty = 'This field is required';
      if (form.category && !form.categorySpecificDetails.trim()) e.categorySpecificDetails = 'This field is required';
    }
    if (s === 4) {
      if (!form.baselinePlan.trim()) e.baselinePlan = 'This field is required';
      if (!form.baselineDuration) e.baselineDuration = 'Please select a duration';
      if (!form.accreditationCompliance) e.accreditationCompliance = 'Please select an option';
      if (!form.deploymentStatus) e.deploymentStatus = 'Please select a status';
      if (!form.riskMitigation.trim()) e.riskMitigation = 'This field is required';
    }
    if (s === 5) {
      if (!form.regulatoryCompliance.trim()) e.regulatoryCompliance = 'This field is required';
      if (!form.scalability.trim()) e.scalability = 'This field is required';
      if (!form.willingToShareData) e.willingToShareData = 'Please select an option';
    }
    if (s === 7) {
      if (!form.priorFunding) e.priorFunding = 'Please select an option';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goTo = (next: number) => {
    setStep(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (!validate(step)) return;
    if (step < 7) goTo(step + 1);
  };

  const handleBack = () => {
    if (isEditMode && step === 1) { handleCancelEdit(); return; }
    if (step > 1) goTo(step - 1);
  };

  const handleSubmit = async () => {
    if (!validate(7)) return;
    setSubmitting(true);
    try {
      const token = await getToken();
      const payload = { ...form, applicantEmail: applicantEmailValue };
      if (isEditMode && existingApp) {
        const res = await fetch(`/api/apply/${existingApp.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          setIsEditMode(false);
          setForm({ ...INIT });
          setStep(1);
          await loadApp();
        } else {
          alert(data.error ?? 'Update failed. Please try again.');
        }
      } else {
        const res = await fetch('/api/apply', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          setAppId(data.applicationId);
          setSubmitted(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          alert(data.error ?? 'Submission failed. Please try again.');
        }
      }
    } catch {
      alert('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const progress = Math.round(((step - 1) / (STEPS.length - 1)) * 100);

  // ─── Loading ─────────────────────────────────────────────────────────────────
  if (view === 'loading') {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="h-14 sm:h-16" />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <svg className="w-8 h-8 animate-spin text-[#1D9770]" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-sm text-gray-400">Loading…</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ─── Auth gate ────────────────────────────────────────────────────────────────
  if (view === 'auth') {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="h-14 sm:h-16" />
        <AuthGate onSignIn={handleSignIn} />
        <Footer />
      </div>
    );
  }

  // ─── Applicant dashboard ──────────────────────────────────────────────────────
  if (view === 'dashboard' && existingApp) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="h-14 sm:h-16" />
        <DashboardView
          user={user}
          app={existingApp}
          versions={versions}
          onEdit={handleStartEdit}
          onSignOut={handleSignOut}
        />
        <Footer />
      </div>
    );
  }

  // ─── Success screen ─────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}`}</style>
        <Header />
        <div className="h-14 sm:h-16" />
        <main className="flex items-center justify-center px-6 py-20 min-h-[72vh]">
          <div style={{ animation: 'fadeUp 0.5s ease both' }} className="max-w-lg w-full text-center">
            <div className="w-20 h-20 rounded-full bg-[#1D9770]/10 border border-[#1D9770]/20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-[#1D9770]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Application Submitted!</h1>
            <p className="text-gray-500 leading-relaxed mb-8">
              Thank you for applying to the Zero Prize. A confirmation email has been sent to{' '}
              <span className="text-gray-700 font-medium">{applicantEmailValue}</span>. Our team will review
              your application and be in touch.
            </p>
            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 mb-8">
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">Your Reference ID</p>
              <p className="text-[#1D9770] font-mono text-sm break-all">{appId}</p>
              <p className="text-xs text-gray-400 mt-2">Please save this for future correspondence.</p>
            </div>
            {userId && (
              <button
                onClick={async () => { setSubmitted(false); await loadApp(); }}
                className="mb-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1D9770] text-white text-sm font-semibold hover:bg-[#18856a] transition-all shadow-sm shadow-[#1D9770]/20"
              >
                View my application
              </button>
            )}
            <br />
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to homepage
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ─── Step content renderer ─────────────────────────────────────────────────
  const renderStep = () => {
    switch (step) {
      // ══ STEP 1: Contact ══════════════════════════════════════════════════════
      case 1:
        return (
          <>
            <SectionBadge>About You</SectionBadge>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Your Details</h2>
            <p className="text-gray-400 text-sm mb-8">Tell us about yourself so we can get in touch.</p>

            <Field>
              <Label required>Full Name</Label>
              <input type="text" value={form.applicantName} onChange={(e) => set('applicantName', e.target.value)}
                placeholder="e.g. Priya Sharma" className={inputCls} />
              <FieldError msg={errors.applicantName} />
            </Field>

            <Field>
              <Label required>Email Address</Label>
              <input
                type="email"
                value={applicantEmailValue}
                onChange={(e) => set('applicantEmail', e.target.value)}
                placeholder="e.g. priya@example.com"
                readOnly={!!signedInApplicantEmail}
                className={`${inputCls} ${signedInApplicantEmail ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''}`}
              />
              {signedInApplicantEmail && (
                <Hint>Your application is linked to the Google account you signed in with.</Hint>
              )}
              <FieldError msg={errors.applicantEmail} />
            </Field>

            <Field>
              <Label required>Organisation / Institution</Label>
              <input type="text" value={form.applicantOrg} onChange={(e) => set('applicantOrg', e.target.value)}
                placeholder="e.g. CleanTech Labs Pvt Ltd" className={inputCls} />
              <FieldError msg={errors.applicantOrg} />
            </Field>

            <Field>
              <Label>Phone Number <span className="text-gray-400 font-normal">(optional)</span></Label>
              <input type="tel" value={form.applicantPhone} onChange={(e) => set('applicantPhone', e.target.value)}
                placeholder="+91 98765 43210" className={inputCls} />
            </Field>
          </>
        );

      // ══ STEP 2: S1 ══════════════════════════════════════════════════════════
      case 2:
        return (
          <>
            <SectionBadge>Section 1 · Applicant Profile &amp; Eligibility</SectionBadge>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Solution Overview</h2>
            <p className="text-gray-400 text-sm mb-8">Tell us about your innovation at a high level.</p>

            <Field>
              <Label required>1.1 — Solution Title</Label>
              <input type="text" value={form.solutionTitle} onChange={(e) => set('solutionTitle', e.target.value)}
                placeholder="What is the name of your innovation?" className={inputCls} />
              <FieldError msg={errors.solutionTitle} />
            </Field>

            <Field>
              <Label required>1.2 — Category</Label>
              <p className="text-xs text-gray-400 mb-3">Does your solution primarily target Air Quality, Water Pollution, or Land Pollution?</p>
              <div className="space-y-2">
                {[{ v: 'air', l: '🌫 Air Quality' }, { v: 'water', l: '💧 Water Pollution' }, { v: 'land', l: '🌿 Land Pollution' }].map(({ v, l }) => (
                  <RadioCard key={v} value={v} current={form.category} onChange={(val) => set('category', val)}>{l}</RadioCard>
                ))}
              </div>
              <FieldError msg={errors.category} />
            </Field>

            <Field>
              <Label required>1.3 — Implementation Readiness</Label>
              <p className="text-xs text-gray-400 mb-3">Can your solution be deployed and operationalised within a 12-month real-world context?</p>
              <div className="space-y-2">
                {READINESS_OPTIONS.map(({ value, label }) => (
                  <RadioCard key={value} value={value} current={form.implementationReadiness} onChange={(v) => set('implementationReadiness', v)}>{label}</RadioCard>
                ))}
              </div>
              <FieldError msg={errors.implementationReadiness} />
            </Field>

            <Field>
              <Label required>1.4 — Team Composition</Label>
              <textarea rows={5} value={form.teamComposition} onChange={(e) => set('teamComposition', e.target.value)}
                placeholder="Provide details of your core team members, their relevant experience and expertise."
                className={textareaCls} />
              <FieldError msg={errors.teamComposition} />
            </Field>

            <Field>
              <FileUpload
                folder="incorporation-certs"
                label="1.5 — Upload Incorporation Certificate / PAN Card"
                accept=".pdf,.jpg,.jpeg,.png"
                hint="PDF or image, max 10 MB"
                currentUrl={form.incorporationCertUrl}
                onUrl={(url) => set('incorporationCertUrl', url)}
                uploading={!!uploading['incorporationCert']}
                onUploading={(v) => setUpFile('incorporationCert', v)}
              />
            </Field>

            <Field>
              <Label>1.6 — Organisation Website <span className="text-gray-400 font-normal">(optional)</span></Label>
              <input type="url" value={form.websiteUrl} onChange={(e) => set('websiteUrl', e.target.value)}
                placeholder="https://example.com" className={inputCls} />
            </Field>
          </>
        );

      // ══ STEP 3: S2 ══════════════════════════════════════════════════════════
      case 3:
        return (
          <>
            <SectionBadge>Section 2 · Technical Description &amp; Innovation</SectionBadge>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Technical Innovation</h2>
            <p className="text-gray-400 text-sm mb-8">Describe the science and novelty behind your solution.</p>

            <Field>
              <Label required>2.1 — Mechanism of Action</Label>
              <Hint>Provide a detailed description of the technology, device, or process. How does it scientifically reduce pollution?</Hint>
              <textarea rows={6} value={form.mechanismOfAction} onChange={(e) => set('mechanismOfAction', e.target.value)}
                placeholder="Describe the mechanism in detail…" className={`${textareaCls} mt-2`} />
              <FieldError msg={errors.mechanismOfAction} />
            </Field>

            <Field>
              <Label required>2.2 — Novelty &amp; Advancement</Label>
              <Hint>Describe how your solution represents a breakthrough or meaningful advancement over existing solutions or prior pilots.</Hint>
              <textarea rows={5} value={form.novelty} onChange={(e) => set('novelty', e.target.value)}
                placeholder="What makes this different from existing approaches?" className={`${textareaCls} mt-2`} />
              <FieldError msg={errors.novelty} />
            </Field>

            {form.category === 'air' && (
              <Field>
                <Label required>2.3i — Air: Monitors &amp; Calibration Plan</Label>
                <Hint>Specify the type of monitors and calibration plan you intend to use.</Hint>
                <textarea rows={4} value={form.categorySpecificDetails} onChange={(e) => set('categorySpecificDetails', e.target.value)}
                  placeholder="e.g. CPCB-grade PM2.5 sensors with weekly calibration against reference monitors…" className={`${textareaCls} mt-2`} />
                <FieldError msg={errors.categorySpecificDetails} />
              </Field>
            )}
            {form.category === 'water' && (
              <Field>
                <Label required>2.3ii — Water: Target Pollutants &amp; Expected Reduction</Label>
                <Hint>List the specific target pollutants (e.g. BOD, COD, coliform) and the expected reduction levels.</Hint>
                <textarea rows={4} value={form.categorySpecificDetails} onChange={(e) => set('categorySpecificDetails', e.target.value)}
                  placeholder="e.g. BOD: 90% reduction; COD: 85% reduction; Total coliform: &lt;10 MPN/100ml…" className={`${textareaCls} mt-2`} />
                <FieldError msg={errors.categorySpecificDetails} />
              </Field>
            )}
            {form.category === 'land' && (
              <Field>
                <Label required>2.3iii — Land: Waste Type &amp; Digital Traceability</Label>
                <Hint>Specify the type of waste targeted and your proposed digital traceability approach (e.g. GPS, QR codes, barcodes).</Hint>
                <textarea rows={4} value={form.categorySpecificDetails} onChange={(e) => set('categorySpecificDetails', e.target.value)}
                  placeholder="e.g. Municipal solid waste; QR-coded bags with GPS tracking from collection to processing…" className={`${textareaCls} mt-2`} />
                <FieldError msg={errors.categorySpecificDetails} />
              </Field>
            )}
            {!form.category && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <p className="text-sm text-amber-700">Go back to Step 2 to select your category — the category-specific question will appear here.</p>
              </div>
            )}
          </>
        );

      // ══ STEP 4: S3 ══════════════════════════════════════════════════════════
      case 4:
        return (
          <>
            <SectionBadge>Section 3 · Impact Verification Strategy</SectionBadge>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Impact Verification</h2>
            <p className="text-gray-400 text-sm mb-8">How will you prove your solution works?</p>

            <Field>
              <Label required>3.1 — Baseline Plan</Label>
              <Hint>How will you establish a 2–4 week pre-intervention monitoring period or provide historic baseline datasets?</Hint>
              <textarea rows={4} value={form.baselinePlan} onChange={(e) => set('baselinePlan', e.target.value)}
                placeholder="Describe your baseline data collection approach…" className={`${textareaCls} mt-2`} />
              <FieldError msg={errors.baselinePlan} />
            </Field>

            <Field>
              <Label>3.2 — Baseline Data Source</Label>
              <Hint>Select all that apply.</Hint>
              <div className="space-y-2 mt-2">
                {BASELINE_SOURCE_OPTIONS.map(({ value, label }) => (
                  <CheckboxCard
                    key={value} value={value}
                    checked={form.baselineDataSource.includes(value)}
                    onChange={(v, c) => toggleCheckbox('baselineDataSource', v, c)}
                  >{label}</CheckboxCard>
                ))}
              </div>
            </Field>

            <Field>
              <Label required>3.2 — Duration of Baseline Monitoring</Label>
              <div className="space-y-2 mt-2">
                {BASELINE_DURATION_OPTIONS.map(({ value, label }) => (
                  <RadioCard key={value} value={value} current={form.baselineDuration} onChange={(v) => set('baselineDuration', v)}>{label}</RadioCard>
                ))}
              </div>
              <FieldError msg={errors.baselineDuration} />
            </Field>

            {(form.category === 'air' || form.category === 'land') && (
              <Field>
                <Label>3.3.1 — Control Strategy (Air / Land)</Label>
                <Hint>
                  Describe your proposal for a control site to enable a Difference-in-Difference (DID) comparison.
                  A DID comparison shows that pollution reduction happened because of your solution — by comparing your
                  intervention site against a similar non-intervention site over the same period.
                </Hint>
                <textarea rows={4} value={form.controlStrategy} onChange={(e) => set('controlStrategy', e.target.value)}
                  placeholder="Describe your control site selection and monitoring plan…" className={`${textareaCls} mt-2`} />
              </Field>
            )}
            {form.category === 'water' && (
              <Field>
                <Label>3.3.2 — Control Strategy (Water)</Label>
                <Hint>Outline your upstream-downstream sampling strategy to establish a comparison baseline.</Hint>
                <textarea rows={4} value={form.controlStrategy} onChange={(e) => set('controlStrategy', e.target.value)}
                  placeholder="Describe your upstream-downstream sampling approach…" className={`${textareaCls} mt-2`} />
              </Field>
            )}

            <Field>
              <Label required>3.4 — Accreditation Compliance</Label>
              <Hint>
                Confirm you will use CPCB-grade monitors (Air), NMCG/CPCB-accredited labs (Water),
                or CPCB-empanelled waste auditors (Land) for all data.
              </Hint>
              <div className="flex gap-3 mt-2">
                <RadioCard value="yes" current={form.accreditationCompliance} onChange={(v) => set('accreditationCompliance', v)}>Yes, confirmed</RadioCard>
                <RadioCard value="no" current={form.accreditationCompliance} onChange={(v) => set('accreditationCompliance', v)}>No</RadioCard>
              </div>
              <FieldError msg={errors.accreditationCompliance} />
            </Field>

            <Field>
              <Label required>3.5 — Deployment Status</Label>
              <div className="space-y-2 mt-1">
                {DEPLOYMENT_STATUS_OPTIONS.map(({ value, label }) => (
                  <RadioCard key={value} value={value} current={form.deploymentStatus} onChange={(v) => set('deploymentStatus', v)}>{label}</RadioCard>
                ))}
              </div>
              <FieldError msg={errors.deploymentStatus} />
            </Field>

            {form.deploymentStatus && form.deploymentStatus !== 'tbd' && (
              <Field>
                <FileUpload
                  folder="deployment-maps"
                  label="3.6 — Deployment Map / Visuals"
                  accept="image/*,.pdf"
                  hint="Images or PDF, max 10 MB"
                  currentUrl={form.deploymentMapUrl}
                  onUrl={(url) => set('deploymentMapUrl', url)}
                  uploading={!!uploading['deploymentMap']}
                  onUploading={(v) => setUpFile('deploymentMap', v)}
                />
              </Field>
            )}

            <Field>
              <Label required>3.7 — Key Risks &amp; Mitigation</Label>
              <Hint>What are the key risks or failure points in deploying your solution at scale, and how do you plan to mitigate them?</Hint>
              <textarea rows={5} value={form.riskMitigation} onChange={(e) => set('riskMitigation', e.target.value)}
                placeholder="Identify top risks and your mitigation strategies…" className={`${textareaCls} mt-2`} />
              <FieldError msg={errors.riskMitigation} />
            </Field>
          </>
        );

      // ══ STEP 5: S4 ══════════════════════════════════════════════════════════
      case 5:
        return (
          <>
            <SectionBadge>Section 4 · Feasibility &amp; Economic Viability</SectionBadge>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Feasibility &amp; Economics</h2>
            <p className="text-gray-400 text-sm mb-8">Help us understand the cost and scalability of your solution.</p>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 mb-6">
              <p className="text-xs text-gray-500 leading-relaxed">
                <span className="text-gray-700 font-medium">Note on unit costs:</span> Specify costs per kW, per sq. metre, per tonne,
                per km², or total — please clarify the unit in the explanation field.
              </p>
            </div>

            <Field>
              <Label>4.1 — Total Cost of Ownership (TCO)</Label>
              <Hint>What is the total cost to implement and maintain this solution? Enter the amount and explain what it covers.</Hint>
              <div className="flex items-center gap-3 mt-2 mb-3">
                <span className="text-gray-500 text-sm flex-shrink-0">₹</span>
                <input type="number" min="0" value={form.totalCostInr} onChange={(e) => set('totalCostInr', e.target.value)}
                  placeholder="e.g. 5000000" className={inputCls} />
              </div>
              <textarea rows={3} value={form.totalCostExplanation} onChange={(e) => set('totalCostExplanation', e.target.value)}
                placeholder="Explain what this cost covers and the unit of measurement (e.g. total for 1 deployment, per kW installed, etc.)"
                className={textareaCls} />
              <div className="mt-3">
                <FileUpload
                  folder="financials"
                  label="Upload Financials (optional)"
                  accept=".pdf,.xlsx,.xls,.csv"
                  hint="PDF or spreadsheet, max 10 MB"
                  currentUrl={form.financialsUrl}
                  onUrl={(url) => set('financialsUrl', url)}
                  uploading={!!uploading['financials']}
                  onUploading={(v) => setUpFile('financials', v)}
                />
              </div>
            </Field>

            <Field>
              <Label>4.2 — Unit Cost of Impact</Label>
              <Hint>What is the estimated cost per unit of pollution reduction? Specify the unit in the explanation.</Hint>
              <div className="flex items-center gap-3 mt-2 mb-3">
                <span className="text-gray-500 text-sm flex-shrink-0">₹</span>
                <input type="number" min="0" value={form.unitCostInr} onChange={(e) => set('unitCostInr', e.target.value)}
                  placeholder="e.g. 250" className={inputCls} />
              </div>
              <textarea rows={3} value={form.unitCostExplanation} onChange={(e) => set('unitCostExplanation', e.target.value)}
                placeholder="e.g. ₹250 per kg of COD removed; or ₹12,000 per tonne of waste diverted from landfill"
                className={textareaCls} />
            </Field>

            <Field>
              <Label required>4.3 — Regulatory Compliance</Label>
              <Hint>Does your solution meet CPCB, NGT, or State Pollution Control Board discharge and safety norms? Describe how it complies.</Hint>
              <textarea rows={4} value={form.regulatoryCompliance} onChange={(e) => set('regulatoryCompliance', e.target.value)}
                placeholder="Specify the relevant norms your solution meets and how compliance is demonstrated…" className={`${textareaCls} mt-2`} />
              <FieldError msg={errors.regulatoryCompliance} />
            </Field>

            <Field>
              <Label required>4.4 — Scalability</Label>
              <Hint>Describe how this solution can be scaled across different Indian cities, climates, or industrial contexts.</Hint>
              <textarea rows={5} value={form.scalability} onChange={(e) => set('scalability', e.target.value)}
                placeholder="Describe the potential for geographic and sectoral scale-up…" className={`${textareaCls} mt-2`} />
              <FieldError msg={errors.scalability} />
              <div className="mt-3">
                <FileUpload
                  folder="business-plans"
                  label="Upload Business Plan (optional)"
                  accept=".pdf,.docx,.pptx"
                  hint="PDF, Word, or PowerPoint — max 10 MB"
                  currentUrl={form.businessPlanUrl}
                  onUrl={(url) => set('businessPlanUrl', url)}
                  uploading={!!uploading['businessPlan']}
                  onUploading={(v) => setUpFile('businessPlan', v)}
                />
              </div>
            </Field>

            <Field>
              <Label required>4.5 — Data Sharing</Label>
              <Hint>Are you willing to share anonymised impact data and monitoring protocols on a Zero Prize dashboard if selected?</Hint>
              <div className="flex gap-3 mt-2">
                <RadioCard value="yes" current={form.willingToShareData} onChange={(v) => set('willingToShareData', v)}>Yes, willing to share</RadioCard>
                <RadioCard value="no" current={form.willingToShareData} onChange={(v) => set('willingToShareData', v)}>No</RadioCard>
              </div>
              <FieldError msg={errors.willingToShareData} />
            </Field>

            <Field>
              <Label>4.6 — Policy Alignment <span className="text-gray-400 font-normal">(optional)</span></Label>
              <Hint>Does your solution align with any existing national or state policies, missions, or regulatory frameworks? (e.g. NCAP, NMCG, Swachh Bharat Mission 2.0, Plastic Waste Management Rules)</Hint>
              <textarea rows={3} value={form.policyAlignment} onChange={(e) => set('policyAlignment', e.target.value)}
                placeholder="Specify relevant policies and how your solution aligns…" className={`${textareaCls} mt-2`} />
            </Field>
          </>
        );

      // ══ STEP 6: S5 ══════════════════════════════════════════════════════════
      case 6:
        return (
          <>
            <SectionBadge>Section 5 · Community &amp; Secondary Impacts · Optional</SectionBadge>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Community Impact</h2>
            <p className="text-gray-400 text-sm mb-4">This entire section is optional. Skip to the next step if not applicable.</p>

            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 mb-8 flex gap-3">
              <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              <p className="text-sm text-blue-600">Completing this section strengthens your application but is not mandatory.</p>
            </div>

            <Field>
              <Label>5.1 — Community Engagement &amp; Acceptance</Label>
              <Hint>If applicable, describe how local communities, workers, or end-users are involved in the design, deployment, or operation of your solution.</Hint>
              <textarea rows={4} value={form.communityEngagement} onChange={(e) => set('communityEngagement', e.target.value)}
                placeholder="Describe community involvement…" className={`${textareaCls} mt-2`} />
            </Field>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div>
                <Label>5.1a — Who participates, and in what role?</Label>
                <textarea rows={3} value={form.communityParticipants} onChange={(e) => set('communityParticipants', e.target.value)}
                  placeholder="e.g. Local women SHG members operate the monitoring stations…" className={textareaCls} />
              </div>
              <div>
                <Label>5.1b — How does involvement support adoption?</Label>
                <textarea rows={3} value={form.communityAdoption} onChange={(e) => set('communityAdoption', e.target.value)}
                  placeholder="e.g. Community ownership reduces vandalism and ensures sustained use…" className={textareaCls} />
              </div>
            </div>

            <Field>
              <Label>5.2 — Social &amp; Livelihood Co-Benefits</Label>
              <Hint>Does your solution generate secondary benefits beyond pollution reduction? (e.g. livelihoods, health outcomes, capacity-building)</Hint>
              <textarea rows={4} value={form.socialCoBenefits} onChange={(e) => set('socialCoBenefits', e.target.value)}
                placeholder="Describe co-benefits and how they are measured or observed…" className={`${textareaCls} mt-2`} />
            </Field>

            <Field>
              <Label>5.3 — Institutional or Behavioural Change</Label>
              <Hint>Has your intervention influenced behaviours, practices, or decision-making by communities, institutions, or local authorities?</Hint>
              <textarea rows={4} value={form.behaviouralChange} onChange={(e) => set('behaviouralChange', e.target.value)}
                placeholder="Describe observed changes in behaviour or practice…" className={`${textareaCls} mt-2`} />
            </Field>

            <Field>
              <Label>5.4 — Equity &amp; Inclusion</Label>
              <Hint>Does your solution intentionally benefit vulnerable or underserved groups (e.g. informal workers, low-income communities, women, youth)?</Hint>
              <textarea rows={4} value={form.equityInclusion} onChange={(e) => set('equityInclusion', e.target.value)}
                placeholder="Explain how equity considerations were incorporated…" className={`${textareaCls} mt-2`} />
            </Field>

            <Field>
              <Label>5.5 — Replicable Community Models</Label>
              <Hint>If your solution includes a community-driven or participatory model, can this approach be replicated in other locations? What conditions are necessary for success?</Hint>
              <textarea rows={4} value={form.replicableModels} onChange={(e) => set('replicableModels', e.target.value)}
                placeholder="Describe replicability and success conditions…" className={`${textareaCls} mt-2`} />
            </Field>

            <Field>
              <Label>5.6 — Additional Supporting Files <span className="text-gray-400 font-normal">(optional)</span></Label>
              <p className="text-xs text-gray-400 mb-2">Upload any other documents that support your application.</p>
              {form.otherFilesUrls.map((url, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-100 mb-2">
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-900 flex-1 truncate">File {i + 1}</a>
                  <button type="button" onClick={() => set('otherFilesUrls', form.otherFilesUrls.filter((_, j) => j !== i))} className="text-gray-300 hover:text-red-400 text-xs">Remove</button>
                </div>
              ))}
              <FileUpload
                folder="other-files"
                label=""
                accept=".pdf,.doc,.docx,.xlsx,.xls,.ppt,.pptx,.jpg,.jpeg,.png"
                hint="PDF, Office, or image files — max 10 MB each"
                currentUrl=""
                onUrl={(url) => url && set('otherFilesUrls', [...form.otherFilesUrls, url])}
                uploading={!!uploading['otherFile']}
                onUploading={(v) => setUpFile('otherFile', v)}
              />
            </Field>
          </>
        );

      // ══ STEP 7: S6 + Review ════════════════════════════════════════════════
      case 7:
        return (
          <>
            <SectionBadge>Section 6 · Awards, Funding &amp; Declaration</SectionBadge>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Review &amp; Submit</h2>
            <p className="text-gray-400 text-sm mb-8">Complete this final section, review your answers and submit.</p>

            <Field>
              <Label required>6.1 — Prior Funding &amp; Recognition</Label>
              <Hint>Has this solution previously received significant grant funding, awards, or recognition through other challenge platforms or programmes?</Hint>
              <div className="flex gap-3 mt-2">
                <RadioCard value="yes" current={form.priorFunding} onChange={(v) => set('priorFunding', v)}>Yes</RadioCard>
                <RadioCard value="no" current={form.priorFunding} onChange={(v) => set('priorFunding', v)}>No</RadioCard>
              </div>
              <FieldError msg={errors.priorFunding} />
            </Field>

            {form.priorFunding === 'yes' && (
              <Field>
                <Label>6.2 — Funding / Recognition Details</Label>
                <textarea rows={4} value={form.fundingDetails} onChange={(e) => set('fundingDetails', e.target.value)}
                  placeholder="Briefly describe the funding, award, or programme and the amount/value if applicable…" className={textareaCls} />
              </Field>
            )}

            <Divider />
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Summary</h3>
            <p className="text-sm text-gray-400 mb-5">Please review your responses below before submitting. You can go back to any step to edit.</p>

            <ReviewSection title="Contact Details">
              <ReviewRow label="Name" value={form.applicantName} />
              <ReviewRow label="Email" value={applicantEmailValue} />
              <ReviewRow label="Organisation" value={form.applicantOrg} />
              <ReviewRow label="Phone" value={form.applicantPhone} />
            </ReviewSection>

            <ReviewSection title="Section 1 — Solution Overview">
              <ReviewRow label="Solution Title" value={form.solutionTitle} />
              <ReviewRow label="Category" value={CATEGORY_LABELS[form.category]} />
              <ReviewRow label="Implementation Readiness" value={READINESS_OPTIONS.find(o => o.value === form.implementationReadiness)?.label} />
              <ReviewRow label="Team Composition" value={form.teamComposition} />
              <ReviewRow label="Incorporation Certificate / PAN Card" value={form.incorporationCertUrl ? 'Uploaded' : undefined} />
              <ReviewRow label="Website" value={form.websiteUrl} />
            </ReviewSection>

            <ReviewSection title="Section 2 — Technical Innovation">
              <ReviewRow label="Mechanism of Action" value={form.mechanismOfAction} />
              <ReviewRow label="Novelty" value={form.novelty} />
              <ReviewRow label="Category-Specific Details" value={form.categorySpecificDetails} />
            </ReviewSection>

            <ReviewSection title="Section 3 — Impact Verification">
              <ReviewRow label="Baseline Plan" value={form.baselinePlan} />
              <ReviewRow label="Baseline Data Sources" value={form.baselineDataSource.map(v => BASELINE_SOURCE_OPTIONS.find(o => o.value === v)?.label).filter(Boolean).join('; ')} />
              <ReviewRow label="Baseline Duration" value={BASELINE_DURATION_OPTIONS.find(o => o.value === form.baselineDuration)?.label} />
              <ReviewRow label="Control Strategy" value={form.controlStrategy} />
              <ReviewRow label="Accreditation Compliance" value={form.accreditationCompliance === 'yes' ? 'Yes, confirmed' : form.accreditationCompliance === 'no' ? 'No' : undefined} />
              <ReviewRow label="Deployment Status" value={DEPLOYMENT_STATUS_OPTIONS.find(o => o.value === form.deploymentStatus)?.label} />
              <ReviewRow label="Risk Mitigation" value={form.riskMitigation} />
            </ReviewSection>

            <ReviewSection title="Section 4 — Feasibility">
              <ReviewRow label="Total Cost (INR)" value={form.totalCostInr ? `₹${Number(form.totalCostInr).toLocaleString('en-IN')}` : undefined} />
              <ReviewRow label="Total Cost Explanation" value={form.totalCostExplanation} />
              <ReviewRow label="Unit Cost (INR)" value={form.unitCostInr ? `₹${Number(form.unitCostInr).toLocaleString('en-IN')}` : undefined} />
              <ReviewRow label="Unit Cost Explanation" value={form.unitCostExplanation} />
              <ReviewRow label="Regulatory Compliance" value={form.regulatoryCompliance} />
              <ReviewRow label="Scalability" value={form.scalability} />
              <ReviewRow label="Willing to Share Data" value={form.willingToShareData === 'yes' ? 'Yes' : form.willingToShareData === 'no' ? 'No' : undefined} />
              <ReviewRow label="Policy Alignment" value={form.policyAlignment} />
            </ReviewSection>

            {(form.communityEngagement || form.socialCoBenefits || form.equityInclusion) && (
              <ReviewSection title="Section 5 — Community Impact">
                <ReviewRow label="Community Engagement" value={form.communityEngagement} />
                <ReviewRow label="Social Co-Benefits" value={form.socialCoBenefits} />
                <ReviewRow label="Behavioural Change" value={form.behaviouralChange} />
                <ReviewRow label="Equity &amp; Inclusion" value={form.equityInclusion} />
                <ReviewRow label="Replicable Models" value={form.replicableModels} />
              </ReviewSection>
            )}

            <ReviewSection title="Section 6 — Awards & Recognition">
              <ReviewRow label="Prior Funding / Awards" value={form.priorFunding === 'yes' ? 'Yes' : form.priorFunding === 'no' ? 'No' : undefined} />
              <ReviewRow label="Details" value={form.fundingDetails} />
            </ReviewSection>

            <Divider />

            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 mb-6">
              <p className="text-sm text-gray-500 leading-relaxed">
                By submitting this application, I confirm that all the information provided is accurate and complete
                to the best of my knowledge. I understand that any false or misleading information may result in
                disqualification. I consent to Zero Prize contacting me regarding this application.
              </p>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <style>{`
        @keyframes stepIn { from { opacity: 0; transform: translateX(12px); } to { opacity: 1; transform: translateX(0); } }
        input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
      `}</style>

      <Header />

      {/* Spacer for fixed header so content isn't hidden behind it */}
      <div className="h-14 sm:h-16" />

      {/* Progress bar + step tabs — sticky below site header */}
      <div className="sticky top-14 sm:top-16 z-40 bg-white border-b border-gray-100 shadow-sm">
        {isEditMode && (
          <div className="bg-amber-50 border-b border-amber-200 px-5 sm:px-8 py-2">
            <div className="max-w-3xl mx-auto flex items-center justify-between">
              <span className="text-xs font-medium text-amber-700">✏ Editing your application — changes will be saved as a new version</span>
              <button onClick={handleCancelEdit} className="text-xs text-amber-600 hover:text-amber-800 underline transition-colors">Cancel edit</button>
            </div>
          </div>
        )}
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-[#1D9770] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="overflow-x-auto">
          <div className="flex max-w-3xl mx-auto px-5 sm:px-8 gap-1 py-2.5 w-max sm:w-full">
            {STEPS.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  if (s.id < step) goTo(s.id);
                  else if (s.id === step + 1 && validate(step)) goTo(s.id);
                }}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  s.id === step
                    ? 'bg-[#1D9770] text-white'
                    : s.id < step
                    ? 'text-[#1D9770] hover:bg-[#1D9770]/10 cursor-pointer'
                    : 'text-gray-300 cursor-default'
                }`}
              >
                {s.id < step ? '✓ ' : ''}{s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10 pb-40">
          <div key={step} style={{ animation: 'stepIn 0.28s ease both' }}>
            {renderStep()}
          </div>
        </div>
      </main>

      <Footer />

      {/* Fixed bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-t border-gray-100 shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
          {(step > 1 || isEditMode) ? (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-300 text-sm transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex gap-1">
              {STEPS.map((s) => (
                <span
                  key={s.id}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    s.id === step ? 'bg-[#1D9770] w-4' : s.id < step ? 'bg-[#1D9770]/40' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            {step < 7 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1D9770] hover:bg-[#18856a] text-white text-sm font-semibold transition-all shadow-lg shadow-[#1D9770]/20"
              >
                Continue
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1D9770] hover:bg-[#18856a] disabled:opacity-50 text-white text-sm font-semibold transition-all shadow-lg shadow-[#1D9770]/20"
              >
                {submitting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting…
                  </>
                ) : (
                  <>
                    {isEditMode ? 'Save Changes' : 'Submit Application'}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
