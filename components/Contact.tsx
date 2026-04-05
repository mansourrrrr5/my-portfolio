"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { portfolioConfig } from "@/data/content";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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

export default function Contact() {
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

  // Cover letter generator
  const [showCoverLetter, setShowCoverLetter] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [coverLetterOutput, setCoverLetterOutput] = useState("");
  const [coverLetterLoading, setCoverLetterLoading] = useState(false);

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
      const apiKey = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY;
      if (!apiKey) throw new Error("API key not configured");

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 150,
          system:
            "Given a message from a website visitor, suggest 3 concise smart reply starters that Aziz could use to respond. Return as JSON array of strings only. Example: [\"Thanks for reaching out!\", \"Great question about...\", \"I appreciate your interest...\"]",
          messages: [
            {
              role: "user",
              content: `Message: "${messageText}"`,
            },
          ],
        }),
      });

      if (!response.ok) throw new Error("API error");

      let fullResponse = "";
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const json = JSON.parse(line.slice(6));
              if (json.type === "content_block_delta" && json.delta?.text) {
                fullResponse += json.delta.text;
              }
            } catch {
              // Skip non-JSON lines
            }
          }
        }
      }

      // Parse JSON response
      const suggestions = JSON.parse(fullResponse);
      setReplySuggestions(Array.isArray(suggestions) ? suggestions : []);
      setShowReplySuggestions(true);
    } catch (error) {
      console.error("Smart reply error:", error);
      setReplySuggestions([]);
    } finally {
      setReplyLoading(false);
    }
  };

  const handleReplySuggestionClick = async (suggestion: string) => {
    await navigator.clipboard.writeText(suggestion);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateCoverLetter = async () => {
    if (!jobDescription.trim()) return;

    setCoverLetterLoading(true);
    setCoverLetterOutput("");

    try {
      const apiKey = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY;
      if (!apiKey) throw new Error("API key not configured");

      const systemPrompt = `You are writing a cover letter for Aziz, a Software Engineer & AI Specialist. Here is his profile: ${JSON.stringify(
        portfolioConfig,
        null,
        2
      )}. Write a concise, personalized cover letter for the job description provided. 3 paragraphs max. Do not use generic phrases.`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 600,
          system: systemPrompt,
          messages: [
            {
              role: "user",
              content: `Job Description: ${jobDescription}`,
            },
          ],
        }),
      });

      if (!response.ok) throw new Error("API error");

      let fullResponse = "";
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const json = JSON.parse(line.slice(6));
              if (json.type === "content_block_delta" && json.delta?.text) {
                fullResponse += json.delta.text;
                setCoverLetterOutput(fullResponse);
              }
            } catch {
              // Skip non-JSON lines
            }
          }
        }
      }
    } catch (error) {
      console.error("Cover letter error:", error);
      setCoverLetterOutput("Error generating cover letter. Please try again.");
    } finally {
      setCoverLetterLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(coverLetterOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const wordCount = coverLetterOutput.split(/\s+/).filter((word) => word.length > 0).length;

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(portfolioConfig.email);
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      setEmail("");
      setMessage("");
      setEmailError("");
      setMessageError("");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
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
                  href={`mailto:${portfolioConfig.email}`}
                  className="text-purple-400 hover:text-purple-300 transition text-lg font-medium"
                >
                  {portfolioConfig.email}
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
                {portfolioConfig.socials.map((social) => (
                  <motion.a
                    key={social.platform}
                    href={social.platform === "resume" ? "/resume.pdf" : social.url}
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

              {/* Cover Letter Generator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border border-zinc-700 rounded-xl p-4 bg-zinc-800/30"
              >
                <button
                  type="button"
                  onClick={() => setShowCoverLetter(!showCoverLetter)}
                  className="flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition"
                >
                  {showCoverLetter ? "▼" : "▶"} Generate Cover Letter
                </button>

                {showCoverLetter && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-3"
                  >
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-2">
                        Paste Job Description
                      </label>
                      <textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Paste the job description or role title here..."
                        rows={4}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-700 text-white text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleGenerateCoverLetter}
                      disabled={coverLetterLoading || !jobDescription.trim()}
                      className="w-full px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:bg-zinc-700 text-white text-sm font-medium transition"
                    >
                      {coverLetterLoading ? "Generating..." : "Generate Cover Letter"}
                    </button>

                    {coverLetterOutput && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-zinc-400">
                            Word count: {wordCount}
                          </p>
                          <button
                            type="button"
                            onClick={copyToClipboard}
                            className="text-xs px-2 py-1 rounded bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 transition"
                          >
                            {copied ? "✓ Copied!" : "Copy"}
                          </button>
                        </div>
                        <textarea
                          readOnly
                          value={coverLetterOutput}
                          rows={5}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-700 text-zinc-200 text-sm resize-none focus:outline-none"
                        />
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>

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
