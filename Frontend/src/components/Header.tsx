export default function Header() {
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
        <button className="text-sm border border-gray-300 rounded px-4 py-1.5 hover:bg-gray-50 transition-colors">
          관리자 페이지
        </button>
        <button className="text-sm border border-gray-300 rounded px-4 py-1.5 hover:bg-gray-50 transition-colors">
          관리자 로그인
        </button>
      </div>
    </header>
  );
}
