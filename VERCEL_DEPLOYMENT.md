# Deploying to Vercel

This guide will help you deploy your Express TypeScript PostgreSQL CRUD application to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Git Repository**: Your project must be on GitHub, GitLab, or Bitbucket
3. **Node.js**: Make sure your `package.json` has a `build` script

## Step-by-Step Deployment Guide

### 1. Prepare Your Project

Make sure your project is ready:

```bash
# Build TypeScript
npm run build

# Verify build output exists in dist/ folder
ls -la dist/
```

### 2. Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for Vercel deployment"

# Push to GitHub
git push origin main
```

### 3. Deploy to Vercel (Option A: Using Vercel CLI)

Install Vercel CLI:
```bash
npm install -g vercel
```

Deploy your project:
```bash
vercel
```

This will:
- Guide you through the deployment process
- Link your GitHub repository
- Deploy your application

### 4. Deploy to Vercel (Option B: Using Vercel Dashboard)

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Select your Git repository
4. Configure project settings:
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click "Deploy"

### 5. Set Environment Variables

After deploying:

1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add the following variables:

```
CONNECTION_STRING=<your-postgresql-connection-string>
PORT=3000
NODE_ENV=production
JWT_SECRET=<your-jwt-secret>
```

> ⚠️ **Important**: Never commit `.env` files. Vercel securely stores these variables.

### 6. Redeploy After Setting Environment Variables

After setting environment variables, trigger a redeployment:

1. Go to "Deployments" tab
2. Click on the latest deployment
3. Click "Redeploy" or push a new commit to trigger automatic redeployment

## Key Files Created

- **vercel.json**: Vercel deployment configuration
- **.vercelignore**: Files to ignore during deployment

## Important Configuration Notes

### package.json Scripts
Your `package.json` already has these scripts configured:
- `build`: Compiles TypeScript to JavaScript
- `start`: Runs the compiled application
- `dev`: Development mode with nodemon

### Database Connection

⚠️ **Important**: 
- Use environment variables for database connection strings
- Never hardcode sensitive information
- Ensure your PostgreSQL database is accessible from Vercel servers
- Consider using Neon DB for serverless PostgreSQL hosting

### Node Version

To specify a Node version, add to `vercel.json`:
```json
{
  "engines": {
    "node": "18.x"
  }
}
```

## Troubleshooting

### Build Fails
```bash
# Check build logs
vercel logs --tail
```

### Environment Variables Not Applied
- Redeploy after adding variables
- Verify variable names match your code

### Database Connection Issues
- Ensure CONNECTION_STRING is correct
- Check if database allows Vercel IP ranges
- Consider using Neon DB which works better with Vercel

### Port Issues
- Vercel automatically assigns a PORT via environment variable
- Use `process.env.PORT || 5000` in your code

## Useful Vercel Commands

```bash
# List all deployments
vercel list

# View logs in real-time
vercel logs --tail

# Remove a deployment
vercel remove <deployment-id>

# Check production URL
vercel --prod
```

## Alternative: Neon DB for PostgreSQL

For better Vercel compatibility, use Neon DB:

1. Sign up at [neon.tech](https://neon.tech)
2. Create a PostgreSQL database
3. Copy the connection string
4. Set it as `CONNECTION_STRING` in Vercel

## That's It! 🎉

Your application should now be live on Vercel. You can access it via the URL provided on your project dashboard.

For more help, visit the [Vercel Documentation](https://vercel.com/docs).
