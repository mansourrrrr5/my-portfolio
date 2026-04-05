import { useEffect, useRef, useState } from "react";

export interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number; // Additional delay in milliseconds
}

// Shared IntersectionObserver pool with configuration caching
interface ObserverConfig {
  threshold: number;
  rootMargin: string;
}

const observerPool = new Map<string, IntersectionObserver>();
const elementRegistry = new Map<
  HTMLElement,
  {
    callback: (isVisible: boolean) => void;
    delay: number;
    timeoutId?: NodeJS.Timeout;
  }
>();

function getConfigKey(config: ObserverConfig): string {
  return `${config.threshold}_${config.rootMargin}`;
}

function getOrCreateObserver(config: ObserverConfig): IntersectionObserver {
  const key = getConfigKey(config);

  if (!observerPool.has(key)) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          const registration = elementRegistry.get(element);

          if (registration) {
            if (entry.isIntersecting) {
              // Clear any pending timeout
              if (registration.timeoutId) {
                clearTimeout(registration.timeoutId);
              }

              // Apply delay if specified
              if (registration.delay > 0) {
                registration.timeoutId = setTimeout(() => {
                  registration.callback(true);
                  registration.timeoutId = undefined;
                }, registration.delay);
              } else {
                registration.callback(true);
              }
            }
          }
        });
      },
      config
    );

    observerPool.set(key, observer);
  }

  return observerPool.get(key)!;
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    delay = 0,
  } = options;

  const ref = useRef<HTMLElement | HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // If reduced motion is preferred, immediately show the element
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    // Get or create observer for this configuration
    const observer = getOrCreateObserver({
      threshold,
      rootMargin,
    });

    // Register element with callback
    elementRegistry.set(element, {
      callback: setIsVisible,
      delay,
    });

    // Start observing
    observer.observe(element);

    // Cleanup function
    return () => {
      // Clear any pending timeout
      const registration = elementRegistry.get(element);
      if (registration?.timeoutId) {
        clearTimeout(registration.timeoutId);
      }

      // Unobserve element
      observer.unobserve(element);

      // Remove from registry
      elementRegistry.delete(element);

      // If no more elements registered, disconnect this observer
      if (elementRegistry.size === 0) {
        const key = getConfigKey({ threshold, rootMargin });
        observerPool.delete(key);
        observer.disconnect();
      }
    };
  }, [threshold, rootMargin, delay]);

  return {
    ref,
    isVisible,
    className: isVisible
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-5",
  };
}
