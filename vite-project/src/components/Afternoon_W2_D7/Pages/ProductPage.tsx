import { useEffect, useState } from "react";
import FilterSidebar from "../Components/FilterSidebar"; 
import ProductGrid from "../Components/ProductGrid"; 
import Pagination from "../Components/Pagination"; 
// import style from './ProductPage.module.css';

export default function ProductPage() {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 4;
  const offset = (currentPage - 1) * limit;

  useEffect(() => {
    if (categoryId === null) return;
    fetch(
      `https://api.escuelajs.co/api/v1/categories/${categoryId}/products?offset=${offset}&limit=${limit}`
    )
      .then((res) => res.json())
      .then(setProducts);
  }, [categoryId, currentPage]);

  return (
    <div className="flex">
      <FilterSidebar
        selected={categoryId}
        onSelect={(id) => {
          setCurrentPage(1);
          setCategoryId(id);
        }}
      />
      <div className="flex-1">
        <strong className="font-bold mb-2 block" style={{ marginTop: 24 }}>
          Products
        </strong>
        <ProductGrid products={products} />
        <Pagination current={currentPage} total={3} onChange={setCurrentPage} />
      </div>
    </div>
  );
}