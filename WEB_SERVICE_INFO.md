# 🌐 Web Service Deployment Configuration

## Overview

Your React frontend is now configured to deploy as a **Web Service** on Render, using a Node.js + Express server to serve the static files.

## Architecture

```
┌─────────────────────────────────────────┐
│         Render Web Service              │
│                                         │
│  ┌───────────────────────────────┐     │
│  │    Express.js Server          │     │
│  │    (Node.js 18)               │     │
│  │    Port: 10000                │     │
│  │                               │     │
│  │  • Compression enabled        │     │
│  │  • Security headers           │     │
│  │  • Static file serving        │     │
│  │  • SPA routing support        │     │
│  └──────────┬────────────────────┘     │
│             │                           │
│             ▼                           │
│  ┌───────────────────────────────┐     │
│  │  React Frontend Build         │     │
│  │  (react-frontend/dist/)       │     │
│  │                               │     │
│  │  • Optimized bundles          │     │
│  │  • Code splitting             │     │
│  │  • Minified assets            │     │
│  └───────────────────────────────┘     │
└─────────────────────────────────────────┘
```

## Key Files

### 1. `server.js` (NEW)

Express server that:

- ✅ Serves static files from `react-frontend/dist/`
- ✅ Enables gzip compression
- ✅ Adds security headers
- ✅ Handles SPA routing (all routes → index.html)
- ✅ Implements caching strategies
- ✅ Listens on port 10000

```javascript
// Key features:
- Express.js server
- Compression middleware
- Security headers (X-Frame-Options, etc.)
- Static file serving with caching
- SPA fallback routing
- Error handling
```

### 2. `package.json` (NEW - Root level)

Server dependencies:

- `express`: Web server framework
- `compression`: Gzip compression middleware

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "compression": "^1.7.4"
  }
}
```

### 3. `render.yaml` (UPDATED)

Web service configuration:

```yaml
type: web # Web Service (not static site)
runtime: node # Node.js runtime
buildCommand: cd react-frontend && npm install && npm run build && cd .. && npm install
startCommand: node server.js
```

## Deployment Process

### 1. Build Phase

```bash
cd react-frontend
npm install              # Install React dependencies
npm run build           # Build React app (Vite)
cd ..
npm install             # Install server dependencies (Express)
```

### 2. Start Phase

```bash
node server.js          # Start Express server on port 10000
```

### 3. Runtime

- Express server starts on port 10000
- Serves static files from `react-frontend/dist/`
- Handles all HTTP requests
- Routes all paths to `index.html` (SPA routing)

## Advantages of Web Service vs Static Site

| Feature               | Web Service                | Static Site     |
| --------------------- | -------------------------- | --------------- |
| **Server Control**    | ✅ Full control            | ❌ Limited      |
| **Custom Headers**    | ✅ Yes (via Express)       | ⚠️ Limited      |
| **Middleware**        | ✅ Yes (compression, etc.) | ❌ No           |
| **Server-side Logic** | ✅ Can add APIs            | ❌ No           |
| **Caching Control**   | ✅ Full control            | ⚠️ Basic        |
| **Cost**              | 🆓 Free (750 hrs/mo)       | 🆓 Free         |
| **Performance**       | ⚡ Fast                    | ⚡ Faster (CDN) |
| **Setup**             | ⚙️ Needs server.js         | ✅ Simple       |

## Benefits of This Setup

### 1. **Compression**

- Gzip compression enabled via middleware
- Reduces bandwidth by ~70%
- Faster page loads

### 2. **Security Headers**

- X-Frame-Options: DENY (prevents clickjacking)
- X-Content-Type-Options: nosniff (prevents MIME sniffing)
- X-XSS-Protection: enabled
- Referrer-Policy: strict-origin-when-cross-origin

### 3. **Caching Strategy**

- Static assets cached for 1 year
- HTML files not cached (always fresh)
- ETags enabled for validation

### 4. **SPA Support**

- All routes serve `index.html`
- React Router handles client-side routing
- Direct URL access works correctly

### 5. **Future Extensibility**

- Can add server-side APIs if needed
- Can add proxy routes
- Can add custom middleware
- Can implement server-side rendering (SSR) later

## Environment Variables

Automatically set by Render:

| Variable       | Value      | Purpose                               |
| -------------- | ---------- | ------------------------------------- |
| `NODE_VERSION` | 18.18.0    | Node.js version                       |
| `PORT`         | 10000      | Server port (auto-assigned by Render) |
| `NODE_ENV`     | production | Environment mode                      |

## Server Features

### Request Flow

```
1. User requests: https://your-app.onrender.com/dashboard
   ↓
2. Render routes to Express server (port 10000)
   ↓
3. Express checks for static file at /dashboard
   ↓
4. No file found → serves index.html
   ↓
5. React Router handles /dashboard route
   ↓
6. Dashboard component renders
```

### Caching Headers

```javascript
// Static assets (JS, CSS, images)
Cache-Control: public, max-age=31536000, immutable
// 1 year cache, files are hashed

// HTML files
Cache-Control: no-cache
// Always check for updates
```

### Compression

```javascript
// All responses are gzipped
Accept-Encoding: gzip
Content-Encoding: gzip
// ~70% size reduction
```

## Local Development

### Test the Server Locally

```bash
# 1. Build the React app
cd react-frontend
npm install
npm run build
cd ..

# 2. Install server dependencies
npm install

# 3. Start the server
npm start
# or
node server.js

# 4. Visit: http://localhost:10000
```

### Development vs Production

| Mode            | Command                            | Port  | Hot Reload |
| --------------- | ---------------------------------- | ----- | ---------- |
| **Development** | `cd react-frontend && npm run dev` | 5174  | ✅ Yes     |
| **Production**  | `node server.js`                   | 10000 | ❌ No      |

## Monitoring

### Server Logs

On Render dashboard, you'll see:

```
🚀 Server is running on port 10000
📁 Serving files from: /app/react-frontend/dist
🌍 Environment: production
```

### Health Check

Render automatically monitors:

- HTTP 200 responses
- Server uptime
- Response times
- Error rates

## Troubleshooting

### Server Won't Start

**Issue**: Server fails to start
**Solutions**:

1. Check `server.js` exists
2. Verify `package.json` has express dependency
3. Check build logs for errors
4. Ensure port 10000 is used

### 502 Bad Gateway

**Issue**: Service unavailable
**Solutions**:

1. Check if server is listening on `0.0.0.0` (not `localhost`)
2. Verify PORT environment variable
3. Check server logs in Render dashboard
4. Ensure build completed successfully

### Static Files Not Loading

**Issue**: Assets return 404
**Solutions**:

1. Verify build directory: `react-frontend/dist/`
2. Check static middleware path
3. Ensure build command completed
4. Check file paths are correct

### SPA Routing Not Working

**Issue**: Direct URL access returns 404
**Solutions**:

1. Verify catch-all route: `app.get('*', ...)`
2. Check route order (static before catch-all)
3. Ensure index.html exists in dist/

## Performance

### Expected Metrics

| Metric           | Value                    |
| ---------------- | ------------------------ |
| **Cold Start**   | 5-10 seconds (free tier) |
| **Request Time** | 50-200ms                 |
| **Compression**  | ~70% size reduction      |
| **Caching**      | 1 year for assets        |
| **Uptime**       | 99.9%                    |

### Optimization Tips

1. **Keep Server Running** (Free tier sleeps after 15 min idle)

   - Consider using a ping service
   - Or upgrade to paid tier

2. **Monitor Performance**

   - Check Render metrics dashboard
   - Monitor response times
   - Track error rates

3. **Optimize Build**
   - Already using code splitting
   - Already using compression
   - Already using minification

## Cost

### Free Tier

- ✅ 750 hours per month (enough for 24/7)
- ✅ Automatic HTTPS
- ✅ Custom domains
- ⚠️ Sleeps after 15 min inactivity
- ⚠️ Cold starts (~5-10 sec)

### Paid Tier ($7/month)

- ✅ No sleep/cold starts
- ✅ Priority support
- ✅ More memory/CPU
- ✅ Faster builds

## Comparison: Web Service vs Your Backend

| Aspect        | Frontend (This Service) | Backend (ML API)     |
| ------------- | ----------------------- | -------------------- |
| **Type**      | Web Service             | Web Service          |
| **Runtime**   | Node.js                 | Python               |
| **Framework** | Express                 | FastAPI              |
| **Purpose**   | Serve React frontend    | ML predictions + API |
| **Port**      | 10000                   | 8001 (or auto)       |
| **Database**  | None                    | SQLite               |
| **CPU Usage** | Low                     | Medium-High          |

## Summary

Your frontend is now deployed as a **Web Service** with:

✅ **Express.js server** serving optimized React build
✅ **Compression** enabled for faster loads
✅ **Security headers** for protection
✅ **SPA routing** support for React Router
✅ **Caching strategy** for optimal performance
✅ **Production ready** configuration
✅ **Future extensible** (can add APIs later)

**Deploy now**: Follow `QUICK_DEPLOY.md` to get started! 🚀
