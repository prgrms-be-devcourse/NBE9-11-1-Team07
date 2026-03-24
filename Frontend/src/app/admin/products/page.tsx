"use client"
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

// 타입정의
type Category = "COFFEE_BEAN_PACKAGE" | "COFFEE_DRINK" | "EQUIPMENT" | "OTHER";

interface Product {
  id: number;
  name: string;
  description: string;
  category: Category;
  price: number;
  imgUrl: string;
}

// imgUrl 대신 imgFile로 변경 (파일 업로드)
interface FormState {
  name: string;
  description: string;
  category: Category;
  price: string;
  imgFile: File | null;
}

// multipart/form-data body 생성 헬퍼
// create: @RequestPart reqBody (JSON) + imgFile (필수)
// update: @RequestPart productDto (JSON) + imgFile (선택)
function buildFormData(partName: string, body: object, imgFile: File | null): FormData {
  const fd = new FormData();
  fd.append(partName, new Blob([JSON.stringify(body)], { type: "application/json" }));
  if (imgFile) fd.append("imgFile", imgFile);
  return fd;
}

// API 
const api = {
  // 전체 상품 목록 조회
  getList: (): Promise<Product[]> =>
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/list`).then((r) => {
      if (!r.ok) throw new Error("상품 목록을 불러오지 못했습니다.");
      return r.json();
    }),

  // 특정 상품 조회
  getOne: (id: number): Promise<Product> =>
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${id}`).then((r) => {
      if (!r.ok) throw new Error("상품 정보를 불러오지 못했습니다.");
      return r.json();
    }),

  // 상품 등록 - @RequestPart reqBody (JSON) + imgFile (필수)
  create: async (reqBody: Omit<Product, "id" | "imgUrl">, imgFile: File | null): Promise<Product> => {
    const r = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/admin`, {
      method: "POST",
      body: buildFormData("reqBody", reqBody, imgFile),
    });
    if (!r.ok) throw new Error("상품 등록에 실패했습니다.");
    const json = await r.json();
    // RsData 래퍼: { resultCode, msg, data: { product, productsCount } }
    return (json?.data?.product ?? json) as Product;
  },

  // 상품 수정 - @RequestPart productDto (JSON) + imgFile (선택, 없으면 기존 이미지 유지)
  update: async (id: number, productDto: Omit<Product, "id" | "imgUrl">, imgFile: File | null): Promise<Product> => {
    const r = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/admin/${id}`, {
      method: "PUT",
      body: buildFormData("productDto", productDto, imgFile),
    });
    if (!r.ok) throw new Error("상품 수정에 실패했습니다.");
    const json = await r.json();
    return (json?.data?.product ?? json?.data ?? json) as Product;
  },

  // 상품 삭제
  delete: (id: number): Promise<void> =>
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/admin/${id}`, { method: "DELETE" }).then((r) => {
      if (!r.ok) throw new Error("상품 삭제에 실패했습니다.");
    }),
};

/* ────────────────────────────────────────────
   Constants
──────────────────────────────────────────── */
const CATEGORIES: Category[] = [
  "COFFEE_BEAN_PACKAGE",
  "COFFEE_DRINK",
  "EQUIPMENT",
  "OTHER",
];

// imgUrl → imgFile로 변경
const EMPTY_FORM: FormState = {
  name: "",
  description: "",
  category: "COFFEE_BEAN_PACKAGE",
  price: "",
  imgFile: null,
};

function formatPrice(price: number | undefined | null): string {
  if (price == null || isNaN(Number(price))) return "-";
  return "\u20A9" + Number(price).toLocaleString("ko-KR");
}

//저장/수정/삭제 완료 후 하단에 잠깐 표시되는 알림
function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-7 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 text-white text-sm px-5 py-2.5 rounded-xl shadow-lg pointer-events-none animate-fade-in-up">
      {message}
    </div>
  );
}

//목록 로딩 중에 실제 카드 자리에 보여주는 회색 플레이스홀더
function SkeletonCard() {
  return (
    <div className="bg-white border border-stone-200 rounded-2xl px-6 py-5 flex items-center gap-5 shadow-sm animate-pulse">
      <div className="flex-1 space-y-2.5">
        <div className="h-4 bg-stone-100 rounded w-1/3" />
        <div className="h-3 bg-stone-100 rounded w-1/2" />
        <div className="h-4 bg-stone-100 rounded w-1/4" />
      </div>
      <div className="flex gap-2">
        <div className="h-9 w-16 bg-stone-100 rounded-lg" />
        <div className="h-9 w-16 bg-red-50 rounded-lg" />
      </div>
    </div>
  );
}

// 제품카드
function ProductCard({
  product,
  onEdit,
  onDelete,
}: {
  product: Product;
  onEdit: (p: Product) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="bg-white border border-stone-200 rounded-2xl px-6 py-5 flex items-center gap-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      {/* 썸네일 */}
      <div className="w-[72px] h-[72px] rounded-xl overflow-hidden shrink-0 bg-stone-100 border border-stone-200">
        {product.imgUrl ? (
          <img
            src={product.imgUrl.startsWith("http") ? product.imgUrl : `${process.env.NEXT_PUBLIC_API_BASE_URL}/${product.imgUrl}`}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-400 text-xs">
            No Image
          </div>
        )}
      </div>
      {/* 상품 정보 */}
      <div className="flex-1 min-w-0">
        <p className="text-[17px] font-semibold text-neutral-900 tracking-tight leading-snug mb-1">
          {product.name}
        </p>
        <p className="text-[12.5px] text-stone-500 font-light mb-2">
          {product.description}
        </p>
        <p className="text-[12.5px] text-stone-500 font-light mb-2">
          {product.category}
        </p>
        <p className="text-[15px] font-bold text-neutral-900 tracking-tight">
          {formatPrice(product.price)}
        </p>
      </div>

      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => onEdit(product)}
          className="border border-stone-300 text-neutral-800 text-[13px] rounded-lg px-[18px] py-2 hover:border-neutral-700 hover:bg-stone-50 transition-all duration-150 font-medium"
        >
          수정
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="border border-red-200 bg-red-50 text-red-600 text-[13px] rounded-lg px-[18px] py-2 hover:bg-red-100 hover:border-red-400 transition-all duration-150 font-semibold"
        >
          삭제
        </button>
      </div>
    </div>
  );
}

//상품 등록 / 수정 공용 모달
function FormModal({
  isEdit,
  form,
  onChange,
  onSave,
  onClose,
  error,
  loading,
}: {
  isEdit: boolean;
  form: FormState;
  onChange: (f: FormState) => void;
  onSave: () => void;
  onClose: () => void;
  error: string;
  loading: boolean;
}) {
  return (
    <div
      className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm flex items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-[460px] max-w-[94vw] p-9 animate-slide-up">
        <h2 className="text-xl font-bold text-neutral-900 tracking-tight mb-6">
          {isEdit ? "상품 수정" : "새 상품 등록"}
        </h2>

        <div className="space-y-4">
          {(
            [
              { label: "상품명",    key: "name",        placeholder: "예: Colombia Andino", type: "text"   },
              { label: "설명",      key: "description", placeholder: "예: 콜롬비아산 원두",  type: "text"   },
              { label: "가격 (원)", key: "price",       placeholder: "5000",               type: "number" },
            ] as const
          ).map(({ label, key, placeholder, type }) => (
            <div key={key}>
              <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-widest mb-1.5">
                {label}
              </label>
              <input
                type={type}
                value={form[key]}
                placeholder={placeholder}
                onChange={(e) => onChange({ ...form, [key]: e.target.value })}
                disabled={loading}
                className="w-full border border-stone-200 rounded-lg px-3.5 py-2.5 text-sm text-neutral-900 bg-stone-50 focus:outline-none focus:border-neutral-800 focus:bg-white transition-colors disabled:opacity-50"
              />
            </div>
          ))}

          {/* 이미지 파일 업로드 */}
          <div>
            <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-widest mb-1.5">
              이미지
            </label>
            <input
              type="file"
              accept="image/*"
              disabled={loading}
              onChange={(e) => onChange({ ...form, imgFile: e.target.files?.[0] ?? null })}
              className="w-full border border-stone-200 rounded-lg px-3.5 py-2.5 text-sm text-neutral-900 bg-stone-50 focus:outline-none focus:border-neutral-800 transition-colors disabled:opacity-50 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-neutral-900 file:text-white hover:file:bg-neutral-700"
            />
            {form.imgFile ? (
              <p className="mt-1.5 text-[11px] text-stone-500">선택된 파일: {form.imgFile.name}</p>
            ) : (
              <p className="mt-1.5 text-[11px] text-stone-400">
                {isEdit ? "파일을 선택하지 않으면 기존 이미지가 유지됩니다." : "이미지를 선택해주세요."}
              </p>
            )}
          </div>

          {/* 카테고리 선택 */}
          <div>
            <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-widest mb-1.5">
              카테고리
            </label>
            <select
              value={form.category}
              onChange={(e) => onChange({ ...form, category: e.target.value as Category })}
              disabled={loading}
              className="w-full border border-stone-200 rounded-lg px-3.5 py-2.5 text-sm text-neutral-900 bg-stone-50 focus:outline-none focus:border-neutral-800 focus:bg-white transition-colors disabled:opacity-50"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 유효성 검사 에러 메시지 */}
        {error && (
          <p className="mt-3 text-[12.5px] text-red-500 font-medium">{error}</p>
        )}

        <div className="flex justify-end gap-2.5 mt-7">
          <button
            onClick={onClose}
            disabled={loading}
            className="border border-stone-200 text-stone-500 text-[13.5px] rounded-lg px-6 py-2.5 hover:border-stone-400 transition-colors disabled:opacity-50"
          >
            취소
          </button>
          <button
            onClick={onSave}
            disabled={loading}
            className="bg-neutral-900 text-white text-[13.5px] font-semibold rounded-lg px-7 py-2.5 hover:bg-neutral-700 hover:-translate-y-0.5 transition-all duration-150 shadow-sm disabled:opacity-60 flex items-center gap-2"
          >
            {loading && (
              <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin inline-block" />
            )}
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

// 삭제 전 한 번 더 확인하는 모달
function DeleteModal({
  onConfirm,
  onClose,
  loading,
}: {
  onConfirm: () => void;
  onClose: () => void;
  loading: boolean;
}) {
  return (
    <div
      className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm flex items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-[360px] max-w-[94vw] p-8 text-center animate-slide-up">
        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
          🗑️
        </div>
        <h2 className="text-lg font-bold text-neutral-900 tracking-tight mb-2">
          상품을 삭제할까요?
        </h2>
        <p className="text-[13.5px] text-stone-500 leading-relaxed mb-6">
          이 작업은 되돌릴 수 없습니다.<br />정말로 삭제하시겠습니까?
        </p>
        <div className="flex justify-center gap-2.5">
          <button
            onClick={onClose}
            disabled={loading}
            className="border border-stone-200 text-stone-500 text-[13.5px] rounded-lg px-6 py-2.5 hover:border-stone-400 transition-colors disabled:opacity-50"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="bg-red-600 text-white text-[13.5px] font-semibold rounded-lg px-7 py-2.5 hover:bg-red-700 transition-colors disabled:opacity-60 flex items-center gap-2"
          >
            {loading && (
              <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin inline-block" />
            )}
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   EmptyState - 상품이 0개일 때 표시
   ErrorState - API 오류 시 에러 메시지 + 다시 시도 버튼
──────────────────────────────────────────── */
function EmptyState() {
  return (
    <div className="text-center py-20 text-stone-400">
      <div className="text-4xl mb-3">☕</div>
      <p className="text-sm font-light">등록된 상품이 없습니다.</p>
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="text-center py-20 text-stone-500">
      <div className="text-4xl mb-3">⚠️</div>
      <p className="text-sm mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="text-[13px] border border-stone-300 rounded-lg px-5 py-2 hover:border-neutral-700 transition-colors"
      >
        다시 시도
      </button>
    </div>
  );
}

//메인
export default function ProductManagement() {
  const router = useRouter();
  const [products, setProducts]             = useState<Product[]>([]);
  const [listLoading, setListLoading]       = useState(true);
  const [listError, setListError]           = useState("");

  const [modal, setModal]                   = useState<"add" | "edit" | "delete" | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingId, setDeletingId]         = useState<number | null>(null);
  const [form, setForm]                     = useState<FormState>(EMPTY_FORM);
  const [formError, setFormError]           = useState("");
  const [actionLoading, setActionLoading]   = useState(false);
  const [toast, setToast]                   = useState<string | null>(null);

  /* ── 목록 조회 ── */
  const fetchList = useCallback(async () => {
    setListLoading(true);
    setListError("");
    try {
      const data = await api.getList();
      setProducts(data);
    } catch (e: any) {
      setListError(e.message ?? "오류가 발생했습니다.");
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => { fetchList(); }, [fetchList]);

  //알림 표시 후 2.2초 뒤 자동으로 사라짐
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setFormError("");
    setModal("add");
  };

  // 수정 모달 열기 - imgFile은 null로 초기화 (선택 안 하면 기존 이미지 유지)
  const openEdit = async (p: Product) => {
    setFormError("");
    try {
      const fresh = await api.getOne(p.id);
      setEditingProduct(fresh);
      setForm({
        name: fresh.name ?? "",
        description: fresh.description ?? "",
        category: fresh.category ?? "COFFEE_BEAN_PACKAGE",
        price: String(fresh.price ?? ""),
        imgFile: null,
      });
    } catch {
      setEditingProduct(p);
      setForm({
        name: p.name ?? "",
        description: p.description ?? "",
        category: p.category ?? "COFFEE_BEAN_PACKAGE",
        price: String(p.price ?? ""),
        imgFile: null,
      });
    }
    setModal("edit");
  };

  const openDelete = (id: number) => {
    setDeletingId(id);
    setModal("delete");
  };

  const closeModal = () => {
    if (actionLoading) return;
    setModal(null);
    setEditingProduct(null);
    setDeletingId(null);
    setFormError("");
  };

  const handleSave = async () => {
    const price = parseInt(form.price);
    if (!form.name.trim())                         { setFormError("상품명을 입력해주세요."); return; }
    if (!form.price || isNaN(price) || price <= 0) { setFormError("올바른 가격을 입력해주세요."); return; }
    // 등록 시 이미지 필수
    if (modal === "add" && !form.imgFile)          { setFormError("이미지를 선택해주세요."); return; }

    const reqBody = {
      name: form.name.trim(),
      description: form.description.trim(),
      category: form.category,
      price,
    };

    setActionLoading(true);
    try {
      if (modal === "edit" && editingProduct) {
        // 수정: productDto + imgFile (선택)
        await api.update(editingProduct.id, reqBody, form.imgFile);
        // imgUrl은 서버에서 관리하므로 목록 전체 재조회
        await fetchList();
        showToast("상품이 수정되었습니다.");
      } else {
        // 등록: reqBody + imgFile (필수)
        await api.create(reqBody, form.imgFile);
        await fetchList();
        showToast("상품이 등록되었습니다.");
      }
      closeModal();
    } catch (e: any) {
      setFormError(e.message ?? "저장 중 오류가 발생했습니다.");
    } finally {
      setActionLoading(false);
    }
  };

  /* ── 삭제 ── */
  const handleDelete = async () => {
    if (deletingId === null) return;
    setActionLoading(true);
    try {
      await api.delete(deletingId);
      setProducts((prev) => prev.filter((p) => p.id !== deletingId));
      closeModal();
      showToast("상품이 삭제되었습니다.");
    } catch (e: any) {
      showToast(e.message ?? "삭제 중 오류가 발생했습니다.");
      closeModal();
    } finally {
      setActionLoading(false);
    }
  };

  /* ── Render ── */
  return (
    <>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translate(-50%, 16px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.22s ease both; }
        .animate-slide-up   { animation: slide-up 0.22s ease both; }
      `}</style>

      <div className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-6 py-12">

          {/* Header */}
          <div className="flex items-start justify-between mb-9">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="flex items-center justify-center w-9 h-9 rounded-xl border border-stone-300 text-neutral-600 hover:border-neutral-700 hover:bg-stone-100 transition-all duration-150"
                aria-label="뒤로가기"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <h1 className="text-3xl font-bold text-neutral-900 tracking-tight leading-tight">
                상품 관리
              </h1>
            </div>
            <button
              onClick={openAdd}
              className="flex items-center gap-1.5 bg-neutral-900 text-white text-[13.5px] font-semibold rounded-xl px-5 py-2.5 hover:bg-neutral-700 hover:-translate-y-0.5 transition-all duration-150 shadow-md whitespace-nowrap"
            >
              <span className="text-base leading-none font-normal">+</span>
              새 상품 등록
            </button>
          </div>

          {/* List */}
          <div className="flex flex-col gap-3.5">
            {listLoading ? (
              Array.from({ length: 4 }, (_, i) => <SkeletonCard key={`skeleton-${i}`} />)
            ) : listError ? (
              <ErrorState message={listError} onRetry={fetchList} />
            ) : products.length === 0 ? (
              <EmptyState />
            ) : (
              products.map((p) => (
                <ProductCard key={p.id} product={p} onEdit={openEdit} onDelete={openDelete} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {(modal === "add" || modal === "edit") && (
        <FormModal
          isEdit={modal === "edit"}
          form={form}
          onChange={setForm}
          onSave={handleSave}
          onClose={closeModal}
          error={formError}
          loading={actionLoading}
        />
      )}
      {modal === "delete" && (
        <DeleteModal onConfirm={handleDelete} onClose={closeModal} loading={actionLoading} />
      )}

      {toast && <Toast message={toast} />}
    </>
  );
}