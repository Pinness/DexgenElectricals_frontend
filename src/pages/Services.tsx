import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaSection from "@/components/CtaSection";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Home,
  Building2,
  AlertCircle,
  Lightbulb,
  Wrench,
  Shield,
} from "lucide-react";
import residentialImage from "@/assets/residential-service.jpg";
import commercialImage from "@/assets/commercial-service.jpg";
import emergencyImage from "@/assets/emergency-service.jpg";

const serviceCategories = [
  {
    title: "Residential Services",
    description: "Expert electrical solutions for your home",
    icon: Home,
    image: residentialImage,
    services: [
      "Lighting installation and upgrades",
      "Electrical panel upgrades and replacement",
      "Home rewiring and circuit installation",
      "GFCI and AFCI outlet installation",
      "Ceiling fan installation",
      "Smart home wiring and automation",
      "Home electrical safety inspections",
      "Generator installation and maintenance",
    ],
  },
  {
    title: "Commercial Services",
    description: "Reliable electrical services for businesses",
    icon: Building2,
    image: commercialImage,
    services: [
      "Commercial electrical installation",
      "Office building electrical systems",
      "Retail store electrical services",
      "Restaurant electrical work",
      "Security and surveillance systems",
      "Energy-efficient lighting solutions",
      "Electrical maintenance contracts",
      "Code compliance and upgrades",
    ],
  },
  {
    title: "Emergency Services",
    description: "24/7 rapid response for urgent electrical issues",
    icon: AlertCircle,
    image: emergencyImage,
    services: [
      "Power outage troubleshooting",
      "Emergency electrical repairs",
      "Circuit breaker issues",
      "Electrical fire prevention",
      "Damaged wiring repair",
      "Emergency lighting installation",
      "Storm damage electrical repair",
      "Same-day service available",
    ],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Electrical Services
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-primary-foreground/90">
              Comprehensive electrical solutions for homes and businesses.
              Licensed, insured, and committed to excellence.
            </p>
          </div>
        </section>

        {/* Services Categories */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="space-y-20">
              {serviceCategories.map((category, index) => {
                const Icon = category.icon;
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={index}
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                      isEven ? "" : "lg:flex-row-reverse"
                    }`}
                  >
                    <div className={isEven ? "lg:order-1" : "lg:order-2"}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                          <Icon className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <h2 className="text-3xl font-bold text-foreground">
                          {category.title}
                        </h2>
                      </div>

                      <p className="text-lg text-muted-foreground mb-6">
                        {category.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                        {category.services.map((service, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                            <span className="text-sm text-foreground">
                              {service}
                            </span>
                          </div>
                        ))}
                      </div>

                      <Button className="bg-gradient-accent hover:opacity-90">
                        Request Quote
                      </Button>
                    </div>

                    <div className={isEven ? "lg:order-2" : "lg:order-1"}>
                      <div className="relative rounded-lg overflow-hidden shadow-strong">
                        <img
                          src={category.image}
                          alt={category.title}
                          className="w-full h-[400px] object-cover"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Additional Specialized Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We offer a comprehensive range of electrical services to meet
                all your needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Lightbulb,
                  title: "Lighting Design",
                  description: "Custom lighting solutions for any space",
                },
                {
                  icon: Wrench,
                  title: "Electrical Repairs",
                  description: "Fast and reliable repair services",
                },
                {
                  icon: Shield,
                  title: "Safety Inspections",
                  description: "Comprehensive electrical safety audits",
                },
              ].map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card
                    key={index}
                    className="hover:shadow-medium transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary mb-4">
                        <Icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <CardTitle>{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
};

export default Services;
