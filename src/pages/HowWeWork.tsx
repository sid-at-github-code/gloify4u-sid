import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProcessHero from "@/components/process/ProcessHero";
import PhasesSection from "@/components/process/PhasesSection";
import ArchDiagram from "@/components/process/ArchDiagram";
import ProcessTimeline from "@/components/process/ProcessTimeline";
import BeforeAfter from "@/components/process/BeforeAfter";
import ProcessCTA from "@/components/process/ProcessCTA";

export default function HowWeWork() {
  return (
    <div className="bg-background">
      <Nav />
      <ProcessHero />
      <PhasesSection />
      <ArchDiagram />
      <ProcessTimeline />
      <BeforeAfter />
      <ProcessCTA />
      <Footer />
    </div>
  );
}
