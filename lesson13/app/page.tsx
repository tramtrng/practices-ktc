import Link from "next/link";
import Image from "next/image";

type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: {
    name: string;
  };
};

async function getFeaturedProducts(): Promise<Product[]> {
  const res = await fetch(
    "https://api.escuelajs.co/api/v1/products?offset=0&limit=6",
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function HomePage() {
  const products = await getFeaturedProducts();

  const getValidImage = (images: string[]) => {
    // Lọc ảnh hợp lệ từ API
    const validImages = images.filter((img) => {
      if (!img || typeof img !== "string") return false;

      const invalidPatterns = [
        "[",
        "]",
        '"',
        "placeholder",
        "example",
        "lorem",
        "via.placeholder",
        "placehold",
        "fake",
        "dummy",
        "test",
      ];

      const isInvalid = invalidPatterns.some((pattern) =>
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
    return validImages[0] || "/placeholder-image.jpg";
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="container mx-auto mt-10 mb-2 h-64 bg-contain bg-center bg-no-repeat rounded-xl"
        style={{
          backgroundImage:
            "url('https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/b6/dd/b6dd779ce5e8a918cc4f557fce984b16.png')",
        }}
      ></section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-left font-bold text-gray-800 mb-4">
              Sản phẩm nổi bật
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden rounded-t-xl">
                  <Image
                    src={getValidImage(product.images)}
                    alt={product.title}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Hot 🔥
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 h-14">
                    {product.title}
                  </h3>
                  <p className="text-gray-500 mb-4 text-sm">
                    📂 {product.category.name}
                  </p>

                  <div className="flex justify-between items-center mb-4">
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold text-green-600">
                        ${product.price}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        ${(product.price * 1.3).toFixed(0)}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-green-600 font-medium">
                        Tiết kiệm ${(product.price * 0.3).toFixed(0)}
                      </div>
                      <div className="text-xs text-gray-500">(23% off)</div>
                    </div>
                  </div>

                  <Link
                    href={`/products/${product.id}`}
                    className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium text-center hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transition-all transform hover:scale-105"
            >
              Xem tất cả sản phẩm
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
