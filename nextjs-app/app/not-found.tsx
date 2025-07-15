import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
      <p className="mb-4 text-lg text-gray-700">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className="text-blue-600 underline font-semibold">
        Go back Home
      </Link>
    </div>
  );
}