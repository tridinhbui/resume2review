'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, AlertCircle, ArrowRight, Target, Lightbulb, Calendar } from 'lucide-react';

interface AnalysisResult {
  skills: {
    hard: string[];
    soft: string[];
  };
  experience: Array<{
    company: string;
    title: string;
    bullets: string[];
  }>;
  gaps: string[];
  suggestions: Array<{
    section: string;
    change: string;
    reason: string;
  }>;
  fit: string;
  tracks: Array<{
    id: string;
    title: string;
    ctaUrl: string;
  }>;
}

export default function AnalysisPage() {
  const params = useParams();
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await fetch(`/api/analysis/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setAnalysis(data.result);
        } else {
          console.error('Failed to fetch analysis');
        }
      } catch (error) {
        console.error('Error fetching analysis:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Analyzing your resume...</p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Analysis not found</p>
        </div>
      </div>
    );
  }

  const getFitColor = (fit: string) => {
    switch (fit) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'mid': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFitText = (fit: string) => {
    switch (fit) {
      case 'high': return 'High Fit';
      case 'mid': return 'Medium Fit';
      case 'low': return 'Low Fit';
      default: return 'Unknown Fit';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Resume Analysis Results
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <Target className="h-6 w-6 text-blue-200" />
              <span className="text-xl text-blue-100">Target Role: Backend Developer</span>
            </div>
            <Badge className={`${getFitColor(analysis.fit)} text-lg px-4 py-2`}>
              {getFitText(analysis.fit)}
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Skills Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Current Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm text-gray-700 mb-2">Hard Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.skills.hard.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-gray-700 mb-2">Soft Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.skills.soft.map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gaps Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                Skills Gaps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {analysis.gaps.map((gap, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-gray-700">{gap}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Suggestions Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-blue-600" />
              Improvement Suggestions
            </CardTitle>
            <CardDescription>
              Specific recommendations to improve your resume for the target role
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {analysis.suggestions.map((suggestion, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    <span className="font-medium">{suggestion.section}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pt-2">
                      <div>
                        <h5 className="font-semibold text-sm text-gray-700">Suggested Change:</h5>
                        <p className="text-gray-600">{suggestion.change}</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm text-gray-700">Reason:</h5>
                        <p className="text-gray-600">{suggestion.reason}</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-2xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Calendar className="h-7 w-7" />
              Ready to Take Action?
            </CardTitle>
            <CardDescription className="text-blue-100 text-lg">
              Book a 1-on-1 session with our career mentors to dive deeper into your analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h4 className="font-semibold text-lg mb-3">{analysis.tracks[0].title}</h4>
                <p className="text-blue-100">
                  Get personalized feedback on your resume and practice mock interviews
                </p>
              </div>
              <Button 
                asChild 
                size="lg" 
                className="w-full bg-white text-blue-600 hover:bg-blue-50 h-14 text-lg font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <a href={analysis.tracks[0].ctaUrl} target="_blank" rel="noopener noreferrer">
                  Book 1-on-1 Session
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
