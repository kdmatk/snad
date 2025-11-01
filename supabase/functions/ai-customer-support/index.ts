import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `أنت مساعد خدمة العملاء لمنصة الخدمات القانونية العربية. دورك هو مساعدة العملاء والإجابة على استفساراتهم عن المنصة وخدماتها.

معلومات عن المنصة:

**نظرة عامة:**
منصة إلكترونية شاملة مخصصة لربط المحامين المعتمدين بالعملاء الباحثين عن خدمات قانونية احترافية في الوطن العربي.

**الخدمات الرئيسية:**
1. استشارات قانونية فورية (نصية، صوتية، ومرئية)
2. طلب خدمات قانونية متخصصة
3. مزادات القضايا - يمكن للعملاء طرح قضاياهم والحصول على عروض من محامين مختلفين
4. خدمات قانونية سريعة - خدمات جاهزة بأسعار ثابتة وأوقات تسليم محددة
5. تصفح ملفات المحامين المعتمدين مع تقييماتهم وتخصصاتهم
6. مكتبة قانونية تحتوي على مقالات ومواد تعليمية

**مميزات المنصة:**
- محامون معتمدون ومرخصون
- نظام تقييمات شفاف
- أسعار واضحة ومنافسة
- دفع آمن ومضمون
- خدمة عملاء متاحة
- واجهة سهلة الاستخدام
- دعم كامل للغة العربية

**التخصصات القانونية المتاحة:**
- قانون تجاري
- قانون عمل
- أحوال شخصية
- قضايا جنائية
- عقود ومعاملات
- قانون عقاري
- ملكية فكرية
- وغيرها

**كيفية الاستخدام:**
1. التسجيل في المنصة (كعميل أو محامي)
2. تصفح المحامين أو الخدمات المتاحة
3. اختيار الخدمة المناسبة
4. التواصل مع المحامي وإتمام الخدمة
5. تقييم الخدمة

**الأمان والخصوصية:**
- جميع البيانات مشفرة ومحمية
- الالتزام بقوانين حماية البيانات
- سرية المعلومات القانونية

تعليمات الرد:
- كن ودوداً ومحترفاً
- أجب بوضوح وإيجاز
- استخدم اللغة العربية الفصحى البسيطة
- إذا لم تعرف الإجابة، أخبر العميل بأنك ستحيل السؤال لفريق الدعم
- ركز على مساعدة العميل وتقديم قيمة حقيقية`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded" }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required" }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ response: aiResponse }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in ai-customer-support:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
