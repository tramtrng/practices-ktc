import Link from "next/link";

export default function Nav() {
  return (
    <header className="w-full bg-blue-50 shadow mb-6">
      <nav className="container ml-auto px-10 py-6 flex items-center justify-end">
        <ul className="flex gap-6 text-black">
          <Link href="/" className=" font-semibold hover:underline">
              Home
            </Link>
          <li>
            <Link href="/task-crs" className="font-semibold hover:underline">
              Task CSR
            </Link>
          </li>
          <li>
            <Link href="/task-isr" className="font-semibold hover:underline">
              Task ISR
            </Link>
          </li>
          <li>
            <Link href="/task-ssg" className="font-semibold hover:underline">
              Task SSG
            </Link>
          </li>
          <li>
            <Link href="/task-ssr" className="font-semibold hover:underline">
              Task SSR
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}