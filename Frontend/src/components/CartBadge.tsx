interface CartBadgeProps {
  count: number;
}

export default function CartBadge({ count }: CartBadgeProps) {
  return (
    <span className="ml-2 inline-flex items-center justify-center px-2 h-6 rounded-full bg-gray-800 text-white text-xs font-semibold">
      {count}개
    </span>
  );
}
