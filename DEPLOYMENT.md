# Deployment Guide for Render

This guide will help you deploy the KGF Gold Price Predictor Frontend to Render as a static site.

## Prerequisites

- A Render account (sign up at https://render.com)
- Your repository pushed to GitHub, GitLab, or Bitbucket
- Backend API already deployed (currently at: `https://kgf-gold-price-predictor-ml-backend.onrender.com`)

## Deployment Steps

### Option 1: Using Blueprint (render.yaml) - Recommended

1. **Push your code to a Git repository** (if not already done):

   ```bash
   git add .
   git commit -m "Add Render deployment configuration"
   git push origin main
   ```

2. **Go to Render Dashboard**:

   - Navigate to https://dashboard.render.com
   - Click "New +" button
   - Select "Blueprint"

3. **Connect your repository**:

   - Select your Git provider (GitHub/GitLab/Bitbucket)
   - Authorize Render to access your repositories
   - Select the `kgf-gold-price-predictor-frontend` repository

4. **Deploy**:

   - Render will automatically detect the `render.yaml` file
   - Review the configuration
   - Click "Apply" to start deployment
   - Wait for the build to complete (usually 5-10 minutes)

5. **Access your deployed app**:
   - Once deployed, you'll get a URL like: `https://kgf-gold-price-predictor-frontend.onrender.com`
   - The app will be live and accessible!

### Option 2: Manual Setup

If you prefer to configure manually:

1. **Go to Render Dashboard**:

   - Navigate to https://dashboard.render.com
   - Click "New +" → "Static Site"

2. **Connect your repository**:

   - Select your Git provider
   - Authorize and select your repository

3. **Configure the static site**:

   ```
   Name: kgf-gold-price-predictor-frontend
   Branch: main (or your default branch)
   Build Command: cd react-frontend && npm install && npm run build
   Publish Directory: react-frontend/dist
   ```

4. **Advanced Settings** (click "Advanced"):

   - **Node Version**: 18.18.0
   - **Auto-Deploy**: Yes (recommended)

5. **Add Routes** (for SPA support):

   - Click "Redirects/Rewrites"
   - Add rewrite rule:
     - Source: `/*`
     - Destination: `/index.html`
     - Action: `Rewrite`

6. **Create Static Site**:
   - Click "Create Static Site"
   - Wait for the build to complete

## Environment Variables

The frontend doesn't require environment variables as the backend URL is hardcoded in the code. However, if you need to change the backend URL in the future:

1. Update `react-frontend/src/store/api/goldApi.ts`
2. Change the `baseUrl` in the `fetchBaseQuery` configuration
3. Commit and push changes

## Post-Deployment

### Verify Deployment

1. **Check the deployed URL**: Visit your Render URL
2. **Test functionality**:
   - [ ] Dashboard loads correctly
   - [ ] Charts display gold price data
   - [ ] Real-time price updates work
   - [ ] Theme toggle works (Light/Dark mode)
   - [ ] Currency conversion works (USD/LKR)
   - [ ] Predictions display correctly
   - [ ] Mobile responsive design works

### Custom Domain (Optional)

1. **Go to your Static Site settings** in Render
2. **Click "Custom Domain"**
3. **Add your domain**:
   - Enter your domain name
   - Follow DNS configuration instructions
   - Render will provide SSL certificate automatically

### Monitoring

- **Build Logs**: Check build logs in Render dashboard for any issues
- **Browser Console**: Open browser dev tools to check for API errors
- **Network Tab**: Monitor API calls to backend

## Troubleshooting

### Build Fails

**Issue**: Build command fails
**Solution**:

- Check that `package.json` has all dependencies
- Verify Node version is correct (18.18.0)
- Check build logs for specific error messages

### Blank Page After Deployment

**Issue**: Site loads but shows blank page
**Solution**:

- Check browser console for errors
- Verify the rewrite rule is set up (`/* → /index.html`)
- Check that `react-frontend/dist` is the correct publish directory

### API Connection Issues

**Issue**: Data not loading, API errors
**Solution**:

- Verify backend is running: https://kgf-gold-price-predictor-ml-backend.onrender.com
- Check CORS settings on backend
- Verify API URL in `goldApi.ts` is correct
- Check browser network tab for failed requests

### Build Takes Too Long

**Issue**: Build exceeds time limit
**Solution**:

- Free tier has build time limits
- Consider upgrading to a paid plan
- Optimize dependencies and build process

## Automatic Deployments

Render automatically deploys when you push to your connected branch:

1. **Make changes locally**
2. **Commit and push**:
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   ```
3. **Render auto-deploys** (if enabled)
4. **Check deployment status** in Render dashboard

## Configuration Files

### render.yaml

- Blueprint configuration for automated deployment
- Defines build command, publish directory, and routes
- Includes security headers and environment variables

### .node-version

- Specifies Node.js version (18.18.0)
- Ensures consistent build environment

### package.json

- Contains build scripts and dependencies
- Build command: `npm run build`
- Vite builds optimized production bundle

## Architecture on Render

```
┌─────────────────────────────────────┐
│   Render Static Site (Frontend)    │
│   - React + TypeScript + Vite      │
│   - Material UI + Tailwind CSS     │
│   - Redux Toolkit (State)          │
│   URL: your-app.onrender.com       │
└─────────────────┬───────────────────┘
                  │ API Calls
                  ▼
┌─────────────────────────────────────┐
│   Render Web Service (Backend)     │
│   - FastAPI + Python                │
│   - ML Prediction Engine            │
│   URL: backend.onrender.com         │
└─────────────────┬───────────────────┘
                  │
                  ▼
        ┌──────────────────┐
        │  External APIs   │
        │  - Gold Prices   │
        │  - Exchange Rate │
        └──────────────────┘
```

## Performance Optimization

The build is already optimized with:

- ✅ Code splitting
- ✅ Tree shaking
- ✅ Minification (Terser)
- ✅ Gzip compression
- ✅ Asset optimization
- ✅ Console log removal in production

## Security

Render deployment includes:

- ✅ HTTPS by default
- ✅ Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- ✅ DDoS protection
- ✅ Auto SSL certificates

## Costs

- **Free Tier**:

  - Static sites are FREE on Render
  - 100 GB bandwidth/month
  - Global CDN included
  - SSL certificates included
  - Auto-deploy from Git

- **Paid Tiers** (if needed):
  - More bandwidth
  - Priority support
  - Custom infrastructure

## Support

- **Render Documentation**: https://render.com/docs/static-sites
- **Render Community**: https://community.render.com
- **Project Issues**: Check your repository's issue tracker

## Next Steps

After deployment:

1. **Test thoroughly** on the production URL
2. **Set up monitoring** (Render provides basic metrics)
3. **Configure custom domain** (optional)
4. **Enable auto-deploy** for continuous deployment
5. **Monitor backend API** to ensure it stays active

## Notes

- **Cold Starts**: Free tier backend may have cold starts (15-30 second delay if inactive)
- **Build Time**: Typical build takes 3-5 minutes
- **Deploy Time**: Updates deploy in 3-7 minutes
- **CDN**: Static assets are served from global CDN
- **No Server Required**: This is a static site, no server management needed

---

🎉 **Congratulations!** Your gold price predictor frontend is now deployed and accessible worldwide!
