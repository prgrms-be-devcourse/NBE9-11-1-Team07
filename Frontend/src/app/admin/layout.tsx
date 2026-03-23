'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    { name: '📦 주문 관리', path: '/admin' },
    { name: '📱 상품 관리', path: '/admin/products' },
  ];

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header 컴포넌트 사용 */}
      <Header />

      <div style={{ display: 'flex' }}>
        {/* 사이드바 */}
        <aside style={{
          width: '200px',
          minHeight: 'calc(100vh - 64px)',
          backgroundColor: '#F8F9FA',
          borderRight: '1px solid #DEE2E6'
        }}>
          {/* 관리자 페이지 헤더 */}
          <div style={{
            padding: '20px',
            borderBottom: '1px solid #DEE2E6',
            marginBottom: '8px'
          }}>
            <div style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#212529'
            }}>
              관리자 페이지
            </div>
          </div>

          {/* 메뉴 목록 */}
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              style={{
                display: 'block',
                padding: '16px 20px',
                textDecoration: 'none',
                color: pathname === item.path ? '#212529' : '#495057',
                fontSize: '14px',
                fontWeight: pathname === item.path ? 600 : 500,
                backgroundColor: pathname === item.path ? '#E9ECEF' : 'transparent',
                borderLeft: pathname === item.path ? '3px solid #8B4513' : '3px solid transparent',
                transition: 'all 0.2s'
              }}
            >
              {item.name}
            </Link>
          ))}
        </aside>

        {/* 메인 콘텐츠 */}
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