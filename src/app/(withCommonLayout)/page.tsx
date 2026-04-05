import ArtisanStory from "@/components/home/ArtisanStory/page";
import CategoryGrid from "@/components/home/CategoryGrid/page";
import DiscountBanner from "@/components/home/DiscountBanner/page";
import FeaturedCollection from "@/components/home/FeaturedCollection/page";
import Gallery from "@/components/home/Gallery/page";
import HeroSlider from "@/components/home/HeroSlider/page";
import NewArrivals from "@/components/home/NewArrivals/page";
import Newsletter from "@/components/home/newsletter/page";
import Stats from "@/components/home/stats/page";
import Testimonial from "@/components/home/testimonial/page";
import WhatsappButton from "@/components/home/WhatsappButton/WhatsappButton";

export default function Home() {
  return (
    <div className="space-y-10">
      <div className="container bg-[#FDF2F2]  space-y-24 mx-auto">
        <div>
          <HeroSlider></HeroSlider>
          <CategoryGrid></CategoryGrid>
          <FeaturedCollection></FeaturedCollection>
          <DiscountBanner></DiscountBanner>
          <NewArrivals></NewArrivals>
          <ArtisanStory></ArtisanStory>
          <Gallery></Gallery>
          <Testimonial></Testimonial>
          <Stats></Stats>
          <Newsletter></Newsletter>
          <WhatsappButton></WhatsappButton>
        </div>
      </div>
    </div>
  );
}
