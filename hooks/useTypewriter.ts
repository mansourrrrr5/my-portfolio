import { useState, useEffect } from "react";

interface UseTypewriterOptions {
  words: string[];
  speed?: number; // ms per character
  delayBetweenWords?: number; // ms before switching to next word
  loop?: boolean;
  respectMotion?: boolean; // default true - disable animation if prefers-reduced-motion
}

export function useTypewriter({
  words,
  speed = 100,
  delayBetweenWords = 2000,
  loop = true,
  respectMotion = true,
}: UseTypewriterOptions) {
  const [displayText, setDisplayText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion =
      respectMotion &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // If reduced motion is preferred, show first word immediately as static text
    if (prefersReducedMotion) {
      setDisplayText(words[0]);
      return;
    }

    const currentWord = words[currentWordIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing phase
      if (displayText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, speed);
      } else {
        // Word is complete, wait before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, delayBetweenWords);
      }
    } else {
      // Deleting phase
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, speed / 2); // Faster deletion
      } else {
        // Word is deleted, move to next word
        setIsDeleting(false);
        setCurrentWordIndex((prev) =>
          loop ? (prev + 1) % words.length : Math.min(prev + 1, words.length - 1)
        );
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWordIndex, words, speed, delayBetweenWords, loop, respectMotion]);

  return displayText;
}
