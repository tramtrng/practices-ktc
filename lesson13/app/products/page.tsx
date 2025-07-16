import Link from 'next/link';
import Image from 'next/image';

type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: {
    id: number;
    name: string;
  };
};

type Category = {
  id: number;
  name: string;
};

async function getProducts(): Promise<Product[]> {
  const res = await fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=20', {
    next: { revalidate: 3600 } // ISG - revalidate every hour
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return res.json();
}

async function getCategories(): Promise<Category[]> {
  const res = await fetch('https://api.escuelajs.co/api/v1/categories', {
    next: { revalidate: 3600 }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  
  return res.json();
}

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ]);

  const getValidImage = (images: string[]) => {
    // Lọc ảnh hợp lệ từ API
    const validImages = images.filter(img => {
      if (!img || typeof img !== 'string') return false;
      
      const invalidPatterns = [
        '[', ']', '"', 'placeholder', 'example', 'lorem', 'via.placeholder',
        'placehold', 'fake', 'dummy', 'test'
      ];
      
      const isInvalid = invalidPatterns.some(pattern => 
        img.toLowerCase().includes(pattern.toLowerCase())
      );
      
      if (isInvalid) return false;
      
      // Kiểm tra URL hợp lệ
      try {
        new URL(img);
        return true;
      } catch {
        return false;
      }
    });
    
    // Chỉ trả về ảnh từ API, không fallback
    return validImages[0] || '/placeholder-image.jpg';
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            Danh sách sản phẩm
            <span className="block text-sm font-normal text-blue-600 mt-2">(Incremental Static Generation)</span>
          </h1>
          
          {/* Categories Filter */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/products"
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              📂 Tất cả ({products.length})
            </Link>
            {categories.slice(0, 6).map(category => {
              const categoryProducts = products.filter(p => p.category.id === category.id);
              return (
                <Link 
                  key={category.id}
                  href={`/products?category=${category.id}`}
                  className="bg-gray-100 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {category.name} ({categoryProducts.length})
                </Link>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <Link href={`/products/${product.id}`}>
                <div className="relative overflow-hidden rounded-t-xl">
                  <Image 
                    src={getValidImage(product.images)}
                    alt={product.title}
                    width={300}
                    height={250}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 rounded-full p-2 hover:bg-white transition-colors">
                    <span className="text-red-500 text-lg">♡</span>
                  </div>
                 
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 h-12">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{product.category.name}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold text-green-600">${product.price}</span>
                      <span className="text-sm text-gray-400 line-through">${(product.price * 1.3).toFixed(0)}</span>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
}