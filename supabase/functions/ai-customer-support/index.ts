import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Compatibility endpoint for existing clients. Inference runs on Cloudflare.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return new Response(null, { status: 405, headers: corsHeaders });
  try {
    const upstream = await fetch("https://snad-legal.mdyafalarabia.workers.dev/api/customer-support", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: req.body,
      signal: AbortSignal.timeout(30000),
    });
    return new Response(upstream.body, {
      status: upstream.status,
      headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "خدمة المساعد غير متاحة مؤقتاً. يرجى المحاولة لاحقاً." }), {
      status: 503,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
