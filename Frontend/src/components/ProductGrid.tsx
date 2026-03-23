import { Product } from "@/type/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  getQuantity: (productId: number) => number;
  onUpdateCart: (productId: number, quantity: number) => void;
}

export default function ProductGrid({ products, getQuantity, onUpdateCart }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          quantity={getQuantity(product.id)}
          onUpdateCart={onUpdateCart}
        />
      ))}
    </div>
  );
}
