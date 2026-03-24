export function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
    if (options?.body) {
        const headers = new Headers(options.headers || {});
        headers.set("Content-Type", "application/json");
        options.headers = headers;
    }

    // 환경변수 대신 직접 주소 입력
    return fetch(`http://localhost:8080${url}`, options).then(
        async (res) => {
            if (!res.ok) {
                const rsData = await res.json();
                throw new Error(rsData.msg || "요청 실패");
            }
            return res.json();
        }
    )
}

export const createOrderApi = async (orderData: any) => {
        return fetchApi("/api/orders", {
            method: "POST",
            body: JSON.stringify(orderData),
        });
    };