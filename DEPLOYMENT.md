# 🚀 Resume2Path Deployment Guide

## Prerequisites

1. **GitHub Account** - for source code
2. **Vercel Account** - for hosting and database
3. **OpenAI Account** - for API key

## Step 1: Set Up Vercel Postgres

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Create a new project or use existing
3. Go to **Storage** → **Create Database**
4. Choose **Postgres** and select a region
5. Copy the connection string (POSTGRES_URL)

## Step 2: Set Up Vercel Blob

1. In your Vercel project, go to **Storage** → **Create Store**
2. Choose **Blob** and select a region
3. Copy the token (BLOB_READ_WRITE_TOKEN)

## Step 3: Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy the key (OPENAI_API_KEY)

## Step 4: Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/resume2path.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Set Environment Variables**
   In Vercel dashboard → Settings → Environment Variables:
   ```
   OPENAI_API_KEY=sk-...
   POSTGRES_URL=postgresql://...
   BLOB_READ_WRITE_TOKEN=vercel_blob_...
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   ```

4. **Deploy**
   - Click **Deploy**
   - Wait for build to complete

## Step 5: Set Up Database

1. **Generate Drizzle schema**
   ```bash
   npm run db:generate
   ```

2. **Push schema to database**
   ```bash
   npm run db:push
   ```

## Step 6: Test Your App

1. Visit your deployed URL
2. Upload a test resume
3. Check if analysis works
4. Verify Calendly CTA

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check POSTGRES_URL format
   - Ensure database is in same region as app

2. **File Upload Fails**
   - Verify BLOB_READ_WRITE_TOKEN
   - Check file size limits

3. **AI Analysis Fails**
   - Verify OPENAI_API_KEY
   - Check API quota

### Environment Variables

Make sure these are set in Vercel:
- ✅ `OPENAI_API_KEY`
- ✅ `POSTGRES_URL` 
- ✅ `BLOB_READ_WRITE_TOKEN`
- ✅ `NEXT_PUBLIC_APP_URL`

## 🎉 You're Live!

Your Resume2Path MVP is now deployed and ready to:
- Accept resume uploads
- Process with AI
- Show analysis results
- Drive users to Calendly bookings

## Next Steps

- Customize Calendly URL
- Add your branding
- Set up analytics
- Monitor usage and costs

