
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Scale, FileText, Shield } from "lucide-react";

const Terms = () => {
  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-primary mb-4">الشروط والأحكام</h1>
              <p className="text-muted-foreground text-lg">
                شروط وأحكام استخدام منصة سند للخدمات القانونية
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                آخر تحديث: 15 يناير 2024
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Scale className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">الالتزام القانوني</h3>
                  <p className="text-sm text-muted-foreground">
                    جميع الشروط ملزمة قانونياً
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">شفافية كاملة</h3>
                  <p className="text-sm text-muted-foreground">
                    شروط واضحة ومفهومة
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">حماية الحقوق</h3>
                  <p className="text-sm text-muted-foreground">
                    حماية حقوق جميع الأطراف
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">الشروط والأحكام</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-6 text-sm leading-relaxed">
                    
                    <section>
                      <h2 className="text-xl font-bold text-primary mb-4">1. التعريفات</h2>
                      <div className="space-y-2 text-muted-foreground">
                        <p><strong>المنصة:</strong> منصة سند للخدمات القانونية الإلكترونية.</p>
                        <p><strong>المستخدم:</strong> أي شخص طبيعي أو اعتباري يستخدم المنصة.</p>
                        <p><strong>المحامي:</strong> المحامي المرخص والمسجل في المنصة.</p>
                        <p><strong>العميل:</strong> الشخص الذي يطلب خدمات قانونية عبر المنصة.</p>
                        <p><strong>الخدمة:</strong> أي خدمة قانونية مقدمة عبر المنصة.</p>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold text-primary mb-4">2. قبول الشروط</h2>
                      <div className="space-y-2 text-muted-foreground">
                        <p>باستخدام منصة سند، فإنك توافق على الالتزام بهذه الشروط والأحكام.</p>
                        <p>إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام المنصة.</p>
                        <p>نحتفظ بالحق في تعديل هذه الشروط في أي وقت دون إشعار مسبق.</p>
                        <p>الاستخدام المستمر للمنصة يعني قبولك للشروط المحدثة.</p>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold text-primary mb-4">3. التسجيل والحساب</h2>
                      <div className="space-y-2 text-muted-foreground">
                        <p>يجب تقديم معلومات صحيحة ودقيقة عند التسجيل.</p>
                        <p>أنت مسؤول عن الحفاظ على سرية كلمة المرور الخاصة بك.</p>
                        <p>يجب إبلاغنا فوراً بأي استخدام غير مصرح به لحسابك.</p>
                        <p>لا يُسمح بإنشاء أكثر من حساب واحد لكل مستخدم.</p>
                        <p>نحتفظ بالحق في تعليق أو إلغاء الحسابات المخالفة.</p>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold text-primary mb-4">4. الخدمات المقدمة</h2>
                      <div className="space-y-2 text-muted-foreground">
                        <p>المنصة تعمل كوسيط بين المحامين والعملاء.</p>
                        <p>جودة الخدمات القانونية هي مسؤولية المحامي المقدم للخدمة.</p>
                        <p>المنصة لا تضمن نتائج الخدمات القانونية المقدمة.</p>
                        <p>جميع الاتفاقيات القانونية تتم مباشرة بين المحامي والعميل.</p>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold text-primary mb-4">5. التزامات المحامين</h2>
                      <div className="space-y-2 text-muted-foreground">
                        <p>يجب أن يكون لدى المحامي ترخيص ساري المفعول للمحاماة.</p>
                        <p>الالتزام بأعلى معايير المهنية والأخلاق القانونية.</p>
                        <p>تقديم خدمات قانونية صحيحة ودقيقة.</p>
                        <p>الحفاظ على سرية معلومات العملاء.</p>
                        <p>الاستجابة للعملاء في الأوقات المحددة.</p>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold text-primary mb-4">6. التزامات العملاء</h2>
                      <div className="space-y-2 text-muted-foreground">
                        <p>تقديم معلومات صحيحة وكاملة للمحامي.</p>
                        <p>دفع الرسوم المتفق عليها في الوقت المحدد.</p>
                        <p>التعامل بصدق وشفافية مع المحامي.</p>
                        <p>عدم استخدام المنصة لأغراض غير قانونية.</p>
                        <p>احترام حقوق الملكية الفكرية للمنصة.</p>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold text-primary mb-4">7. الرسوم والمدفوعات</h2>
                      <div className="space-y-2 text-muted-foreground">
                        <p>جميع الرسوم موضحة بوضوح قبل تأكيد الخدمة.</p>
                        <p>المدفوعات تتم عبر وسائل دفع آمنة ومعتمدة.</p>
                        <p>رسوم المنصة تُخصم تلقائياً من المبلغ المستحق للمحامي.</p>
                        <p>المبالغ المدفوعة غير قابلة للاسترداد إلا في حالات محددة.</p>
                        <p>تطبق سياسة استرداد واضحة ومعلنة.</p>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold text-primary mb-4">8. حماية البيانات</h2>
                      <div className="space-y-2 text-muted-foreground">
                        <p>نلتزم بحماية خصوصية بيانات المستخدمين.</p>
                        <p>البيانات الشخصية تُستخدم فقط لأغراض تقديم الخدمة.</p>
                        <p>لا نشارك البيانات مع أطراف ثالثة دون موافقة صريحة.</p>
                        <p>نستخدم أحدث تقنيات الأمان لحماية البيانات.</p>
                        <p>المستخدمون لهم الحق في الوصول إلى بياناتهم وتعديلها.</p>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold text-primary mb-4">9. إخلاء المسؤولية</h2>
                      <div className="space-y-2 text-muted-foreground">
                        <p>المنصة غير مسؤولة عن أي أضرار نتيجة استخدام الخدمات.</p>
                        <p>المحامون مسؤولون بشكل مستقل عن خدماتهم القانونية.</p>
                        <p>لا نضمن دقة أو اكتمال المعلومات المقدمة من المحامين.</p>
                        <p>المنصة غير مسؤولة عن انقطاع الخدمة أو الأخطاء التقنية.</p>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold text-primary mb-4">10. حل النزاعات</h2>
                      <div className="space-y-2 text-muted-foreground">
                        <p>نسعى لحل النزاعات ودياً قبل اللجوء للقضاء.</p>
                        <p>يمكن اللجوء للتحكيم في حالة النزاعات المعقدة.</p>
                        <p>القانون السعودي هو المطبق على هذه الشروط.</p>
                        <p>المحاكم السعودية هي المختصة بالنظر في النزاعات.</p>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold text-primary mb-4">11. إنهاء الاتفاقية</h2>
                      <div className="space-y-2 text-muted-foreground">
                        <p>يمكن لأي طرف إنهاء الاتفاقية بإشعار مسبق.</p>
                        <p>نحتفظ بالحق في إنهاء الحسابات المخالفة فوراً.</p>
                        <p>عند الإنهاء، تبقى الالتزامات المالية سارية المفعول.</p>
                        <p>البيانات المحفوظة تُحذف وفقاً لسياسة الخصوصية.</p>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold text-primary mb-4">12. أحكام عامة</h2>
                      <div className="space-y-2 text-muted-foreground">
                        <p>هذه الشروط تشكل الاتفاقية الكاملة بين الأطراف.</p>
                        <p>إذا كان أي جزء من الشروط غير صالح، تبقى الأجزاء الأخرى سارية.</p>
                        <p>عدم إنفاذ أي حق لا يعني التنازل عنه.</p>
                        <p>التعديلات تتم كتابة وتُنشر على المنصة.</p>
                      </div>
                    </section>

                    <section className="bg-primary/5 p-6 rounded-lg">
                      <h2 className="text-xl font-bold text-primary mb-4">معلومات الاتصال</h2>
                      <div className="space-y-2 text-muted-foreground">
                        <p><strong>اسم الشركة:</strong> شركة سند للخدمات القانونية</p>
                        <p><strong>العنوان:</strong> الرياض، المملكة العربية السعودية</p>
                        <p><strong>البريد الإلكتروني:</strong> legal@sanad.com</p>
                        <p><strong>الهاتف:</strong> +966 11 234 5678</p>
                        <p><strong>رقم التسجيل التجاري:</strong> 1234567890</p>
                      </div>
                    </section>

                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
