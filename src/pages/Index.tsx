
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Download, Copy, Wand2, Code, Save } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <div className="inline-block bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
            <h1 className="text-4xl font-bold tracking-tight">Mermaid Editor</h1>
          </div>
          <p className="text-gray-600 mt-2 text-lg">Create beautiful diagrams with AI assistance</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <Card className="col-span-1 lg:col-span-2 backdrop-blur-sm bg-white/90 border border-blue-100 shadow-md rounded-xl transition-all duration-300 hover:shadow-lg">
            <CardHeader className="pb-3 border-b border-blue-50">
              <CardTitle className="text-xl font-medium text-blue-800 flex items-center">
                <Code className="mr-2 h-5 w-5 text-blue-500" />
                Diagram Editor
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full mb-4 bg-blue-50 p-1">
                  <TabsTrigger 
                    value="editor" 
                    className="flex-1 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm"
                  >
                    Editor
                  </TabsTrigger>
                  <TabsTrigger 
                    value="ai" 
                    className="flex-1 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm"
                  >
                    AI Assistant
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="editor" className="mt-0">
                  <Textarea
                    value={mermaidCode}
                    onChange={(e) => setMermaidCode(e.target.value)}
                    placeholder="Enter mermaid code here..."
                    className="font-mono text-sm h-[400px] resize-none bg-blue-50/50 border-blue-100 focus:border-blue-300 focus:ring-blue-200"
                  />
                </TabsContent>
                
                <TabsContent value="ai" className="mt-0">
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the diagram you want to create..."
                    className="h-[340px] resize-none bg-blue-50/50 border-blue-100 focus:border-blue-300 focus:ring-blue-200 mb-4"
                  />
                  <Button 
                    onClick={handleGenerateDiagram} 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all shadow-md hover:shadow-lg"
                    disabled={isGenerating}
                  >
                    <Wand2 className="mr-2 h-4 w-4" />
                    {isGenerating ? "Generating..." : "Generate Diagram"}
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between gap-2 pt-0 border-t border-blue-50 mt-2 p-3">
              <Button variant="ghost" size="sm" onClick={copyToClipboard} className="text-blue-700 hover:text-blue-800 hover:bg-blue-50">
                <Copy className="mr-2 h-4 w-4" />
                Copy Code
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={downloadSVG} className="border-blue-200 text-blue-700 hover:bg-blue-50">
                  <Download className="mr-2 h-4 w-4" />
                  Export SVG
                </Button>
                <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card className="col-span-1 lg:col-span-3 backdrop-blur-sm bg-white/90 border border-blue-100 shadow-md rounded-xl transition-all duration-300 hover:shadow-lg">
            <CardHeader className="pb-3 border-b border-blue-50">
              <CardTitle className="text-xl font-medium text-blue-800">Preview</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mermaid-preview bg-gradient-to-br from-white to-blue-50 rounded-lg p-6 min-h-[400px] flex items-center justify-center border border-blue-100 shadow-inner">
                <MermaidPreview code={mermaidCode} />
              </div>
            </CardContent>
          </Card>
        </div>

        <footer className="mt-12 text-center text-sm text-blue-600/70">
          <p>Create, edit and share beautiful diagrams with Mermaid and AI</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
