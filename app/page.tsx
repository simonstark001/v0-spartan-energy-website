import { Navbar, HeroSection, SpartanAdvantage, SpartanJourney, SubsidySection } from "@/components/spartan"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <SpartanAdvantage />
      <SpartanJourney />
      <SubsidySection />
    </main>
  )
}
