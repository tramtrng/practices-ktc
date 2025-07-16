import Link from 'next/link';

export default function Nav() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      
      <nav className="container mx-auto px-4 py-4">
        
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            ShopStore
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Trang chủ
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600 transition-colors">
              Sản phẩm
            </Link>
            <Link href="/cart" className="px-2 py-2 -ml-2 rounded-lg hover:bg-blue-700 transition-colors">
              🛒
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}