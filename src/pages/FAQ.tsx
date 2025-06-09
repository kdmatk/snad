import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, MessageCircle, Phone, Mail } from "lucide-react";
import { useState } from "react";
const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const faqCategories = [{
    title: "عام",
    questions: [{
      question: "ما هي منصة سند؟",
      answer: "منصة سند هي أول منصة إلكترونية شاملة للخدمات القانونية في الوطن العربي، تربط بين المحامين المعتمدين والعملاء الباحثين عن خدمات قانونية موثوقة ومهنية."
    }, {
      question: "كيف يمكنني التسجيل في المنصة؟",
      answer: "يمكنك التسجيل بسهولة من خلال النقر على زر 'إنشاء حساب جديد' وملء المعلومات المطلوبة. ستحتاج إلى تفعيل حسابك عبر البريد الإلكتروني."
    }, {
      question: "هل استخدام المنصة مجاني؟",
      answer: "التسجيل وتصفح المحامين مجاني تماماً. تدفع فقط مقابل الخدمات القانونية التي تحصل عليها من المحامين."
    }]
  }, {
    title: "للعملاء",
    questions: [{
      question: "كيف يمكنني العثور على محامي مناسب؟",
      answer: "يمكنك البحث عن المحامين حسب التخصص، المنطقة، التقييم، أو السعر. كما يمكنك قراءة ملفاتهم الشخصية وآراء العملاء السابقين."
    }, {
      question: "ما هي طرق الدفع المتاحة؟",
      answer: "نقبل جميع طرق الدفع الإلكترونية الرئيسية: بطاقات الائتمان، التحويل البنكي، والمحافظ الإلكترونية المحلية في كل بلد."
    }, {
      question: "هل معلوماتي الشخصية آمنة؟",
      answer: "نعم، نستخدم أعلى معايير الأمان والتشفير لحماية بياناتك. جميع المعلومات محمية بالسرية المهنية القانونية."
    }, {
      question: "ماذا إذا لم أكن راضياً عن الخدمة؟",
      answer: "نوفر نظام حماية للعملاء. يمكنك تقييم المحامي وفي حالة عدم الرضا، يمكنك التواصل مع فريق الدعم لحل المشكلة."
    }]
  }, {
    title: "للمحامين",
    questions: [{
      question: "كيف يمكنني الانضمام كمحامي؟",
      answer: "يمكنك التقديم من خلال صفحة 'انضم كمحامي'. ستحتاج إلى تقديم ترخيص المحاماة والشهادات الأكاديمية. يتم مراجعة الطلبات خلال 48 ساعة."
    }, {
      question: "ما هي العمولة التي تتقاضاها المنصة؟",
      answer: "نتقاضى عمولة تنافسية تتراوح بين 10-15% من قيمة الخدمة، وهي أقل من معظم المنصات المماثلة."
    }, {
      question: "كيف أحصل على المدفوعات؟",
      answer: "يتم تحويل المدفوعات إلى حسابك البنكي كل أسبوع، أو يمكنك طلب السحب الفوري مقابل رسوم رمزية."
    }, {
      question: "هل يمكنني تحديد أسعاري؟",
      answer: "نعم، لديك حرية كاملة في تحديد أسعارك. ننصح بأسعار تنافسية مقارنة بالمحامين في نفس التخصص والمنطقة."
    }]
  }, {
    title: "الخدمات",
    questions: [{
      question: "ما أنواع الخدمات القانونية المتاحة؟",
      answer: "نوفر جميع أنواع الخدمات القانونية: الاستشارات، التمثيل القضائي، صياغة العقود، المراجعة القانونية، التحكيم، والخدمات المتخصصة."
    }, {
      question: "هل يمكنني الحصول على استشارة فورية؟",
      answer: "نعم، نوفر خدمة الاستشارات الفورية عبر الهاتف، الفيديو، أو المحادثة النصية مع محامين متاحين 24/7."
    }, {
      question: "كم تستغرق الاستشارة العادية؟",
      answer: "تتراوح مدة الاستشارة عادة بين 30-60 دقيقة، حسب تعقيد المسألة القانونية واتفاقك مع المحامي."
    }, {
      question: "هل يمكن حجز مواعيد مسبقة؟",
      answer: "نعم، يمكنك حجز مواعيد مسبقة مع المحامين حسب توفرهم. ستحصل على تذكير قبل الموعد بـ 24 ساعة."
    }]
  }, {
    title: "التقنية والدعم",
    questions: [{
      question: "كيف يمكنني التواصل مع الدعم الفني؟",
      answer: "يمكنك التواصل معنا عبر الهاتف، البريد الإلكتروني، أو المحادثة المباشرة في المنصة. فريق الدعم متاح 24/7."
    }, {
      question: "هل المنصة متوفرة على الهاتف المحمول؟",
      answer: "نعم، المنصة متوافقة تماماً مع الهواتف المحمولة والأجهزة اللوحية. كما نعمل على تطوير تطبيق للهواتف الذكية."
    }, {
      question: "ماذا أفعل إذا واجهت مشكلة تقنية؟",
      answer: "تواصل مع فريق الدعم الفني فوراً عبر أي من قنوات التواصل المتاحة. نضمن حل المشاكل التقنية خلال 24 ساعة."
    }]
  }];
  const allQuestions = faqCategories.flatMap(category => category.questions.map(q => ({
    ...q,
    category: category.title
  })));
  const filteredQuestions = allQuestions.filter(q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) || q.answer.toLowerCase().includes(searchTerm.toLowerCase()));
  return <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-primary mb-4">الأسئلة الشائعة</h1>
              <p className="text-muted-foreground text-lg">
                إجابات على أكثر الأسئلة شيوعاً حول منصة سند
              </p>
            </div>

            {/* Search */}
            <div className="relative mb-8">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input placeholder="ابحث في الأسئلة الشائعة..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pr-12 text-lg py-6" />
            </div>

            {/* Search Results */}
            {searchTerm && <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">نتائج البحث ({filteredQuestions.length})</h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {filteredQuestions.map((q, index) => <AccordionItem key={index} value={`search-${index}`} className="border rounded-lg px-6">
                      <AccordionTrigger className="text-right">
                        <div>
                          <div className="font-medium">{q.question}</div>
                          <div className="text-sm text-muted-foreground">{q.category}</div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {q.answer}
                      </AccordionContent>
                    </AccordionItem>)}
                </Accordion>
                
                {filteredQuestions.length === 0 && <div className="text-center py-8">
                    <p className="text-muted-foreground">لم يتم العثور على نتائج تطابق بحثك</p>
                  </div>}
              </div>}

            {/* Categories */}
            {!searchTerm && <div className="space-y-8">
                {faqCategories.map((category, categoryIndex) => <div key={categoryIndex}>
                    <h2 className="text-2xl font-bold text-primary mb-6">{category.title}</h2>
                    <Accordion type="single" collapsible className="space-y-4">
                      {category.questions.map((q, index) => <AccordionItem key={index} value={`${categoryIndex}-${index}`} className="border rounded-lg px-6">
                          <AccordionTrigger className="text-right font-medium text-slate-700">
                            {q.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground leading-relaxed">
                            {q.answer}
                          </AccordionContent>
                        </AccordionItem>)}
                    </Accordion>
                  </div>)}
              </div>}

            {/* Contact Support */}
            <div className="mt-12 bg-gradient-to-r from-primary to-primary/90 text-white rounded-lg p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-4">لم تجد إجابة لسؤالك؟</h2>
                <p className="opacity-90">
                  فريق الدعم جاهز لمساعدتك على مدار الساعة
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-white/10 border-white/20">
                  <CardContent className="p-6 text-center">
                    <MessageCircle className="h-8 w-8 mx-auto mb-3" />
                    <h3 className="font-bold mb-2">محادثة مباشرة</h3>
                    <p className="text-sm opacity-90 mb-4">متاح 24/7</p>
                    <Button variant="secondary" size="sm">
                      بدء المحادثة
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 border-white/20">
                  <CardContent className="p-6 text-center">
                    <Phone className="h-8 w-8 mx-auto mb-3" />
                    <h3 className="font-bold mb-2">اتصال هاتفي</h3>
                    <p className="text-sm opacity-90 mb-4">+966 11 234 5678</p>
                    <Button variant="secondary" size="sm">
                      اتصل بنا
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 border-white/20">
                  <CardContent className="p-6 text-center">
                    <Mail className="h-8 w-8 mx-auto mb-3" />
                    <h3 className="font-bold mb-2">بريد إلكتروني</h3>
                    <p className="text-sm opacity-90 mb-4">support@sanad.com</p>
                    <Button variant="secondary" size="sm">
                      إرسال رسالة
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>;
};
export default FAQ;