import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Building2, AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteContentList } from "@/hooks/useSiteContent";

const iconMap: Record<string, any> = {
  Home: Home,
  Building2: Building2,
  AlertCircle: AlertCircle,
};

const Services = () => {
  const { content: services, loading } = useSiteContentList("service_category");

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
          {loading ? (
            <div className="col-span-full flex justify-center p-12"><Loader2 className="animate-spin h-10 w-10 text-primary" /></div>
          ) : services.length > 0 ? (
            services.map((service) => {
              const Icon = iconMap[service.metadata?.icon] || Home;
              const features = Array.isArray(service.metadata?.features) ? service.metadata.features : [];

              return (
                <Card key={service.id} className="overflow-hidden hover:shadow-strong transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image_url || ""}
                      alt={service.title || "Service"}
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
                      {features.map((feature: string, idx: number) => (
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
            })
          ) : (
            <p className="col-span-full text-center text-muted-foreground italic">No services found in CMS.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;
