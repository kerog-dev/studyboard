import { useEffect, useRef } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import renderMathInElement from "katex/contrib/auto-render";
import "katex/dist/katex.min.css";

export default function GeminiResponse({ text }: { text: string }) {
  const ref = useRef(null);

  useEffect(() => {
    (async () => {
      if (!ref.current || !text) return;

      ref.current.innerHTML = DOMPurify.sanitize(await marked.parse(text));
      renderMathInElement(ref.current, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\[", right: "\\]", display: true },
          { left: "\\(", right: "\\)", display: false },
        ],
        throwOnError: false,
      });
    })();
  }, [text]);

  return <div ref={ref} />;
}
