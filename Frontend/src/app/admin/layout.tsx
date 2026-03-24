'use client';

import Header from '@/components/Header';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 인증 체크 전부 제거

  return (
    <div style={{ minHeight: '100vh' }}>
      <Header />

      <div style={{ display: 'flex' }}>
        <AdminSidebar />

        <main style={{
          flex: 1,
          padding: '32px',
          backgroundColor: '#FFFFFF'
        }}>
          {children}
        </main>
      </div>
    </div>
  );
}