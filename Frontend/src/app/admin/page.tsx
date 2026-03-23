'use client';

import { useEffect, useState } from 'react';

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
  items?: OrderItem[];  // 주문 아이템 추가
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [productCount, setProductCount] = useState(0);

  // 주문 목록 + 각 주문의 상품 조회
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 상품 개수 조회
        const productsResponse = await fetch('http://localhost:8080/api/products/list');
        const productsData = await productsResponse.json();
        setProductCount(productsData.length);

        // 주문 목록 조회
        const ordersResponse = await fetch('http://localhost:8080/api/orders');
        const ordersData = await ordersResponse.json();
        
        if (ordersData.resultCode.startsWith('200')) {
          const ordersList: Order[] = ordersData.data;
          
          // 각 주문의 상품 조회
          const ordersWithItems = await Promise.all(
            ordersList.map(async (order) => {
              try {
                const itemsResponse = await fetch(
                  `http://localhost:8080/api/orders/${order.orderId}/items`
                );
                const itemsData = await itemsResponse.json();
                
                return {
                  ...order,
                  items: itemsData.resultCode.startsWith('200') ? itemsData.data : []
                };
              } catch (error) {
                console.error(`주문 ${order.orderId} 상품 조회 실패:`, error);
                return { ...order, items: [] };
              }
            })
          );
          
          setOrders(ordersWithItems);
        }
      } catch (error) {
        console.error('주문 목록 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 통계 계산
  const today = new Date().toISOString().split('T')[0];
  const todayOrders = orders.filter(o => 
    o.createDate.startsWith(today)
  ).length;
  
  const pendingOrders = orders.filter(o => 
    o.orderStatus === 'ACCEPTED'
  ).length;

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

  if (loading) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '100px' }}>
        로딩 중...
      </div>
    );
  }

  return (
    <div>
      {/* 통계 섹션 */}
      <div style={{
        display: 'flex',
        gap: '24px',
        marginBottom: '40px',
        justifyContent: 'center'
      }}>
        <div style={{
          border: '1px solid #DEE2E6',
          borderRadius: '8px',
          padding: '24px',
          backgroundColor: '#FFFFFF',
          minWidth: '150px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '14px',
            color: '#6C757D',
            marginBottom: '8px'
          }}>
            오늘 주문
          </div>
          <div style={{
            fontSize: '25px',
            fontWeight: 'bold',
            color: '#212529'
          }}>
            {todayOrders}건
          </div>
        </div>

        <div style={{
          border: '1px solid #DEE2E6',
          borderRadius: '8px',
          padding: '24px',
          backgroundColor: '#FFFFFF',
          minWidth: '150px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '14px',
            color: '#6C757D',
            marginBottom: '8px'
          }}>
            배송 대기중
          </div>
          <div style={{
            fontSize: '25px',
            fontWeight: 'bold',
            color: '#212529'
          }}>
            {pendingOrders}건
          </div>
        </div>

        <div style={{
          border: '1px solid #DEE2E6',
          borderRadius: '8px',
          padding: '24px',
          backgroundColor: '#FFFFFF',
          minWidth: '150px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '14px',
            color: '#6C757D',
            marginBottom: '8px'
          }}>
            등록된 상품
          </div>
          <div style={{
            fontSize: '25px',
            fontWeight: 'bold',
            color: '#212529'
          }}>
            {productCount}개
          </div>
        </div>
      </div>

      {/* 주문 카드들 */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '20px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#6C757D', paddingTop: '40px' }}>
            주문 내역이 없습니다.
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.orderId}
              style={{
                border: '1px solid #DEE2E6',
                borderRadius: '8px',
                padding: '24px',
                backgroundColor: '#FFFFFF'
              }}
            >
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
          ))
        )}
      </div>
    </div>
  );
}