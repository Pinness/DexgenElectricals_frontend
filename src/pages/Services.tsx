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
  Loader2,
} from "lucide-react";
import { useSiteContentList } from "@/hooks/useSiteContent";
import residentialImageDefault from "@/assets/residential-service.jpg";

const iconMap: Record<string, any> = {
  Home: Home,
  Building2: Building2,
  AlertCircle: AlertCircle,
  Lightbulb: Lightbulb,
  Wrench: Wrench,
  Shield: Shield,
};

const Services = () => {
  const { content: categories, loading: loadingCategories } = useSiteContentList("service_category");

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
              {loadingCategories ? (
                <div className="flex justify-center p-20"><Loader2 className="animate-spin h-12 w-12 text-primary" /></div>
              ) : categories.length > 0 ? (
                categories.map((category, index) => {
                  const Icon = iconMap[category.metadata?.icon] || Home;
                  const isEven = index % 2 === 0;
                  const features = Array.isArray(category.metadata?.features) ? category.metadata.features : [];

                  return (
                    <div
                      key={category.id}
                      className={`flex flex-col lg:flex-row gap-12 items-center ${isEven ? "" : "lg:flex-row-reverse"
                        }`}
                    >
                      <div className="flex-1 w-full">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary shadow-soft">
                            <Icon className="h-6 w-6 text-primary-foreground" />
                          </div>
                          <h2 className="text-3xl font-bold text-foreground">
                            {category.title}
                          </h2>
                        </div>

                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                          {category.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                          {features.map((service: string, idx: number) => (
                            <div key={idx} className="flex items-start gap-2 group/item">
                              <div className="h-1.5 w-1.5 rounded-full bg-accent mt-2 flex-shrink-0 transition-transform group-hover/item:scale-150" />
                              <span className="text-sm text-foreground group-hover/item:text-primary transition-colors">
                                {service}
                              </span>
                            </div>
                          ))}
                        </div>

                        <Button className="bg-gradient-accent hover:opacity-90 shadow-soft">
                          Request Quote
                        </Button>
                      </div>

                      <div className="flex-1 w-full">
                        <div className="relative rounded-xl overflow-hidden shadow-strong group/img">
                          <img
                            src={category.image_url || residentialImageDefault}
                            alt={category.title || "Service"}
                            className="w-full h-[400px] object-cover transition-transform duration-700 group-hover/img:scale-110"
                          />
                          <div className="absolute inset-0 bg-primary/10 group-hover/img:bg-transparent transition-colors duration-500" />
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-muted-foreground italic">No service categories found in CMS.</p>
              )}
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
