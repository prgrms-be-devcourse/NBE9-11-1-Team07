// 상태 한글 변환 & 스타일
const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  ACCEPTED: { label: "결제 완료", color: "#2563eb", bg: "#eff6ff" },
  PREPARING: { label: "배송 준비중", color: "#d97706", bg: "#fffbeb" },
  SHIPPED: { label: "배송중", color: "#7c3aed", bg: "#f5f3ff" },
  DELIVERED: { label: "배송 완료", color: "#16a34a", bg: "#f0fdf4" },
  CANCELLED: { label: "취소됨", color: "#dc2626", bg: "#fef2f2" },
};

function getStatus(status: string) {
  return STATUS_MAP[status] ?? { label: status, color: "#6b7280", bg: "#f9fafb" };
}

function getDeliveryMessage(status: string, createStr: string, shippingStr: string) {
  if (status === "SHIPPED") return "배송중";

  if (status === "ACCEPTED") {
    const createDate = new Date(createStr);
    const shippingDate = new Date(shippingStr);

    if (createDate.getDate() !== shippingDate.getDate()) {
      return "다음날 배송";
    }
    return "당일 배송";
  }

  return STATUS_MAP[status]?.label || status;
}

interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  productName: string;
  category: string;
  price: number;
  quantity: number;
  totalPrice: number;
  createdAt: string;
}

interface Order {
  orderId: number;
  email: string;
  address: string;
  postcode: string;
  orderStatus: string;
  createDate: string;
  shippingStartDate?: string;
  items?: OrderItem[];
}

interface OrderCardProps {
  order: Order;
}

// 날짜 포맷팅
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// 가격 포맷팅
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW'
  }).format(price);
};

// 주문 총액 계산
const calculateOrderTotal = (items?: OrderItem[]) => {
  if (!items || items.length === 0) return 0;
  return items.reduce((sum, item) => sum + item.totalPrice, 0);
};

export default function OrderCard({ order }: OrderCardProps) {
  const st = getStatus(order.orderStatus);
  const deliveryMessage = getDeliveryMessage(
    order.orderStatus,
    order.createDate,
    order.shippingStartDate || order.createDate
  );

  return (
    <div style={{
      border: '1px solid #DEE2E6',
      borderRadius: '8px',
      padding: '24px',
      backgroundColor: '#FFFFFF'
    }}>
      {/* 헤더 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '16px',
        borderBottom: '1px solid #DEE2E6',
        marginBottom: '16px'
      }}>
        <div>
          <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '4px' }}>
            주문번호: {order.orderId}
          </div>
          <div style={{ fontSize: '14px', color: '#6C757D' }}>
            {formatDate(order.createDate)}
          </div>
        </div>
        <div style={{
          fontSize: '14px',
          color: st.color,
          fontWeight: 'bold',
          padding: '6px 12px',
          backgroundColor: st.bg,
          borderRadius: '4px',
          border: `1px solid ${st.color}33`
        }}>
          {deliveryMessage}
        </div>
      </div>

      {/* 주문 상품 목록 */}
      {order.items && order.items.length > 0 && (
        <div style={{
          marginBottom: '16px',
          paddingBottom: '16px',
          borderBottom: '1px solid #DEE2E6'
        }}>
          {order.items.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px'
              }}
            >
              <div style={{ fontSize: '14px', color: '#212529' }}>
                {item.productName} X {item.quantity}
              </div>
              <div style={{ fontSize: '14px', color: '#212529', fontWeight: 500 }}>
                {formatPrice(item.totalPrice)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 주문 정보 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '14px', color: '#6C757D', fontWeight: 500 }}>
            고객
          </span>
          <span style={{ fontSize: '14px', color: '#212529' }}>
            {order.email}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '14px', color: '#6C757D', fontWeight: 500 }}>
            배송지
          </span>
          <span style={{ fontSize: '14px', color: '#212529' }}>
            {order.address}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '14px', color: '#6C757D', fontWeight: 500 }}>
            우편번호
          </span>
          <span style={{ fontSize: '14px', color: '#212529' }}>
            {order.postcode}
          </span>
        </div>

        {/* 총 결제 금액 */}
        {order.items && order.items.length > 0 && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '12px',
            marginTop: '12px',
            borderTop: '1px solid #DEE2E6'
          }}>
            <span style={{ fontSize: '15px', color: '#212529', fontWeight: 'bold' }}>
              총 결제 금액
            </span>
            <span style={{ fontSize: '15px', color: '#8B4513', fontWeight: 'bold' }}>
              {formatPrice(calculateOrderTotal(order.items))}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}