"use client";

import Image from "next/image";
import AppStore from "../../assests/app-store-img.webp";

const AppPromoSection = () => {
  return (
    <section className="w-full bg-[#FF3C48] py-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-20">
        {/* Text Section */}
        <div className="text-center md:text-left md:max-w-md">
          <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-4 leading-snug">
            Install our app to stay updated!
          </h2>
          <p className="text-white text-lg mb-6">
            Download our app from Google Play or Apple App Store and enjoy
            seamless shopping.
          </p>
        </div>

        {/* Mobile Preview Image */}
        <div className="mb-8 md:mb-0 relative">
          <Image
            src={AppStore}
            alt="Mobile App Preview"
            width={320}
            height={640}
            className="mx-auto md:mx-0 rounded shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default AppPromoSection;
