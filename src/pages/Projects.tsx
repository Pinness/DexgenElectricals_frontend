import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaSection from "@/components/CtaSection";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { useSiteContentList } from "@/hooks/useSiteContent";
import residentialImageDefault from "@/assets/residential-service.jpg";

const Projects = () => {
  const { content: projects, loading: loadingProjects } = useSiteContentList("project_");
  const { content: stats, loading: loadingStats } = useSiteContentList("home_stat");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Featured Projects
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-primary-foreground/90">
              Explore our portfolio of successful electrical projects. Quality
              workmanship that speaks for itself.
            </p>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {loadingProjects ? (
                <div className="col-span-full flex justify-center p-12"><Loader2 className="animate-spin h-10 w-10 text-primary" /></div>
              ) : projects.length > 0 ? (
                projects.map((project) => (
                  <Card
                    key={project.id}
                    className="overflow-hidden hover:shadow-strong transition-shadow"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={project.image_url || residentialImageDefault}
                        alt={project.title || "Project"}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                      {project.category && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-accent text-accent-foreground">
                            {project.category}
                          </Badge>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-foreground">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {project.description}
                      </p>

                      {project.metadata?.highlights && Array.isArray(project.metadata.highlights) && (
                        <div className="space-y-2">
                          <div className="font-semibold text-sm text-foreground">
                            Project Highlights:
                          </div>
                          <ul className="space-y-1">
                            {project.metadata.highlights.map((detail: string, idx: number) => (
                              <li
                                key={idx}
                                className="flex items-center gap-2 text-sm text-muted-foreground"
                              >
                                <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="col-span-full text-center text-muted-foreground italic">No projects found in CMS.</p>
              )}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {loadingStats ? (
                <div className="col-span-full flex justify-center"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>
              ) : stats.length > 0 ? (
                stats.map((stat) => (
                  <div key={stat.id}>
                    <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                      {stat.title}
                    </div>
                    <div className="text-muted-foreground">{stat.description}</div>
                  </div>
                ))
              ) : (
                // Fallback
                [
                  { number: "500+", label: "Projects Completed" },
                  { number: "15+", label: "Years Experience" },
                  { number: "100%", label: "Satisfaction Rate" },
                  { number: "24/7", label: "Emergency Service" },
                ].map((stat, index) => (
                  <div key={index}>
                    <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <CtaSection
          title="Have a Project in Mind?"
          description="Whether it's residential or commercial, we have the expertise to bring your electrical project to life."
        />
      </main>

      <Footer />
    </div>
  );
};

export default Projects;
