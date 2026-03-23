"use client";

import { Product } from "@/type/product";
import { formatPrice } from "@/lib/utils";

function MinusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" x2="19" y1="12" y2="12" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" x2="12" y1="5" y2="19" />
      <line x1="5" x2="19" y1="12" y2="12" />
    </svg>
  );
}

interface ProductCardProps {
  product: Product;
  quantity: number;
  onUpdateCart: (productId: number, quantity: number) => void;
}

export default function ProductCard({ product, quantity, onUpdateCart }: ProductCardProps) {
  const { id, name, origin, weight, description, price } = product;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden flex flex-col">
      <div
        className="h-52 w-full bg-gray-50"
        style={{
          backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      <div className="p-4 flex flex-col flex-1 gap-2">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm">{name}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{origin} • {weight}</p>
        </div>
        <p className="text-xs text-gray-500 line-clamp-2 flex-1">{description}</p>
        <p className="font-semibold text-gray-900">{formatPrice(price)}</p>

        <div className="flex items-center gap-3 mt-1">
          <button
            onClick={() => onUpdateCart(id, Math.max(0, quantity - 1))}
            disabled={quantity === 0}
            className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-40"
          >
            <MinusIcon />
          </button>
          <span className="w-6 text-center text-sm font-medium">{quantity}</span>
          <button
            onClick={() => onUpdateCart(id, quantity + 1)}
            className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            <PlusIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
