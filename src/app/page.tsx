'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, User, Mail, Target, ArrowRight, Sparkles, CheckCircle, TrendingUp, Users, MessageCircle, Bot, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Chatbot from '@/components/Chatbot';
import ChatBox from '@/components/ChatBox';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    targetRole: ''
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !formData.email) return;

    setIsLoading(true);
    const data = new FormData();
    data.append('file', file);
    data.append('email', formData.email);
    data.append('name', formData.name);
    data.append('targetRole', formData.targetRole);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        const { analysisId } = await response.json();
        router.push(`/analysis/${analysisId}`);
      } else {
        alert('Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const scrollToUpload = () => {
    document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative bg-navy-950">
      <Header />
      <Hero />
      
      {/* Upload Section */}
      <section id="upload-section" className="py-20 bg-ocean-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Start Your Career Analysis
            </h2>
            <p className="text-lg text-ocean-200">
              Upload resume for AI mentorship feedback powered by Gemini AI
            </p>
          </div>

          <Card className="shadow-lg border-0 bg-ocean-800">
            <CardHeader className="text-center">
              <CardTitle className="text-xl flex items-center justify-center gap-2 text-white">
                <Upload className="h-6 w-6 text-ocean-300" />
                Resume Analysis
              </CardTitle>
              <CardDescription className="text-ocean-200">
                Get AI-powered career insights from Gemini AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-ocean-200 mb-2">
                      <Mail className="h-4 w-4 inline mr-2 text-ocean-400" />
                      Email *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="border-ocean-600 bg-ocean-700 text-white placeholder-ocean-300 focus:border-ocean-400 focus:ring-ocean-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ocean-200 mb-2">
                      <User className="h-4 w-4 inline mr-2 text-ocean-400" />
                      Full Name
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      className="border-ocean-600 bg-ocean-700 text-white placeholder-ocean-300 focus:border-ocean-400 focus:ring-ocean-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-ocean-200 mb-2">
                    <Target className="h-4 w-4 inline mr-2 text-ocean-400" />
                    Target Role
                  </label>
                  <select
                    value={formData.targetRole}
                    onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                    className="w-full h-12 px-4 py-2 border border-ocean-600 bg-ocean-700 text-white rounded-lg text-sm focus:border-ocean-400 focus:ring-ocean-400 transition-colors"
                  >
                    <option value="">Select your target role</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Data Analyst">Data Analyst</option>
                    <option value="Data Scientist">Data Scientist</option>
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Product Manager">Product Manager</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-ocean-200 mb-2">
                    <FileText className="h-4 w-4 inline mr-2 text-ocean-400" />
                    Resume/CV *
                  </label>
                  <div className="border-2 border-dashed border-ocean-500 rounded-xl p-8 text-center hover:border-ocean-400 transition-colors bg-ocean-700/50">
                    <input
                      type="file"
                      accept=".pdf,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                      required
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="h-16 w-16 text-ocean-400 mx-auto mb-4" />
                      <p className="text-lg text-white font-medium">
                        {file ? file.name : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-sm text-ocean-300 mt-2">
                        PDF or DOCX up to 10MB
                      </p>
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !file || !formData.email}
                  className="w-full h-14 text-lg bg-gradient-to-r from-ocean-600 to-ocean-700 hover:from-ocean-700 hover:to-ocean-800 text-white shadow-lg hover:shadow-ocean-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  {isLoading ? 'Analyzing with Gemini AI...' : 'Analyze Resume with Gemini AI'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-ocean-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Powered by Gemini AI
            </h2>
            <p className="text-lg text-ocean-200 max-w-3xl mx-auto">
              Advanced AI analysis powered by Google's Gemini 2.0 Flash model. 
              <span className="font-semibold text-white"> Continuously updated with latest job market data and mentor insights.</span>
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-ocean-800 hover:shadow-lg transition-all duration-300 group">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-ocean-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Mentorship AI</h3>
              <p className="text-ocean-200 text-sm">Real CV transformations from experienced mentors</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-ocean-800 hover:shadow-lg transition-all duration-300 group">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-ocean-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Smart Feedback</h3>
              <p className="text-ocean-200 text-sm">Actionable insights, not just keywords</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-ocean-800 hover:shadow-lg transition-all duration-300 group">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="w-8 h-8 text-ocean-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Career Path</h3>
              <p className="text-ocean-200 text-sm">Personalized roadmap for your goals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Continuous Learning Section */}
      <section className="py-20 bg-ocean-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Gemini AI + Market Intelligence
            </h2>
            <p className="text-lg text-ocean-200 max-w-3xl mx-auto">
              Google's Gemini AI combined with real-time job market data for superior analysis
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-ocean-700 p-8 rounded-2xl shadow-lg border border-ocean-600">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-ocean-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Real-time Job Market Data</h3>
              <ul className="space-y-3 text-ocean-200">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-ocean-300 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Latest industry trends and requirements</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-ocean-300 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Emerging skills and technologies</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-ocean-300 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Salary benchmarks and market demands</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-ocean-700 p-8 rounded-2xl shadow-lg border border-ocean-600">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-ocean-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Mentor Experience Integration</h3>
              <ul className="space-y-3 text-ocean-200">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-ocean-300 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Continuous feedback from active mentors</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-ocean-300 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Success patterns from recent placements</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-ocean-300 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Industry-specific mentoring strategies</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <div className="bg-white text-ocean-900 p-6 rounded-2xl inline-block shadow-lg">
              <p className="text-lg font-semibold">
                Gemini AI + Real-time Market Data = Superior Analysis
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-ocean-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-ocean-200">
              3 simple steps to career insights
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-ocean-600 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Upload</h3>
              <p className="text-ocean-200 text-sm">PDF or DOCX resume</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-ocean-600 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Analyze</h3>
              <p className="text-ocean-200 text-sm">AI reviews skills & gaps</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-ocean-600 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Improve</h3>
              <p className="text-ocean-200 text-sm">Get actionable feedback</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Feature Section */}
      <section className="py-20 bg-ocean-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Chat with AI Career Assistant
            </h2>
            <p className="text-lg text-ocean-200 max-w-3xl mx-auto">
              Get instant career advice, resume tips, and job search strategies. 
              Our AI assistant is available 24/7 to help you succeed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-ocean-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Answers</h3>
              <p className="text-ocean-200">Ask anything about resumes, interviews, or career growth</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Bot className="w-8 h-8 text-ocean-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Powered</h3>
              <p className="text-ocean-200">Powered by Google's Gemini AI for intelligent responses</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-ocean-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Always Available</h3>
              <p className="text-ocean-200">24/7 access to career guidance and support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-ocean-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-lg text-ocean-200 mb-8">
            Join professionals who've improved their careers with Gemini AI-powered mentorship
          </p>
          <Button 
            size="lg" 
            onClick={scrollToUpload}
            className="bg-white text-ocean-900 hover:bg-ocean-50 px-8 py-4 text-lg font-semibold shadow-lg transition-all duration-300"
          >
            Get Started Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      <Chatbot />
      <ChatBox />
    </div>
  );
}
