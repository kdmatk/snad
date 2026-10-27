import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AICustomerSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "مرحباً! أنا مساعد خدمة العملاء الذكي. كيف يمكنني مساعدتك بخصوص المنصة؟"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/customer-support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage].slice(-20) })
      });
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          toast({
            title: "عذراً",
            description: "تم تجاوز الحد المسموح من الطلبات. يرجى المحاولة لاحقاً.",
            variant: "destructive"
          });
        } else if (response.status === 402 || response.status === 503) {
          toast({
            title: "خطأ في الخدمة",
            description: "الرجاء التواصل مع الدعم الفني.",
            variant: "destructive"
          });
        } else {
          throw new Error(data.error || "Customer support request failed");
        }
        return;
      }

      if (data?.response) {
        const assistantMessage: Message = {
          role: "assistant",
          content: data.response
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 animate-fade-in">
          <div className="bg-card/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-border">
            <p className="text-sm font-medium text-foreground">تواصل معنا</p>
          </div>
          <div className="relative">
            {/* Ripple effect layers */}
            <div className="absolute inset-0 rounded-full bg-[#d4af37] opacity-20 animate-ping" />
            <div className="absolute inset-0 rounded-full bg-[#d4af37] opacity-10 animate-pulse" />
            
            <Button
              onClick={() => setIsOpen(true)}
              className="relative h-14 w-14 rounded-full shadow-2xl bg-gradient-to-br from-[#d4af37] via-[#f4d03f] to-[#b8941f] hover:shadow-[0_0_40px_rgba(212,175,55,0.7)] transition-all duration-500 hover:scale-110 hover:rotate-12"
              size="icon"
            >
              <div className="relative">
                <MessageCircle className="h-7 w-7 text-white drop-shadow-lg" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full border-2 border-white shadow-lg animate-pulse" />
              </div>
            </Button>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col bg-gradient-to-b from-background to-muted/30">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <h3 className="font-semibold">مساعد ذكي - خدمة العملاء</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-primary-foreground/20 text-primary-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4 bg-transparent" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-muted text-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-end">
                  <div className="bg-primary text-primary-foreground rounded-lg p-3">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="اكتب رسالتك..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default AICustomerSupport;
