import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaSection from "@/components/CtaSection";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Award, Users, CheckCircle2, Loader2 } from "lucide-react";
import { useSiteContentList } from "@/hooks/useSiteContent";

const iconMap: Record<string, any> = {
  Shield: Shield,
  Award: Award,
  Users: Users,
  CheckCircle2: CheckCircle2,
};

const About = () => {
  const { content: values, loading: loadingValues } = useSiteContentList("about_value");
  const { content: storyContent, loading: loadingStory } = useSiteContentList("about_story");
  const { content: certs, loading: loadingCerts } = useSiteContentList("about_cert");

  const story = storyContent[0];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Dexgen Engineering
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-primary-foreground/90">
              Your trusted partner for professional electrical services since
              2008
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                {story?.title || "Our Story"}
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground whitespace-pre-wrap">
                {loadingStory ? (
                  <div className="flex justify-center p-8"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>
                ) : (
                  story?.description || (
                    <>
                      <p>
                        Founded in 2008, Dexgen Engineering has been serving the Lagos
                        metropolitan area with dedication and excellence. What started
                        as a small team of licensed electricians has grown into one of
                        the most trusted electrical service providers in the region.
                      </p>
                      <p>
                        Our commitment to quality workmanship, transparent pricing,
                        and exceptional customer service has earned us the trust of
                        hundreds of satisfied residential and commercial clients.
                      </p>
                    </>
                  )
                )}
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
              {loadingValues ? (
                <div className="col-span-full flex justify-center p-12"><Loader2 className="animate-spin h-10 w-10 text-primary" /></div>
              ) : values.length > 0 ? (
                values.map((value) => {
                  const Icon = iconMap[value.metadata?.icon] || Shield;
                  return (
                    <Card
                      key={value.id}
                      className="text-center hover:shadow-medium transition-shadow"
                    >
                      <CardContent className="pt-6">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary mx-auto mb-4">
                          <Icon className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-foreground">
                          {value.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {value.description}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <p className="col-span-full text-center text-muted-foreground italic">No values found in CMS.</p>
              )}
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
                {loadingCerts ? (
                  <div className="col-span-full flex justify-center"><Loader2 className="animate-spin h-6 w-6 text-primary" /></div>
                ) : certs.length > 0 ? (
                  certs.map((cert) => (
                    <div key={cert.id} className="flex items-center gap-3">
                      <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0" />
                      <span className="text-foreground font-medium">{cert.title}</span>
                    </div>
                  ))
                ) : (
                  <p className="col-span-full text-center text-muted-foreground italic">No certifications found in CMS.</p>
                )}
              </div>
            </div>
          </div>
        </section>

        <CtaSection
          title="Work With the Best"
          description="Experience the difference of working with a dedicated, professional electrical team."
        />
      </main>

      <Footer />
    </div>
  );
};

export default About;
