"use client";

import { useState } from "react";
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
`;

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");

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
    return value.trim().length >= 10;
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
    const value = e.target.value;
    setMessage(value);
    if (value && !isMessageValid(value)) {
      setMessageError("Message must be at least 10 characters");
    } else {
      setMessageError("");
    }
  };

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
                    className={`w-full px-4 py-3 rounded-xl contact-input text-white placeholder-zinc-500 resize-none ${
                      message && messageError ? "error" : message && isMessageValid(message) ? "success" : ""
                    }`}
                  />
                  {message && isMessageValid(message) && (
                    <span className="absolute right-4 top-3 text-green-500 text-lg">✓</span>
                  )}
                  {message && messageError && (
                    <span className="absolute right-4 top-3 text-red-500 text-lg">✕</span>
                  )}
                </div>
                {messageError && (
                  <p className="text-red-400 text-xs mt-1">{messageError}</p>
                )}
              </div>

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
