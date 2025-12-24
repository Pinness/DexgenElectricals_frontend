import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO } from "@/lib/constants";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const FloatingCallButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 100px
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 md:hidden transition-all duration-300 transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      )}
    >
      <Button
        size="lg"
        className="rounded-full h-14 w-14 shadow-strong bg-accent hover:bg-accent/90 text-accent-foreground p-0"
        asChild
      >
        <a href={CONTACT_INFO.phone.href} aria-label="Call Now">
          <Phone className="h-6 w-6" />
        </a>
      </Button>
    </div>
  );
};

export default FloatingCallButton;
