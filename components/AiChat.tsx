"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioConfig } from "@/data/content";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `You are Aziz's AI assistant. Here is Aziz's portfolio information:

${JSON.stringify(portfolioConfig, null, 2)}

Help visitors learn about Aziz's work, skills, and experience. Be concise, friendly, and professional. If asked something outside of Aziz's profile, politely redirect to his work.`;

export default function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! Ask me anything about Aziz's work, skills, or projects.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handler = (e: Event) => {
      const question = (e as CustomEvent<string>).detail;
      setIsOpen(true);
      // Small delay so the panel animates open before the message fires
      setTimeout(() => {
        handleSendMessage(question);
      }, 400);
    };
    window.addEventListener("open-ai-chat", handler);
    return () => window.removeEventListener("open-ai-chat", handler);
  }, []);

  const handleSendMessage = async (overrideText?: string) => {
    const textToSend = overrideText ?? input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    if (!overrideText) setInput("");
    setIsLoading(true);

    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;

      if (!apiKey) {
        throw new Error("OpenRouter API key not configured");
      }

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Aziz Portfolio Chat",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          max_tokens: 400,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
            userMessage,
          ],
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("OpenRouter error:", response.status, errText);
        throw new Error(`API error: ${response.status} ${errText}`);
      }

      const data = await response.json();
      const assistantMessage =
        data.choices?.[0]?.message?.content || "No response.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantMessage },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-20 left-6 z-40">
      <AnimatePresence mode="wait">
        {!isOpen && (
          <motion.button
            key="bubble"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg hover:shadow-xl transition flex items-center justify-center text-white text-2xl cursor-pointer"
            aria-label="Open chat"
          >
            💬
          </motion.button>
        )}

        {isOpen && (
          <motion.div
            key="panel"
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute bottom-0 left-0 w-[360px] h-[480px] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 flex justify-between items-center">
              <h3 className="text-white font-semibold">Chat with Aziz's AI-Assitant</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 text-xl"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-4 py-2 text-sm ${
                      msg.role === "user"
                        ? "bg-purple-600 text-white"
                        : "bg-zinc-800 text-zinc-200"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-800 rounded-lg px-4 py-2">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-zinc-800 p-4 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask me anything..."
                className="flex-1 bg-zinc-800 text-white placeholder-zinc-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !input.trim()}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-zinc-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition"
                aria-label="Send message"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}