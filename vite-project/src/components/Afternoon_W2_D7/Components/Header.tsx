import { Link } from "react-router";

export default function Header() {
  return (
    <header className="w-full bg-yellow-500 px-8 py-3 flex justify-between items-center text-white font-lato shadow-md">
      {/* Logo bên trái */}
      <div className="text-3xl font-extrabold tracking-tight">Magazines</div>

      {/* Menu bên phải */}
      <nav className="flex items-center gap-6 text-sm font-semibold">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/blog" className="hover:underline">Blog <span className="ml-1">▾</span></Link>
        <Link to="/category" className="hover:underline">Category</Link>
        <Link to="/product" className="hover:underline">Product</Link>
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/customer" className="hover:underline">Customer</Link>

        {/* Icon giỏ hàng */}
        <div className="relative">
          <span className="bg-white text-black px-3 py-1">🛒0</span>
        </div>
      </nav>
    </header>
  );
}
