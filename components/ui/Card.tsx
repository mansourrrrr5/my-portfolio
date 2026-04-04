import React from "react";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
}

export function Card({ className = "", children, hover = true }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition ${
        hover ? "hover:border-zinc-600 hover:bg-zinc-900" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variants = {
    default: "bg-zinc-800/60 border-zinc-700 text-zinc-100",
    primary: "bg-purple-500/20 border-purple-500 text-purple-200",
    secondary: "bg-blue-500/20 border-blue-500 text-blue-200",
  };

  return (
    <span
      className={`inline-block rounded-lg border px-3 py-1 text-sm font-medium shadow-sm ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto max-w-6xl px-6 ${className}`}>{children}</div>
  );
}

export function SectionGrid({
  children,
  cols = 2,
  className = "",
}: {
  children: React.ReactNode;
  cols?: number;
  className?: string;
}) {
  const colClasses = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  };

  return (
    <div
      className={`grid gap-6 grid-cols-1 ${colClasses[cols as keyof typeof colClasses]} ${className}`}
    >
      {children}
    </div>
  );
}
