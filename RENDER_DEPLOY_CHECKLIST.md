# 🚀 Render Deployment Checklist

Quick checklist for deploying to Render.

## ✅ Pre-Deployment Checklist

- [ ] Code is pushed to GitHub/GitLab/Bitbucket
- [ ] Backend API is working: https://kgf-gold-price-predictor-ml-backend.onrender.com
- [ ] All dependencies are listed in `package.json`
- [ ] Build command works locally: `cd react-frontend && npm install && npm run build`
- [ ] `render.yaml` file exists in repository root
- [ ] `.node-version` file specifies Node.js version (18.18.0)

## 📋 Deployment Steps (Quick Guide)

### Method 1: Blueprint Deployment (Easiest)

1. **Login to Render**: https://dashboard.render.com
2. **New Blueprint**: Click "New +" → "Blueprint"
3. **Connect Repo**: Select your repository
4. **Auto-Deploy**: Render detects `render.yaml` and configures everything
5. **Apply**: Click "Apply" to deploy
6. **Wait**: Build takes ~5 minutes
7. **Done**: Get your URL and test!

### Method 2: Manual Static Site

1. **Login to Render**: https://dashboard.render.com
2. **New Static Site**: Click "New +" → "Static Site"
3. **Connect Repo**: Select your repository
4. **Configure**:
   - **Name**: `kgf-gold-price-predictor-frontend`
   - **Branch**: `main`
   - **Build Command**: `cd react-frontend && npm install && npm run build`
   - **Publish Directory**: `react-frontend/dist`
5. **Advanced Settings**:
   - Node Version: `18.18.0`
6. **Redirects/Rewrites**:
   - Source: `/*`
   - Destination: `/index.html`
   - Action: `Rewrite`
7. **Create**: Click "Create Static Site"
8. **Done**: Wait for build and get your URL!

## 🔍 Post-Deployment Verification

Test these features on your deployed URL:

- [ ] **Page Loads**: Site loads without errors
- [ ] **Dashboard**: Main dashboard displays
- [ ] **Charts**: Gold price charts render correctly
- [ ] **Real-time Updates**: Price updates every 2 seconds
- [ ] **Theme Toggle**: Light/Dark mode switches work
- [ ] **Currency Switch**: USD/LKR conversion works
- [ ] **Predictions**: AI predictions display
- [ ] **Mobile View**: Responsive design on mobile
- [ ] **No Console Errors**: Browser console is clean
- [ ] **API Connection**: Data loads from backend

## 🎯 Your Deployment URLs

After deployment, you'll have:

- **Frontend URL**: `https://kgf-gold-price-predictor-frontend.onrender.com` (example)
- **Backend URL**: `https://kgf-gold-price-predictor-ml-backend.onrender.com` (existing)

## 🐛 Common Issues & Quick Fixes

| Issue                 | Solution                                                      |
| --------------------- | ------------------------------------------------------------- |
| **Blank page**        | Check browser console, verify rewrite rule `/* → /index.html` |
| **Build fails**       | Check Node version is 18.18.0, verify package.json            |
| **No data loading**   | Verify backend is running, check API URL in code              |
| **Theme not working** | Clear browser localStorage and refresh                        |
| **404 on refresh**    | Add rewrite rule in Render settings                           |

## 📦 Files Created for Deployment

- ✅ `render.yaml` - Blueprint configuration
- ✅ `.node-version` - Node.js version specification
- ✅ `DEPLOYMENT.md` - Detailed deployment guide
- ✅ `RENDER_DEPLOY_CHECKLIST.md` - This quick checklist

## 🔄 Continuous Deployment

Once deployed, every push to your main branch will:

1. Trigger automatic rebuild
2. Deploy new version
3. Update live site (~5 minutes)

## 💰 Cost

**FREE** - Static sites are free on Render with:

- 100 GB bandwidth/month
- Global CDN
- SSL certificates
- Auto-deploy from Git

## 📞 Need Help?

- **Render Docs**: https://render.com/docs/static-sites
- **Render Support**: https://community.render.com
- **Build Logs**: Check in Render dashboard for errors

---

**Ready to deploy?** Follow Method 1 or Method 2 above! 🚀
