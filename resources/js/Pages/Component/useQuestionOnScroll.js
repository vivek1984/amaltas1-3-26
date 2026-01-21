import { useEffect, useState } from "react";

export default function useQuestionOnScroll() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // const alreadyAnswered = localStorage.getItem("locationQuestionAnswered");
    // if (alreadyAnswered) return;

    const handleScroll = () => {
      window.removeEventListener("scroll", handleScroll);

      // wait 2s after first scroll
      setTimeout(() => {
        setShowPrompt(true);
      }, 2000);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return [showPrompt, setShowPrompt];
}
