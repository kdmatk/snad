import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "سارة أحمد",
      location: "الرياض",
      rating: 5,
      text: "حصلت على استشارة قانونية ممتازة من خلال منصة سند. المحامي كان محترف جداً والخدمة سريعة وموثوقة."
    },
    {
      name: "محمد الخليل",
      location: "دبي", 
      rating: 5,
      text: "منصة رائعة ساعدتني في حل مشكلة قانونية معقدة. التعامل كان احترافي والأسعار مناسبة جداً."
    },
    {
      name: "عائشة المطيري",
      location: "جدة",
      rating: 5,
      text: "أنصح بشدة بمنصة سند لكل من يحتاج خدمات قانونية. سهولة في الاستخدام وجودة عالية في الخدمة."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">آراء عملائنا</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            اقرأ تجارب العملاء الذين استفادوا من خدماتنا القانونية المميزة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white/90 backdrop-blur-sm border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="border-t border-blue-200 pt-4">
                  <p className="font-semibold text-blue-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.location}</p>
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
