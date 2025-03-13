
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowRight, Code, Wand2, Share2, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Landing = () => {
  const navigate = useNavigate();
  const [isHoveredFree, setIsHoveredFree] = useState(false);
  const [isHoveredPro, setIsHoveredPro] = useState(false);
  const [isHoveredTeam, setIsHoveredTeam] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 md:pt-20 lg:pt-28">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-blue-600 ring-1 ring-blue-200 hover:ring-blue-300">
                Now with GPT-4o-mini integration
                <a href="#pricing" className="font-semibold text-blue-700 ml-1">
                  <span className="absolute inset-0" aria-hidden="true"></span>See pricing <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              <span className="inline-block bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
                Mermaid Editor
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Create beautiful diagrams with AI assistance. The most elegant way to visualize your ideas, workflows, and architectures.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button 
                onClick={() => navigate('/editor')} 
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all shadow-md hover:shadow-lg px-8 py-6 text-base"
              >
                Try Editor Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 px-8 py-6 text-base">
                Learn more
              </Button>
            </div>
          </div>
          
          {/* Preview Image */}
          <div className="mt-16 flow-root sm:mt-20">
            <div className="relative rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <img
                src="/editor-preview.png"
                alt="App screenshot"
                className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/1200x800/e6f2ff/1e40af?text=Mermaid+Editor+Preview";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Powerful Diagramming</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to visualize your ideas
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our editor combines the power of Mermaid syntax with AI assistance to help you create professional diagrams in minutes.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Code className="h-6 w-6 text-white" />
                  </div>
                  Intuitive Editor
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Clean, distraction-free interface with syntax highlighting and real-time preview.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Wand2 className="h-6 w-6 text-white" />
                  </div>
                  AI-Powered Generation
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Describe your diagram in plain English and let our AI create the perfect visualization.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Share2 className="h-6 w-6 text-white" />
                  </div>
                  Export & Share
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Export your diagrams as SVG, PNG, or share them directly with a unique link.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  Multiple Diagram Types
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Create flowcharts, sequence diagrams, class diagrams, Gantt charts, and more.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Pricing</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Choose the right plan for you
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Whether you're a solo creator or part of a team, we have a plan that fits your needs.
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-3">
            {/* Free Plan */}
            <Card 
              className={`rounded-3xl ${
                isHoveredFree ? 'border-blue-200 shadow-lg scale-[1.02]' : 'border-gray-200'
              } transition-all duration-300 h-full`}
              onMouseEnter={() => setIsHoveredFree(true)}
              onMouseLeave={() => setIsHoveredFree(false)}
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold leading-8 text-gray-900">Free</CardTitle>
                <CardDescription className="mt-4 flex items-baseline gap-x-2">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">$0</span>
                  <span className="text-base text-gray-500">/month</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  <li className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-blue-600" />
                    <span>Basic diagram editor</span>
                  </li>
                  <li className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-blue-600" />
                    <span>5 AI generations per day</span>
                  </li>
                  <li className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-blue-600" />
                    <span>Export as SVG</span>
                  </li>
                  <li className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-blue-600" />
                    <span>Community support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
                  onClick={() => navigate('/editor')}
                >
                  Get started
                </Button>
              </CardFooter>
            </Card>

            {/* Pro Plan */}
            <Card 
              className={`rounded-3xl ${
                isHoveredPro ? 'border-blue-400 shadow-xl scale-[1.05] z-10' : 'border-blue-300 shadow-lg'
              } relative bg-blue-50 transition-all duration-300 h-full -mx-2 p-2`}
              onMouseEnter={() => setIsHoveredPro(true)}
              onMouseLeave={() => setIsHoveredPro(false)}
            >
              <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-3 py-1 text-center text-sm font-semibold text-white">
                Most popular
              </div>
              <CardHeader>
                <CardTitle className="text-lg font-semibold leading-8 text-gray-900">Pro</CardTitle>
                <CardDescription className="mt-4 flex items-baseline gap-x-2">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">$12</span>
                  <span className="text-base text-gray-500">/month</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  <li className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-blue-600" />
                    <span>Advanced diagram editor</span>
                  </li>
                  <li className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-blue-600" />
                    <span>Unlimited AI generations</span>
                  </li>
                  <li className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-blue-600" />
                    <span>Export as SVG, PNG, PDF</span>
                  </li>
                  <li className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-blue-600" />
                    <span>Save unlimited diagrams</span>
                  </li>
                  <li className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-blue-600" />
                    <span>Priority support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all shadow-md hover:shadow-lg"
                  onClick={() => navigate('/signup?plan=pro')}
                >
                  Subscribe
                </Button>
              </CardFooter>
            </Card>

            {/* Team Plan */}
            <Card 
              className={`rounded-3xl ${
                isHoveredTeam ? 'border-blue-200 shadow-lg scale-[1.02]' : 'border-gray-200'
              } transition-all duration-300 h-full`}
              onMouseEnter={() => setIsHoveredTeam(true)}
              onMouseLeave={() => setIsHoveredTeam(false)}
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold leading-8 text-gray-900">Team</CardTitle>
                <CardDescription className="mt-4 flex items-baseline gap-x-2">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">$49</span>
                  <span className="text-base text-gray-500">/month</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  <li className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-blue-600" />
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-blue-600" />
                    <span>5 team members</span>
                  </li>
                  <li className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-blue-600" />
                    <span>Team collaboration</span>
                  </li>
                  <li className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-blue-600" />
                    <span>Version history</span>
                  </li>
                  <li className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-blue-600" />
                    <span>Dedicated support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
                  onClick={() => navigate('/signup?plan=team')}
                >
                  Subscribe
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to create beautiful diagrams?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Start using our Mermaid Editor today and transform your ideas into clear, professional diagrams.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button 
                onClick={() => navigate('/editor')} 
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all shadow-md hover:shadow-lg px-8 py-6 text-base"
              >
                Try Editor Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                className="border-blue-200 text-blue-700 hover:bg-blue-50 px-8 py-6 text-base"
                onClick={() => navigate('/signup')}
              >
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-500">
              &copy; 2023 Mermaid Editor. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
