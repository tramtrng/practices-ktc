import Image from 'next/image';
import Link from 'next/link';

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    name: string;
  };
  images: string[];
};

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
    next: { revalidate: 3600 }
  });
  
  if (!res.ok) {
    throw new Error('Product not found');
  }
  
  return res.json();
}

export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const product = await getProduct(id);

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
    
    // Trả về ảnh đầu tiên hợp lệ từ API
    return validImages[0] || '/placeholder-image.jpg';
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
            <h1 className="text-3xl font-bold text-center">
              Chi tiết sản phẩm
            </h1>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Image - CHỈ 1 ẢNH */}
              <div>
                <div className="relative">
                  <Image 
                    src={getValidImage(product.images)}
                    alt={product.title}
                    width={600}
                    height={400}
                    className="w-full h-96 object-cover rounded-xl shadow-lg"
                  />
                 
                </div>
              </div>

              {/* Product Info */}
              <div>
                <div className="mb-6">
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {product.category.name}
                  </span>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    {product.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {product.description}
                  </p>
                </div>

                {/* Price */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl font-bold text-green-600">${product.price}</span>
                    <span className="text-xl text-gray-400 line-through">${(product.price * 1.4).toFixed(0)}</span>
                  </div>
                  <div className="text-sm text-green-600 font-medium">
                    ✅ Tiết kiệm ${((product.price * 1.4) - product.price).toFixed(0)} (29% off)
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105">
                    🛒 Thêm vào giỏ hàng
                  </button>
                  
                  <Link 
                    href="/products/cart"
                    className="block w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-8 rounded-xl font-bold text-lg text-center hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105"
                  >
                    ⚡ Mua ngay
                  </Link>
                </div>

                {/* Features */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">🚚</span>
                    <span className="text-sm">Miễn phí vận chuyển</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">↩️</span>
                    <span className="text-sm">Đổi trả 30 ngày</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">🛡️</span>
                    <span className="text-sm">Bảo hành chính hãng</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">💳</span>
                    <span className="text-sm">Thanh toán an toàn</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center mt-8">
          <Link 
            href="/products" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Quay lại danh sách sản phẩm
          </Link>
        </div>
      </div>
    </div>
  );
}