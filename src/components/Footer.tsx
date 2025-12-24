import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import Logo from "@/components/Logo";
import { CONTACT_INFO } from "@/lib/constants";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link
              to="/"
              className="inline-block hover:opacity-90 transition-opacity"
            >
              <Logo variant="light" />
            </Link>
            <p className="text-sm text-primary-foreground/80">
              Professional electrical services for residential and commercial
              properties. Licensed, insured, and available 24/7.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="hover:text-accent transition-colors active:scale-95 transition-transform duration-150 inline-block"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="hover:text-accent transition-colors active:scale-95 transition-transform duration-150 inline-block"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="hover:text-accent transition-colors active:scale-95 transition-transform duration-150 inline-block"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="hover:text-accent transition-colors active:scale-95 transition-transform duration-150 inline-block"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-sm text-primary-foreground/80">
                Residential Electrical
              </li>
              <li className="text-sm text-primary-foreground/80">
                Commercial Electrical
              </li>
              <li className="text-sm text-primary-foreground/80">
                Emergency Services
              </li>
              <li className="text-sm text-primary-foreground/80">
                Lighting Installation
              </li>
              <li className="text-sm text-primary-foreground/80">
                Panel Upgrades
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-primary-foreground/80">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>{CONTACT_INFO.address.display}</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <a
                  href={CONTACT_INFO.phone.href}
                  className="hover:text-accent transition-colors"
                >
                  {CONTACT_INFO.phone.display}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a
                  href={CONTACT_INFO.email.href}
                  className="hover:text-accent transition-colors"
                >
                  {CONTACT_INFO.email.display}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/80">
              © {new Date().getFullYear()} Dengen Engineering. All rights
              reserved.
            </p>
            <div className="flex gap-6 text-sm text-primary-foreground/80">
              <Link
                to="/privacy"
                className="hover:text-accent transition-colors"
              >
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-accent transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
