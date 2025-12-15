import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "Lagos",
    rating: 5,
    text: "Outstanding service! They responded quickly to our emergency and fixed our electrical issue professionally. Highly recommend Elite Electrical.",
    date: "2 weeks ago",
  },
  {
    name: "Michael Ojo",
    location: "Ogun",
    rating: 5,
    text: "Excellent work on our office renovation. The team was professional, on time, and the quality of work exceeded our expectations.",
    date: "1 month ago",
  },
  {
    name: "Emily Silas",
    location: "Lagos",
    rating: 5,
    text: "Very satisfied with the panel upgrade they did for us. Clear communication, fair pricing, and meticulous attention to detail.",
    date: "3 weeks ago",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers
            have to say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-medium transition-shadow">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>

                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.location}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.date}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
