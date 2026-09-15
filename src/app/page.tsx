// This is the homepage — what visitors see at the site's root address ("/").
// It just assembles the section components in the same order the original
// single-page design used. The header, footer and floating WhatsApp button
// aren't repeated here because they live in layout.tsx, which wraps every
// page (there's currently only this one).
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import VeinDivider from "@/components/ui/VeinDivider";
import Products from "@/components/sections/Products";
import Gallery from "@/components/sections/Gallery";
import WhyUs from "@/components/sections/WhyUs";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <VeinDivider />
      <Products />
      <Gallery />
      <WhyUs />
      <Contact />
    </>
  );
}
