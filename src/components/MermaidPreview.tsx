
import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { Skeleton } from "@/components/ui/skeleton";

interface MermaidPreviewProps {
  code: string;
}

export const MermaidPreview = ({ code }: MermaidPreviewProps) => {
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: "forest",
      securityLevel: "loose",
      fontFamily: "Inter, sans-serif",
      themeVariables: {
        primaryColor: "#3b82f6",
        primaryTextColor: "#1e40af",
        primaryBorderColor: "#60a5fa",
        lineColor: "#3b82f6",
        secondaryColor: "#93c5fd",
        tertiaryColor: "#dbeafe"
      }
    });
  }, []);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!code.trim()) {
        setSvg("");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const { svg } = await mermaid.render("mermaid-diagram", code);
        setSvg(svg);
        setError(null);
      } catch (err) {
        console.error("Mermaid rendering error:", err);
        setError("Failed to render diagram. Please check your syntax.");
        setSvg("");
      } finally {
        setLoading(false);
      }
    };

    // Add a small delay to prevent too many renders during typing
    const timer = setTimeout(() => {
      renderDiagram();
    }, 300);

    return () => clearTimeout(timer);
  }, [code]);

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center">
        <Skeleton className="w-3/4 h-40 mb-4 bg-blue-100" />
        <Skeleton className="w-1/2 h-6 bg-blue-100" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center p-6 border border-blue-200 bg-blue-50 rounded-lg text-blue-700">
        <p className="font-medium mb-2">Error rendering diagram</p>
        <p className="text-sm">{error}</p>
        <div className="mt-4 p-3 bg-white/70 rounded-md border border-blue-100 text-xs text-blue-600 font-mono overflow-auto max-h-[200px]">
          {code}
        </div>
        <p className="text-xs mt-4 text-blue-500">Check your mermaid syntax and try again</p>
      </div>
    );
  }

  return (
    <div 
      ref={mermaidRef}
      className="w-full flex items-center justify-center transition-all duration-500 ease-in-out"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};
