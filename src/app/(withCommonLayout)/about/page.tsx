import Image from "next/image";

import HeroImg from "../../../assests/about.png";
import WeavingImg from "../../../assests/about.png";
import ArtisanImg from "../../../assests/about.png";
import MissionImg from "../../../assests/about.png";
import QualityImg from "../../../assests/about.png";
import PromiseImg from "../../../assests/about.png";

const AboutPage = () => {
  return (
    <main className="w-full bg-white">
      {/* ========= SECTION 1 : HERO ========= */}
      <section className="w-full bg-[#FDF2F2] py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div>
            <h1 className="text-3xl  font-bold text-gray-900 mb-6">
              Our Heritage, Your Elegance
            </h1>
            <p className="text-gray-600 text-xl leading-relaxed">
              Jamdani is not just a sari — it is a legacy of artistry, patience,
              and timeless beauty woven by hand.
            </p>
          </div>
          <Image
            src={HeroImg}
            alt="Jamdani Heritage"
            className="rounded-3xl shadow-xl"
          />
        </div>
      </section>

      {/* ========= SECTION 2 : HISTORY ========= */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <Image
            src={WeavingImg}
            alt="Jamdani Weaving"
            className="rounded-3xl shadow-lg"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The History of Jamdani
            </h2>
            <p className="text-gray-600 text-xl leading-relaxed mb-4">
              Jamdani weaving dates back over a thousand years and was once
              treasured by royalty across Bengal and the Mughal Empire.
            </p>
            <p className="text-gray-600 text-xl leading-relaxed">
              Every motif is manually inserted into the loom, making each sari a
              masterpiece of patience and precision.
            </p>
          </div>
        </div>
      </section>

      {/* ========= SECTION 3 : ARTISANS ========= */}
      <section className="bg-[#FDF2F2] py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Skilled Artisans
            </h2>
            <p className="text-gray-600 text-xl leading-relaxed mb-4">
              Behind every Jamdani sari is an artisan who dedicates weeks,
              sometimes months, to crafting a single piece.
            </p>
            <p className="text-gray-600 text-xl leading-relaxed">
              We partner directly with weavers to ensure ethical practices, fair
              wages, and preservation of traditional craftsmanship.
            </p>
          </div>
          <Image
            src={ArtisanImg}
            alt="Jamdani Artisan"
            className="rounded-3xl shadow-xl"
          />
        </div>
      </section>

      {/* ========= SECTION 4 : MISSION ========= */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <Image
            src={MissionImg}
            alt="Our Mission"
            className="rounded-3xl shadow-lg"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-gray-600 text-xl leading-relaxed mb-4">
              Our mission is to bring authentic Jamdani saris to the modern
              world while uplifting the artisan communities behind them.
            </p>
            <p className="text-gray-600 text-xl leading-relaxed">
              We envision a future where handcrafted textiles are celebrated and
              passed on through generations.
            </p>
          </div>
        </div>
      </section>

      {/* ========= SECTION 5 : QUALITY ========= */}
      <section className="bg-[#FDF2F2] py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Uncompromised Quality
            </h2>
            <p className="text-gray-600 text-xl leading-relaxed mb-4">
              We use premium cotton, natural dyes, and traditional looms to
              ensure every Jamdani sari meets the highest quality standards.
            </p>
            <p className="text-gray-600 text-xl leading-relaxed">
              Each piece undergoes careful inspection to preserve its elegance,
              durability, and authenticity.
            </p>
          </div>
          <Image
            src={QualityImg}
            alt="Jamdani Quality"
            className="rounded-3xl shadow-xl"
          />
        </div>
      </section>

      {/* ========= SECTION 6 : BRAND PROMISE ========= */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <Image
            src={PromiseImg}
            alt="Our Promise"
            className="rounded-3xl shadow-lg"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Promise to You
            </h2>
            <p className="text-gray-600 text-xl leading-relaxed mb-4">
              When you choose Jamdani Store, you choose authenticity, trust, and
              a deep respect for heritage.
            </p>
            <p className="text-gray-600 text-xl leading-relaxed">
              We promise timeless designs, honest pricing, and a shopping
              experience rooted in care and transparency.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
