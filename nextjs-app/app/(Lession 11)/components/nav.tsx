import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex gap-4 p-4 bg-blue-50 rounded mb-6">
      <Link href="/">Home</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/products">Products</Link>
      <Link href="/login">Login</Link>
    </nav>
  );
}