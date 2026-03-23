"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import OrderSidebar from "@/components/OrderSidebar";
import { OrderProduct } from "@/type/orderProduct";
import { fetchApi } from "@/lib/client";
import { Product } from "@/type/product"; // 기존의 하드코딩된 products 배열 대신 Type만 가져옵니다.
import Link from "next/link";

export default function Home() {
  const [cart, setCart] = useState<OrderProduct[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. 컴포넌트가 마운트될 때 API 호출
  useEffect(() => {
    fetchApi<Product[]>('/api/products/list')
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("상품 로딩 실패:", error.message);
        alert("상품 목록을 불러올 수 없습니다.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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

        <Link
          href="/my-orders"
          className="text-sm border border-gray-300 rounded px-4 py-1.5 hover:bg-gray-50 transition-colors"
        >
          주문 조회
        </Link>
      </div>

      <div className="flex">
        <main className="flex-1 px-8 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">상품 목록</h2>
          {/* 3. 로딩 상태에 따른 조건부 렌더링 적용 */}
          {isLoading ? (
            <div className="py-10 text-center text-gray-500">상품을 불러오는 중입니다...</div>
          ) : (
            <ProductGrid
              products={products} // 상태로 관리되는 products를 하위 컴포넌트로 전달
              getQuantity={getQuantity}
              onUpdateCart={updateCart}
            />
          )}
        </main>
        <aside className="w-80 shrink-0 p-6">
          <OrderSidebar cart={cart} products={products} /> {/* 사이드바에도 동일하게 전달 */}
        </aside>
      </div>
    </div>
  );
}