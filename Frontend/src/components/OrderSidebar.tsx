"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // 수정: next/router 대신 next/navigation 사용
import { Product } from "@/type/product";
import { OrderProduct } from "@/type/orderProduct";
import CartBadge from "./CartBadge";

interface OrderSidebarProps {
  cart: OrderProduct[];
  products: Product[];
}

export default function OrderSidebar({ cart, products }: OrderSidebarProps) {
  // 수정: App Router 방식의 useRouter 훅 사용
  const router = useRouter();
  const [form, setForm] = useState({ email: "", address: "", postalCode: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const filledCart = cart
    .filter((item) => item.quantity > 0)
    .map((item) => ({
      ...item,
      product: products.find((p) => p.id === item.productId)!,
    }));

  const handleOrder = async () => {
    if (!form.email || !form.address || !form.postalCode) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    if (filledCart.length === 0) {
      alert("상품을 선택해주세요.");
      return;
    }


    const query = new URLSearchParams({
      email: form.email,
      address: form.address,
      postalCode: form.postalCode,
      // 상품 ID와 수량 정보만 JSON 문자열로 변환하여 전달
      products: JSON.stringify(
        filledCart.map(({ productId, quantity }) => ({ productId, quantity }))
      )
    }).toString();

    // 3. 주문 확인 페이지(/orders)로 이동
    router.push(`/orders?${query}`);
  };

  const fields = [
    { label: "이메일", name: "email", type: "email", placeholder: "email@example.com" },
    { label: "주소", name: "address", type: "text", placeholder: "서울시 강남구 ..." },
    { label: "우편번호", name: "postalCode", type: "text", placeholder: "12345" },
  ] as const;

  return (
    <div className="sticky top-6 flex flex-col gap-6">
      <div className="bg-gray-100 rounded-xl p-5 flex flex-col gap-3">
        <h2 className="text-base font-bold text-gray-900">주문 내역</h2>

        {filledCart.length === 0 ? (
          <p className="text-sm text-gray-400">선택된 상품이 없습니다.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {filledCart.map(({ productId, quantity, product }) => (
              <li key={productId} className="flex items-center justify-between text-sm">
                <span className="text-gray-700">{product?.name || "상품 정보 없음"}</span>
                <CartBadge count={quantity} />
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-col gap-4 mt-2">
          {fields.map(({ label, name, type, placeholder }) => (
            <label key={name} className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-gray-800">{label}</span>
              <input
                type={type}
                name={name}
                value={form[name as keyof typeof form]}
                onChange={handleChange}
                placeholder={placeholder}
                className="rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-400 transition"
              />
            </label>
          ))}
        </div>

        <p className="text-xs text-gray-500 mt-1">
          당일 오후 2시 이후의 주문은 다음날 배송을 시작합니다.
        </p>
      </div>

      <button
        onClick={handleOrder}
        className="w-full py-4 bg-white border-2 border-gray-900 rounded-xl text-xl font-bold text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-200"
      >
        주문하기
      </button>
    </div>
  );
}