import { Button } from "@/components/ui/button";
import { Phone, Shield, Clock, Award } from "lucide-react";
import heroImage from "@/assets/hero-electrician.jpg";
import QuoteDialog from "@/components/QuoteDialog";
import { CONTACT_INFO } from "@/lib/constants";

const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Professional electrician working"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-primary-foreground">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Professional Electrical Services You Can Trust
          </h1>
          <p className="text-lg md:text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            From residential wiring to industrial installations, Dexgen
            Engineering delivers safe, reliable, and efficient electrical
            services across Lagos and beyond.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
            <QuoteDialog>
              <Button
                size="lg"
                className="bg-gradient-accent hover:opacity-90 text-accent-foreground font-semibold"
              >
                Get Free Quote
              </Button>
            </QuoteDialog>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-semibold"
              asChild
            >
              <a href={CONTACT_INFO.phone.href}>
                <Phone className="mr-2 h-5 w-5" />
                Call {CONTACT_INFO.phone.display}
              </a>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <div>
                <div className="font-semibold">Licensed</div>
                <div className="text-sm text-primary-foreground/80">
                  & Insured
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <div>
                <div className="font-semibold">24/7</div>
                <div className="text-sm text-primary-foreground/80">
                  Emergency
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
                <Award className="h-6 w-6 text-accent" />
              </div>
              <div>
                <div className="font-semibold">15+ Years</div>
                <div className="text-sm text-primary-foreground/80">
                  Experience
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
                <span className="text-2xl font-bold text-accent">★</span>
              </div>
              <div>
                <div className="font-semibold">5-Star</div>
                <div className="text-sm text-primary-foreground/80">Rated</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
