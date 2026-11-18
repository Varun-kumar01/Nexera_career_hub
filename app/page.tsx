import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Trust from "@/components/Trust";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#F7F8FC] text-[#111827]">
      <Navbar />
      <Hero />
      <Services />
      <HowItWorks />
      <Trust />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
