'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: '📦 주문 관리', path: '/admin' },
    { name: '📱 상품 관리', path: '/admin/products' },
  ];

  return (
    <aside style={{
      width: '200px',
      minHeight: 'calc(100vh - 64px)',
      backgroundColor: '#F8F9FA',
      borderRight: '1px solid #DEE2E6'
    }}>
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
  );
}