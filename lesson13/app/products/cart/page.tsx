'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
};

type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: {
    name: string;
  };
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=5')
      .then(res => res.json())
      .then((products: Product[]) => {
        const cartData = products.map(product => ({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: Math.floor(Math.random() * 3) + 1,
          image: getValidImage(product.images),
          category: product.category.name
        }));
        setCartItems(cartData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching cart data:', error);
        setLoading(false);
      });
  }, []);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(items => items.filter(item => item.id !== id));
    } else {
      setCartItems(items => 
        items.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-800">Đang tải giỏ hàng...</h1>
          <p className="text-gray-600 mt-2">Client-side Rendering</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
            🛒 Giỏ hàng của bạn
          </h1>
          <div className="text-center">
            <span className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">
              Client-side Rendering 
            </span>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-6">🛒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Giỏ hàng trống</h2>
            <p className="text-gray-600 mb-8">Hãy thêm một số sản phẩm để bắt đầu mua sắm!</p>
            <Link 
              href="/products" 
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transition-all transform hover:scale-105"
            >
              🛍️ Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  📦 Sản phẩm trong giỏ ({totalItems} sản phẩm)
                </h2>
                
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="relative">
                        <Image 
                          src={item.image} 
                          alt={item.title}
                          width={80}
                          height={80}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                          {item.quantity}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 mb-1 line-clamp-2">{item.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">📂 {item.category}</p>
                        <p className="text-lg font-bold text-green-600">${item.price}</p>
                      </div>
                      
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="bg-white hover:bg-gray-50 text-gray-600 w-8 h-8 rounded-lg flex items-center justify-center font-bold transition-colors"
                          >
                            -
                          </button>
                          <span className="mx-2 font-bold text-gray-800 min-w-[20px] text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="bg-white hover:bg-gray-50 text-gray-600 w-8 h-8 rounded-lg flex items-center justify-center font-bold transition-colors"
                          >
                            +
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          🗑️ Xóa
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-xl font-bold text-blue-600">${(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-sm text-gray-500">
                          Tiết kiệm ${((item.price * item.quantity) * 0.1).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6">💰 Tóm tắt đơn hàng</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính:</span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí vận chuyển:</span>
                    <span className="font-medium text-green-600">Miễn phí</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Giảm giá:</span>
                    <span className="font-medium text-red-600">-${(totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-800">Tổng cộng:</span>
                    <span className="text-2xl font-bold text-blue-600">${(totalPrice * 0.9).toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105">
                    Thanh toán ngay
                  </button>
                  
                  <Link 
                    href="/products"
                    className="block w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium text-center hover:bg-gray-200 transition-colors"
                  >
                    ← Tiếp tục mua sắm
                  </Link>
                </div>

                {/* Features */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span>🚚</span>
                      <span>Miễn phí vận chuyển</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>↩️</span>
                      <span>Đổi trả trong 30 ngày</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🛡️</span>
                      <span>Bảo hành chính hãng</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>💳</span>
                      <span>Thanh toán an toàn</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        
      </div>
    </div>
  );
}