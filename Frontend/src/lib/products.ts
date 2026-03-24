import { Product } from "@/type/product";


export const getProducts = async (): Promise<Product[]> => {
  try {
    // 8080 포트(백엔드)에서 진짜 상품 리스트를 가져오는 명령
    const response = await fetch("http://localhost:8080/api/products/list");

    if (!response.ok) {
      throw new Error("상품 목록 로딩 실패");
    }

    // 서버가 준 정보를 JSON(컴퓨터용 데이터 형식)으로 변환해서 반환
    return await response.json();
  } catch (error) {
    console.error("데이터를 가져오는 중 에러 발생:", error);
    return []; // 에러가 나면 빈 목록을 보내서 화면이 멈추지 않게 만듬
  }
};