export default function ArtisanStory() {
  return (
    <section className="relative bg-linear-to-b from-[#FFF5F5] to-[#F8F8F8] py-36 px-6 text-center overflow-hidden">
      {/* Decorative circles for premium look */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#FF3C48]/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-16 -right-10 w-48 h-48 bg-[#FF3C48]/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[#FF3C48]">
          Our Artisans
        </h2>

        <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
          Every Jamdani saree is woven by skilled artisans carrying
          centuries-old traditions. Each piece tells a story of dedication,
          craftsmanship, and timeless heritage, handcrafted with love for
          generations.
        </p>
      </div>
    </section>
  );
}
