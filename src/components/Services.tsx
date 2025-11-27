import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Building2, AlertCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import residentialImage from "@/assets/residential-service.jpg";
import commercialImage from "@/assets/commercial-service.jpg";
import emergencyImage from "@/assets/emergency-service.jpg";

const services = [
  {
    title: "Residential Services",
    description: "Complete electrical solutions for your home including repairs, installations, and upgrades.",
    icon: Home,
    image: residentialImage,
    features: ["Lighting Installation", "Panel Upgrades", "Wiring & Rewiring", "Smart Home Integration"],
  },
  {
    title: "Commercial Services",
    description: "Professional electrical services for businesses, offices, and commercial properties.",
    icon: Building2,
    image: commercialImage,
    features: ["Commercial Wiring", "Security Systems", "Energy Audits", "Maintenance Plans"],
  },
  {
    title: "Emergency Services",
    description: "24/7 rapid response for urgent electrical issues. We're here when you need us most.",
    icon: AlertCircle,
    image: emergencyImage,
    features: ["Power Outages", "Electrical Faults", "Safety Inspections", "Immediate Response"],
  },
];

const Services = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive electrical solutions for every need. From routine maintenance to complex installations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="overflow-hidden hover:shadow-strong transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 text-primary-foreground">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                      <Icon className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                  </div>
                </div>
                
                <CardHeader>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button variant="outline" className="w-full group" asChild>
                    <Link to="/services">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
