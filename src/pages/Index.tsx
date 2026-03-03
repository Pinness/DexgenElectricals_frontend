import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Phone, Loader2 } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";
import { useSiteContentList } from "@/hooks/useSiteContent";

const Index = () => {
  const { content: whyUsSection, loading: loadingWhyUs } = useSiteContentList("home_why_section");
  const { content: whyUsFeatures, loading: loadingFeatures } = useSiteContentList("home_why_feature");
  const { content: emergencyCta, loading: loadingCta } = useSiteContentList("home_emergency_cta");

  const whyUs = whyUsSection[0];
  const eCta = emergencyCta[0];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 overflow-x-hidden">
        <Hero />
        <Services />

        {/* Why Choose Us Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                {loadingWhyUs ? (
                  <div className="p-8"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>
                ) : (
                  <>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                      {whyUs?.title || "Why Choose Dexgen Engineering?"}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                      {whyUs?.description || "With over 15 years of experience, we've built our reputation on quality workmanship, reliability, and exceptional customer service."}
                    </p>
                  </>
                )}

                <div className="space-y-4">
                  {loadingFeatures ? (
                    <div className="flex justify-center"><Loader2 className="animate-spin h-6 w-6 text-primary" /></div>
                  ) : whyUsFeatures.length > 0 ? (
                    whyUsFeatures.map((feature) => (
                      <div key={feature.id} className="flex items-start gap-3">
                        <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{feature.title}</span>
                      </div>
                    ))
                  ) : (
                    // Fallback
                    ["Licensed and fully insured professionals", "100% satisfaction guarantee"].map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{item}</span>
                      </div>
                    ))
                  )}
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
            {loadingCta ? (
              <Loader2 className="animate-spin h-10 w-10 mx-auto" />
            ) : (
              <>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {eCta?.title || "Need Emergency Electrical Service?"}
                </h2>
                <p className="text-lg mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
                  {eCta?.description || "We're available 24/7 for urgent electrical issues. Don't wait - call us now!"}
                </p>
              </>
            )}
            <Button
              size="lg"
              className="bg-accent hover:opacity-90 text-accent-foreground font-semibold"
              asChild
            >
              <a href={CONTACT_INFO.phone.href}>
                <Phone className="mr-2 h-5 w-5" />
                Call Emergency Hotline: {CONTACT_INFO.phone.display}
              </a>
            </Button>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
