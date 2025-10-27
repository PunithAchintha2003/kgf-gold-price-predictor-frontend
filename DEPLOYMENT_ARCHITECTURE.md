# 🏗️ Deployment Architecture on Render

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         END USERS                            │
│                  (Web Browsers Worldwide)                    │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTPS
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    RENDER CDN (Global)                       │
│            SSL/HTTPS, DDoS Protection, Caching               │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              RENDER STATIC SITE (Frontend)                   │
│  ┌────────────────────────────────────────────────────┐    │
│  │  React 19 + TypeScript + Vite                      │    │
│  │  Material UI + Tailwind CSS                        │    │
│  │  Redux Toolkit + RTK Query                         │    │
│  │  Plotly.js Charts                                  │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  📁 Published from: react-frontend/dist/                    │
│  🔧 Build: cd react-frontend && npm install && npm run build│
│  🌍 Region: Oregon (US West)                                │
│  💰 Cost: FREE                                              │
└────────────────────────┬────────────────────────────────────┘
                         │ REST API Calls
                         │ (useGetDailyDataQuery, etc.)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│             RENDER WEB SERVICE (Backend)                     │
│  ┌────────────────────────────────────────────────────┐    │
│  │  FastAPI + Python                                  │    │
│  │  Machine Learning Engine                           │    │
│  │  Prediction Models                                 │    │
│  │  SQLite Database                                   │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  🌐 URL: kgf-gold-price-predictor-ml-backend.onrender.com  │
│  📡 Endpoints: /xauusd, /xauusd/realtime, etc.             │
│  💰 Status: ✅ Already Deployed                             │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    EXTERNAL APIs                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Gold Price  │  │  Exchange    │  │  Market      │     │
│  │  API         │  │  Rate API    │  │  Data API    │     │
│  │  (yfinance)  │  │  (USD/LKR)   │  │  (Various)   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow

```
1. USER VISITS SITE
   └─► Render CDN serves static files (HTML, CSS, JS)
   └─► Browser loads React application

2. APP INITIALIZATION
   └─► Redux store initializes
   └─► Redux Persist loads saved theme preference
   └─► RTK Query prepares API endpoints

3. DATA FETCHING (Real-time)
   └─► Every 2 seconds:
       ├─► useGetRealtimePriceQuery() calls backend
       ├─► GET https://backend.onrender.com/xauusd/realtime
       └─► Updates current price in UI

4. HISTORICAL DATA LOADING
   └─► On mount:
       ├─► useGetDailyDataQuery() calls backend
       ├─► GET https://backend.onrender.com/xauusd
       └─► Loads historical data + predictions

5. CURRENCY CONVERSION
   └─► When currency switched:
       ├─► useGetExchangeRateQuery('USD', 'LKR') calls backend
       ├─► GET https://backend.onrender.com/exchange-rate/USD/LKR
       └─► Converts and displays prices in LKR

6. AI PREDICTIONS
   └─► Backend ML engine:
       ├─► Fetches latest gold prices
       ├─► Runs prediction model
       ├─► Stores prediction in database
       └─► Returns prediction with accuracy stats

7. CHART RENDERING
   └─► Plotly.js:
       ├─► Processes historical data
       ├─► Renders interactive candlestick chart
       └─► Overlays prediction markers

8. THEME SWITCHING
   └─► User toggles theme:
       ├─► Redux action dispatched
       ├─► Theme state updated
       ├─► Redux Persist saves to localStorage
       └─► MUI theme provider updates components
```

---

## Deployment Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                     DEVELOPMENT                              │
│                                                              │
│  Developer's Machine                                         │
│  ├─► Code changes                                           │
│  ├─► Test locally (npm run dev)                             │
│  ├─► Build locally (npm run build)                          │
│  └─► Verify build works                                     │
└────────────────────────┬────────────────────────────────────┘
                         │ git commit & push
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    GIT REPOSITORY                            │
│                (GitHub/GitLab/Bitbucket)                     │
│                                                              │
│  main branch                                                 │
│  ├─► render.yaml (Blueprint config)                         │
│  ├─► .node-version (Node 18.18.0)                           │
│  ├─► react-frontend/package.json                            │
│  └─► react-frontend/src/... (Source code)                   │
└────────────────────────┬────────────────────────────────────┘
                         │ Webhook trigger (auto-deploy)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    RENDER BUILD                              │
│                                                              │
│  Build Environment                                           │
│  ├─► Clone repository                                       │
│  ├─► Set Node version (18.18.0)                             │
│  ├─► cd react-frontend                                      │
│  ├─► npm install (install dependencies)                     │
│  ├─► npm run build (Vite build)                             │
│  │   ├─► TypeScript compilation                             │
│  │   ├─► Code splitting                                     │
│  │   ├─► Minification (Terser)                              │
│  │   ├─► Tree shaking                                       │
│  │   └─► Asset optimization                                 │
│  └─► Publish react-frontend/dist/                           │
│                                                              │
│  Build Time: ~5 minutes                                     │
└────────────────────────┬────────────────────────────────────┘
                         │ Build successful
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   RENDER DEPLOYMENT                          │
│                                                              │
│  Deploy to CDN                                               │
│  ├─► Upload static files to CDN                             │
│  ├─► Configure routing (/* → /index.html)                   │
│  ├─► Apply security headers                                 │
│  ├─► Generate SSL certificate (HTTPS)                       │
│  └─► Invalidate CDN cache                                   │
│                                                              │
│  Deploy Time: ~2 minutes                                    │
└────────────────────────┬────────────────────────────────────┘
                         │ Live!
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    PRODUCTION (LIVE)                         │
│                                                              │
│  ✅ Site is accessible at:                                  │
│     https://your-app-name.onrender.com                      │
│                                                              │
│  ✅ Features:                                                │
│     ├─► Global CDN (fast worldwide)                         │
│     ├─► HTTPS/SSL (secure)                                  │
│     ├─► DDoS protection                                     │
│     ├─► Auto-deploy on git push                             │
│     └─► 100 GB bandwidth/month (free)                       │
└─────────────────────────────────────────────────────────────┘
```

---

## File Structure in Production

```
https://your-app.onrender.com/
│
├─► index.html (Entry point)
│   └─► Loads JavaScript bundles
│
├─► vite.svg (Favicon)
│
└─► assets/ (All optimized files)
    ├─► index-[hash].css (Styles - 3.19 kB gzipped)
    ├─► index-[hash].js (Main app - 3.65 kB gzipped)
    ├─► react-[hash].js (React core - 86.40 kB gzipped)
    ├─► mui-[hash].js (Material UI - 53.11 kB gzipped)
    ├─► redux-[hash].js (Redux Toolkit - 19.96 kB gzipped)
    ├─► router-[hash].js (React Router - 11.40 kB gzipped)
    ├─► plotly-[hash].js (Charts - 1.35 MB gzipped)
    ├─► Chart-[hash].js (Chart component - 1.99 kB gzipped)
    ├─► Dashboard-[hash].js (Dashboard - 2.11 kB gzipped)
    ├─► AccuracyStats-[hash].js (Stats - 0.88 kB gzipped)
    └─► PredictionExplanation-[hash].js (Prediction UI - 0.10 kB gzipped)
```

**Benefits of this structure:**

- ✅ **Code splitting**: Only loads needed chunks
- ✅ **Cache busting**: Hash-based filenames
- ✅ **Compression**: Gzip reduces size by ~70%
- ✅ **CDN caching**: Fast delivery worldwide
- ✅ **Lazy loading**: Components load on demand

---

## Security Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      SECURITY LAYERS                         │
└─────────────────────────────────────────────────────────────┘

1. NETWORK LAYER
   ├─► HTTPS/TLS encryption (automatic SSL)
   ├─► DDoS protection (Render infrastructure)
   └─► Rate limiting (Render default)

2. HEADERS LAYER (Configured in render.yaml)
   ├─► X-Frame-Options: DENY (prevent clickjacking)
   ├─► X-Content-Type-Options: nosniff (MIME type sniffing)
   └─► X-XSS-Protection: 1; mode=block (XSS protection)

3. APPLICATION LAYER
   ├─► No sensitive data in frontend
   ├─► API calls over HTTPS only
   └─► Backend handles authentication/authorization

4. BUILD LAYER
   ├─► Dependencies scanned (npm audit)
   ├─► TypeScript type checking
   └─► ESLint security rules

5. CORS LAYER (Backend)
   ├─► Backend configured with allowed origins
   ├─► Credentials handling
   └─► Method restrictions
```

---

## Performance Optimization

```
┌─────────────────────────────────────────────────────────────┐
│                   PERFORMANCE FEATURES                       │
└─────────────────────────────────────────────────────────────┘

1. BUILD OPTIMIZATIONS
   ├─► Code splitting (vendor chunks)
   ├─► Tree shaking (unused code removal)
   ├─► Minification (Terser)
   ├─► Console logs removed in production
   └─► Asset optimization

2. RUNTIME OPTIMIZATIONS
   ├─► Redux Toolkit (efficient state)
   ├─► RTK Query (automatic caching)
   ├─► React.memo (prevent re-renders)
   └─► Lazy loading (components)

3. NETWORK OPTIMIZATIONS
   ├─► Gzip compression (~70% size reduction)
   ├─► CDN caching (global edge servers)
   ├─► HTTP/2 (multiplexing)
   └─► Asset hashing (long-term caching)

4. API OPTIMIZATIONS
   ├─► Polling interval (2 seconds)
   ├─► Query deduplication (RTK Query)
   ├─► Background updates
   └─► Error recovery

5. RENDERING OPTIMIZATIONS
   ├─► Virtual scrolling (large lists)
   ├─► Debounced updates
   ├─► Progressive rendering
   └─► Lazy image loading
```

---

## Monitoring & Debugging

```
┌─────────────────────────────────────────────────────────────┐
│                    MONITORING TOOLS                          │
└─────────────────────────────────────────────────────────────┘

1. RENDER DASHBOARD
   ├─► Build logs (real-time)
   ├─► Deploy history
   ├─► Bandwidth usage
   └─► Service status

2. BROWSER DEV TOOLS
   ├─► Console (error logs)
   ├─► Network tab (API calls)
   ├─► Performance tab (profiling)
   └─► Redux DevTools (state inspection)

3. APPLICATION METRICS
   ├─► API response times
   ├─► Prediction accuracy stats
   ├─► User interaction tracking
   └─► Error boundaries (React)

4. EXTERNAL MONITORING (Optional)
   ├─► UptimeRobot (uptime monitoring)
   ├─► Google Analytics (user analytics)
   ├─► Sentry (error tracking)
   └─► LogRocket (session replay)
```

---

## Scaling & Growth

```
┌─────────────────────────────────────────────────────────────┐
│                     SCALING OPTIONS                          │
└─────────────────────────────────────────────────────────────┘

CURRENT: Free Tier
├─► 100 GB bandwidth/month
├─► Global CDN
├─► Unlimited builds
└─► SSL included

UPGRADE OPTIONS (If Needed):
├─► More bandwidth
├─► Priority support
├─► Custom infrastructure
└─► Team collaboration features

HORIZONTAL SCALING (Already Built-in):
├─► CDN edge servers worldwide
├─► Auto-scaling infrastructure
├─► Load balancing
└─► Redundancy & failover
```

---

## Summary

**Your deployment architecture provides:**

✅ **High Performance**

- Global CDN with edge caching
- Optimized builds with code splitting
- Gzip compression reduces size by 70%

✅ **Security**

- HTTPS/SSL automatic
- Security headers configured
- DDoS protection included

✅ **Reliability**

- Auto-deploy on git push
- Build verification before deploy
- Rollback support

✅ **Scalability**

- Handles global traffic
- Auto-scaling infrastructure
- No server management needed

✅ **Developer Experience**

- One-click deployment
- Automatic builds
- Real-time build logs

✅ **Cost Efficiency**

- Free tier for static sites
- No hidden costs
- Predictable pricing

---

**Your app will be production-ready and scalable from day one!** 🚀
