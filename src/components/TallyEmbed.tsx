import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
    };
  }
}

interface TallyEmbedProps {
  formId: string;
  height?: number;
}

const TallyEmbed = ({ formId, height = 500 }: TallyEmbedProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const embedUrl = `https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`;

  useEffect(() => {
    const scriptSrc = "https://tally.so/widgets/embed.js";

    const load = () => {
      if (window.Tally) {
        window.Tally.loadEmbeds();
      } else {
        // Fallback: If Tally global isn't available, manually set src
        if (iframeRef.current && !iframeRef.current.src) {
          iframeRef.current.src = embedUrl;
        }
      }
    };

    if (typeof window !== "undefined") {
      let script = document.querySelector(
        `script[src="${scriptSrc}"]`
      ) as HTMLScriptElement;

      if (!script) {
        script = document.createElement("script");
        script.src = scriptSrc;
        script.async = true;
        script.onload = load;
        script.onerror = load; // Fallback on error
        document.body.appendChild(script);
      } else {
        load();
      }
    }
  }, [formId, embedUrl]);

  return (
    <iframe
      ref={iframeRef}
      data-tally-src={embedUrl}
      loading="lazy"
      width="100%"
      height={height}
      frameBorder="0"
      marginHeight={0}
      marginWidth={0}
      title={`Form ${formId}`}
      className="w-full"
    />
  );
};

export default TallyEmbed;
