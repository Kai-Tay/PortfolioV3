import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToHashElement() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Remove the '#' character
      const targetId = hash.replace("#", "");
      const element = document.getElementById(targetId);

      if (element) {
        // Scroll to the element after a brief delay to ensure layout is ready
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
        return () => clearTimeout(timer);
      }
    } else {
      // Scroll to the top when navigating to a new route without a hash
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, hash]);

  return null;
}

export default ScrollToHashElement;
