import { useEffect } from "react";

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
  const embedUrl = `https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`;

  useEffect(() => {
    const scriptSrc = "https://tally.so/widgets/embed.js";

    const load = () => {
      if (window.Tally) {
        window.Tally.loadEmbeds();
      }
    };

    if (typeof window !== "undefined") {
      if (window.Tally) {
        load();
      } else if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
        const script = document.createElement("script");
        script.src = scriptSrc;
        script.async = true;
        script.onload = load;
        document.body.appendChild(script);
      } else {
        // Script exists, just trigger load
        load();
      }
    }
  }, [formId]);

  return (
    <iframe
      src={embedUrl}
      data-tally-src={embedUrl}
      loading="lazy"
      width="100%"
      height={height}
      frameBorder="0"
      marginHeight={0}
      marginWidth={0}
      title="Tally Form"
      className="w-full"
    ></iframe>
  );
};

export default TallyEmbed;
