# Deployment Guide - AkdemiApp Frontend

Complete guide for deploying AkdemiApp frontend to Coolify with Strapi CMS integration.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Prerequisites](#prerequisites)
- [Coolify Setup](#coolify-setup)
- [Strapi Webhook Configuration](#strapi-webhook-configuration)
- [Environment Variables](#environment-variables)
- [Deployment Process](#deployment-process)
- [Post-Deployment](#post-deployment)
- [Troubleshooting](#troubleshooting)
- [Monitoring](#monitoring)

---

## Architecture Overview

### Deployment Mode: SSG + Webhooks

```
┌─────────────────────────────────────────────────────────┐
│                    Content Updates                       │
│                                                          │
│  1. Editor updates content in Strapi CMS               │
│  2. Strapi fires webhook to Coolify                    │
│  3. Coolify triggers automatic rebuild                 │
│  4. Frontend fetches latest data from Strapi           │
│  5. Static HTML generated with fresh content           │
│  6. New version deployed automatically                 │
│                                                          │
│  ⏱️  Total time: 2-5 minutes                            │
└─────────────────────────────────────────────────────────┘
```

### Benefits

- ✅ **Performance**: Blazing fast static HTML
- ✅ **SEO**: Pre-rendered content, perfect for search engines
- ✅ **Cost**: Low server resources (just serving static files)
- ✅ **Automation**: No manual rebuilds needed
- ✅ **Reliability**: Static files = no server-side errors

### Trade-offs

- ⚠️ **Update Lag**: 2-5 minutes between Strapi update and live site
- ⚠️ **Build Time**: Every content change triggers full rebuild
- ⚠️ **Build Resources**: Requires build server capacity

---

## Prerequisites

### 1. Backend Requirements

**Strapi backend must be deployed and accessible:**

- ✅ Strapi 5.x running on accessible URL
- ✅ PostgreSQL database configured
- ✅ Content Types created (see `backend/CLAUDE.md`)
- ✅ Public permissions configured for all content types
- ✅ CORS enabled for frontend domain
- ✅ Test data populated

**Example Strapi URLs:**
- Production: `https://api.akdemiapp.com`
- Staging: `https://api-staging.akdemiapp.com`

### 2. Coolify Requirements

**Coolify instance:**

- ✅ Coolify v4.x installed
- ✅ Docker enabled
- ✅ Git repository connected
- ✅ Domain/subdomain configured
- ✅ SSL certificate ready (automatic with Coolify)

### 3. Repository Setup

**Git repository:**

- ✅ Code pushed to GitHub/GitLab/Bitbucket
- ✅ Frontend in `/frontend` directory (monorepo)
- ✅ `.dockerignore` present
- ✅ `Dockerfile` optimized
- ✅ No sensitive data in commits

---

## Coolify Setup

### Step 1: Create New Resource

1. **Login to Coolify Dashboard**
   - Navigate to your Coolify instance
   - Go to Projects → Select/Create project

2. **Add New Resource**
   - Click "+ New Resource"
   - Select "Docker Compose" or "Dockerfile"
   - Choose "Public Repository" or "Private Repository"

### Step 2: Repository Configuration

**Repository Settings:**

```yaml
Repository URL: https://github.com/your-org/akdemiapp
Branch: main
Base Directory: frontend  # ⚠️ Important for monorepo!
Build Pack: Dockerfile
```

**Advanced Settings:**

```yaml
Build Command: (leave empty - uses Dockerfile)
Port: 3000
Dockerfile Location: ./Dockerfile
```

### Step 3: Environment Variables

Navigate to **Environment Variables** section and add:

| Variable Name | Value | Description |
|--------------|--------|-------------|
| `PUBLIC_API_URL` | `https://api.akdemiapp.com/api` | Strapi API endpoint |
| `PUBLIC_STRAPI_URL` | `https://api.akdemiapp.com` | Strapi base URL |
| `NODE_ENV` | `production` | Node environment |

**Important Notes:**

- ⚠️ Variables prefixed with `PUBLIC_` are exposed to browser
- ⚠️ In SSG mode, values are baked into HTML at build time
- ⚠️ Changing variables requires manual rebuild
- ✅ Use production Strapi URLs, not localhost

### Step 4: Build Arguments (Optional)

If you want to pass environment variables at build time:

```yaml
Build Arguments:
  PUBLIC_API_URL: https://api.akdemiapp.com/api
  PUBLIC_STRAPI_URL: https://api.akdemiapp.com
```

### Step 5: Domain Configuration

**Configure Domain:**

1. Go to "Domains" section
2. Add your domain: `akdemiapp.com` or `www.akdemiapp.com`
3. Enable "Generate SSL Certificate" (automatic Let's Encrypt)
4. Wait for SSL provisioning (1-2 minutes)

**DNS Configuration:**

Add DNS records at your domain provider:

```
Type: A
Name: @ (or www)
Value: [Coolify Server IP]
TTL: 3600
```

For subdomain:
```
Type: CNAME
Name: www
Value: akdemiapp.com
TTL: 3600
```

### Step 6: Health Check

Configure health check for monitoring:

```yaml
Health Check:
  Enabled: true
  Path: /
  Interval: 30s
  Timeout: 10s
  Retries: 3
  Start Period: 5s
```

### Step 7: Deploy

1. Click **"Deploy"** button
2. Monitor build logs in real-time
3. Wait for "Deployment successful" message
4. Access your site at configured domain

**Expected Build Time:** 2-4 minutes

---

## Strapi Webhook Configuration

Enable automatic rebuilds when content changes in Strapi.

### Step 1: Create Coolify API Token

1. **In Coolify Dashboard:**
   - Click on your profile/user icon (top-right)
   - Navigate to **"Keys & Tokens"** or **"API Tokens"**
   - Click **"+ Create New Token"** or **"New API Token"**

2. **Configure Token:**
   ```
   Name: Strapi Webhook Token
   Description: Token for Strapi to trigger frontend rebuilds
   ```

3. **Copy Token:**
   - After creating, **copy the token immediately**
   - ⚠️ You won't be able to see it again!
   - Store it securely (you'll need it for Strapi)

   Example token: `clfy_abc123xyz789...`

### Step 2: Get Your Resource UUID

1. **Find Resource UUID:**
   - Go to your frontend resource (Application)
   - Look at the URL in your browser
   - The UUID is in the URL path

   **Example URL:**
   ```
   https://coolify.example.com/project/abc/resource/ic0w44wwc0owkwcks8ss4cco
                                                      ↑ This is your UUID
   ```

2. **Alternative - Via API:**
   - You can also find it in the resource settings
   - Or copy it from the "Webhooks" section if available

3. **Build Webhook URL:**

   The webhook endpoint format is:
   ```
   https://your-coolify-domain.com/api/v1/deploy?uuid=YOUR-RESOURCE-UUID&force=false
   ```

   **Your actual URL:**
   Replace with your values:
   ```
   https://coolify.akdemiapp.com/api/v1/deploy?uuid=ic0w44wwc0owkwcks8ss4cco&force=false
   ```

   **Parameters:**
   - `uuid=YOUR-RESOURCE-UUID` - Your resource identifier
   - `force=false` - Set to `true` to force rebuild (clears cache)
   - `tag=main` - (Optional) Specify git branch/tag

### Step 3: Configure Webhook in Strapi

1. **Login to Strapi Admin Panel**
   - Navigate to `https://api.akdemiapp.com/admin`

2. **Go to Settings → Webhooks**
   - In the left sidebar, click "Settings"
   - Click "Webhooks" under "Global Settings"
   - Click "+ Add new webhook" button

3. **Configure Webhook:**

   Fill in the form with these values:

   **Name:**
   ```
   Coolify Frontend Auto-Deploy
   ```

   **URL:**
   ```
   [Paste the complete Coolify webhook URL from Step 2]
   ```
   Example: `https://coolify.akdemiapp.com/api/v1/deploy?uuid=ic0w44wwc0owkwcks8ss4cco&force=false`

   **Headers:**

   ⚠️ **IMPORTANTE:** Debes agregar el token de autenticación en los headers:

   ```
   Content-Type: application/json
   Authorization: Bearer clfy_your_actual_token_here
   ```

   **Example with actual token:**
   ```
   Content-Type: application/json
   Authorization: Bearer clfy_abc123xyz789definitelyrealtoken
   ```

   **How to add headers in Strapi:**
   - Click "+ Add entry" under Headers
   - **Key:** `Content-Type` → **Value:** `application/json`
   - Click "+ Add entry" again
   - **Key:** `Authorization` → **Value:** `Bearer clfy_your_token_here`

   **Events to trigger:**

   Select the events that should trigger a rebuild. Recommended:
   - ✅ **entry.create** - When new content is created
   - ✅ **entry.update** - When content is updated
   - ✅ **entry.delete** - When content is deleted
   - ✅ **entry.publish** - When content is published
   - ✅ **entry.unpublish** - When content is unpublished

   **Specific Content Types:**

   You can also select specific content types instead of all entries. For example:
   - ✅ `page.publish`
   - ✅ `page.unpublish`
   - ✅ `plan.update`
   - ✅ `feature.publish`
   - etc.

4. **Save Webhook:**
   - Click "Save" button at the top

5. **Test Webhook:**
   - After saving, you'll see a "Trigger" button next to your webhook
   - Click "Trigger" to send a test request
   - **Expected Result:** Status 200 OK
   - **If you get 401 Unauthenticated:**
     - Verify your API token is correct
     - Check that you added "Bearer " before the token
     - Ensure the token has proper permissions in Coolify

6. **Verify in Coolify:**
   - Go to Coolify Dashboard
   - Navigate to your frontend resource
   - Check "Deployments" tab
   - You should see a new deployment started
   - Status: Queued → Building → Deployed

**What the webhook does:**

When triggered, Strapi sends a POST request to Coolify with:

```http
POST https://coolify.example.com/api/v1/deploy?uuid=ic0w44wwc0owkwcks8ss4cco
Content-Type: application/json
Authorization: Bearer clfy_your_token_here

{
  "event": "entry.publish",
  "created_at": "2025-01-13T18:30:00.000Z",
  "model": "page",
  "entry": {
    "id": 1,
    "title": "Home Page"
  }
}
```

Coolify receives the request, validates the Bearer token, and triggers a deployment.

### Step 4: Fine-tune Trigger Events

**Recommended Events per Content Type:**

| Content Type | Events to Enable |
|-------------|------------------|
| `page` | ✅ publish, ✅ unpublish, ✅ update, ✅ delete |
| `plan` | ✅ publish, ✅ unpublish, ✅ update |
| `feature` | ✅ publish, ✅ unpublish |
| `testimonial` | ✅ publish, ✅ unpublish |
| `site-setting` | ✅ update |
| `callback-request` | ❌ (no rebuild needed for form submissions) |

**Why be selective?**
- Avoid unnecessary rebuilds
- Save build server resources
- Reduce deployment time

### Step 5: Verify Webhook is Working

1. **In Strapi:**
   - Make a small change to any content (e.g., update a page title)
   - Click "Publish"

2. **In Coolify:**
   - Go to your resource
   - Check "Deployments" tab
   - You should see a new deployment triggered automatically
   - Status should change from "Queued" → "Building" → "Deployed"

3. **Check Timing:**
   - Total time from Strapi publish to live site: 2-5 minutes
   - If it takes longer, check Coolify logs for build issues

4. **Troubleshooting:**

   **Error 401 - Unauthenticated:**
   - ✅ Verify you created an API token in Coolify (Keys & Tokens)
   - ✅ Check the Authorization header in Strapi has `Bearer ` prefix
   - ✅ Ensure no extra spaces: `Bearer clfy_token` (one space after Bearer)
   - ✅ Token should start with `clfy_`
   - ✅ Re-copy the token from Coolify if needed

   **Webhook doesn't trigger:**
   - ✅ Verify the webhook URL is correct (check for typos in UUID)
   - ✅ Ensure the UUID matches your Coolify resource
   - ✅ Check Strapi webhook logs: Settings → Webhooks → click webhook name → "View logs"
   - ✅ Verify Coolify is accessible from your Strapi server (network/firewall)
   - ✅ Try triggering manually first to test credentials

   **Deployment fails:**
   - ✅ Check Coolify build logs for specific errors
   - ✅ Verify environment variables are set correctly (`PUBLIC_API_URL`, etc.)
   - ✅ Ensure Strapi API is accessible during build
   - ✅ Check that Strapi content is published (not draft)

---

## Environment Variables

### Development (.env)

```env
PUBLIC_API_URL=http://localhost:1337/api
PUBLIC_STRAPI_URL=http://localhost:1337
NODE_ENV=development
```

### Production (Coolify)

Set in Coolify Dashboard → Environment Variables:

```env
PUBLIC_API_URL=https://api.akdemiapp.com/api
PUBLIC_STRAPI_URL=https://api.akdemiapp.com
NODE_ENV=production
HOST=0.0.0.0
PORT=3000
```

### Build-Time vs Runtime

**Build-Time Variables:**
- Prefixed with `PUBLIC_`
- Baked into HTML during build
- **Cannot be changed without rebuild**
- Example: `PUBLIC_API_URL`

**Runtime Variables:**
- Server-side only (not prefixed with `PUBLIC_`)
- Only used in SSR/hybrid mode
- Not applicable for SSG mode
- Example: `DATABASE_URL` (if you had one)

---

## Deployment Process

### Initial Deployment

```bash
# 1. Commit and push code
git add .
git commit -m "feat: prepare for Coolify deployment"
git push origin main

# 2. Coolify automatically detects push (if auto-deploy enabled)
# OR manually trigger deploy in Coolify Dashboard

# 3. Monitor build logs in Coolify
# Look for: "Deployment successful"

# 4. Access site at configured domain
# Example: https://akdemiapp.com
```

### Manual Rebuild

**When to manually rebuild:**
- After changing environment variables
- After updating Dockerfile
- After Strapi content changes (if webhook not configured)

**How to rebuild:**

1. **Via Coolify Dashboard:**
   - Go to resource
   - Click "Redeploy" button
   - Monitor logs

2. **Via Webhook:**
   ```bash
   curl -X POST https://coolify.yourdomain.com/api/v1/deploy/webhook/abc123xyz
   ```

3. **Via Git Push:**
   ```bash
   git commit --allow-empty -m "trigger: force rebuild"
   git push origin main
   ```

### Rollback

**To rollback to previous version:**

1. Go to Coolify Dashboard
2. Navigate to "Deployments" history
3. Select previous successful deployment
4. Click "Redeploy this version"

**Alternative - Git revert:**
```bash
git revert HEAD
git push origin main
```

---

## Post-Deployment

### 1. Verify Deployment

**Checklist:**

- [ ] Site accessible at configured domain
- [ ] SSL certificate active (HTTPS)
- [ ] All pages load correctly
- [ ] Images and assets load
- [ ] Forms submit successfully
- [ ] Data from Strapi displays correctly
- [ ] No console errors in browser

**Test URLs:**
```
https://akdemiapp.com/
https://akdemiapp.com/artes-escenicas
https://akdemiapp.com/artes-marciales
https://akdemiapp.com/pricing
```

### 2. Test Webhook

1. Login to Strapi admin
2. Edit any content (e.g., update a pricing plan)
3. Publish changes
4. Verify Coolify receives webhook (check logs)
5. Wait 2-5 minutes for rebuild
6. Refresh frontend to see changes

### 3. Configure CORS in Strapi

Ensure Strapi allows requests from frontend domain:

**Edit `backend/config/middlewares.ts`:**

```typescript
export default [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https://akdemiapp.com'],
          'media-src': ["'self'", 'data:', 'blob:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'http://localhost:4321',        // Development
        'https://akdemiapp.com',        // Production
        'https://www.akdemiapp.com',    // Production (www)
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  // ... other middlewares
];
```

**Redeploy Strapi after changes.**

### 4. Set up Monitoring

**Coolify Built-in Monitoring:**
- Container CPU/Memory usage
- Deployment history
- Build logs
- Health check status

**External Monitoring (Optional):**

- **Uptime Monitoring:** UptimeRobot, Pingdom
- **Error Tracking:** Sentry
- **Analytics:** Google Analytics, Plausible

**Add to Layout.astro:**

```astro
---
// src/layouts/Layout.astro
const isProduction = import.meta.env.PROD;
---

<head>
  {isProduction && (
    <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
  )}
</head>
```

---

## Troubleshooting

### Build Failures

#### Error: "dist directory not created"

**Cause:** Build failed before completion

**Solution:**
1. Check build logs in Coolify
2. Look for npm errors or dependency issues
3. Verify `package.json` scripts
4. Test build locally: `npm run build:docker`

#### Error: "Cannot find module"

**Cause:** Missing dependencies

**Solution:**
```bash
# Locally
npm ci --force
npm run build

# If successful, commit package-lock.json
git add package-lock.json
git commit -m "fix: update dependencies"
git push
```

#### Error: "API fetch failed during build"

**Cause:** Cannot reach Strapi during build

**Solution:**
1. Verify `PUBLIC_API_URL` is correct in Coolify env vars
2. Ensure Strapi is accessible from Coolify server
3. Check Strapi is running and responding
4. Test API endpoint:
   ```bash
   curl https://api.akdemiapp.com/api/pages
   ```

### Runtime Issues

#### "Page shows 404 for all routes"

**Cause:** serve not configured correctly for MPA

**Solution:**
- Already fixed in Dockerfile (removed `-s` flag from serve)
- Redeploy with updated Dockerfile

#### "Images not loading"

**Cause:** Incorrect Strapi URL or CORS

**Solution:**
1. Verify `PUBLIC_STRAPI_URL` in env vars
2. Check browser console for CORS errors
3. Update CORS in Strapi middlewares.ts
4. Ensure Strapi `public/uploads` is accessible

#### "Forms not submitting"

**Cause:** API endpoint blocked or CORS

**Solution:**
1. Check browser console for errors
2. Verify Strapi permissions (Public role can create)
3. Test API directly:
   ```bash
   curl -X POST https://api.akdemiapp.com/api/callback-requests \
     -H "Content-Type: application/json" \
     -d '{"data": {"name": "Test", "email": "test@test.com"}}'
   ```

### Webhook Issues

#### "Webhook not triggering rebuild"

**Cause:** Incorrect webhook URL or Strapi config

**Solution:**
1. Re-copy webhook URL from Coolify
2. Test webhook manually in Strapi
3. Check Coolify logs for incoming requests
4. Verify events are enabled in Strapi webhook

#### "Rebuild triggered but no changes visible"

**Cause:** Browser cache or build used old data

**Solution:**
1. Hard refresh browser: `Ctrl+Shift+R` or `Cmd+Shift+R`
2. Check Coolify logs - was build successful?
3. Verify Strapi content is published (not draft)
4. Check build timestamp in Coolify

### Performance Issues

#### "Site loads slowly"

**Cause:** Large assets or unoptimized images

**Solution:**
1. Use Astro Image component for optimization
2. Enable CDN (Cloudflare) in front of Coolify
3. Compress images before uploading to Strapi
4. Enable browser caching (Coolify headers)

#### "High memory usage in container"

**Cause:** serve using too much memory

**Solution:**
- Normal for serve (20-50MB)
- If >200MB, check for memory leaks
- Restart container in Coolify

---

## Monitoring

### Key Metrics to Monitor

1. **Uptime**
   - Target: 99.9%
   - Tool: UptimeRobot (free tier)

2. **Build Time**
   - Target: <5 minutes
   - Monitor: Coolify deployment logs

3. **Container Resources**
   - CPU: <10% average
   - Memory: <100MB
   - Monitor: Coolify dashboard

4. **Error Rate**
   - Target: <0.1%
   - Monitor: Browser console logs

### Coolify Health Checks

**Configured in Dockerfile:**

```dockerfile
HEALTHCHECK --interval=30s \
            --timeout=10s \
            --start-period=5s \
            --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1
```

**What it does:**
- Checks `/` every 30 seconds
- Marks unhealthy after 3 failed attempts
- Coolify auto-restarts unhealthy containers

### Logs

**Access logs in Coolify:**

1. **Build Logs:**
   - Navigate to resource
   - Click "Logs" tab
   - Select "Build Logs"
   - Shows npm install, build output, errors

2. **Runtime Logs:**
   - Click "Logs" tab
   - Select "Container Logs"
   - Shows serve output, requests

**Download logs:**
```bash
# Via Coolify CLI (if installed)
coolify logs [resource-id] > logs.txt
```

---

## Best Practices

### 1. Git Workflow

```bash
# Development
git checkout -b feature/new-section
# Make changes
git commit -m "feat: add testimonials section"
git push origin feature/new-section

# Create PR, review, merge to main
# Coolify auto-deploys main branch
```

### 2. Environment Management

- ✅ Use different Strapi instances for staging/production
- ✅ Create separate Coolify resources for staging/production
- ✅ Test changes in staging before production deploy

### 3. Content Updates

- ✅ Use Strapi's draft/publish workflow
- ✅ Preview changes in Strapi before publishing
- ✅ Expect 2-5 minute lag after publishing
- ✅ Schedule major content updates during low-traffic hours

### 4. Performance

- ✅ Optimize images in Strapi (max 1MB per image)
- ✅ Use WebP format when possible
- ✅ Enable Astro Image optimization
- ✅ Consider CDN for global audience

### 5. Security

- ✅ Use HTTPS only (automatic with Coolify)
- ✅ Keep dependencies updated: `npm audit fix`
- ✅ Don't commit `.env` files
- ✅ Rotate Strapi JWT secrets periodically
- ✅ Use webhook authentication
- ✅ Configure rate limiting in Strapi

---

## Additional Resources

- [Coolify Documentation](https://coolify.io/docs)
- [Astro Deployment Guide](https://docs.astro.build/en/guides/deploy/)
- [Strapi Webhooks](https://docs.strapi.io/dev-docs/configurations/webhooks)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

---

## Support

For issues or questions:

1. Check troubleshooting section above
2. Review Coolify/Strapi logs
3. Consult project CLAUDE.md files
4. Check GitHub Issues (if applicable)

---

**Last Updated:** 2025-01-13
**Version:** 1.0
