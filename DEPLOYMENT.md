# Deploying FixMyCity to Vercel

This guide will help you deploy your FixMyCity application to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Vercel CLI installed (`npm i -g vercel`)
3. Your GitHub repository ready for deployment

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Connect your GitHub repository:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository: `https://github.com/Swarspage/FixMyCity.git`

2. **Configure build settings:**
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `dist/public`
   - Install Command: `npm install`

3. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically build and deploy your application

### Option 2: Deploy via CLI

1. **Login to Vercel:**
   ```bash
   vercel login
   ```

2. **Deploy from project directory:**
   ```bash
   vercel
   ```

3. **Follow the prompts:**
   - Link to existing project? No
   - What's your project's name? FixMyCity
   - In which directory is your code located? ./
   - Want to override the settings? No

## Configuration Files

The following files have been configured for Vercel deployment:

- `vercel.json` - Vercel configuration
- `api/[...slug].ts` - Serverless API handler
- `.env.example` - Environment variables template

## Environment Variables

If your application requires environment variables:

1. In Vercel Dashboard → Project Settings → Environment Variables
2. Add any required variables from `.env.example`

## Post-Deployment

After successful deployment:

1. Your frontend will be available at the Vercel URL
2. API endpoints will be available at `https://your-app.vercel.app/api/`
3. All routes are handled by the serverless function in `api/[...slug].ts`

## Troubleshooting

- **Build fails**: Check the build logs in Vercel dashboard
- **API not working**: Ensure all dependencies are in `dependencies`, not `devDependencies`
- **Runtime errors**: Check the Functions tab in Vercel dashboard for logs

## Local Development

For local development, continue using:
```bash
npm run dev
```

This will run your development server with hot reloading.