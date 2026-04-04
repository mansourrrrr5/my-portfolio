"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const cursorX = useRef(0);
  const cursorY = useRef(0);

  useEffect(() => {
    // Check if touch device
    const isTouchDeviceCheck = () => {
      return (
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0
      );
    };
    setIsTouchDevice(isTouchDeviceCheck());

    if (isTouchDeviceCheck()) return;

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    // Detect hovering over buttons/links
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, label, select, textarea')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, label, select, textarea')) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    // Animation loop
    let animationFrameId: number;

    const animate = () => {
      // Lerp interpolation
      const speed = 0.35;
      cursorX.current += (mouseX.current - cursorX.current) * speed;
      cursorY.current += (mouseY.current - cursorY.current) * speed;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorX.current}px`;
        cursorRef.current.style.top = `${cursorY.current}px`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
      cancelAnimationFrame(animationFrameId);
      // Ensure cursor is restored on cleanup
      if (cursorRef.current) {
        cursorRef.current.style.cursor = "none";
      }
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <style>{`
        body {
          cursor: none;
        }
      `}</style>
      <div
        ref={cursorRef}
        className={`fixed w-3 h-3 rounded-full bg-purple-500 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-100 shadow-lg ${
          isHovering ? "w-10 h-10 bg-purple-400 opacity-60" : "opacity-100"
        }`}
        style={{
          cursor: "none",
          ...(
            isHovering
              ? { boxShadow: "0 0 20px rgba(168, 85, 247, 0.6)" }
              : { boxShadow: "0 0 10px rgba(168, 85, 247, 0.8)" }
          ),
        }}
      />
    </>
  );
}
