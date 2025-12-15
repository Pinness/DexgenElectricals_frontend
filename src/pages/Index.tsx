import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Phone } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Hero />
        <Services />

        {/* Why Choose Us Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  Why Choose Dexgen Engineering?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  With over 15 years of experience, we've built our reputation
                  on quality workmanship, reliability, and exceptional customer
                  service.
                </p>

                <div className="space-y-4">
                  {[
                    "Licensed and fully insured professionals",
                    "Upfront, transparent pricing with no hidden fees",
                    "Same-day service available for emergencies",
                    "100% satisfaction guarantee on all work",
                    "Latest tools and safety equipment",
                    "Ongoing training on current electrical codes",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:pl-12">
                <Card className="p-8 shadow-strong">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2 text-foreground">
                      Get Your Free Quote Today
                    </h3>
                    <p className="text-muted-foreground">
                      Fill out the form below and we'll get back to you within
                      24 hours
                    </p>
                  </div>
                  <ContactForm />
                </Card>
              </div>
            </div>
          </div>
        </section>

        <Testimonials />

        {/* Emergency CTA */}
        <section className="py-16 bg-gradient-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Emergency Electrical Service?
            </h2>
            <p className="text-lg mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
              We're available 24/7 for urgent electrical issues. Don't wait -
              call us now!
            </p>
            <Button
              size="lg"
              className="bg-accent hover:opacity-90 text-accent-foreground font-semibold"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Emergency Hotline: +234 703 983 3456
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
