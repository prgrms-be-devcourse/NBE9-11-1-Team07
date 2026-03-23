"use client";

import { useState } from "react";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import OrderSidebar from "@/components/OrderSidebar";
import { products } from "@/lib/products";
import { OrderProduct } from "@/type/orderProduct";

export default function Home() {
  const [cart, setCart] = useState<OrderProduct[]>([]);

  const updateCart = (productId: number, quantity: number) => {
    setCart((prev) => {
      if (quantity === 0) return prev.filter((item) => item.productId !== productId);
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        );
      }
      return [...prev, { productId, quantity }];
    });
  };

  const getQuantity = (productId: number) =>
    cart.find((item) => item.productId === productId)?.quantity ?? 0;

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />

      <div className="border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Order Coffee Beans</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Orders placed between 2 PM yesterday and 2 PM today will be processed tomorrow.
          </p>
        </div>
        <button className="text-sm border border-gray-300 rounded px-4 py-1.5 hover:bg-gray-50 transition-colors">
          주문 조회
        </button>
      </div>

      <div className="flex">
        <main className="flex-1 px-8 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">상품 목록</h2>
          <ProductGrid
            products={products}
            getQuantity={getQuantity}
            onUpdateCart={updateCart}
          />
        </main>
        <aside className="w-80 shrink-0 p-6">
          <OrderSidebar cart={cart} products={products} />
        </aside>
      </div>
    </div>
  );
}
