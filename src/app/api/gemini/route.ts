import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = 'AIzaSyAHhwD9coZ9sIMcqyDGkkS_5AsgnNxbdCc';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export async function POST(req: NextRequest) {
  try {
    const { text, targetRole, isChat } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text content is required' }, { status: 400 });
    }

    let prompt: string;
    
    if (isChat) {
      // Chat mode - general career advice
      prompt = `You are an AI career assistant. Provide helpful, friendly advice about resumes, career development, job search strategies, and professional growth. 

User question: ${text}

Please provide a helpful response that is:
- Professional but friendly
- Actionable and specific
- Under 200 words
- Focused on career development

If the user asks about resume analysis, provide general tips and guidance.`;
    } else {
      // Resume analysis mode
      prompt = `Analyze this resume for a ${targetRole || 'professional'} role and provide:

1. **Skills Assessment**: List key skills found and rate them (1-10)
2. **Gap Analysis**: Identify missing skills for the target role
3. **Improvement Suggestions**: Specific actionable advice
4. **Career Fit**: How well this resume fits the target role (1-10)
5. **Learning Tracks**: Recommend 2-3 learning paths

Resume content:
${text}

Please provide a structured JSON response with these sections.`;
    }

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', errorData);
      return NextResponse.json({ error: 'Failed to analyze with Gemini AI' }, { status: 500 });
    }

    const data = await response.json();
    
    // Extract the text content from Gemini response
    const geminiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!geminiText) {
      return NextResponse.json({ error: 'Invalid response from Gemini AI' }, { status: 500 });
    }

    // Handle response based on mode
    let analysisResult;
    
    if (isChat) {
      // Chat mode - return text response directly
      analysisResult = {
        description: geminiText,
        type: 'chat'
      };
    } else {
      // Resume analysis mode - try to parse JSON
      try {
        // Look for JSON content in the response
        const jsonMatch = geminiText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          analysisResult = JSON.parse(jsonMatch[0]);
        } else {
          // Fallback: create structured response from text
          analysisResult = {
            skills: [],
            gaps: [],
            suggestions: [],
            fit: 7,
            tracks: [
              {
                title: "Career Development Path",
                description: geminiText,
                ctaUrl: "https://calendly.com/your-mentor"
              }
            ]
          };
        }
      } catch (parseError) {
        console.error('Failed to parse Gemini response:', parseError);
        // Fallback response
        analysisResult = {
          skills: [],
          gaps: [],
          suggestions: [],
          fit: 7,
          tracks: [
            {
              title: "Career Development Path",
              description: geminiText,
              ctaUrl: "https://calendly.com/your-mentor"
            }
          ]
        };
      }
    }

    return NextResponse.json({
      success: true,
      result: analysisResult,
      rawGeminiResponse: geminiText
    });

  } catch (error) {
    console.error('Gemini API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
