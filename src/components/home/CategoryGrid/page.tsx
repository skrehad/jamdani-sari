import Link from "next/link";

const categories = [
  {
    id: 1,
    name: "Half Silk",
    slug: "HALF_SILK",
    description: "Elegant semi-silk traditional collection",
    accent: "from-pink-500 to-rose-400",
  },
  {
    id: 2,
    name: "Pure Cotton",
    slug: "PURE_COTTON",
    description: "Soft breathable everyday comfort wear",
    accent: "from-blue-500 to-indigo-400",
  },
];

export default function CategoryGrid() {
  return (
    <section className="pt-24 pb-6 px-6 ">
      {/* HEADER */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Explore Categories
        </h2>
        <p className="text-gray-500 mt-3">Choose your perfect fabric style</p>
      </div>

      {/* GRID */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {categories.map((cat) => (
          <Link key={cat.id} href={`/shop`}>
            <div className="group relative p-10 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              {/* gradient top line */}
              <div
                className={`h-1 w-16 rounded-full bg-gradient-to-r ${cat.accent} mb-6 group-hover:w-24 transition-all duration-300`}
              />

              {/* title */}
              <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-black transition">
                {cat.name}
              </h3>

              {/* description */}
              <p className="text-gray-500 mt-3 text-sm leading-relaxed">
                {cat.description}
              </p>

              {/* bottom CTA */}
              <div className="mt-6 text-sm font-medium text-gray-700 group-hover:text-black transition">
                Explore Collection →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
