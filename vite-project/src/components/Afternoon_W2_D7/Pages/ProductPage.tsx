
import { useEffect, useState } from "react";
import FilterSidebar from "../Components/FilterSidebar"; 
import ProductGrid from "../Components/ProductGrid"; 
import Pagination from "../Components/Pagination"; 

export default function ProductPage() {
  const [categoryId, setCategoryId] = useState<number | null>(null); // Thay đổi về null để match với FilterSidebar
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  const limit = 4;
  const offset = (currentPage - 1) * limit;

  useEffect(() => {
    if (categoryId === null) return; // Thêm lại điều kiện này
    
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
        
        const res = await fetch(
          `https://api.escuelajs.co/api/v1/categories/${categoryId}/products?offset=${offset}&limit=${limit}`
        );
        
        if (!res.ok) throw new Error("Không thể tải sản phẩm");
        
        const data = await res.json();
        setProducts(data);
        
        // Tính tổng số trang (giả sử có khoảng 20 sản phẩm mỗi category)
        setTotalPages(Math.ceil(20 / limit));
        
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Đã xảy ra lỗi");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, currentPage, offset]);

  return (
    <div className="flex">
      <FilterSidebar
        selected={categoryId}
        onSelect={(id: number | null) => {
          if (id !== null) {
            setCurrentPage(1);
            setCategoryId(id);
          }
        }}
      />
      <div className="flex-1">
        <strong className="font-bold mb-2 block" style={{ marginTop: 24 }}>
          Products
        </strong>
        
        {loading && (
          <div className="text-center py-8">
            <p>Đang tải sản phẩm...</p>
          </div>
        )}
        
        {error && (
          <div className="text-center py-8 text-red-500">
            <p>Lỗi: {error}</p>
          </div>
        )}
        
        {categoryId === null && !loading && (
          <div className="text-center py-8 text-gray-500">
            <p>Vui lòng chọn một danh mục để xem sản phẩm</p>
          </div>
        )}
        
        {!loading && !error && categoryId !== null && (
          <>
            <ProductGrid products={products} />
            <Pagination 
              current={currentPage} 
              total={totalPages} 
              onChange={setCurrentPage} 
            />
          </>
        )}
      </div>
    </div>
  );
}