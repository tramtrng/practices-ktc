import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <nav className="mt-4 flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/products">Products</Link>
        <Link href="/login">Login</Link>
      </nav>
    </div>
  );
}