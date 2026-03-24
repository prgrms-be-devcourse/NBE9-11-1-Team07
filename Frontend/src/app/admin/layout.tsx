'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // localStorage에서 로그인 상태 확인
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    
    if (isLoggedIn !== 'true') {
      router.push('/login');
      return;
    }
    
    setIsAuthenticated(true);
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
      }}>
        로그인 확인 중...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

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