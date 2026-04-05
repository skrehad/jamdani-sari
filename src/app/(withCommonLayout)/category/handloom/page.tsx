import Image from "next/image";
// import { sarees } from "@/data/sarees";
// import SareeCard from "@/components/SareeCard";

const PureHandloomPage = () => {
  // const handloomSarees = sarees.filter(
  //   (s) => s.category === "handloom"
  // );

  return (
    <main className="w-full">
      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative h-[70vh] w-full">
        <Image
          src="/images/handloom-hero.webp"
          alt="Pure Handloom Jamdani"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Pure Handloom Jamdani
            </h1>
            <p className="max-w-2xl mx-auto text-lg">
              Experience the authenticity and heritage of handwoven Jamdani
              sarees.
            </p>
          </div>
        </div>
      </section>

      {/* ================= 2. INTRO SECTION ================= */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Timeless Craftsmanship</h2>
        <p className="text-gray-600 leading-relaxed">
          Our Pure Handloom sarees are made with traditional looms, preserving
          the age-old weaving techniques passed down generations.
        </p>
      </section>

      {/* ================= 3. FEATURE HIGHLIGHTS ================= */}
      <section className="bg-[#FFF5F5] py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="font-semibold text-xl mb-2">Authentic Design</h3>
            <p className="text-gray-600">
              Handwoven motifs preserving Bengali heritage.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">Natural Fabric</h3>
            <p className="text-gray-600">
              Premium cotton for comfort and longevity.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">Ethical Weaving</h3>
            <p className="text-gray-600">
              Support local artisans and traditional craft.
            </p>
          </div>
        </div>
      </section>

      {/* ================= 4. PRODUCT GRID ================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Our Handloom Collection
        </h2>
        {/* <div className="grid md:grid-cols-3 gap-8">
          {handloomSarees.map((s) => (
            <SareeCard key={s.id} saree={s} />
          ))}
        </div> */}
      </section>

      {/* ================= 5. WHY CHOOSE ================= */}
      <section className="bg-[#F8F8F8] py-24 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Why Choose Handloom?</h2>
        <p className="max-w-3xl mx-auto text-gray-600">
          Handloom Jamdani sarees are unique, eco-friendly, and crafted with
          tradition, making every piece special and timeless.
        </p>
      </section>

      {/* ================= 6. TRUST / CRAFT ================= */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Woven with Care</h2>
        <p className="max-w-3xl mx-auto text-gray-600">
          We collaborate directly with skilled weavers to maintain heritage and
          ensure fair compensation for every artisan.
        </p>
      </section>
    </main>
  );
};

export default PureHandloomPage;
