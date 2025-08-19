export const runtime = 'nodejs';
import { put } from '@vercel/blob';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';
import { db } from '@/db';
import { mentees, resumes, analyses } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

async function toText(file: File) {
  const buf = Buffer.from(await file.arrayBuffer());
  if (file.type === 'application/pdf') return (await pdf(buf)).text;
  if (file.type.includes('word') || file.name.endsWith('.docx')) {
    const { value } = await mammoth.extractRawText({ buffer: buf });
    return value;
  }
  throw new Error('Unsupported');
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get('file') as File;
    const email = String(form.get('email')||'');
    const name = String(form.get('name')||'');
    const targetRole = String(form.get('targetRole')||'');
    
    if (!file || !email) {
      return NextResponse.json({ error: 'Missing file or email' }, { status: 400 });
    }

    // Upload to Vercel Blob
    const { url } = await put(`cv/${crypto.randomUUID()}-${file.name}`, file, { access: 'public' });
    
    // Parse file to text
    const text = await toText(file);

    // Upsert mentee
    const [m] = await db.insert(mentees).values({ email, name, targetRole }).onConflictDoNothing().returning();
    const menteeId = m?.id ?? (await db.select({ id: mentees.id }).from(mentees).where(eq(mentees.email, email))).at(0)?.id!;
    
    // Insert resume
    const [r] = await db.insert(resumes).values({ menteeId, fileUrl: url, fileType: file.type, textContent: text }).returning();

    // Use Gemini AI for analysis
    const geminiResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/gemini`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text.slice(0, 14000),
        targetRole: targetRole || 'General'
      })
    });

    if (!geminiResponse.ok) {
      throw new Error('Failed to analyze with Gemini AI');
    }

    const geminiData = await geminiResponse.json();
    const analysisResult = geminiData.result;

    // Fallback structure if Gemini doesn't return expected format
    const struct = {
      skills: analysisResult.skills || [],
      experience: analysisResult.experience || [],
      summary: analysisResult.summary || ''
    };

    const suggest = {
      gaps: analysisResult.gaps || [],
      suggestions: analysisResult.suggestions || [],
      fit: analysisResult.fit || 7
    };

    // Insert analysis
    const [a] = await db.insert(analyses).values({ 
      resumeId: r.id, 
      result: {
        skills: struct.skills, 
        experience: struct.experience,
        gaps: suggest.gaps, 
        suggestions: suggest.suggestions,
        fit: suggest.fit,
        tracks: [{ 
          id: 'mentorship-basic', 
          title: '1-1 CV + Mock Interview', 
          ctaUrl: 'https://calendly.com/your-mentor/intro' 
        }]
      }
    }).returning();

    return NextResponse.json({ analysisId: a.id });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
