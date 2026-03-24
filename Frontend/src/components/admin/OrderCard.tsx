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
            color: '#8B4513',
            fontWeight: 'bold',
            padding: '6px 12px',
            backgroundColor: '#FFF3E0',
            borderRadius: '4px'
          }}>
            {order.orderStatus}
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