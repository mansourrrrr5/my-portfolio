"use client";

import { useState } from "react";
import { portfolioConfig } from "@/data/content";
import { Card } from "@/components/ui/Card";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");

  const { ref: emailRef, className: emailClassName } = useScrollReveal({
    threshold: 0.3,
    delay: 0,
  });
  const { ref: formRef, className: formClassName } = useScrollReveal({
    threshold: 0.3,
    delay: 100,
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

    // Validate before submission
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
    <div className="space-y-6">
      {/* Email Section */}
      <div
        ref={emailRef as React.RefObject<HTMLDivElement>}
        className={`transition-all duration-600 ${emailClassName}`}
      >
        <Card>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <p className="text-zinc-300 mb-4">
                Let's build something amazing together. Feel free to reach out!
              </p>

              <div className="space-y-3">
                <a
                  href={`mailto:${portfolioConfig.email}`}
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition"
                >
                  <span>✉️</span>
                  <span>{portfolioConfig.email}</span>
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-300 transition text-sm ml-2"
                  aria-label={copied ? "Email copied to clipboard" : "Copy email address to clipboard"}
                >
                  <span>📋</span>
                  <span>{copied ? "Copied!" : "Copy email"}</span>
                </button>
              </div>

              {/* Social Links */}
              <div className="flex flex-col gap-2 mt-4">
                {portfolioConfig.socials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800 transition text-sm text-zinc-300 w-fit"
                    aria-label={social.label}
                  >
                    <span>{social.label}</span>
                    <span>↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Contact Form */}
      <div
        ref={formRef as React.RefObject<HTMLDivElement>}
        className={`transition-all duration-600 ${formClassName} ${
          status === "success" ? "border border-green-500/50" : ""
        }`}
      >
        <Card
          className={`transition-all ${
            status === "success"
              ? "border-green-500/50 shadow-lg shadow-green-500/20"
              : ""
          }`}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Send a Message</h3>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                Your Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="your@email.com"
                  className={`w-full px-4 py-2 rounded-lg border bg-zinc-900/40 text-white placeholder-zinc-500 focus:outline-none transition ${
                    email && emailError
                      ? "border-red-500 focus:border-red-500"
                      : email && isEmailValid(email)
                        ? "border-green-500 focus:border-green-500"
                        : "border-zinc-700 focus:border-purple-500"
                  }`}
                />
                {email && isEmailValid(email) && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-lg">
                    ✓
                  </span>
                )}
                {email && emailError && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 text-lg">
                    ✕
                  </span>
                )}
              </div>
              {emailError && (
                <p className="text-red-400 text-xs mt-1">{emailError}</p>
              )}
            </div>

            {/* Message Input */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
                Message
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  value={message}
                  onChange={handleMessageChange}
                  placeholder="Tell me about your project..."
                  rows={4}
                  className={`w-full px-4 py-2 rounded-lg border bg-zinc-900/40 text-white placeholder-zinc-500 focus:outline-none transition resize-none ${
                    message && messageError
                      ? "border-red-500 focus:border-red-500"
                      : message && isMessageValid(message)
                        ? "border-green-500 focus:border-green-500"
                        : "border-zinc-700 focus:border-purple-500"
                  }`}
                />
                {message && isMessageValid(message) && (
                  <span className="absolute right-3 top-3 text-green-500 text-lg">
                    ✓
                  </span>
                )}
                {message && messageError && (
                  <span className="absolute right-3 top-3 text-red-500 text-lg">
                    ✕
                  </span>
                )}
              </div>
              {messageError && (
                <p className="text-red-400 text-xs mt-1">{messageError}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "loading" || !isFormValid}
              aria-label={status === "success" ? "Message sent successfully" : "Send message button"}
              className={`w-full px-4 py-2 rounded-lg font-semibold transition relative flex items-center justify-center gap-2 ${
                status === "loading"
                  ? "bg-purple-600 text-white"
                  : status === "success"
                    ? "bg-green-600 text-white"
                    : !isFormValid
                      ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
              }`}
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
            </button>

            {status === "success" && (
              <p className="text-green-400 text-sm text-center animate-pulse">
                Thanks for your message! I'll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-sm text-center">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
}
