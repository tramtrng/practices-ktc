import type { Metadata } from 'next';
import './globals.css';
import Navigation from './components/nav';

export const metadata: Metadata = {
  title: 'E-Commerce Store',
  description: 'Modern online shopping experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="bg-gray-50">
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}