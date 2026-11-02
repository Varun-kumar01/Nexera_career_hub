import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Transformation from "@/components/Transformation";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import Journey from "@/components/Journey";
import Testimonials from "@/components/Testimonials";
import Audience from "@/components/Audience";
import WhyNexera from "@/components/WhyNexera";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#F7F8FC] text-[#111827]">
      <Navbar />
      <Hero />
      <Problem />
      <Transformation />
      <HowItWorks />
      <Services />
      <Journey />
      <Testimonials />
      <Audience />
      <WhyNexera />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}