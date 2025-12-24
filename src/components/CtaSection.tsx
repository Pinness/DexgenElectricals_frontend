import { Button } from "@/components/ui/button";
import QuoteDialog from "@/components/QuoteDialog";
import { CONTACT_INFO } from "@/lib/constants";
import { Phone } from "lucide-react";

interface CtaSectionProps {
  title?: string;
  description?: string;
  variant?: "default" | "emergency";
}

const CtaSection = ({
  title = "Ready to Get Started?",
  description = "Contact us today for a free consultation and quote. We're here to help with all your electrical needs.",
  variant = "default",
}: CtaSectionProps) => {
  if (variant === "emergency") {
    return (
      <section className="py-16 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Emergency Electrical Service?
          </h2>
          <p className="text-lg mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            We're available 24/7 for urgent electrical issues. Don't wait - call
            us now!
          </p>
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
    );
  }

  return (
    <section className="py-16 bg-gradient-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-lg mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <QuoteDialog>
            <Button
              size="lg"
              className="bg-accent hover:opacity-90 text-accent-foreground font-semibold"
            >
              Get Free Quote
            </Button>
          </QuoteDialog>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold"
            asChild
          >
            <a href={CONTACT_INFO.phone.href}>
              <Phone className="mr-2 h-5 w-5" />
              Call {CONTACT_INFO.phone.display}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
