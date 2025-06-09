
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, Lock, Eye } from "lucide-react";

const Privacy = () => {
  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-primary mb-4">سياسة الخصوصية</h1>
              <p className="text-muted-foreground text-lg">
                كيف نجمع ونستخدم ونحمي بياناتك الشخصية
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                آخر تحديث: 15 يناير 2024
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">حماية شاملة</h3>
                  <p className="text-sm text-muted-foreground">
                    نحمي بياناتك بأعلى معايير الأمان
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">تشفير متقدم</h3>
                  <p className="text-sm text-muted-foreground">
                    جميع البيانات مشفرة ومحمية
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Eye className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">شفافية كاملة</h3>
                  <p className="text-sm text-muted-foreground">
                    نوضح بدقة كيف نستخدم بياناتك
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">سياسة الخصوصية</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-6 text-sm leading-relaxed">
                    
                    <section>
                      <h2 className="text-xl font-bold text-primary mb-4">1. مقدمة</h2>
                      <div className="space-y-2 text-muted-foreground">
                        <p>نحن في منصة سند نقدر خصوصيتك ونلتزم بحماية بياناتك الشخصية.</p>
                        <p>هذه السياسة توضح كيف نجمع ونستخدم ونحمي ونشارك معلوماتك الشخصية.</p>
                        <p>باستخدام منصتنا، فإنك توافق على ممارسات جمع ومعالجة المعلومات الموضحة في هذه السياسة.</p>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold text-primary mb-4">2. المعلومات التي نجمعها</h2>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold mb-2">المعلومات الشخصية:</h3>
                          <ul className="list-disc pr-6 space-y-1 text-muted-foreground">
                            <li>الاسم الكامل</li>
                            <li>عنوان البريد الإلكتروني</li>
                            <li>رقم الهاتف</li>
                            <li>العنوان السكني أو عنوان العمل</li>
                            <li>تاريخ الميلاد</li>
                            <li>صورة الملف الشخصي (اختيارية)</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">معلومات مهنية (للمحامين):</h3>
                          <ul className="list-disc pr-6 space-y-1 text-muted-foreground">
                            <li>رقم ترخيص المحاماة</li>
                            <li>المؤهلات العلمية والشهادات</li>
                            <li>سنوات الخبرة والتخصص</li>
                            <li>السيرة الذاتية المهنية</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">معلومات تقنية:</h3>
                          <ul className="list-disc pr-6 space-y-1 text-muted-foreground">
                            <li>عنوان IP</li>
                            <li>نوع المتصفح ونظام التشغيل</li>
                            <li>سجل النشاط على المنصة</li>
                            <li>ملفات الكوكيز</li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold text-primary mb-4">3. كيف نستخدم معلوماتك</h2>
                      <div className="space-y-2 text-muted-foreground">
                        <p><strong>تقديم الخدمات:</strong> لتسهيل التواصل بين المحامين والعملاء</p>
                        <p><strong>التحقق من الهوية:</strong> للتأكد من صحة المعلومات المقدمة</p>
                        <p><strong>تحسين الخدمة:</strong> لتطوير وتحسين منصتنا</p>
                        <p><strong>التواصل:</strong> لإرسال إشعارات مهمة وتحديثات الخدمة</p>
                        <p><strong>الدعم الفني:</strong> لحل المشاكل التقنية ومساعدة المستخدمين</p>
                        <p><strong>الامتثال القانوني:</strong> للوفاء بالالتزامات القانونية والتنظيمية</p>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold text-primary mb-4">4. مشاركة المعلومات</h2>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold mb-2">نشارك معلوماتك في الحالات التالية:</h3>
                          <ul className="list-disc pr-6 space-y-1 text-muted-foreground">
                            <li><strong>مع المحامين:</strong> عند طلب خدمة قانونية</li>
                            <li><strong>مقدمي الخدمات:</strong> الشركات التي تساعدنا في تشغيل المنصة</li>
                            <li><strong>الامتثال القانوني:</strong> عند طلب السلطات المختصة</li>
                            <li><strong>حماية الحقوق:</strong> لحماية حقوقنا أو حقوق الآخرين</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة.</h3>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold text-primary mb-4">5. أمان البيانات</h2>
                      <div className="space-y-2 text-muted-foreground">
                        <p><strong>التشفير:</strong> نستخدم تشفير SSL/TLS لحماية البيانات المنقولة</p>
                        <p><strong>التخزين الآمن:</strong> البيانات محفوظة في خوادم آمنة ومحمية</p>
                        <p><strong>الوصول المحدود:</strong> فقط الموظفون المصرح لهم يمكنهم الوصول للبيانات</p>
                        <p><strong>المراقبة المستمرة:</strong> نراقب أنظمتنا باستمرار للكشف عن أي تهديدات</p>
                        <p><strong>النسخ الاحتياطية:</strong> نحتفظ بنسخ احتياطية آمنة من البيانات</p>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold text-primary mb-4">6. حقوقك</h2>
                      <div className="space-y-2 text-muted-foreground">
                        <p><strong>الوصول:</strong> يمكنك طلب نسخة من بياناتك الشخصية</p>
                        <p><strong>التصحيح:</strong> يمكنك تحديث أو تصحيح معلوماتك</p>
                        <p><strong>الحذف:</strong> يمكنك طلب حذف حسابك وبياناتك</p>
                        <p><strong>النقل:</strong> يمكنك طلب نقل بياناتك لخدمة أخرى</p>
                        <p><strong>الاعتراض:</strong> يمكنك الاعتراض على معالجة بياناتك</p>
                        <p><strong>التقييد:</strong> يمكنك طلب تقييد معالجة بياناتك</p>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold text-primary mb-4">7. ملفات الكوكيز</h2>
                      <div className="space-y-2 text-muted-foreground">
                        <p>نستخدم ملفات الكوكيز لتحسين تجربتك على المنصة.</p>
                        <p><strong>الكوكيز الأساسية:</strong> ضرورية لعمل المنصة بشكل صحيح</p>
                        <p><strong>كوكيز التحليلات:</strong> لفهم كيفية استخدام المنصة</p>
                        <p><strong>كوكيز التفضيلات:</strong> لحفظ إعداداتك وتفضيلاتك</p>
                        <p>يمكنك إدارة إعدادات الكوكيز من خلال متصفحك.</p>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold text-primary mb-4">8. الاحتفاظ بالبيانات</h2>
                      <div className="space-y-2 text-muted-foreground">
                        <p>نحتفظ ببياناتك طالما كان حسابك نشطاً أو حسب الحاجة لتقديم الخدمات.</p>
                        <p>عند حذف حسابك، نحذف معظم بياناتك الشخصية خلال 30 يوماً.</p>
                        <p>قد نحتفظ ببعض المعلومات لفترة أطول للامتثال القانوني أو لحل النزاعات.</p>
                        <p>البيانات المجهولة قد تُحتفظ لأغراض التحليلات والتحسين.</p>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold text-primary mb-4">9. نقل البيانات</h2>
                      <div className="space-y-2 text-muted-foreground">
                        <p>بياناتك تُحفظ في خوادم موجودة في المملكة العربية السعودية.</p>
                        <p>في حالة نقل البيانات خارج المملكة، نضمن نفس مستوى الحماية.</p>
                        <p>نلتزم بقوانين حماية البيانات في جميع الدول التي نعمل بها.</p>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold text-primary mb-4">10. حماية بيانات الأطفال</h2>
                      <div className="space-y-2 text-muted-foreground">
                        <p>منصتنا مخصصة للبالغين (18 سنة فما فوق).</p>
                        <p>لا نجمع معلومات شخصية من الأطفال دون سن 18 سنة عمداً.</p>
                        <p>إذا علمنا بوجود معلومات طفل، سنحذفها فوراً.</p>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold text-primary mb-4">11. التحديثات على السياسة</h2>
                      <div className="space-y-2 text-muted-foreground">
                        <p>قد نحدث هذه السياسة من وقت لآخر.</p>
                        <p>سننشر أي تغييرات على هذه الصفحة مع تاريخ التحديث.</p>
                        <p>التغييرات المهمة ستُرسل إليك عبر البريد الإلكتروني.</p>
                        <p>الاستخدام المستمر للمنصة يعني قبولك للسياسة المحدثة.</p>
                      </div>
                    </section>

                    <section className="bg-primary/5 p-6 rounded-lg">
                      <h2 className="text-xl font-bold text-primary mb-4">12. اتصل بنا</h2>
                      <div className="space-y-2 text-muted-foreground">
                        <p>إذا كان لديك أي أسئلة حول هذه السياسة أو ممارسات الخصوصية:</p>
                        <p><strong>البريد الإلكتروني:</strong> privacy@sanad.com</p>
                        <p><strong>الهاتف:</strong> +966 11 234 5678</p>
                        <p><strong>العنوان:</strong> الرياض، المملكة العربية السعودية</p>
                        <p><strong>مسؤول حماية البيانات:</strong> privacy-officer@sanad.com</p>
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

export default Privacy;
