# Resume2Path – MVP

**Goal**: Upload CV → parse → AI extract → show gaps + suggestions → CTA book 1–1 (Calendly). Keep infra nhỏ gọn, dễ ship trong 1–2 ngày.

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```

3. **Set up database**
   ```bash
   npm run db:generate
   npm run db:push
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 🔧 Environment Variables

Create a `.env.local` file with:

```env
# OpenAI API Key for GPT-4o-mini
OPENAI_API_KEY=your_openai_api_key_here

# Vercel Postgres Database URL
POSTGRES_URL=your_vercel_postgres_url_here

# Vercel Blob Storage Token
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token_here

# Your app URL (for production)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Resend API Key for email functionality
# RESEND_API_KEY=your_resend_api_key_here
```

## 🏗️ Architecture

### Stack
- **Frontend**: Next.js 14 (App Router, TypeScript)
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Vercel Postgres + Drizzle ORM
- **Storage**: Vercel Blob
- **AI**: OpenAI GPT-4o-mini
- **Deployment**: Vercel

### Database Schema
- `mentees`: User information (email, name, target role)
- `resumes`: Resume files and parsed content
- `analyses`: AI analysis results (skills, gaps, suggestions)

### Flow
1. User uploads CV on `/upload`
2. File processed via `/api/upload`
3. AI extracts skills and identifies gaps
4. Results displayed on `/analysis/[id]`
5. CTA to book 1-on-1 session

## 📁 Project Structure

```
src/
├── app/
│   ├── api/upload/route.ts    # File upload & AI processing
│   ├── analysis/[id]/page.tsx # Analysis results
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Upload form
├── components/ui/             # shadcn/ui components
├── db/                        # Database schema & connection
└── lib/                       # Utility functions
```

## 🚀 Deployment

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Set environment variables in Vercel dashboard**
4. **Deploy!**

## 🔮 Future Enhancements

- Email notifications (Resend)
- Stripe checkout integration
- Mentor dashboard
- Advanced PDF annotation
- Queue system for heavy processing

## 📝 License

MIT

