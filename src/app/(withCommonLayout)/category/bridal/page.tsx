import Image from "next/image";
// import { sarees } from "@/data/sarees";
// import SareeCard from "@/components/SareeCard";

const BridalSareePage = () => {
  // const bridalSarees = sarees.filter(
  //   (s) => s.category === "bridal"
  // );

  return (
    <main className="w-full">
      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative h-[70vh] w-full">
        <Image
          src="/images/bridal-hero.webp"
          alt="Bridal Jamdani Saree"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Bridal Jamdani Sarees
            </h1>
            <p className="max-w-2xl mx-auto text-lg">
              Celebrate your most precious moments with timeless Jamdani
              elegance.
            </p>
          </div>
        </div>
      </section>

      {/* ================= 2. INTRO SECTION ================= */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">
          Crafted for Your Special Day
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Our bridal Jamdani sarees are woven with intricate motifs, luxurious
          textures, and royal aesthetics designed exclusively for weddings and
          grand occasions.
        </p>
      </section>

      {/* ================= 3. FEATURE HIGHLIGHTS ================= */}
      <section className="bg-[#FFF5F5] py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="font-semibold text-xl mb-2">Royal Motifs</h3>
            <p className="text-gray-600">
              Inspired by Mughal and royal Bengali designs.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">Premium Fabric</h3>
            <p className="text-gray-600">
              Finest cotton with rich zari detailing.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">Handwoven Luxury</h3>
            <p className="text-gray-600">
              Crafted by expert artisans over weeks of dedication.
            </p>
          </div>
        </div>
      </section>

      {/* ================= 4. PRODUCT GRID ================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Our Bridal Collection
        </h2>
        {/* <div className="grid md:grid-cols-3 gap-8">
          {bridalSarees.map((s) => (
            <SareeCard key={s.id} saree={s} />
          ))}
        </div> */}
      </section>

      {/* ================= 5. WHY CHOOSE ================= */}
      <section className="bg-[#F8F8F8] py-24 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Why Choose Our Bridal Sarees?
        </h2>
        <p className="max-w-3xl mx-auto text-gray-600">
          Every bridal Jamdani we create is a reflection of heritage, luxury,
          and craftsmanship—making your wedding truly unforgettable.
        </p>
      </section>

      {/* ================= 6. TRUST / CRAFT ================= */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Woven with Trust & Tradition
        </h2>
        <p className="max-w-3xl mx-auto text-gray-600">
          We work directly with local artisans ensuring ethical practices, fair
          wages, and preservation of Jamdani heritage.
        </p>
      </section>
    </main>
  );
};

export default BridalSareePage;
