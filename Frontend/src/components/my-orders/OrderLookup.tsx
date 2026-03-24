"use client";

import { useState } from "react";
import { fetchApi } from "@/lib/client";
import Link from "next/link";

// ─── 타입 정의 ───────────────────────────────────────────
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
    shippingStartDate: string;
    orderItems: OrderItem[];
    totalOrderPrice: number;
}

interface ApiResponse {
    msg: string;
    resultCode: string;
    data: Order[];
}

// ─── 상태 한글 변환 & 스타일 ──────────────────────────────
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

// ─── 배송 메시지 계산 함수 ────────────────────────────────
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

function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

function formatPrice(n: number) {
    return n.toLocaleString("ko-KR") + "원";
}

// ─── 메인 컴포넌트 ───────────────────────────────────────
export default function OrderLookup() {
    const [email, setEmail] = useState("");
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        const trimmed = email.trim();
        if (!trimmed) {
            setError("이메일 주소를 입력해주세요.");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
            setError("올바른 이메일 형식을 입력해주세요.");
            return;
        }

        setError("");
        setLoading(true);
        setSearched(false);

        try {
            const json = await fetchApi<ApiResponse>(
                `/api/orders/search?email=${encodeURIComponent(trimmed)}`
            );
            setOrders(json.data ?? []);
            setSearched(true);
        } catch (e) {
            console.error(e);
            setError("주문 조회 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSearch();
    };

    return (
        <div style={styles.wrap}>
            {/* 헤더 */}
            <header style={styles.header}>
                <div style={styles.logoWrap}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20" height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                        <line x1="6" x2="6" y1="2" y2="4" />
                        <line x1="10" x2="10" y1="2" y2="4" />
                        <line x1="14" x2="14" y1="2" y2="4" />
                    </svg>
                    <div>
                        <div style={styles.logoTitle}>Grids &amp; Circles</div>
                        <div style={styles.logoSub}>Premium Coffee Beans</div>
                    </div>
                </div>
                <Link href="/" style={styles.backLink}>메인으로 돌아가기</Link>
            </header>

            {/* 본문 */}
            <div style={styles.page}>
                <h1 style={styles.heading}>내 주문 조회</h1>

                <div style={styles.searchBar}>
                    <input
                        type="email"
                        placeholder="이메일 주소 입력"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={handleKeyDown}
                        style={styles.input}
                    />
                    <button onClick={handleSearch} disabled={loading} style={styles.button}>
                        {loading ? "조회 중..." : "조회"}
                    </button>
                </div>

                {error && <p style={styles.error}>{error}</p>}

                <div style={styles.resultArea}>
                    {loading && (
                        <div style={styles.stateBox}>
                            <div style={styles.spinner} />
                            <p style={styles.stateText}>주문 내역을 불러오는 중입니다...</p>
                        </div>
                    )}

                    {!loading && searched && orders.length === 0 && (
                        <div style={styles.stateBox}>
                            <p style={{ fontSize: 40, margin: 0 }}>📭</p>
                            <p style={styles.stateText}>해당 이메일로 조회된 주문이 없습니다.</p>
                        </div>
                    )}

                    {!loading &&
                        orders.map((order) => {
                            const st = getStatus(order.orderStatus);
                            const deliveryMessage = getDeliveryMessage(
                                order.orderStatus,
                                order.createDate,
                                order.shippingStartDate
                            );
                            return (
                                <div key={order.orderId} style={styles.card}>
                                    <div style={styles.cardHeader}>
                                        <div>
                                            <span style={styles.orderIdLabel}>주문번호</span>
                                            <span style={styles.orderId}>{order.orderId}</span>
                                            <span style={styles.orderDate}>{formatDate(order.createDate)}</span>
                                        </div>
                                        <span
                                            style={{
                                                ...styles.statusBadge,
                                                color: st.color,
                                                backgroundColor: st.bg,
                                                border: `1px solid ${st.color}33`,
                                            }}
                                        >
                                            {deliveryMessage}
                                        </span>
                                    </div>

                                    <div style={styles.divider} />

                                    <div style={styles.itemList}>
                                        {order.orderItems.map((item) => (
                                            <div key={item.id} style={styles.itemRow}>
                                                <div style={styles.itemInfo}>
                                                    <span style={styles.itemCategory}>{item.category}</span>
                                                    <span style={styles.itemName}>
                                                        {item.productName}{" "}
                                                        <span style={styles.itemQty}>× {item.quantity}</span>
                                                    </span>
                                                </div>
                                                <span style={styles.itemPrice}>{formatPrice(item.totalPrice)}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div style={styles.divider} />

                                    <div style={styles.summaryGrid}>
                                        <div style={styles.summaryRow}>
                                            <span style={styles.summaryLabel}>배송지</span>
                                            <span style={styles.summaryValue}>
                                                ({order.postcode}) {order.address}
                                            </span>
                                        </div>
                                        {order.shippingStartDate && (
                                            <div style={styles.summaryRow}>
                                                <span style={styles.summaryLabel}>발송 예정일</span>
                                                <span style={styles.summaryValue}>{order.shippingStartDate}</span>
                                            </div>
                                        )}
                                        <div style={{ ...styles.summaryRow, marginTop: 4 }}>
                                            <span style={styles.summaryLabel}>결제 금액</span>
                                            <span style={styles.totalPrice}>{formatPrice(order.totalOrderPrice)}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>

            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

// ─── 인라인 스타일 ────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
    wrap: {
        minHeight: "100vh",
        backgroundColor: "#fff",
        fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif",
        color: "#111",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 32px",
        borderBottom: "1px solid #e5e7eb",
    },
    logoWrap: {
        display: "flex",
        alignItems: "center",
        gap: 8,
    },
    logoTitle: {
        fontSize: 14,
        fontWeight: 700,
        color: "#111",
        lineHeight: 1.3,
    },
    logoSub: {
        fontSize: 11,
        color: "#9ca3af",
    },
    backLink: {
        fontSize: 13,
        color: "#374151",
        textDecoration: "none",
    },
    page: {
        maxWidth: 720,
        margin: "0 auto",
        padding: "40px 24px 80px",
    },
    heading: {
        fontSize: 26,
        fontWeight: 700,
        marginBottom: 28,
        letterSpacing: "-0.3px",
    },
    searchBar: {
        display: "flex",
        gap: 8,
        marginBottom: 8,
    },
    input: {
        flex: 1,
        height: 44,
        border: "1.5px solid #d1d5db",
        borderRadius: 8,
        padding: "0 14px",
        fontSize: 14,
        outline: "none",
        color: "#111",
        backgroundColor: "#fff",
    },
    button: {
        height: 44,
        padding: "0 22px",
        backgroundColor: "#111",
        color: "#fff",
        border: "none",
        borderRadius: 8,
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
        whiteSpace: "nowrap",
    },
    error: {
        fontSize: 13,
        color: "#dc2626",
        marginTop: 4,
        marginBottom: 0,
    },
    resultArea: {
        marginTop: 28,
        display: "flex",
        flexDirection: "column",
        gap: 16,
    },
    stateBox: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: "60px 0",
        color: "#9ca3af",
    },
    stateText: {
        fontSize: 14,
        margin: 0,
    },
    spinner: {
        width: 32,
        height: 32,
        border: "3px solid #e5e7eb",
        borderTop: "3px solid #111",
        borderRadius: "50%",
        animation: "spin .8s linear infinite",
    },
    card: {
        border: "1.5px solid #e5e7eb",
        borderRadius: 12,
        padding: "20px 24px",
        backgroundColor: "#fff",
    },
    cardHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 8,
    },
    orderIdLabel: {
        fontSize: 13,
        color: "#6b7280",
        marginRight: 6,
    },
    orderId: {
        fontSize: 15,
        fontWeight: 700,
        marginRight: 10,
    },
    orderDate: {
        fontSize: 13,
        color: "#9ca3af",
    },
    statusBadge: {
        fontSize: 12,
        fontWeight: 600,
        padding: "4px 10px",
        borderRadius: 20,
    },
    divider: {
        height: 1,
        backgroundColor: "#f3f4f6",
        margin: "16px 0",
    },
    itemList: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
    },
    itemRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 12,
    },
    itemInfo: {
        display: "flex",
        flexDirection: "column",
        gap: 2,
    },
    itemCategory: {
        fontSize: 11,
        color: "#9ca3af",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
    },
    itemName: {
        fontSize: 14,
        fontWeight: 500,
        color: "#1f2937",
    },
    itemQty: {
        fontSize: 13,
        color: "#6b7280",
        fontWeight: 400,
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: 600,
        color: "#111",
        whiteSpace: "nowrap",
    },
    summaryGrid: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
    },
    summaryRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 12,
    },
    summaryLabel: {
        fontSize: 13,
        color: "#6b7280",
        minWidth: 72,
    },
    summaryValue: {
        fontSize: 13,
        color: "#374151",
        textAlign: "right",
    },
    totalPrice: {
        fontSize: 16,
        fontWeight: 700,
        color: "#111",
    },
};