'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  organization: string | null;
  interested_in: string;
  message: string;
  created_at: string;
}

interface RegisterSubmission {
  id: string;
  name: string;
  email: string;
  organization: string | null;
  phone: string | null;
  category: string;
  interest: string | null;
  created_at: string;
}

interface PartnerSubmission {
  id: string;
  name: string;
  email: string;
  organization: string;
  phone: string | null;
  partnership_type: string;
  message: string | null;
  created_at: string;
}

interface ApplicationSubmission {
  id: string;
  created_at: string;
  reference_id: string | null;
  applicant_name: string;
  applicant_email: string;
  applicant_org: string;
  applicant_phone: string | null;
  solution_title: string;
  category: string;
  implementation_readiness: string | null;
  team_composition: string | null;
  incorporation_cert_url: string | null;
  website_url: string | null;
  mechanism_of_action: string | null;
  novelty: string | null;
  category_specific_details: string | null;
  baseline_plan: string | null;
  baseline_data_source: string | null;
  baseline_duration: string | null;
  control_strategy: string | null;
  accreditation_compliance: string | null;
  deployment_status: string | null;
  deployment_map_url: string | null;
  risk_mitigation: string | null;
  total_cost_inr: number | null;
  total_cost_explanation: string | null;
  financials_url: string | null;
  unit_cost_inr: number | null;
  unit_cost_explanation: string | null;
  regulatory_compliance: string | null;
  scalability: string | null;
  business_plan_url: string | null;
  willing_to_share_data: string | null;
  policy_alignment: string | null;
  community_engagement: string | null;
  community_participants: string | null;
  community_adoption: string | null;
  social_co_benefits: string | null;
  behavioural_change: string | null;
  equity_inclusion: string | null;
  replicable_models: string | null;
  other_files_urls: string | null;
  prior_funding: string | null;
  funding_details: string | null;
  status: string;
  admin_notes: string | null;
}

interface DashboardSession {
  email: string;
  role: 'super_admin' | 'expert';
  allowedCategories: string[];
  displayName: string | null;
  scopeLabel: string;
}

interface AdminUser {
  id: string;
  email: string;
  displayName: string | null;
  role: 'super_admin' | 'expert';
  allowedCategories: string[];
  isActive: boolean;
  createdAt: string;
  createdByEmail: string | null;
}

type Tab = 'overview' | 'contacts' | 'registrations' | 'partners' | 'applications' | 'users';
type FormSubmission = ContactSubmission | RegisterSubmission | PartnerSubmission;

const PAGE_SIZE = 10;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
}

function Avatar({ name }: { name: string }) {
  const initials = name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  const colors = [
    'bg-emerald-500/20 text-emerald-400', 'bg-blue-500/20 text-blue-400',
    'bg-violet-500/20 text-violet-400', 'bg-amber-500/20 text-amber-400',
    'bg-rose-500/20 text-rose-400', 'bg-cyan-500/20 text-cyan-400',
  ];
  return (
    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold flex-shrink-0 ${colors[name.charCodeAt(0) % colors.length]}`}>
      {initials}
    </span>
  );
}

function Badge({ label, variant = 'default' }: { label: string; variant?: 'green' | 'blue' | 'purple' | 'default' }) {
  const styles = {
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    purple: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    default: 'bg-white/5 text-white/60 border-white/10',
  };
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${styles[variant]}`}>
      {label}
    </span>
  );
}

function StatCard({ label, value, icon, color, sub }: {
  label: string; value: number; icon: React.ReactNode; color: string; sub?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border bg-white/[0.03] p-6 ${color}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-white/40 font-medium mb-1">{label}</p>
          <p className="text-4xl font-bold text-white">{value}</p>
          {sub && <p className="text-xs text-white/30 mt-1">{sub}</p>}
        </div>
        <div className="p-3 rounded-xl bg-white/5">{icon}</div>
      </div>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-white/30">
      <svg className="w-12 h-12 mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
      <p className="text-sm">No {label} yet</p>
    </div>
  );
}

// ─── Confirm Delete Modal ──────────────────────────────────────────────────────

function ConfirmDeleteModal({ target, onConfirm, onCancel, deleting }: {
  target: { name: string } | null;
  onConfirm: () => void;
  onCancel: () => void;
  deleting: boolean;
}) {
  useEffect(() => {
    if (!target) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onCancel(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [target, onCancel]);

  if (!target) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
      <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-[#0e1612] p-6 shadow-2xl" style={{ animation: 'modalIn 0.22s cubic-bezier(0.34,1.2,0.64,1) both' }}>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 mx-auto mb-4">
          <svg className="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <h3 className="text-white font-semibold text-center mb-1">Delete this record?</h3>
        <p className="text-white/40 text-sm text-center mb-1">
          <span className="text-white/70 font-medium">{target.name}</span>
        </p>
        <p className="text-white/30 text-xs text-center mb-6">This action cannot be undone.</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={deleting}
            className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/50 hover:text-white/80 text-sm transition-all disabled:opacity-40"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={deleting}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white text-sm font-semibold transition-all"
          >
            {deleting ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
            ) : null}
            {deleting ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Copy field ───────────────────────────────────────────────────────────────

function CopyField({ label, value }: { label: string; value: string | null }) {
  const [copied, setCopied] = useState(false);
  if (!value) return (
    <div className="mb-4">
      <p className="text-xs text-white/30 uppercase tracking-wider font-semibold mb-1">{label}</p>
      <p className="text-white/20 text-sm italic">—</p>
    </div>
  );
  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="mb-4 group">
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs text-white/30 uppercase tracking-wider font-semibold">{label}</p>
        <button
          onClick={copy}
          className="flex items-center gap-1 text-xs text-white/20 hover:text-[#1D9770] transition-colors opacity-0 group-hover:opacity-100"
        >
          {copied ? (
            <>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap break-words">{value}</p>
    </div>
  );
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────

function DetailModal({ item, type, onClose }: {
  item: FormSubmission | null;
  type: 'contact' | 'registration' | 'partner';
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!item) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  if (!item) return null;

  const typeLabel = type === 'contact' ? 'Contact Inquiry' : type === 'registration' ? 'Registration' : 'Partnership Inquiry';
  const badgeVariant = type === 'contact' ? 'green' : type === 'registration' ? 'blue' : 'purple';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      {/* Panel */}
      <div
        ref={ref}
        className="relative w-full sm:max-w-xl max-h-[92dvh] sm:max-h-[85vh] flex flex-col rounded-t-3xl sm:rounded-2xl border border-white/10 bg-[#0e1612] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300"
        style={{ animation: 'modalIn 0.28s cubic-bezier(0.34,1.2,0.64,1) both' }}
      >
        <style>{`@keyframes modalIn{from{opacity:0;transform:translateY(24px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}`}</style>

        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-white/[0.06] flex-shrink-0">
          <div className="flex items-center gap-3">
            <Avatar name={item.name} />
            <div>
              <p className="font-semibold text-white">{item.name}</p>
              <p className="text-xs text-white/30">{formatDate(item.created_at)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge label={typeLabel} variant={badgeVariant} />
            <button
              onClick={onClose}
              className="ml-2 p-1.5 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/5 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-0">
          <CopyField label="Full Name" value={item.name} />
          <CopyField label="Email Address" value={item.email} />

          {type === 'contact' && (() => {
            const c = item as ContactSubmission;
            return <>
              <CopyField label="Organization" value={c.organization} />
              <CopyField label="Interested In" value={c.interested_in} />
              <CopyField label="Message" value={c.message} />
            </>;
          })()}

          {type === 'registration' && (() => {
            const r = item as RegisterSubmission;
            return <>
              <CopyField label="Organization" value={r.organization} />
              <CopyField label="Phone" value={r.phone} />
              <CopyField label="Category" value={r.category} />
              <CopyField label="Areas of Interest" value={r.interest} />
            </>;
          })()}

          {type === 'partner' && (() => {
            const p = item as PartnerSubmission;
            return <>
              <CopyField label="Organization" value={p.organization} />
              <CopyField label="Phone" value={p.phone} />
              <CopyField label="Partnership Type" value={p.partnership_type} />
              <CopyField label="Message" value={p.message} />
            </>;
          })()}

          <CopyField label="Submitted On" value={formatDate(item.created_at)} />
        </div>

        {/* Footer actions */}
        <div className="flex items-center gap-3 px-6 py-4 border-t border-white/[0.06] flex-shrink-0">
          <a
            href={`mailto:${item.email}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1D9770] hover:bg-[#1A5F52] text-white text-sm font-medium transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Reply via Email
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-white/10 text-white/50 hover:text-white/80 text-sm transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Pagination ────────────────────────────────────────────────────────────────

function Pagination({ page, total, pageSize, onChange }: {
  page: number; total: number; pageSize: number; onChange: (p: number) => void;
}) {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;

  const pages: (number | '...')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push('...');
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.05]">
      <p className="text-xs text-white/20">
        Showing {Math.min((page - 1) * pageSize + 1, total)}–{Math.min(page * pageSize, total)} of {total}
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          className="p-1.5 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/5 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`dots-${i}`} className="px-1.5 text-white/20 text-xs">…</span>
          ) : (
            <button
              key={p}
              onClick={() => onChange(p as number)}
              className={`min-w-[28px] h-7 px-1.5 rounded-lg text-xs font-medium transition-all ${
                page === p ? 'bg-[#1D9770] text-white' : 'text-white/40 hover:text-white/70 hover:bg-white/5'
              }`}
            >
              {p}
            </button>
          )
        )}
        <button
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
          className="p-1.5 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/5 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Tables ───────────────────────────────────────────────────────────────────

function ContactsTable({ data, search, onView, onDelete, canDelete }: {
  data: ContactSubmission[]; search: string; onView: (r: ContactSubmission) => void; onDelete: (id: string, name: string) => void; canDelete: boolean;
}) {
  const [page, setPage] = useState(1);
  const filtered = data.filter((r) =>
    [r.name, r.email, r.interested_in, r.organization || ''].some((v) => v.toLowerCase().includes(search))
  );
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  if (filtered.length === 0) return <EmptyState label="contact submissions" />;
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              {['Person', 'Interest', 'Organization', 'Message', 'Date', ''].map((h, i) => (
                <th key={i} className="text-left py-3 px-4 text-white/30 font-medium text-xs uppercase tracking-wider first:pl-2">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {paged.map((row) => (
              <tr key={row.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="py-3 px-4 pl-2">
                  <div className="flex items-center gap-3">
                    <Avatar name={row.name} />
                    <div>
                      <p className="font-medium text-white/90">{row.name}</p>
                      <a href={`mailto:${row.email}`} className="text-xs text-[#1D9770] hover:underline">{row.email}</a>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4"><Badge label={row.interested_in} variant="green" /></td>
                <td className="py-3 px-4 text-white/50 text-xs">{row.organization || '—'}</td>
                <td className="py-3 px-4 max-w-xs">
                  <p className="text-white/60 text-xs truncate" title={row.message}>{row.message}</p>
                </td>
                <td className="py-3 px-4 text-white/30 text-xs whitespace-nowrap">{formatDate(row.created_at)}</td>
                <td className="py-3 px-4 pr-3">
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all">
                    <button
                      onClick={() => onView(row)}
                      className="px-2.5 py-1 rounded-lg text-xs text-white/40 border border-white/10 hover:text-white hover:border-[#1D9770]/40 hover:bg-[#1D9770]/10 transition-all"
                    >
                      View
                    </button>
                    {canDelete && (
                      <button
                        onClick={() => onDelete(row.id, row.name)}
                        className="p-1 rounded-lg text-white/30 border border-white/10 hover:text-rose-400 hover:border-rose-500/30 hover:bg-rose-500/10 transition-all"
                        title="Delete"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={page} total={filtered.length} pageSize={PAGE_SIZE} onChange={setPage} />
    </>
  );
}

function RegistrationsTable({ data, search, onView, onDelete, canDelete }: {
  data: RegisterSubmission[]; search: string; onView: (r: RegisterSubmission) => void; onDelete: (id: string, name: string) => void; canDelete: boolean;
}) {
  const [page, setPage] = useState(1);
  const filtered = data.filter((r) =>
    [r.name, r.email, r.category, r.organization || ''].some((v) => v.toLowerCase().includes(search))
  );
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  if (filtered.length === 0) return <EmptyState label="registrations" />;
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              {['Person', 'Category', 'Organization', 'Phone', 'Areas of Interest', 'Date', ''].map((h, i) => (
                <th key={i} className="text-left py-3 px-4 text-white/30 font-medium text-xs uppercase tracking-wider first:pl-2">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {paged.map((row) => (
              <tr key={row.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="py-3 px-4 pl-2">
                  <div className="flex items-center gap-3">
                    <Avatar name={row.name} />
                    <div>
                      <p className="font-medium text-white/90">{row.name}</p>
                      <a href={`mailto:${row.email}`} className="text-xs text-[#1D9770] hover:underline">{row.email}</a>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4"><Badge label={row.category} variant="blue" /></td>
                <td className="py-3 px-4 text-white/50 text-xs">{row.organization || '—'}</td>
                <td className="py-3 px-4 text-white/50 text-xs">{row.phone || '—'}</td>
                <td className="py-3 px-4 max-w-xs">
                  <p className="text-white/60 text-xs truncate" title={row.interest || ''}>{row.interest || '—'}</p>
                </td>
                <td className="py-3 px-4 text-white/30 text-xs whitespace-nowrap">{formatDate(row.created_at)}</td>
                <td className="py-3 px-4 pr-3">
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all">
                    <button
                      onClick={() => onView(row)}
                      className="px-2.5 py-1 rounded-lg text-xs text-white/40 border border-white/10 hover:text-white hover:border-[#1D9770]/40 hover:bg-[#1D9770]/10 transition-all"
                    >
                      View
                    </button>
                    {canDelete && (
                      <button
                        onClick={() => onDelete(row.id, row.name)}
                        className="p-1 rounded-lg text-white/30 border border-white/10 hover:text-rose-400 hover:border-rose-500/30 hover:bg-rose-500/10 transition-all"
                        title="Delete"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={page} total={filtered.length} pageSize={PAGE_SIZE} onChange={setPage} />
    </>
  );
}

function PartnersTable({ data, search, onView, onDelete, canDelete }: {
  data: PartnerSubmission[]; search: string; onView: (r: PartnerSubmission) => void; onDelete: (id: string, name: string) => void; canDelete: boolean;
}) {
  const [page, setPage] = useState(1);
  const filtered = data.filter((r) =>
    [r.name, r.email, r.organization, r.partnership_type].some((v) => v.toLowerCase().includes(search))
  );
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  if (filtered.length === 0) return <EmptyState label="partnership inquiries" />;
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              {['Person', 'Organization', 'Partnership Type', 'Phone', 'Message', 'Date', ''].map((h, i) => (
                <th key={i} className="text-left py-3 px-4 text-white/30 font-medium text-xs uppercase tracking-wider first:pl-2">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {paged.map((row) => (
              <tr key={row.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="py-3 px-4 pl-2">
                  <div className="flex items-center gap-3">
                    <Avatar name={row.name} />
                    <div>
                      <p className="font-medium text-white/90">{row.name}</p>
                      <a href={`mailto:${row.email}`} className="text-xs text-[#1D9770] hover:underline">{row.email}</a>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-white/70 text-xs font-medium">{row.organization}</td>
                <td className="py-3 px-4"><Badge label={row.partnership_type} variant="purple" /></td>
                <td className="py-3 px-4 text-white/50 text-xs">{row.phone || '—'}</td>
                <td className="py-3 px-4 max-w-xs">
                  <p className="text-white/60 text-xs truncate" title={row.message || ''}>{row.message || '—'}</p>
                </td>
                <td className="py-3 px-4 text-white/30 text-xs whitespace-nowrap">{formatDate(row.created_at)}</td>
                <td className="py-3 px-4 pr-3">
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all">
                    <button
                      onClick={() => onView(row)}
                      className="px-2.5 py-1 rounded-lg text-xs text-white/40 border border-white/10 hover:text-white hover:border-[#1D9770]/40 hover:bg-[#1D9770]/10 transition-all"
                    >
                      View
                    </button>
                    {canDelete && (
                      <button
                        onClick={() => onDelete(row.id, row.name)}
                        className="p-1 rounded-lg text-white/30 border border-white/10 hover:text-rose-400 hover:border-rose-500/30 hover:bg-rose-500/10 transition-all"
                        title="Delete"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={page} total={filtered.length} pageSize={PAGE_SIZE} onChange={setPage} />
    </>
  );
}

// ─── Application Status badge ─────────────────────────────────────────────────

const APP_STATUS_STYLES: Record<string, string> = {
  pending:     'bg-amber-500/10 text-amber-400 border-amber-500/20',
  reviewing:   'bg-blue-500/10 text-blue-400 border-blue-500/20',
  shortlisted: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  rejected:    'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

const CAT_LABELS: Record<string, string> = { air: 'Air Quality', water: 'Water Pollution', land: 'Land Pollution' };

function AppStatusBadge({ status }: { status: string }) {
  const cls = APP_STATUS_STYLES[status] ?? 'bg-white/5 text-white/40 border-white/10';
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border capitalize ${cls}`}>{status}</span>
  );
}

// ─── Applications Table ───────────────────────────────────────────────────────

function ApplicationsTable({ data, search, onView, onDelete, canDelete }: {
  data: ApplicationSubmission[]; search: string;
  onView: (r: ApplicationSubmission) => void;
  onDelete: (id: string, name: string) => void;
  canDelete: boolean;
}) {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const filtered = data.filter((r) => {
    const matchSearch = [r.applicant_name, r.applicant_email, r.applicant_org, r.solution_title, r.category]
      .some((v) => (v ?? '').toLowerCase().includes(search));
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchSearch && matchStatus;
  });
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (data.length === 0) return <EmptyState label="applications" />;

  return (
    <>
      <div className="flex items-center gap-2 px-4 pt-4 pb-2 flex-wrap">
        {['all', 'pending', 'reviewing', 'shortlisted', 'rejected'].map((s) => (
          <button
            key={s}
            onClick={() => {
              setStatusFilter(s);
              setPage(1);
            }}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all border capitalize ${
              statusFilter === s
                ? s === 'all'
                  ? 'bg-white/10 text-white border-white/20'
                  : APP_STATUS_STYLES[s] ?? 'bg-white/10 text-white border-white/20'
                : 'text-white/30 border-white/[0.06] hover:text-white/60'
            }`}
          >
            {s === 'all' ? `All (${data.length})` : `${s.charAt(0).toUpperCase() + s.slice(1)} (${data.filter(a => a.status === s).length})`}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <EmptyState label="matching applications" />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  {['Applicant', 'Solution', 'Category', 'Status', 'Date', ''].map((h, i) => (
                    <th key={i} className="text-left py-3 px-4 text-white/30 font-medium text-xs uppercase tracking-wider first:pl-2">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {paged.map((row) => (
                  <tr key={row.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="py-3 px-4 pl-2">
                      <div className="flex items-center gap-3">
                        <Avatar name={row.applicant_name} />
                        <div>
                          <p className="font-medium text-white/90">{row.applicant_name}</p>
                          <a href={`mailto:${row.applicant_email}`} className="text-xs text-[#1D9770] hover:underline">{row.applicant_email}</a>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 max-w-[200px]">
                      <p className="text-white/80 text-xs font-medium truncate">{row.solution_title}</p>
                      <p className="text-white/30 text-xs truncate">{row.applicant_org}</p>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        label={CAT_LABELS[row.category] ?? row.category}
                        variant={row.category === 'air' ? 'green' : row.category === 'water' ? 'blue' : 'purple'}
                      />
                    </td>
                    <td className="py-3 px-4"><AppStatusBadge status={row.status} /></td>
                    <td className="py-3 px-4 text-white/30 text-xs whitespace-nowrap">{formatDate(row.created_at)}</td>
                    <td className="py-3 px-4 pr-3">
                      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all">
                        <button
                          onClick={() => onView(row)}
                          className="px-2.5 py-1 rounded-lg text-xs text-white/40 border border-white/10 hover:text-white hover:border-[#1D9770]/40 hover:bg-[#1D9770]/10 transition-all"
                        >
                          View
                        </button>
                        {canDelete && (
                          <button
                            onClick={() => onDelete(row.id, row.applicant_name)}
                            className="p-1 rounded-lg text-white/30 border border-white/10 hover:text-rose-400 hover:border-rose-500/30 hover:bg-rose-500/10 transition-all"
                            title="Delete"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={page} total={filtered.length} pageSize={PAGE_SIZE} onChange={setPage} />
        </>
      )}
    </>
  );
}

// ─── Application Detail Modal ─────────────────────────────────────────────────

function ApplicationDetailModal({ item, onClose, onSave }: {
  item: ApplicationSubmission | null;
  onClose: () => void;
  onSave: (id: string, status: string, notes: string) => Promise<void>;
}) {
  const [activeSection, setActiveSection] = useState(0);
  const [editStatus, setEditStatus] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    if (!item) return;
    setEditStatus(item.status);
    setEditNotes(item.admin_notes ?? '');
    setSaveError('');
    setActiveSection(0);
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  if (!item) return null;

  const handleSave = async () => {
    setSaving(true);
    setSaveError('');
    try {
      await onSave(item.id, editStatus, editNotes);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const inrFmt = (n: number | null) => n != null ? `₹${n.toLocaleString('en-IN')}` : '—';

  const sections = [
    {
      label: 'Applicant',
      content: (
        <>
          <CopyField label="Name" value={item.applicant_name} />
          <CopyField label="Email" value={item.applicant_email} />
          <CopyField label="Organisation" value={item.applicant_org} />
          <CopyField label="Phone" value={item.applicant_phone} />
          <CopyField label="Solution Title" value={item.solution_title} />
          <CopyField label="Category" value={CAT_LABELS[item.category] ?? item.category} />
          <CopyField label="Implementation Readiness" value={item.implementation_readiness} />
          <CopyField label="Website" value={item.website_url} />
          <CopyField label="Team Composition" value={item.team_composition} />
        </>
      ),
    },
    {
      label: 'Technical',
      content: (
        <>
          <CopyField label="Mechanism of Action" value={item.mechanism_of_action} />
          <CopyField label="Novelty" value={item.novelty} />
          <CopyField label="Category-Specific Details" value={item.category_specific_details} />
        </>
      ),
    },
    {
      label: 'Impact',
      content: (
        <>
          <CopyField label="Baseline Plan" value={item.baseline_plan} />
          <CopyField label="Baseline Data Source" value={item.baseline_data_source ? JSON.parse(item.baseline_data_source).join(', ') : null} />
          <CopyField label="Baseline Duration" value={item.baseline_duration} />
          <CopyField label="Control Strategy" value={item.control_strategy} />
          <CopyField label="Accreditation Compliance" value={item.accreditation_compliance} />
          <CopyField label="Deployment Status" value={item.deployment_status} />
          {item.deployment_map_url && (
            <div className="mb-4">
              <p className="text-xs text-white/30 uppercase tracking-wider font-semibold mb-1">Deployment Map</p>
              <a href={item.deployment_map_url} target="_blank" rel="noopener noreferrer" className="text-sm text-[#1D9770] hover:underline">
                View uploaded file →
              </a>
            </div>
          )}
          <CopyField label="Risk Mitigation" value={item.risk_mitigation} />
        </>
      ),
    },
    {
      label: 'Feasibility',
      content: (
        <>
          <CopyField label="Total Cost (INR)" value={inrFmt(item.total_cost_inr)} />
          <CopyField label="Cost Explanation" value={item.total_cost_explanation} />
          {item.financials_url && (
            <div className="mb-4">
              <p className="text-xs text-white/30 uppercase tracking-wider font-semibold mb-1">Financials</p>
              <a href={item.financials_url} target="_blank" rel="noopener noreferrer" className="text-sm text-[#1D9770] hover:underline">View file →</a>
            </div>
          )}
          <CopyField label="Unit Cost (INR)" value={inrFmt(item.unit_cost_inr)} />
          <CopyField label="Unit Cost Explanation" value={item.unit_cost_explanation} />
          <CopyField label="Regulatory Compliance" value={item.regulatory_compliance} />
          <CopyField label="Scalability" value={item.scalability} />
          {item.business_plan_url && (
            <div className="mb-4">
              <p className="text-xs text-white/30 uppercase tracking-wider font-semibold mb-1">Business Plan</p>
              <a href={item.business_plan_url} target="_blank" rel="noopener noreferrer" className="text-sm text-[#1D9770] hover:underline">View file →</a>
            </div>
          )}
          <CopyField label="Willing to Share Data" value={item.willing_to_share_data} />
          <CopyField label="Policy Alignment" value={item.policy_alignment} />
        </>
      ),
    },
    {
      label: 'Community',
      content: (
        <>
          <CopyField label="Community Engagement" value={item.community_engagement} />
          <CopyField label="Participants & Roles" value={item.community_participants} />
          <CopyField label="Adoption Support" value={item.community_adoption} />
          <CopyField label="Social Co-Benefits" value={item.social_co_benefits} />
          <CopyField label="Behavioural Change" value={item.behavioural_change} />
          <CopyField label="Equity & Inclusion" value={item.equity_inclusion} />
          <CopyField label="Replicable Models" value={item.replicable_models} />
          <CopyField label="Prior Funding" value={item.prior_funding} />
          <CopyField label="Funding Details" value={item.funding_details} />
        </>
      ),
    },
    {
      label: 'CRM',
      content: (
        <div className="space-y-4">
          <div>
            <p className="text-xs text-white/30 uppercase tracking-wider font-semibold mb-2">Application Status</p>
            <select
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
              className="w-full bg-white/[0.05] border border-white/[0.1] text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D9770]/30"
            >
              {['pending', 'reviewing', 'shortlisted', 'rejected'].map((s) => (
                <option key={s} value={s} style={{ background: '#111' }}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-xs text-white/30 uppercase tracking-wider font-semibold mb-2">Admin Notes</p>
            <textarea
              rows={5}
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              placeholder="Add internal notes about this application…"
              className="w-full bg-white/[0.05] border border-white/[0.1] text-white/80 placeholder-white/20 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#1D9770]/30"
            />
          </div>
          {saveError && (
            <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
              {saveError}
            </div>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1D9770] hover:bg-[#18856a] disabled:opacity-50 text-white text-sm font-semibold transition-all"
          >
            {saving ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Saving…
              </>
            ) : 'Save Changes'}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
      <div
        className="relative w-full sm:max-w-2xl max-h-[95dvh] sm:max-h-[88vh] flex flex-col rounded-t-3xl sm:rounded-2xl border border-white/10 bg-[#0e1612] shadow-2xl overflow-hidden"
        style={{ animation: 'modalIn 0.28s cubic-bezier(0.34,1.2,0.64,1) both' }}
      >
        <style>{`@keyframes modalIn{from{opacity:0;transform:translateY(24px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}`}</style>

        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-white/[0.06] flex-shrink-0">
          <div>
            <p className="font-semibold text-white">{item.solution_title}</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-xs text-white/30">{item.applicant_name} · {item.applicant_org}</p>
              <Badge label={CAT_LABELS[item.category] ?? item.category} variant={item.category === 'air' ? 'green' : item.category === 'water' ? 'blue' : 'purple'} />
              <AppStatusBadge status={item.status} />
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/5 transition-all ml-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Section tabs */}
        <div className="flex gap-1 px-4 py-2 border-b border-white/[0.05] overflow-x-auto flex-shrink-0">
          {sections.map((s, i) => (
            <button
              key={i}
              onClick={() => setActiveSection(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeSection === i ? 'bg-[#1D9770] text-white' : 'text-white/40 hover:text-white/70'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div key={activeSection} className="flex-1 overflow-y-auto px-6 py-5">
          {sections[activeSection].content}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-6 py-4 border-t border-white/[0.06] flex-shrink-0">
          <a
            href={`mailto:${item.applicant_email}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1D9770] hover:bg-[#18856a] text-white text-sm font-medium transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Email Applicant
          </a>
          <button onClick={onClose} className="px-4 py-2.5 rounded-xl border border-white/10 text-white/50 hover:text-white/80 text-sm transition-all">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Overview tab ─────────────────────────────────────────────────────────────

function OverviewTab({ contacts, registrations, partners, applications, session }: {
  contacts: ContactSubmission[]; registrations: RegisterSubmission[];
  partners: PartnerSubmission[]; applications: ApplicationSubmission[];
  session: DashboardSession | null;
}) {
  const isExpert = session?.role === 'expert';
  const recent = [
    ...contacts.map((r) => ({ ...r, name: r.name, type: 'Contact' as const })),
    ...registrations.map((r) => ({ ...r, name: r.name, type: 'Registration' as const })),
    ...partners.map((r) => ({ ...r, name: r.name, type: 'Partner' as const })),
    ...applications.map((r) => ({ ...r, name: r.applicant_name, email: r.applicant_email, type: 'Application' as const })),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 10);

  const typeStyle: Record<string, 'green' | 'blue' | 'purple' | 'default'> = {
    Contact: 'green', Registration: 'blue', Partner: 'purple', Application: 'default',
  };

  return (
    <div className="space-y-6">
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${isExpert ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-4`}>
        {!isExpert && (
          <StatCard label="Contact Inquiries" value={contacts.length} color="border-emerald-500/10" sub="via contact form"
            icon={<svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>}
          />
        )}
        <StatCard label="Registrations" value={registrations.length} color="border-blue-500/10" sub="competition registrations"
          icon={<svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>}
        />
        {!isExpert && (
          <StatCard label="Partnership Inquiries" value={partners.length} color="border-violet-500/10" sub="potential partners"
            icon={<svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>}
          />
        )}
        <StatCard label="Prize Applications" value={applications.length} color="border-amber-500/10"
          sub={`${applications.filter(a => a.status === 'shortlisted').length} shortlisted`}
          icon={<svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>}
        />
        {isExpert && (
          <StatCard label="Review Scope" value={session?.allowedCategories.length ?? 0} color="border-emerald-500/10"
            sub={session?.scopeLabel || 'Assigned categories'}
            icon={<svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 4.5h16.5M3.75 9.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5" /></svg>}
          />
        )}
      </div>

      <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 flex items-center justify-between">
        <div>
          <p className="text-white/40 text-sm">{isExpert ? 'Submissions in your review scope' : 'Total submissions across all forms'}</p>
          <p className="text-3xl font-bold text-white mt-1">{contacts.length + registrations.length + partners.length + applications.length}</p>
        </div>
        <div className="text-right">
          <p className="text-white/20 text-xs">Last updated</p>
          <p className="text-white/40 text-sm font-medium">{new Date().toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, day: '2-digit', month: 'short' })}</p>
        </div>
      </div>

      <div>
        <h2 className="text-white/60 text-xs uppercase tracking-wider font-semibold mb-3 px-1">Recent Activity</h2>
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] divide-y divide-white/[0.04] overflow-hidden">
          {recent.length === 0 ? <EmptyState label="submissions" /> : recent.map((r) => (
            <div key={r.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
              <Avatar name={r.name} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white/90 truncate">{r.name}</p>
                <p className="text-xs text-white/30 truncate">{r.email}</p>
              </div>
              <Badge label={r.type} variant={typeStyle[r.type]} />
              <p className="text-xs text-white/20 whitespace-nowrap hidden sm:block">{formatDate(r.created_at)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UsersTab({
  users,
  search,
  storageReady,
  onCreate,
  onDelete,
}: {
  users: AdminUser[];
  search: string;
  storageReady: boolean;
  onCreate: (input: {
    email: string;
    password: string;
    displayName: string;
    role: 'super_admin' | 'expert';
    allowedCategories: string[];
  }) => Promise<void>;
  onDelete: (id: string, name: string) => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState<'super_admin' | 'expert'>('expert');
  const [allowedCategories, setAllowedCategories] = useState<string[]>(['air']);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const filteredUsers = users.filter((user) =>
    [user.email, user.displayName || '', user.role, user.allowedCategories.join(' ')]
      .some((value) => value.toLowerCase().includes(search)),
  );

  const toggleCategory = (category: string) => {
    setAllowedCategories((current) =>
      current.includes(category)
        ? current.filter((value) => value !== category)
        : [...current, category],
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      await onCreate({
        email,
        password,
        displayName,
        role,
        allowedCategories: role === 'super_admin' ? ['air', 'water', 'land'] : allowedCategories,
      });
      setEmail('');
      setPassword('');
      setDisplayName('');
      setRole('expert');
      setAllowedCategories(['air']);
      setSuccess('Dashboard user created');
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Failed to create user');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {!storageReady && (
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-5 py-4 text-sm text-amber-200">
          Run [supabase_admin_users_setup.sql](f:/Hostwire%20Systems/Zero%20Prize/zeroprize/supabase_admin_users_setup.sql) in Supabase SQL Editor before creating dashboard users.
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[420px_minmax(0,1fr)] gap-6">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">Create Dashboard User</h2>
            <p className="text-sm text-white/30 mt-1">Assign one or more categories to expert reviewers.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/30 mb-2">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                placeholder="Air Expert"
                className="w-full rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#1D9770]/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/30 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="reviewer@example.com"
                required
                className="w-full rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#1D9770]/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/30 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Minimum 10 characters"
                required
                minLength={10}
                className="w-full rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#1D9770]/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/30 mb-2">Role</label>
              <select
                value={role}
                onChange={(event) => setRole(event.target.value as 'super_admin' | 'expert')}
                className="w-full rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#1D9770]/30"
              >
                <option value="expert" style={{ background: '#111' }}>Expert</option>
                <option value="super_admin" style={{ background: '#111' }}>Super Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/30 mb-2">Categories</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {(['air', 'water', 'land'] as const).map((category) => {
                  const checked = role === 'super_admin' || allowedCategories.includes(category);
                  return (
                    <button
                      key={category}
                      type="button"
                      disabled={role === 'super_admin'}
                      onClick={() => toggleCategory(category)}
                      className={`rounded-xl border px-3 py-2 text-sm transition-all ${checked ? 'border-[#1D9770]/40 bg-[#1D9770]/10 text-[#9fe4cf]' : 'border-white/[0.08] text-white/50 hover:text-white/80'} ${role === 'super_admin' ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {CAT_LABELS[category]}
                    </button>
                  );
                })}
              </div>
              {role === 'super_admin' && <p className="mt-2 text-xs text-white/30">Super admins automatically receive all categories.</p>}
            </div>

            {error && <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</div>}
            {success && <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">{success}</div>}

            <button
              type="submit"
              disabled={submitting || !storageReady || !email || !password || (role === 'expert' && allowedCategories.length === 0)}
              className="w-full rounded-xl bg-[#1D9770] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#18856a] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? 'Creating…' : 'Create User'}
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
          <div className="border-b border-white/[0.05] px-5 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Managed Dashboard Users</h2>
              <p className="text-sm text-white/30 mt-1">Super admins created from the UI and all assigned experts.</p>
            </div>
            <Badge label={`${users.length} users`} variant="default" />
          </div>

          {filteredUsers.length === 0 ? (
            <EmptyState label="dashboard users" />
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {filteredUsers.map((user) => (
                <div key={user.id} className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors group">
                  {/* Avatar */}
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1D9770]/10 border border-[#1D9770]/20 flex items-center justify-center text-[#1D9770] font-semibold text-sm uppercase">
                    {(user.displayName || user.email).charAt(0)}
                  </div>

                  {/* Name + Email */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white/90 font-medium text-sm truncate">{user.displayName || user.email}</p>
                    <p className="text-xs text-[#1D9770] truncate">{user.email}</p>
                  </div>

                  {/* Role */}
                  <div className="flex-shrink-0">
                    <Badge label={user.role === 'super_admin' ? 'Super Admin' : 'Expert'} variant={user.role === 'super_admin' ? 'purple' : 'green'} />
                  </div>

                  {/* Scope */}
                  <div className="flex-shrink-0 hidden md:block text-white/50 text-xs max-w-[140px] truncate" title={user.role === 'super_admin' ? 'All categories' : user.allowedCategories.map((c) => CAT_LABELS[c] ?? c).join(', ')}>
                    {user.role === 'super_admin' ? 'All categories' : user.allowedCategories.map((c) => CAT_LABELS[c] ?? c).join(', ')}
                  </div>

                  {/* Status */}
                  <div className="flex-shrink-0 hidden sm:block">
                    <Badge label={user.isActive ? 'Active' : 'Inactive'} variant={user.isActive ? 'blue' : 'default'} />
                  </div>

                  {/* Created */}
                  <div className="flex-shrink-0 hidden lg:block text-white/30 text-xs whitespace-nowrap">{formatDate(user.createdAt)}</div>

                  {/* Delete */}
                  <button
                    onClick={() => onDelete(user.id, user.displayName || user.email)}
                    className="flex-shrink-0 p-1.5 rounded-lg text-rose-400/40 hover:text-rose-400 hover:bg-rose-500/10 transition-all opacity-0 group-hover:opacity-100"
                    title="Delete user"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Export utilities ─────────────────────────────────────────────────────────

async function exportExcel(tab: Tab, contacts: ContactSubmission[], registrations: RegisterSubmission[], partners: PartnerSubmission[], applications: ApplicationSubmission[]) {
  const { utils, writeFile } = await import('xlsx');
  let rows: Record<string, string | null | number>[] = [];
  let filename = '';

  if (tab === 'contacts') {
    filename = 'ZeroPrize_Contacts.xlsx';
    rows = contacts.map((r) => ({
      Name: r.name, Email: r.email, Organization: r.organization,
      'Interested In': r.interested_in, Message: r.message, 'Submitted On': formatDate(r.created_at),
    }));
  } else if (tab === 'registrations') {
    filename = 'ZeroPrize_Registrations.xlsx';
    rows = registrations.map((r) => ({
      Name: r.name, Email: r.email, Organization: r.organization, Phone: r.phone,
      Category: r.category, 'Areas of Interest': r.interest, 'Submitted On': formatDate(r.created_at),
    }));
  } else if (tab === 'partners') {
    filename = 'ZeroPrize_Partners.xlsx';
    rows = partners.map((r) => ({
      Name: r.name, Email: r.email, Organization: r.organization, Phone: r.phone,
      'Partnership Type': r.partnership_type, Message: r.message, 'Submitted On': formatDate(r.created_at),
    }));
  } else if (tab === 'applications') {
    filename = 'ZeroPrize_Applications.xlsx';
    rows = applications.map((r) => ({
      Name: r.applicant_name, Email: r.applicant_email, Organisation: r.applicant_org,
      Phone: r.applicant_phone, 'Solution Title': r.solution_title,
      Category: CAT_LABELS[r.category] ?? r.category,
      Status: r.status, 'Submitted On': formatDate(r.created_at),
    }));
  } else {
    filename = 'ZeroPrize_AllSubmissions.xlsx';
    const wb = utils.book_new();
    utils.book_append_sheet(wb, utils.json_to_sheet(contacts.map((r) => ({ Name: r.name, Email: r.email, Organization: r.organization, 'Interested In': r.interested_in, Message: r.message, 'Submitted On': formatDate(r.created_at) }))), 'Contacts');
    utils.book_append_sheet(wb, utils.json_to_sheet(registrations.map((r) => ({ Name: r.name, Email: r.email, Organization: r.organization, Phone: r.phone, Category: r.category, 'Areas of Interest': r.interest, 'Submitted On': formatDate(r.created_at) }))), 'Registrations');
    utils.book_append_sheet(wb, utils.json_to_sheet(partners.map((r) => ({ Name: r.name, Email: r.email, Organization: r.organization, Phone: r.phone, 'Partnership Type': r.partnership_type, Message: r.message, 'Submitted On': formatDate(r.created_at) }))), 'Partners');
    utils.book_append_sheet(wb, utils.json_to_sheet(applications.map((r) => ({ Name: r.applicant_name, Email: r.applicant_email, Organisation: r.applicant_org, 'Solution Title': r.solution_title, Category: CAT_LABELS[r.category] ?? r.category, Status: r.status, 'Submitted On': formatDate(r.created_at) }))), 'Applications');
    writeFile(wb, filename);
    return;
  }

  const ws = utils.json_to_sheet(rows);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, tab === 'contacts' ? 'Contacts' : tab === 'registrations' ? 'Registrations' : tab === 'partners' ? 'Partners' : 'Applications');
  writeFile(wb, filename);
}

async function exportPDF(tab: Tab, contacts: ContactSubmission[], registrations: RegisterSubmission[], partners: PartnerSubmission[], applications: ApplicationSubmission[]) {
  const { default: jsPDF } = await import('jspdf');
  const { default: autoTable } = await import('jspdf-autotable');

  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const green: [number, number, number] = [29, 151, 112];
  const dark: [number, number, number] = [8, 13, 12];

  // Header
  doc.setFillColor(...dark);
  doc.rect(0, 0, 297, 22, 'F');
  doc.setTextColor(29, 151, 112);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('ZERO PRIZE', 14, 10);
  doc.setTextColor(180, 180, 180);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  const subtitle = tab === 'contacts' ? 'Contact Inquiries' : tab === 'registrations' ? 'Registrations' : tab === 'partners' ? 'Partnership Inquiries' : tab === 'applications' ? 'Prize Applications' : 'All Submissions';
  doc.text(`${subtitle} · Exported ${new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}`, 14, 16);

  const tableStyle = {
    headStyles: { fillColor: green, textColor: [255, 255, 255] as [number, number, number], fontSize: 8, fontStyle: 'bold' as const },
    bodyStyles: { fontSize: 7.5, textColor: [40, 40, 40] as [number, number, number] },
    alternateRowStyles: { fillColor: [245, 250, 248] as [number, number, number] },
    startY: 26,
    margin: { left: 14, right: 14 },
    columnStyles: { message: { cellWidth: 80 }, interest: { cellWidth: 80 } },
  };

  if (tab === 'contacts' || tab === 'overview') {
    if (tab === 'overview') { doc.addPage(); doc.text('Contact Inquiries', 14, 14); }
    autoTable(doc, {
      ...tableStyle,
      startY: tab === 'overview' ? 18 : 26,
      head: [['Name', 'Email', 'Organization', 'Interested In', 'Message', 'Date']],
      body: contacts.map((r) => [r.name, r.email, r.organization || '—', r.interested_in, r.message, formatDate(r.created_at)]),
    });
  }
  if (tab === 'registrations' || tab === 'overview') {
    if (tab === 'overview') { doc.addPage(); doc.text('Registrations', 14, 14); }
    autoTable(doc, {
      ...tableStyle,
      startY: tab === 'overview' ? 18 : 26,
      head: [['Name', 'Email', 'Organization', 'Phone', 'Category', 'Areas of Interest', 'Date']],
      body: registrations.map((r) => [r.name, r.email, r.organization || '—', r.phone || '—', r.category, r.interest || '—', formatDate(r.created_at)]),
    });
  }
  if (tab === 'partners' || tab === 'overview') {
    if (tab === 'overview') { doc.addPage(); doc.text('Partnership Inquiries', 14, 14); }
    autoTable(doc, {
      ...tableStyle,
      startY: tab === 'overview' ? 18 : 26,
      head: [['Name', 'Email', 'Organization', 'Phone', 'Partnership Type', 'Message', 'Date']],
      body: partners.map((r) => [r.name, r.email, r.organization, r.phone || '—', r.partnership_type, r.message || '—', formatDate(r.created_at)]),
    });
  }
  if (tab === 'applications' || tab === 'overview') {
    if (tab === 'overview') { doc.addPage(); doc.text('Prize Applications', 14, 14); }
    autoTable(doc, {
      ...tableStyle,
      startY: tab === 'overview' ? 18 : 26,
      head: [['Applicant', 'Email', 'Organisation', 'Solution Title', 'Category', 'Status', 'Date']],
      body: applications.map((r) => [r.applicant_name, r.applicant_email, r.applicant_org, r.solution_title, CAT_LABELS[r.category] ?? r.category, r.status, formatDate(r.created_at)]),
    });
  }

  const filename = tab === 'overview' ? 'ZeroPrize_AllSubmissions.pdf' : `ZeroPrize_${tab.charAt(0).toUpperCase() + tab.slice(1)}.pdf`;
  doc.save(filename);
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [exporting, setExporting] = useState<'pdf' | 'excel' | null>(null);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [registrations, setRegistrations] = useState<RegisterSubmission[]>([]);
  const [partners, setPartners] = useState<PartnerSubmission[]>([]);
  const [applications, setApplications] = useState<ApplicationSubmission[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [userStoreReady, setUserStoreReady] = useState(true);
  const [session, setSession] = useState<DashboardSession | null>(null);
  const [modalItem, setModalItem] = useState<FormSubmission | null>(null);
  const [modalType, setModalType] = useState<'contact' | 'registration' | 'partner'>('contact');
  const [appModal, setAppModal] = useState<ApplicationSubmission | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; type: 'contact' | 'registration' | 'partner' | 'application' | 'user'; name: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    try {
      const res = await fetch('/api/admin/submissions');
      if (res.status === 401) { router.push('/admin/login'); return; }
      const data = await res.json();
      setSession(data.session || null);
      setContacts(data.contacts || []);
      setRegistrations(data.registrations || []);
      setPartners(data.partners || []);
      setApplications(data.applications || []);

      if (data.session?.role === 'super_admin') {
        const usersResponse = await fetch('/api/admin/users');
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          setUsers(usersData.users || []);
          setUserStoreReady(usersData.storageReady ?? true);
        } else {
          setUsers([]);
          setUserStoreReady(false);
        }
      } else {
        setUsers([]);
        setUserStoreReady(true);
      }
    } catch { /* ignore */ } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [router]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const canDelete = session?.role === 'super_admin';
  const isExpert = session?.role === 'expert';

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const openModal = (item: FormSubmission, type: 'contact' | 'registration' | 'partner') => {
    setModalItem(item);
    setModalType(type);
  };

  const handleExportExcel = async () => {
    setExporting('excel');
    try { await exportExcel(activeTab, contacts, registrations, partners, applications); }
    finally { setExporting(null); }
  };

  const handleExportPDF = async () => {
    setExporting('pdf');
    try { await exportPDF(activeTab, contacts, registrations, partners, applications); }
    finally { setExporting(null); }
  };

  const handleAppStatusSave = async (id: string, status: string, admin_notes: string) => {
    const res = await fetch('/api/admin/applications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status, admin_notes }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      throw new Error(data?.error || 'Failed to save application updates');
    }
    setApplications((prev) => prev.map((a) => a.id === id ? { ...a, status, admin_notes } : a));
    if (appModal?.id === id) setAppModal((prev) => prev ? { ...prev, status, admin_notes } : null);
  };

  const handleCreateUser = async (input: {
    email: string;
    password: string;
    displayName: string;
    role: 'super_admin' | 'expert';
    allowedCategories: string[];
  }) => {
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) {
      throw new Error(data?.error || 'Failed to create dashboard user');
    }

    if (data?.user) {
      setUsers((current) => [data.user, ...current.filter((user) => user.id !== data.user.id)]);
      setUserStoreReady(true);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const isUser = deleteTarget.type === 'user';
    const res = await fetch(isUser ? '/api/admin/users' : '/api/admin/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: deleteTarget.type, id: deleteTarget.id }),
    });
    setDeleting(false);
    if (res.ok) {
      if (deleteTarget.type === 'contact') setContacts((p) => p.filter((r) => r.id !== deleteTarget.id));
      else if (deleteTarget.type === 'registration') setRegistrations((p) => p.filter((r) => r.id !== deleteTarget.id));
      else if (deleteTarget.type === 'partner') setPartners((p) => p.filter((r) => r.id !== deleteTarget.id));
      else if (deleteTarget.type === 'application') setApplications((p) => p.filter((r) => r.id !== deleteTarget.id));
      else if (deleteTarget.type === 'user') setUsers((p) => p.filter((r) => r.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  const tabs = [
    { id: 'overview' as Tab, label: 'Overview', count: contacts.length + registrations.length + partners.length + applications.length },
    { id: 'contacts' as Tab, label: 'Contacts', count: contacts.length },
    { id: 'registrations' as Tab, label: 'Registrations', count: registrations.length },
    { id: 'partners' as Tab, label: 'Partners', count: partners.length },
    { id: 'applications' as Tab, label: 'Applications', count: applications.length },
    { id: 'users' as Tab, label: 'Users', count: users.length },
  ];
  const visibleTabs = isExpert
    ? tabs.filter((tab) => tab.id === 'overview' || tab.id === 'registrations' || tab.id === 'applications')
    : tabs.filter((tab) => session?.role === 'super_admin' || tab.id !== 'users');

  useEffect(() => {
    if (!visibleTabs.some((tab) => tab.id === activeTab)) {
      setActiveTab('overview');
      setSearch('');
    }
  }, [activeTab, visibleTabs]);

  const lowerSearch = search.toLowerCase();

  return (
    <div className="min-h-screen bg-[#080d0c]">
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#1D9770 1px, transparent 1px), linear-gradient(90deg, #1D9770 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

      {/* Detail Modal */}
      <DetailModal item={modalItem} type={modalType} onClose={() => setModalItem(null)} />
      <ApplicationDetailModal
        item={appModal}
        onClose={() => setAppModal(null)}
        onSave={handleAppStatusSave}
      />
      <ConfirmDeleteModal
        target={deleteTarget}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
        deleting={deleting}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#080d0c]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#1D9770]/20 border border-[#1D9770]/30 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-[#1D9770]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-white/80">Zero Prize</span>
            <span className="text-white/20 text-sm">/</span>
            <span className="text-sm text-white/40">{isExpert ? 'Expert Dashboard' : 'Admin'}</span>
          </div>
          <div className="flex items-center gap-3">
            {session && (
              <div className="hidden md:flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5">
                <span className="text-xs font-medium text-white/70">{session.displayName || session.email}</span>
                <span className="text-white/20 text-xs">•</span>
                <span className="text-xs text-[#1D9770]">{session.role === 'super_admin' ? 'Super Admin' : session.scopeLabel}</span>
              </div>
            )}
            <button onClick={() => fetchData(true)} disabled={refreshing} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors">
              <svg className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
            <button onClick={handleLogout} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 transition-all">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">{isExpert ? 'Category Review Dashboard' : 'Submissions Dashboard'}</h1>
          <p className="text-white/30 text-sm mt-1">
            {isExpert ? `Restricted to ${session?.scopeLabel || 'assigned categories'}` : 'All form submissions in one place'}
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="flex flex-col items-center gap-4">
              <svg className="w-8 h-8 animate-spin text-[#1D9770]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <p className="text-white/30 text-sm">Loading submissions…</p>
            </div>
          </div>
        ) : (
          <>
            {/* Toolbar: tabs + search + export */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Tabs */}
                <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06] w-fit">
                  {visibleTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => { setActiveTab(tab.id); setSearch(''); }}
                      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-[#1D9770] text-white shadow-lg shadow-[#1D9770]/20' : 'text-white/40 hover:text-white/70'}`}
                    >
                      {tab.label}
                      <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-white/5 text-white/30'}`}>
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Export buttons */}
                {activeTab !== 'users' && (
                  <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportExcel}
                    disabled={!!exporting}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 disabled:opacity-40 transition-all"
                  >
                    {exporting === 'excel' ? (
                      <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>
                    )}
                    Export Excel
                  </button>
                  <button
                    onClick={handleExportPDF}
                    disabled={!!exporting}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-rose-500/20 text-rose-400 hover:bg-rose-500/10 disabled:opacity-40 transition-all"
                  >
                    {exporting === 'pdf' ? (
                      <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                    )}
                    Export PDF
                  </button>
                  </div>
                )}
              </div>

              {/* Search */}
              {activeTab !== 'overview' && (
                <div className="relative w-full sm:w-72">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search by name, email, category…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white/80 placeholder-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D9770]/30 focus:border-[#1D9770]/30 transition-all"
                  />
                  {search && (
                    <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Tab content */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
              {activeTab === 'overview' && (
                <div className="p-6">
                  <OverviewTab contacts={contacts} registrations={registrations} partners={partners} applications={applications} session={session} />
                </div>
              )}
              {activeTab === 'contacts' && (
                <ContactsTable key={`contacts-${lowerSearch}`} data={contacts} search={lowerSearch} onView={(r) => openModal(r, 'contact')} onDelete={(id, name) => setDeleteTarget({ id, name, type: 'contact' })} canDelete={canDelete} />
              )}
              {activeTab === 'registrations' && (
                <RegistrationsTable key={`registrations-${lowerSearch}`} data={registrations} search={lowerSearch} onView={(r) => openModal(r, 'registration')} onDelete={(id, name) => setDeleteTarget({ id, name, type: 'registration' })} canDelete={canDelete} />
              )}
              {activeTab === 'partners' && (
                <PartnersTable key={`partners-${lowerSearch}`} data={partners} search={lowerSearch} onView={(r) => openModal(r, 'partner')} onDelete={(id, name) => setDeleteTarget({ id, name, type: 'partner' })} canDelete={canDelete} />
              )}
              {activeTab === 'applications' && (
                <ApplicationsTable key={`applications-${lowerSearch}`} data={applications} search={lowerSearch} onView={(r) => setAppModal(r)} onDelete={(id, name) => setDeleteTarget({ id, name, type: 'application' })} canDelete={canDelete} />
              )}
              {activeTab === 'users' && (
                <UsersTab users={users} search={lowerSearch} storageReady={userStoreReady} onCreate={handleCreateUser} onDelete={(id, name) => setDeleteTarget({ id, name, type: 'user' })} />
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

