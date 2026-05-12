import { Navbar, HeroSection } from "@/components/spartan"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      
      {/* Placeholder sections for scroll testing */}
      <section className="min-h-screen bg-card flex items-center justify-center">
        <div className="text-center max-w-3xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-spartan">
            The Spartan Advantage
          </h2>
          <p className="text-muted-foreground text-lg">
            Why leading homeowners and businesses across India choose Spartan Energy
            for their solar transition.
          </p>
        </div>
      </section>
    </main>
  )
}
