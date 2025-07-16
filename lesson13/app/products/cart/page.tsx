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
};

type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=3')
      .then(res => res.json())
      .then((products: Product[]) => {
        const cartData = products.map(product => ({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: Math.floor(Math.random() * 3) + 1,
          image: product.images[0] || 'https://picsum.photos/100/100'
        }));
        setCartItems(cartData);
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

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold mb-6">Đang tải giỏ hàng...</h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Giỏ hàng</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500 mb-4">Giỏ hàng trống</p>
          <Link href="/products" className="bg-blue-500 text-white px-4 py-2 rounded">
            Tiếp tục mua sắm
          </Link>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {/* Cart Items */}
          <div className="space-y-4 mb-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <Image 
                  src={item.image} 
                  alt={item.title}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-blue-600 font-bold">${item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-gray-200 px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>
                <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold">Tổng cộng:</span>
              <span className="text-2xl font-bold text-blue-600">${totalPrice.toFixed(2)}</span>
            </div>
            <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 font-semibold">
              Thanh toán
            </button>
          </div>
        </div>
      )}
    </div>
  );
}