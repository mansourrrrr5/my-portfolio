"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { PortfolioConfig } from "@/types";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ContactProps {
  config: PortfolioConfig;
}

const contactStyles = `
  .contact-blob {
    position: absolute;
    pointer-events: none;
    filter: blur(100px);
  }

  .contact-input {
    background: rgba(24, 24, 27, 0.5);
    border: 1px solid rgba(113, 113, 122, 0.5);
    transition: all 0.3s ease;
  }

  .contact-input:focus {
    border-color: #a855f7;
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
    outline: none;
  }

  .contact-input.error {
    border-color: #ef4444;
  }

  .contact-input.success {
    border-color: #10b981;
  }

  @keyframes gradient-shift {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 0.8; }
  }

  .gradient-blob {
    animation: gradient-shift 4s ease-in-out infinite;
  }

  @keyframes fade-out {
    0% { opacity: 1; }
    100% { opacity: 0; }
  }

  .min-length-hint {
    animation: fade-out 0.3s ease-out forwards;
  }
`;

const MAX_MESSAGE_LENGTH = 500;
const MIN_MESSAGE_LENGTH = 10;

export default function Contact({ config }: ContactProps) {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageCharCount, setMessageCharCount] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");
  
  // Smart reply suggestions
  const [replySuggestions, setReplySuggestions] = useState<string[]>([]);
  const [showReplySuggestions, setShowReplySuggestions] = useState(false);
  const [replyLoading, setReplyLoading] = useState(false);
  const replyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { ref: contactRef, className: contactClassName } = useScrollReveal({
    threshold: 0.2,
    delay: 0,
  });

  // Email validation
  const isEmailValid = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  // Message validation
  const isMessageValid = (value: string): boolean => {
    return value.trim().length >= MIN_MESSAGE_LENGTH && value.length <= MAX_MESSAGE_LENGTH;
  };

  // Determine character counter color based on count
  const getCharacterCountColor = (count: number): string => {
    if (count === 0) return "text-zinc-500";
    if (count < 400) return "text-green-500";
    if (count < 480) return "text-amber-500";
    return "text-red-500";
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !isEmailValid(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;
    // Prevent exceeding max length
    if (value.length > MAX_MESSAGE_LENGTH) {
      value = value.slice(0, MAX_MESSAGE_LENGTH);
    }
    setMessage(value);
    setMessageCharCount(value.length);
    
    // Update error message based on character count
    if (value && value.length < MIN_MESSAGE_LENGTH) {
      setMessageError(`Message must be at least ${MIN_MESSAGE_LENGTH} characters`);
    } else if (value.length > MAX_MESSAGE_LENGTH) {
      setMessageError("Message cannot exceed 500 characters");
    } else {
      setMessageError("");
    }

    // Debounce smart reply suggestions after 30 characters
    if (replyTimeoutRef.current) {
      clearTimeout(replyTimeoutRef.current);
    }

    if (value.length >= 30) {
      setShowReplySuggestions(false);
      replyTimeoutRef.current = setTimeout(() => {
        fetchSmartReplySuggestions(value);
      }, 1500);
    } else {
      setReplySuggestions([]);
      setShowReplySuggestions(false);
    }
  };

const fetchSmartReplySuggestions = async (messageText: string) => {
  setReplyLoading(true);

  try {
    const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
    console.log("API KEY:", process.env.NEXT_PUBLIC_OPENROUTER_API_KEY);
    if (!apiKey) throw new Error("OpenRouter API key not configured");

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "http://localhost:3000",
        "X-OpenRouter-Title": "Aziz Portfolio Chat",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        max_tokens: 150,
        temperature: 0.4,
        messages: [
          {
            role: "system",
            content:
              'Given a message from a website visitor, suggest 3 concise smart reply starters that Aziz could use to respond. Return ONLY a valid JSON array of strings. Example: ["Thanks for reaching out!", "Great question about...", "I appreciate your interest..."]',
          },
          {
            role: "user",
            content: `Message: "${messageText}"`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenRouter smart reply error:", response.status, errText);
      throw new Error(`API error: ${response.status} ${errText}`);
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content ?? "[]";

    let suggestions: string[] = [];

    try {
      suggestions = JSON.parse(rawContent);
    } catch {
      // fallback if model wraps JSON in markdown fences
      const cleaned = rawContent
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();

      suggestions = JSON.parse(cleaned);
    }

    setReplySuggestions(Array.isArray(suggestions) ? suggestions : []);
    setShowReplySuggestions(true);
  } catch (error) {
    console.error("Smart reply error:", error);
    setReplySuggestions([]);
    setShowReplySuggestions(false);
  } finally {
    setReplyLoading(false);
  }
};
  const handleReplySuggestionClick = async (suggestion: string) => {
    await navigator.clipboard.writeText(suggestion);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(config.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isEmailValid(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    if (!isMessageValid(message)) {
      setMessageError("Message must be at least 10 characters");
      return;
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      setMessageError("Message cannot exceed 500 characters");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setStatus("success");
      setEmail("");
      setMessage("");
      setMessageCharCount(0);
      setEmailError("");
      setMessageError("");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
      setMessageError("Failed to send message. Please try again.");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const isFormValid = email && message && !emailError && !messageError;

  return (
    <>
      <style>{contactStyles}</style>
      <motion.div
        ref={contactRef as React.RefObject<HTMLDivElement>}
        className={`relative rounded-3xl border border-zinc-700 bg-zinc-900/60 p-10 md:p-12 will-change-transform ${contactClassName}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Decorative gradient blobs */}
        <div className="contact-blob gradient-blob absolute -top-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="contact-blob gradient-blob absolute -bottom-20 -right-20 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl" style={{ animationDelay: "1s" }} />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* LEFT COLUMN — Info Panel */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Let's build something amazing
              </span>
            </h2>

            <p className="text-zinc-300 text-lg mb-8 leading-relaxed">
              Have a project in mind? Let's collaborate and create something extraordinary together.
            </p>

            {/* Email Section */}
            <div className="mb-8">
              <p className="text-sm text-zinc-400 mb-2">Email</p>
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${config.email}`}
                  className="text-purple-400 hover:text-purple-300 transition text-lg font-medium"
                >
                  {config.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/30 hover:border-purple-500 hover:bg-purple-500/20 transition text-xs text-purple-400 font-medium"
                  aria-label="Copy email address to clipboard"
                  title={copied ? "Copied!" : "Copy email"}
                >
                  {copied ? "✓ Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <p className="text-sm text-zinc-400 mb-3">Follow</p>
              <div className="flex flex-wrap gap-3">
                {config.socials.map((social: any) => (
                  <motion.a
                    key={social.platform}
                    href={social.platform === "resume" ? "/Lebenslauf_.pdf" : social.url}
                    target={social.platform === "resume" ? undefined : "_blank"}
                    rel={social.platform === "resume" ? undefined : "noopener noreferrer"}
                    download={social.platform === "resume" ? true : undefined}
                    className="px-4 py-2 rounded-full border border-zinc-700 bg-zinc-800/50 hover:border-purple-500 hover:bg-purple-500/10 transition text-sm text-zinc-300 hover:text-purple-300 will-change-transform"
                    aria-label={social.label}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN — Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-zinc-300 mb-2">
                  Your Email
                </label>
                <div className="relative">
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="you@example.com"
                    className={`w-full px-4 py-3 rounded-xl contact-input text-white placeholder-zinc-500 ${
                      email && emailError ? "error" : email && isEmailValid(email) ? "success" : ""
                    }`}
                  />
                  {email && isEmailValid(email) && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 text-lg">✓</span>
                  )}
                  {email && emailError && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 text-lg">✕</span>
                  )}
                </div>
                {emailError && (
                  <p className="text-red-400 text-xs mt-1">{emailError}</p>
                )}
              </div>

              {/* Message Input */}
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-zinc-300 mb-2">
                  Message
                </label>
                <div className="relative">
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={handleMessageChange}
                    placeholder="Tell me about your project..."
                    rows={5}
                    maxLength={MAX_MESSAGE_LENGTH}
                    className={`w-full px-4 py-3 rounded-xl contact-input text-white placeholder-zinc-500 resize-none ${
                      message && messageError ? "error" : message && isMessageValid(message) ? "success" : ""
                    }`}
                  />
                  {/* Min length hint - fades away at 10 chars */}
                  {messageCharCount > 0 && messageCharCount < MIN_MESSAGE_LENGTH && (
                    <div className="absolute right-4 top-3 text-zinc-400 text-xs min-length-hint">
                      min {MIN_MESSAGE_LENGTH} chars
                    </div>
                  )}
                  {/* Success/error indicators */}
                  {messageCharCount >= MIN_MESSAGE_LENGTH && messageCharCount <= MAX_MESSAGE_LENGTH && !messageError && (
                    <span className="absolute right-4 top-3 text-green-500 text-lg">✓</span>
                  )}
                  {message && messageError && messageCharCount <= 10 && (
                    <span className="absolute right-4 top-3 text-red-500 text-lg">✕</span>
                  )}
                </div>
                {/* Character counter with color coding */}
                <div className="flex items-center justify-between mt-2">
                  {messageError && (
                    <p className="text-red-400 text-xs">{messageError}</p>
                  )}
                  <div className={`text-xs ml-auto ${getCharacterCountColor(messageCharCount)}`}>
                    {messageCharCount}/{MAX_MESSAGE_LENGTH}
                  </div>
                </div>

                {/* Smart Reply Suggestions */}
                {showReplySuggestions && !replyLoading && replySuggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 space-y-2"
                  >
                    <p className="text-xs text-zinc-400">Suggested replies:</p>
                    <div className="flex flex-wrap gap-2">
                      {replySuggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleReplySuggestionClick(suggestion)}
                          className="text-xs px-3 py-1 rounded-full bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 border border-purple-500/50 transition cursor-pointer"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-zinc-500">Click any to copy to clipboard</p>
                  </motion.div>
                )}

                {replyLoading && (
                  <div className="mt-3 flex gap-2 items-center text-xs text-zinc-400">
                    <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-200" />
                  </div>
                )}
              </div>

              {/* Ask AI about Aziz Widget */}
              {(() => {
                const quickQuestions = [
                  { 
                    label: "Projects", 
                    question: "Tell me about Aziz's key projects and what makes them technically impressive." 
                  },
                  { 
                    label: "Experience", 
                    question: "What is Aziz's professional experience and what has he built at Swisslog?" 
                  },
                  { 
                    label: "Tech Stack", 
                    question: "What technologies does Aziz specialize in and what is he strongest at?" 
                  },
                  { 
                    label: "Work with Aziz", 
                    question: "Why should I hire Aziz and what kind of roles suit him best?" 
                  },
                ];

                const handleQuickAsk = (question: string) => {
                  window.dispatchEvent(
                    new CustomEvent("open-ai-chat", { detail: question })
                  );
                };

                return (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-xl border border-zinc-700 bg-zinc-800/30 p-4 space-y-3"
                  >
                    <p className="text-sm font-medium text-zinc-300">Ask AI about Aziz</p>
                    <div className="flex flex-wrap gap-2">
                      {quickQuestions.map((q) => (
                        <motion.button
                          key={q.label}
                          type="button"
                          onClick={() => handleQuickAsk(q.question)}
                          className="px-3 py-1.5 rounded-full text-xs font-medium border border-zinc-600 
                                     bg-zinc-800/50 text-zinc-300 hover:border-purple-500 
                                     hover:bg-purple-500/10 hover:text-purple-300 transition-all"
                          whileHover={{ 
                            scale: 1.05, 
                            boxShadow: "0 0 12px rgba(168, 85, 247, 0.3)" 
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {q.label}
                        </motion.button>
                      ))}
                    </div>
                    <p className="text-xs text-zinc-500">
                      Click any topic to ask the AI assistant instantly
                    </p>
                  </motion.div>
                );
              })()}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status === "loading" || !isFormValid}
                className={`w-full px-6 py-3 rounded-xl font-semibold transition relative flex items-center justify-center gap-2 will-change-transform ${
                  status === "loading"
                    ? "bg-purple-600 text-white"
                    : status === "success"
                      ? "bg-green-600 text-white"
                      : !isFormValid
                        ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white"
                }`}
                whileHover={!isFormValid && status === "idle" ? { scale: 1.02 } : {}}
                whileTap={!isFormValid && status === "idle" ? { scale: 0.98 } : {}}
              >
                {status === "loading" && (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </>
                )}
                {status === "success" && (
                  <>
                    <span className="text-lg">✓</span>
                    Message Sent!
                  </>
                )}
                {status !== "loading" && status !== "success" && "Send Message"}
              </motion.button>

              {status === "success" && (
                <p className="text-green-400 text-sm text-center animate-pulse">
                  Thanks for your message! I'll get back to you soon.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
