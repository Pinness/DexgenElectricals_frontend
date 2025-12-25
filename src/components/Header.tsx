import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import QuoteDialog from "@/components/QuoteDialog";
import Logo from "@/components/Logo";
import { CONTACT_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/projects", label: "Projects" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          to="/"
          className="hover:opacity-90 transition-opacity"
          onClick={scrollToTop}
        >
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={scrollToTop}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium transition-colors hover:text-primary active:scale-95 transition-transform duration-150",
                  isActive ? "text-primary font-semibold" : "text-foreground"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={CONTACT_INFO.phone.href}
            className="flex items-center gap-2 text-sm font-medium text-primary active:scale-95 transition-transform duration-150"
          >
            <Phone className="h-4 w-4" />
            {CONTACT_INFO.phone.display}
          </a>
          <QuoteDialog />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden active:scale-95 transition-transform duration-150"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "text-sm font-medium transition-colors hover:text-primary active:scale-95 transition-transform duration-150",
                    isActive ? "text-primary font-semibold" : "text-foreground"
                  )
                }
                onClick={() => {
                  setIsMenuOpen(false);
                  scrollToTop();
                }}
              >
                {link.label}
              </NavLink>
            ))}
            <div className="flex flex-col gap-3 mt-4">
              <Button
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
                asChild
              >
                <a href={CONTACT_INFO.phone.href}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call {CONTACT_INFO.phone.display}
                </a>
              </Button>
              <QuoteDialog>
                <Button className="w-full" variant="outline">
                  Get Free Quote
                </Button>
              </QuoteDialog>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
