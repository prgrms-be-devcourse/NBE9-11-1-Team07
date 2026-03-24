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
  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/me', {
        credentials: 'include'
      });

      console.log('응답 상태:', response.ok);
      
      if (response.ok) {
        const data = await response.json();
        console.log('응답 데이터:', data);
        console.log('resultCode:', data.resultCode);
        
        if (data.resultCode && data.resultCode.startsWith('200')) {
          console.log('인증 성공!');
          setIsAuthenticated(true);
          setIsLoading(false);
          return;
        } else {
          console.log('resultCode 조건 실패');
        }
      }

      console.log('인증 실패, 로그인 페이지로 이동');
      router.push('/login');
    } catch (error) {
      console.error('인증 확인 실패:', error);
      router.push('/login');
    }
  };

  checkAuth();
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