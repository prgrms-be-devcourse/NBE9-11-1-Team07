"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createOrderApi } from "@/lib/client";
import { getProducts } from "@/lib/products"; // [추가] 백엔드에서 상품을 가져오는 함수
import { Product } from "@/type/product";     // 상품 타입

interface FinalOrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

export default function OrderConfirmPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 1. URL에서 넘어온 기본 고객 정보
  const email = searchParams.get("email") || "";
  const address = searchParams.get("address") || "";
  const postcode = searchParams.get("postalCode") || "";

  // 2. 상태 관리 (선택된 상품들)
  const [finalItems, setFinalItems] = useState<FinalOrderItem[]>([]);

  // [수정] 페이지가 열리자마자 백엔드에서 전체 상품 목록을 가져와서 매칭합니다.
  useEffect(() => {
    const initOrderData = async () => {
      // (1) 백엔드에서 실제 상품 리스트를 가져옵니다.
      const realProducts: Product[] = await getProducts();

      // (2) URL에 담긴 선택된 상품 ID와 수량 정보를 가져옵니다.
      const productsParam = searchParams.get("products");

      if (productsParam && realProducts.length > 0) {
        try {
          const parsedSelected = JSON.parse(productsParam);

          // (3) 백엔드 데이터와 선택된 정보를 합칩니다.
          const mergedItems = parsedSelected.map((selected: any) => {
            // 백엔드 데이터(realProducts)에서 ID가 같은 상품을 찾습니다.
            const productInfo = realProducts.find(p => p.id === selected.productId);

            return {
              productId: selected.productId,
              name: productInfo?.name || "알 수 없는 상품",
              price: productInfo?.price || 0,
              quantity: selected.quantity,
            };
          });

          setFinalItems(mergedItems);
        } catch (e) {
          console.error("데이터 매칭 실패", e);
        }
      }
    };

    initOrderData();
  }, [searchParams]);

  // 수량 증감 함수 (기존과 동일)
  const updateQuantity = (productId: number, delta: number) => {
    setFinalItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  // 총액 계산
  const totalProductPrice = finalItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  // 최종 주문하기 (기존과 동일)
  const handleFinalOrder = async () => {
    try {
      const requestData = {
        email,
        address,
        postcode,
        orderItems: finalItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        }))
      };

      await createOrderApi(requestData);
      alert("주문이 성공적으로 완료되었습니다!");
      router.push("/");
    } catch (error) {
      alert("주문 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-8">주문하기</h1>

      {/* 고객 정보 */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-4">고객 정보</h2>
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <p><strong>이메일:</strong> {email}</p>
          <p><strong>주소:</strong> {address}</p>
          <p><strong>우편번호:</strong> {postcode}</p>
        </div>
      </div>

      {/* 주문 상품 */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-4">주문 상품</h2>
        <div className="border border-gray-200 rounded-lg p-4 space-y-3">
          {finalItems.length === 0 ? (
            <p className="text-gray-400">불러오는 중...</p>
          ) : (
            finalItems.map((item) => (
              <div key={item.productId} className="flex justify-between items-center pb-3 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">₩{item.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2 border rounded p-1 bg-white">
                  <button onClick={() => updateQuantity(item.productId, -1)} className="px-2 hover:bg-gray-100">-</button>
                  <span className="font-bold w-6 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.productId, 1)} className="px-2 hover:bg-gray-100">+</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 합계 및 주문 버튼 */}
      <div className="mb-10 border-t pt-6 text-right">
        <p className="text-2xl font-bold">총합: ₩{totalProductPrice.toLocaleString()}</p>
      </div>

      <button
        onClick={handleFinalOrder}
        className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-xl hover:bg-black transition-all"
      >
        주문하기
      </button>
    </div>
  );
}