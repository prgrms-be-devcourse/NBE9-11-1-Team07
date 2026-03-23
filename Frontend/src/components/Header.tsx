'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');  // 관리자 페이지 체크

  const handleLogout = () => {
    // TODO: 실제 로그아웃 로직 (로컬스토리지 삭제 등)
    alert('로그아웃 되었습니다.');
    window.location.href = '/';  // 메인 페이지로 이동
  };

  return (
    <header className="border-b border-gray-200 px-8 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20" height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-800"
        >
          <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
          <line x1="6" x2="6" y1="2" y2="4" />
          <line x1="10" x2="10" y1="2" y2="4" />
          <line x1="14" x2="14" y1="2" y2="4" />
        </svg>
        <div>
          <div className="font-semibold text-gray-900 leading-tight">Grids &amp; Circles</div>
          <div className="text-xs text-gray-400">Premium Coffee Beans</div>
        </div>
      </div>
      <div className="flex gap-2">
      {isAdminPage ? (
          // 관리자 페이지에서는 로그아웃 버튼만
          <button 
            onClick={handleLogout}
            className="text-sm border border-gray-300 rounded px-4 py-1.5 hover:bg-gray-50 transition-colors"
          >
            로그아웃
          </button>
        ) : (
          // 고객 페이지에서는 관리자 페이지, 로그인 버튼
          <>
            <Link href="/admin">
              <button className="text-sm border border-gray-300 rounded px-4 py-1.5 hover:bg-gray-50 transition-colors">
                관리자 페이지
              </button>
            </Link>
            <Link href="/login">
              <button className="text-sm border border-gray-300 rounded px-4 py-1.5 hover:bg-gray-50 transition-colors">
                관리자 로그인
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
