import Link from "next/link";
import "../styles/globals.css";

import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <nav className="flex gap-4 p-4 bg-blue-50 rounded mb-6">
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/products">Products</Link>
        <Link href="/login">Login</Link>
      </nav>
      <Component {...pageProps} />
    </>
  );
}