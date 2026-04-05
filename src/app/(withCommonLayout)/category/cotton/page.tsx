import Image from "next/image";
// import { sarees } from "@/data/sarees";
// import SareeCard from "@/components/SareeCard";

const CottonSareePage = () => {
  // const cottonSarees = sarees.filter((s) => s.category === "cotton");

  return (
    <main className="w-full">
      {/* ================= 1. HERO ================= */}
      <section className="relative h-[70vh] w-full">
        <Image
          src="/images/cotton-hero.webp"
          alt="Cotton Jamdani"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Cotton Jamdani Sarees
            </h1>
            <p className="max-w-2xl mx-auto text-lg">
              Soft, breathable, and perfect for daily elegance.
            </p>
          </div>
        </div>
      </section>

      {/* ================= 2. INTRO ================= */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Comfort & Simplicity</h2>
        <p className="text-gray-600 leading-relaxed">
          Our cotton Jamdani sarees are ideal for casual wear, office, or
          festive events, keeping you comfortable all day.
        </p>
      </section>

      {/* ================= 3. FEATURE ================= */}
      <section className="bg-[#FFF5F5] py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="font-semibold text-xl mb-2">Light & Airy</h3>
            <p className="text-gray-600">Perfect for hot and humid weather.</p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">Elegant Patterns</h3>
            <p className="text-gray-600">
              Traditional motifs with modern touch.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">Everyday Luxury</h3>
            <p className="text-gray-600">
              Comfortable, stylish, and affordable.
            </p>
          </div>
        </div>
      </section>

      {/* ================= 4. PRODUCT GRID ================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Our Cotton Collection
        </h2>
        {/* <div className="grid md:grid-cols-3 gap-8">
          {cottonSarees.map((s) => (
            <SareeCard key={s.id} saree={s} />
          ))}
        </div> */}
      </section>

      {/* ================= 5. WHY CHOOSE ================= */}
      <section className="bg-[#F8F8F8] py-24 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Why Cotton Jamdani?</h2>
        <p className="max-w-3xl mx-auto text-gray-600">
          Breathable, light, and versatile—perfect for anyone who values comfort
          and elegance.
        </p>
      </section>

      {/* ================= 6. TRUST / CRAFT ================= */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Crafted by Experts</h2>
        <p className="max-w-3xl mx-auto text-gray-600">
          Preserving traditional techniques while offering everyday comfort for
          modern users.
        </p>
      </section>
    </main>
  );
};

export default CottonSareePage;
