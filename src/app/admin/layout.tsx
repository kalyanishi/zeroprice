import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin — Zero Prize',
  robots: 'noindex,nofollow',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Override input color for admin dark theme */}
      <style>{`
        .admin-scope input,
        .admin-scope textarea,
        .admin-scope select {
          color: rgba(255,255,255,0.85) !important;
        }
      `}</style>
      <div className="admin-scope">
        {children}
      </div>
    </>
  );
}
