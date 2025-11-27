import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Award, Users, CheckCircle2 } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Elite Electrical
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-primary-foreground/90">
              Your trusted partner for professional electrical services since 2008
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Founded in 2008, Elite Electrical Services has been serving the New York metropolitan area with dedication and excellence. What started as a small team of licensed electricians has grown into one of the most trusted electrical service providers in the region.
                </p>
                <p>
                  Our commitment to quality workmanship, transparent pricing, and exceptional customer service has earned us the trust of hundreds of satisfied residential and commercial clients. We take pride in every project, whether it's a simple outlet installation or a complete commercial electrical system upgrade.
                </p>
                <p>
                  With over 15 years of experience, our team stays current with the latest electrical codes, technologies, and best practices. We're not just electricians – we're your partners in creating safe, efficient, and reliable electrical systems.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Our Core Values
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Safety First",
                  description: "We prioritize safety in every project, following all codes and regulations to protect you and your property.",
                },
                {
                  icon: Award,
                  title: "Quality Work",
                  description: "Our workmanship is backed by years of experience and a commitment to excellence in every detail.",
                },
                {
                  icon: Users,
                  title: "Customer Focus",
                  description: "Your satisfaction is our priority. We listen, communicate, and deliver solutions that exceed expectations.",
                },
                {
                  icon: CheckCircle2,
                  title: "Reliability",
                  description: "We show up on time, complete work as promised, and stand behind our services with comprehensive warranties.",
                },
              ].map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-medium transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary mx-auto mb-4">
                        <Icon className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-foreground">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground text-center">
                Certifications & Credentials
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "Licensed Master Electrician",
                  "Fully Insured & Bonded",
                  "OSHA Safety Certified",
                  "BBB A+ Rating",
                  "National Electrical Code Certified",
                  "Commercial & Residential Licensed",
                ].map((cert, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0" />
                    <span className="text-foreground font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
