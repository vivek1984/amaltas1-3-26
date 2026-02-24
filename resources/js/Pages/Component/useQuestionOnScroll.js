import { useEffect, useRef, useState } from "react";

export default function useQuestionOnScroll() {
  const [showPrompt, setShowPrompt] = useState(false);
  const triggeredRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (triggeredRef.current) return;

      triggeredRef.current = true;

      setTimeout(() => {
        setShowPrompt(true);
      }, 2000);
    };

    window.addEventListener("scroll", handleScroll, { once: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return [showPrompt, setShowPrompt];
}