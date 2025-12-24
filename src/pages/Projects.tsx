import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaSection from "@/components/CtaSection";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import residentialImage from "@/assets/residential-service.jpg";
import commercialImage from "@/assets/commercial-service.jpg";

const projects = [
  {
    title: "Modern Home Electrical Upgrade",
    category: "Residential",
    description:
      "Complete electrical panel upgrade and smart home integration for a 3,500 sq ft residence in Manhattan.",
    image: residentialImage,
    details: [
      "Panel upgrade to 200A",
      "Smart lighting system",
      "EV charger installation",
    ],
  },
  {
    title: "Office Building Renovation",
    category: "Commercial",
    description:
      "Full electrical renovation for a 10,000 sq ft office space including LED lighting and modern wiring.",
    image: commercialImage,
    details: ["LED lighting retrofit", "Network cabling", "Emergency lighting"],
  },
  {
    title: "Restaurant Kitchen Installation",
    category: "Commercial",
    description:
      "Commercial kitchen electrical installation with dedicated circuits for equipment and safety systems.",
    image: commercialImage,
    details: ["Commercial wiring", "Ventilation systems", "Safety compliance"],
  },
  {
    title: "Residential Outdoor Lighting",
    category: "Residential",
    description:
      "Landscape and architectural lighting design for enhanced curb appeal and security.",
    image: residentialImage,
    details: ["Landscape lighting", "Pathway lights", "Security lighting"],
  },
];

const Projects = () => {
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
              {projects.map((project, index) => (
                <Card
                  key={index}
                  className="overflow-hidden hover:shadow-strong transition-shadow"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-accent text-accent-foreground">
                        {project.category}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-foreground">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {project.description}
                    </p>

                    <div className="space-y-2">
                      <div className="font-semibold text-sm text-foreground">
                        Project Highlights:
                      </div>
                      <ul className="space-y-1">
                        {project.details.map((detail, idx) => (
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "500+", label: "Projects Completed" },
                { number: "15+", label: "Years Experience" },
                { number: "100%", label: "Satisfaction Rate" },
                { number: "24/7", label: "Emergency Service" },
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
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
