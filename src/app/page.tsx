// This is the homepage — what visitors see at the site's root address ("/").
// It assembles the section components in the same order the original
// single-page design used, plus the structured data block below. The
// header, footer and floating WhatsApp button aren't repeated here because
// they live in layout.tsx, which wraps every page (there's currently only
// this one).
import LocalBusinessJsonLd from "@/components/seo/LocalBusinessJsonLd";
import FaqJsonLd from "@/components/seo/FaqJsonLd";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import VeinDivider from "@/components/ui/VeinDivider";
import Products from "@/components/sections/Products";
import Gallery from "@/components/sections/Gallery";
import WhyUs from "@/components/sections/WhyUs";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import { faqs } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <FaqJsonLd items={faqs} />
      <Hero />
      <About />
      <VeinDivider />
      <Products />
      <Gallery />
      <WhyUs />
      <Faq />
      <Contact />
    </>
  );
}
