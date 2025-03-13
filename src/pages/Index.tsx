
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Download, Copy, Wand2 } from "lucide-react";
import { MermaidPreview } from "@/components/MermaidPreview";
import { generateDiagramWithGPT } from "@/lib/gpt-service";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [mermaidCode, setMermaidCode] = useState<string>(
    "graph TD\n    A[Start] --> B{Is it working?}\n    B -->|Yes| C[Great!]\n    B -->|No| D[Debug]\n    D --> B"
  );
  const [prompt, setPrompt] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("editor");

  const handleGenerateDiagram = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a description for your diagram",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const generatedCode = await generateDiagramWithGPT(prompt);
      setMermaidCode(generatedCode);
      setActiveTab("editor");
      toast({
        title: "Diagram generated",
        description: "Your mermaid diagram has been created",
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Failed to generate diagram. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mermaidCode);
    toast({
      title: "Copied to clipboard",
      description: "Mermaid code copied to clipboard",
    });
  };

  const downloadSVG = () => {
    const svgElement = document.querySelector(".mermaid-preview svg");
    if (svgElement) {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const svgUrl = URL.createObjectURL(svgBlob);
      
      const downloadLink = document.createElement("a");
      downloadLink.href = svgUrl;
      downloadLink.download = "mermaid-diagram.svg";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(svgUrl);
      
      toast({
        title: "Download complete",
        description: "Your diagram has been downloaded as SVG",
      });
    } else {
      toast({
        title: "Download failed",
        description: "Could not find diagram to download",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-light tracking-tight text-gray-800">Mermaid Editor</h1>
          <p className="text-gray-500 mt-1">Create beautiful diagrams with AI assistance</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <Card className="col-span-1 lg:col-span-2 backdrop-blur-sm bg-white/80 border-gray-200 shadow-sm transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-medium text-gray-700">Diagram Editor</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="editor" className="flex-1">Editor</TabsTrigger>
                  <TabsTrigger value="ai" className="flex-1">AI Assistant</TabsTrigger>
                </TabsList>
                
                <TabsContent value="editor" className="mt-0">
                  <Textarea
                    value={mermaidCode}
                    onChange={(e) => setMermaidCode(e.target.value)}
                    placeholder="Enter mermaid code here..."
                    className="font-mono text-sm h-[400px] resize-none bg-gray-50 border-gray-200"
                  />
                </TabsContent>
                
                <TabsContent value="ai" className="mt-0">
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the diagram you want to create..."
                    className="h-[340px] resize-none bg-gray-50 border-gray-200 mb-4"
                  />
                  <Button 
                    onClick={handleGenerateDiagram} 
                    className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors"
                    disabled={isGenerating}
                  >
                    <Wand2 className="mr-2 h-4 w-4" />
                    {isGenerating ? "Generating..." : "Generate Diagram"}
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 pt-0">
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="mr-2 h-4 w-4" />
                Copy Code
              </Button>
              <Button variant="outline" size="sm" onClick={downloadSVG}>
                <Download className="mr-2 h-4 w-4" />
                Export SVG
              </Button>
            </CardFooter>
          </Card>

          <Card className="col-span-1 lg:col-span-3 backdrop-blur-sm bg-white/80 border-gray-200 shadow-sm transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-medium text-gray-700">Preview</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <div className="mermaid-preview bg-white rounded-md p-6 min-h-[400px] flex items-center justify-center border border-gray-100 shadow-inner">
                <MermaidPreview code={mermaidCode} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
