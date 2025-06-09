
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const QuickServicesFAQ = () => {
  const faqs = [
    {
      question: "من ينفذ هذه الخدمات؟",
      answer: "جميع الخدمات ينفذها محامون معتمدون ومرخصون في المملكة العربية السعودية، وقد تم التحقق من هويتهم وخبراتهم من قبل منصة سند."
    },
    {
      question: "ماذا لو لم أكن راضيًا عن النتيجة؟",
      answer: "نوفر ضمان الجودة لجميع خدماتنا. في حالة عدم الرضا، يمكنك طلب مراجعة مجانية أو استرداد جزئي حسب طبيعة الخدمة."
    },
    {
      question: "هل يمكن استرجاع المال؟",
      answer: "نعم، يمكن استرداد المال كاملاً إذا لم تبدأ الخدمة بعد، أو جزئياً حسب مرحلة التنفيذ وسياسة الاسترداد لكل خدمة."
    },
    {
      question: "كيف أتابع الطلب بعد الدفع؟",
      answer: "ستتلقى رسالة تأكيد فورية، ويمكنك متابعة حالة طلبك من خلال لوحة التحكم الشخصية أو عبر الرسائل النصية والإشعارات."
    }
  ];

  return (
    <Card className="mt-12">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <HelpCircle className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl text-primary">الأسئلة الشائعة</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-muted-foreground/20 rounded-lg px-4"
            >
              <AccordionTrigger className="text-right font-medium hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default QuickServicesFAQ;
