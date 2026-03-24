'use client';

import { useEffect, useState } from 'react';
import StatCard from '@/components/admin/StatCard';
import OrderCard from '@/components/admin/OrderCard';

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
        <StatCard title="오늘 주문" value={todayOrders} unit="건" />
        <StatCard title="배송 대기중" value={pendingOrders} unit="건" />
        <StatCard title="등록된 상품" value={productCount} unit="개" />
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
            <OrderCard key={order.orderId} order={order} />
          ))
        )}
      </div>
    </div>
  );
}