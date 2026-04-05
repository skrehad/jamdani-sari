import Image from "next/image";
// import { sarees } from "@/data/sarees";
// import SareeCard from "@/components/SareeCard";

const SemiSilkPage = () => {
  // const semiSilkSarees = sarees.filter(
  //   (s) => s.category === "semisilk"
  // );

  return (
    <main className="w-full">
      {/* ================= 1. HERO ================= */}
      <section className="relative h-[70vh] w-full">
        <Image
          src="/images/semisilk-hero.webp"
          alt="Semi Silk Jamdani"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Semi Silk Jamdani Sarees
            </h1>
            <p className="max-w-2xl mx-auto text-lg">
              The perfect blend of tradition and comfort.
            </p>
          </div>
        </div>
      </section>

      {/* ================= 2. INTRO ================= */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Elegant & Comfortable</h2>
        <p className="text-gray-600 leading-relaxed">
          Our Semi Silk sarees are lightweight yet luxurious, ideal for both
          daily wear and festive occasions.
        </p>
      </section>

      {/* ================= 3. FEATURE ================= */}
      <section className="bg-[#FFF5F5] py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="font-semibold text-xl mb-2">Modern Designs</h3>
            <p className="text-gray-600">
              Fusion of traditional and contemporary motifs.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">Lightweight Silk</h3>
            <p className="text-gray-600">Perfect for comfortable draping.</p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">Affordable Luxury</h3>
            <p className="text-gray-600">Premium look without heavy pricing.</p>
          </div>
        </div>
      </section>

      {/* ================= 4. PRODUCT GRID ================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Our Semi Silk Collection
        </h2>
        {/* <div className="grid md:grid-cols-3 gap-8">
          {semiSilkSarees.map((s) => (
            <SareeCard key={s.id} saree={s} />
          ))}
        </div> */}
      </section>

      {/* ================= 5. WHY CHOOSE ================= */}
      <section className="bg-[#F8F8F8] py-24 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Why Semi Silk?</h2>
        <p className="max-w-3xl mx-auto text-gray-600">
          Elegant, lightweight, and easy to drape—ideal for modern lifestyle
          while preserving Jamdani heritage.
        </p>
      </section>

      {/* ================= 6. TRUST / CRAFT ================= */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Expertly Woven</h2>
        <p className="max-w-3xl mx-auto text-gray-600">
          Woven by experienced artisans using high-quality threads for lasting
          beauty.
        </p>
      </section>
    </main>
  );
};

export default SemiSilkPage;
