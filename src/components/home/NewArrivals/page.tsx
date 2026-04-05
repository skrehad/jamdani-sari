/* eslint-disable @typescript-eslint/no-explicit-any */
import SareeCard from "@/components/card/SareeCard";
import { getAllProducts } from "@/services/product";

export default async function NewArrivals() {
  const res = await getAllProducts();
  const products = res?.data || [];

  // 🔥 newest first (createdAt descending)
  const latestProducts = [...products]
    .sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 6);

  return (
    <section className="py-24 px-6">
      {/* HEADER */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">New Arrivals</h2>
        <p className="text-gray-500 mt-2">Freshly launched premium sarees</p>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {latestProducts.map((saree: any) => (
          <SareeCard key={saree.id} saree={saree} />
        ))}
      </div>
    </section>
  );
}
