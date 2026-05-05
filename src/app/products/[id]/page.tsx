import { allProducts } from "@/data/products";
import ProductClient from "./ProductClient";

export function generateStaticParams() {
  return allProducts.map((product) => ({
    id: product.id.toString(),
  }));
}

export default function ProductDetailPage() {
  return <ProductClient />;
}
