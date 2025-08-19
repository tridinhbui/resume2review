'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, User, Mail, Target, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function UploadPage() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Resume Analysis
          </h1>
          <p className="text-xl text-gray-600">
            Upload your CV and get AI-powered gap analysis and career suggestions
          </p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-6 w-6 text-blue-600" />
              Resume Analysis
            </CardTitle>
            <CardDescription>
              Get personalized insights to improve your resume and career prospects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="h-4 w-4 inline mr-2 text-blue-600" />
                    Email *
                  </label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4 inline mr-2 text-blue-600" />
                    Full Name
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Target className="h-4 w-4 inline mr-2 text-blue-600" />
                    Target Role
                  </label>
                  <select
                    value={formData.targetRole}
                    onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                    className="w-full h-10 px-3 py-2 border border-gray-300 bg-white rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FileText className="h-4 w-4 inline mr-2 text-blue-600" />
                    Resume/CV *
                  </label>
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors bg-blue-50/50">
                    <input
                      type="file"
                      accept=".pdf,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                      required
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                      <p className="text-sm text-gray-600">
                        {file ? file.name : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF or DOCX up to 10MB
                      </p>
                    </label>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading || !file || !formData.email}
                className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? 'Analyzing...' : 'Analyze Resume'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

