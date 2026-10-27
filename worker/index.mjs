const SYSTEM_PROMPT = "أنت مساعد خدمة العملاء لمنصة الخدمات القانونية العربية. دورك هو مساعدة العملاء والإجابة على استفساراتهم عن المنصة وخدماتها.\n\nمعلومات عن المنصة:\n\n**نظرة عامة:**\nمنصة إلكترونية شاملة مخصصة لربط المحامين المعتمدين بالعملاء الباحثين عن خدمات قانونية احترافية في الوطن العربي.\n\n**الخدمات الرئيسية:**\n1. استشارات قانونية فورية (نصية، صوتية، ومرئية)\n2. طلب خدمات قانونية متخصصة\n3. مزادات القضايا - يمكن للعملاء طرح قضاياهم والحصول على عروض من محامين مختلفين\n4. خدمات قانونية سريعة - خدمات جاهزة بأسعار ثابتة وأوقات تسليم محددة\n5. تصفح ملفات المحامين المعتمدين مع تقييماتهم وتخصصاتهم\n6. مكتبة قانونية تحتوي على مقالات ومواد تعليمية\n\n**مميزات المنصة:**\n- محامون معتمدون ومرخصون\n- نظام تقييمات شفاف\n- أسعار واضحة ومنافسة\n- دفع آمن ومضمون\n- خدمة عملاء متاحة\n- واجهة سهلة الاستخدام\n- دعم كامل للغة العربية\n\n**التخصصات القانونية المتاحة:**\n- قانون تجاري\n- قانون عمل\n- أحوال شخصية\n- قضايا جنائية\n- عقود ومعاملات\n- قانون عقاري\n- ملكية فكرية\n- وغيرها\n\n**كيفية الاستخدام:**\n1. التسجيل في المنصة (كعميل أو محامي)\n2. تصفح المحامين أو الخدمات المتاحة\n3. اختيار الخدمة المناسبة\n4. التواصل مع المحامي وإتمام الخدمة\n5. تقييم الخدمة\n\n**الأمان والخصوصية:**\n- جميع البيانات مشفرة ومحمية\n- الالتزام بقوانين حماية البيانات\n- سرية المعلومات القانونية\n\nتعليمات الرد:\n- كن ودوداً ومحترفاً\n- أجب بوضوح وإيجاز\n- استخدم اللغة العربية الفصحى البسيطة\n- إذا لم تعرف الإجابة، أخبر العميل بأنك ستحيل السؤال لفريق الدعم\n- ركز على مساعدة العميل وتقديم قيمة حقيقية";
const json = (data, status = 200, headers = {}) => Response.json(data, {
  status,
  headers: { "Cache-Control": "no-store", ...headers },
});

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/health") {
      return json({ status: "ok", service: "snad-legal", hosting: "cloudflare", ai: "workers-ai" });
    }
    if (url.pathname !== "/api/customer-support") {
      if (url.pathname.startsWith("/api/")) return json({ error: "Not found" }, 404);
      return env.ASSETS.fetch(request);
    }
    if (request.method !== "POST") return json({ error: "Method not allowed" }, 405, { Allow: "POST" });
    const origin = request.headers.get("Origin");
    if (origin && origin !== url.origin) return json({ error: "Forbidden origin" }, 403);
    if (!request.headers.get("Content-Type")?.includes("application/json")) {
      return json({ error: "Expected application/json" }, 415);
    }
    const { success } = await env.SUPPORT_RATE_LIMIT.limit({ key: request.headers.get("CF-Connecting-IP") || "unknown" });
    if (!success) return json({ error: "Rate limit exceeded" }, 429, { "Retry-After": "60" });
    const reader = request.body?.getReader();
    if (!reader) return json({ error: "Missing body" }, 400);
    const chunks = [];
    let size = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 24576) {
        await reader.cancel();
        return json({ error: "Request too large" }, 413);
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    let body;
    try { body = JSON.parse(new TextDecoder().decode(bytes)); }
    catch { return json({ error: "Invalid JSON" }, 400); }
    const messages = body?.messages;
    if (!Array.isArray(messages) || messages.length < 1 || messages.length > 20 ||
      messages.some(message => !message || !["user", "assistant"].includes(message.role) ||
        typeof message.content !== "string" || !message.content.trim() || message.content.length > 3000) ||
      messages.at(-1).role !== "user") {
      return json({ error: "Invalid messages" }, 400);
    }
    try {
      const result = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages.map(({ role, content }) => ({ role, content }))],
        temperature: 0.7,
        max_tokens: 500,
      });
      if (typeof result.response !== "string" || !result.response.trim()) throw new Error("Empty AI response");
      return json({ response: result.response });
    } catch (error) {
      console.error(JSON.stringify({ event: "customer_support_error", message: error instanceof Error ? error.message : "Unknown error" }));
      return json({ error: "خدمة المساعد غير متاحة مؤقتاً. يرجى المحاولة لاحقاً." }, 503);
    }
  },
};
