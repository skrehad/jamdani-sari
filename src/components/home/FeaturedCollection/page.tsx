/* eslint-disable @typescript-eslint/no-explicit-any */
import SareeCard from "@/components/card/SareeCard";
import { getAllProducts } from "@/services/product";

export default async function FeaturedCollection() {
  const res = await getAllProducts();

  const products = res?.data || [];

  // 🔥 sort by price (high to low) + take top 6
  const topProducts = [...products]
    .sort((a, b) => b.price - a.price)
    .slice(0, 6);

  return (
    <section className="py-24 px-6">
      {/* HEADER */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Top Luxury Collection
        </h2>
        <p className="text-gray-500 mt-3">
          Handpicked premium Jamdani sarees for you
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {topProducts.map((saree: any) => (
          <SareeCard key={saree.id} saree={saree} />
        ))}
      </div>
    </section>
  );
}
