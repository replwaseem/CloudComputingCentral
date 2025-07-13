import { Helmet } from "react-helmet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedContent } from "@/components/ui/animated-content";
import { Mail, Github, Linkedin, MapPin, Calendar, Coffee, Code } from "lucide-react";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About - TechOrbeez</title>
        <meta name="description" content="Learn about the author behind TechOrbeez - a passionate cloud computing expert sharing insights on AWS, Python, and NodeJS." />
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <AnimatedContent animation="fade-in" className="text-center mb-12">
            <div className="relative mb-8">
              <img 
                src="https://via.placeholder.com/200x200/4f46e5/ffffff?text=Profile" 
                alt="Profile" 
                className="w-32 h-32 rounded-full mx-auto border-4 border-primary-500 shadow-lg"
              />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Available for Consulting
                </Badge>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Hi, I'm Waseem Shaik
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Cloud Computing Enthusiast • Full-Stack Developer • Technical Writer
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                India
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                15+ years experience
              </div>
              <div className="flex items-center">
                <Coffee className="h-4 w-4 mr-1" />
                Coffee enthusiast
              </div>
            </div>
          </AnimatedContent>

          {/* About Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <AnimatedContent animation="slide-up" delay={200}>
                <div className="bg-white rounded-lg shadow-md p-8 dark:bg-gray-800">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">About Me</h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Welcome to TechOrbeez! I'm a passionate cloud computing professional with over 15 years 
                      of experience in building scalable applications and infrastructure solutions.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      My journey in technology started with a curiosity about how things work behind the scenes. 
                      Today, I specialize in AWS cloud services, Python backend development, and modern JavaScript frameworks. 
                      I believe in sharing knowledge and helping others navigate the ever-evolving world of cloud technology.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Through this blog, I aim to break down complex cloud concepts into digestible tutorials, 
                      share real-world implementation experiences, and provide practical insights that you can 
                      apply in your own projects.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      When I'm not coding or writing, you can find me exploring new technologies, 
                      contributing to open-source projects, or enjoying a good cup of coffee while 
                      planning the next big idea.
                    </p>
                  </div>
                </div>
              </AnimatedContent>
            </div>

            <div className="space-y-6">
              {/* Skills */}
              <AnimatedContent animation="slide-up" delay={300}>
                <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Core Skills</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Cloud Platforms</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">AWS</Badge>
                        <Badge variant="secondary">Azure</Badge>
                        <Badge variant="secondary">GCP</Badge>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Programming</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">Python</Badge>
                        <Badge variant="secondary">JavaScript</Badge>
                        <Badge variant="secondary">TypeScript</Badge>
                        <Badge variant="secondary">Node.js</Badge>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Frameworks</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">React</Badge>
                        <Badge variant="secondary">Express</Badge>
                        <Badge variant="secondary">FastAPI</Badge>
                        <Badge variant="secondary">Django</Badge>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">DevOps</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">Docker</Badge>
                        <Badge variant="secondary">Kubernetes</Badge>
                        <Badge variant="secondary">Terraform</Badge>
                        <Badge variant="secondary">CI/CD</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedContent>

              {/* Contact */}
              <AnimatedContent animation="slide-up" delay={400}>
                <div className="bg-primary-50 rounded-lg shadow-md p-6 dark:bg-gray-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Let's Connect</h3>
                  <div className="space-y-3">
                    <a 
                      href="mailto:emayl.waseem@gmail.com" 
                      className="flex items-center text-gray-600 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
                    >
                      <Mail className="h-5 w-5 mr-3" />
                      emayl.waseem@gmail.com
                    </a>
                    <a 
                      href="https://github.com/replwaseem" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
                    >
                      <Github className="h-5 w-5 mr-3" />
                      @replwaseem
                    </a>
                    <a 
                      href="https://linkedin.com/in/waseemshaik" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
                    >
                      <Linkedin className="h-5 w-5 mr-3" />
                      LinkedIn Profile
                    </a>

                  </div>
                  <div className="mt-6">
                    <Button className="w-full bg-primary-500 hover:bg-primary-600 text-white">
                      <Code className="h-4 w-4 mr-2" />
                      Hire Me for Projects
                    </Button>
                  </div>
                </div>
              </AnimatedContent>
            </div>
          </div>



          {/* Call to Action */}
          <AnimatedContent animation="fade-in" delay={600}>
            <div className="text-center bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Let's Build Something Amazing Together</h2>
              <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
                Whether you're looking for cloud consulting, need help with a project, 
                or just want to discuss the latest in tech, I'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" className="bg-white text-primary-600 hover:bg-gray-100">
                  <Mail className="h-4 w-4 mr-2" />
                  Get In Touch
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                  View My Work
                </Button>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </>
  );
}