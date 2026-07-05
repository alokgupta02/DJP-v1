# Deployment & Hosting Guide

## Overview

Digital Janta is a static website—no server-side processing required. Deploy to any static hosting platform.

**Requirements**:
- All `.html` files in same directory
- HTTP/HTTPS server (basic)
- No database or API backend needed

---

## Quick Deployment Checklist

- [ ] All 9 `.html` files present
- [ ] All documentation files included
- [ ] Verify all links work (href attributes)
- [ ] Test on mobile/tablet/desktop
- [ ] Enable HTTPS
- [ ] Set compression (gzip)
- [ ] Configure cache headers
- [ ] Set `overview.html` as home page (if required)
- [ ] Test navigation between pages

---

## Local Development

### Method 1: Direct Browser (Simplest)
```bash
# Open any .html file in web browser
open overview.html
# or
firefox judiciary.html
```

**Limitations**: Some browsers restrict certain features in local files. Recommended for basic testing only.

### Method 2: Local HTTP Server (Recommended)

**Python 3**:
```bash
cd /path/to/frontend/html
python -m http.server 8000
# Navigate to: http://localhost:8000
```

**Python 2**:
```bash
python -m SimpleHTTPServer 8000
```

**Node.js (http-server)**:
```bash
npm install -g http-server
cd /path/to/frontend/html
http-server
# Navigate to: http://localhost:8080
```

**Node.js (Express)**:
```javascript
const express = require('express');
const app = express();
app.use(express.static('/path/to/frontend/html'));
app.listen(3000, () => console.log('Server on :3000'));
```

**Ruby**:
```bash
ruby -run -ehttpd /path/to/frontend/html -p8000
```

**PHP**:
```bash
cd /path/to/frontend/html
php -S localhost:8000
```

---

## Production Hosting Platforms

### 1. GitHub Pages (Free, Popular)

**Setup**:
1. Create GitHub account (if not present)
2. Create new repository: `{username}.github.io`
3. Clone repository locally
4. Copy all `.html` files to repository
5. Commit: `git add .` → `git commit -m "Add DJ Dashboard"`
6. Push: `git push origin main`
7. Visit: `https://{username}.github.io`

**Advantages**:
- Free unlimited hosting
- HTTPS included
- Built-in CDN
- Direct git integration
- Easy updates via git push

**Custom Domain**:
1. Add `CNAME` file with domain name
2. Configure DNS to point to GitHub Pages
3. Enable HTTPS in repository settings

**Repository Structure**:
```
{username}.github.io/
├── overview.html
├── rep-index.html
├── judiciary.html
├── legislatures.html
├── governments.html
├── states.html
├── municipalities.html
├── parties.html
├── elections.html
├── design.md
├── claude.md
├── README.md
├── STRUCTURE.md
├── NAVIGATION.md
└── DEPLOYMENT.md
```

### 2. Netlify (Recommended for Simplicity)

**Setup Method A: Drag & Drop**
1. Go to netlify.com
2. Sign up (free account)
3. Drag & drop folder containing `.html` files
4. Site deployed automatically

**Setup Method B: Git Integration**
1. Connect GitHub account
2. Select repository
3. Set build command: (leave empty for static)
4. Set publish directory: `.` (current folder)
5. Deploy automatically on push

**Site Settings**:
- Free subdomain: `{sitename}.netlify.app`
- Custom domain: $12.99/year
- HTTPS: Automatic (Let's Encrypt)
- Redirects: Configure in `_redirects` file

**Example `_redirects` file**:
```
# Redirect root to dashboard
/ /overview.html

# Other redirects (optional)
/dashboard /overview.html
/reps /rep-index.html
```

**Advantages**:
- Easiest deployment
- Automatic HTTPS
- Fast CDN globally
- Preview deployments
- Form handling (optional)

### 3. Vercel

**Setup**:
1. Go to vercel.com
2. Import Git repository
3. Select `frontend/html` as root directory
4. Deploy

**Configuration (vercel.json)**:
```json
{
  "buildCommand": "echo 'Static deployment'",
  "cleanUrls": true,
  "trailingSlash": false,
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

**Advantages**:
- Optimized for Next.js (but works with static)
- Excellent performance
- Preview URLs for every push
- Easy environment variables

### 4. AWS S3 + CloudFront

**Setup**:
1. Create S3 bucket: `dj-dashboard`
2. Upload all `.html` files
3. Enable "Static website hosting"
4. Set index document: `overview.html`
5. Create CloudFront distribution
6. Set S3 as origin

**S3 Bucket Policy**:
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::dj-dashboard/*"
  }]
}
```

**CloudFront Configuration**:
- Origin: S3 bucket
- Viewer protocol: Redirect HTTP to HTTPS
- Cache TTL: 86400 (1 day)
- Compress objects automatically: Yes

**Advantages**:
- Highly scalable
- Global CDN
- Fine-grained control
- Cost-effective (pay-per-use)

**Disadvantage**: More complex setup

### 5. Azure Static Web Apps

**Setup**:
1. Create Azure account
2. Create "Static Web App"
3. Connect GitHub repository
4. Select build preset: (none - static)
5. Deploy

**Configuration (.github/workflows/azure-static-web-apps.yml)**:
```yaml
name: Azure Static Web Apps

on:
  push:
    branches: [main]

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Deploy to Azure
      uses: Azure/static-web-apps-deploy@v1
      with:
        azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
        repo_token: ${{ secrets.GITHUB_TOKEN }}
        action: "upload"
        app_location: "/frontend/html"
```

**Advantages**:
- Free tier available
- Azure ecosystem integration
- GitHub Actions automation
- Authentication built-in

### 6. Cloudflare Pages

**Setup**:
1. Go to pages.cloudflare.com
2. Connect GitHub account
3. Select repository
4. Build settings: (leave default)
5. Deploy

**Configuration (wrangler.toml)**:
```toml
name = "dj-dashboard"
main = "index.js"
type = "javascript"
```

**Advantages**:
- Fast global CDN
- DDoS protection
- Free SSL
- 500 deployments/month free

### 7. Traditional Hosting (cPanel, Shared Hosting)

**Setup**:
1. Log into hosting control panel
2. Upload files via FTP/SFTP:
   - Connect: `ftp.example.com`
   - User: your-username
   - Password: your-password
   - Directory: `/public_html`
3. Upload all `.html` files
4. Access: `http://example.com`

**Optional - .htaccess (Apache)**:
```apache
# Enable mod_rewrite
RewriteEngine On

# Set index page
DirectoryIndex overview.html

# Enable gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript
</IfModule>

# Set cache headers
<FilesMatch "\.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$">
  Header set Cache-Control "max-age=2592000, public"
</FilesMatch>
```

**Advantages**:
- Cheap (often $2-5/month)
- Immediate deployment
- Full control

---

## DNS & Custom Domain Setup

### 1. Purchase Domain
Options:
- GoDaddy
- Namecheap
- Google Domains
- Cloudflare

### 2. Configure DNS (Example with Netlify)

**CNAME Record**:
- Type: CNAME
- Name: `www`
- Value: `{sitename}.netlify.app`
- TTL: 3600

**A Record** (alternative):
- Type: A
- Name: `@` (root)
- Value: `75.2.60.5` (Netlify IP)

**Apex Domain** (Netlify):
- Type: A
- Name: `@`
- Value: `75.2.60.5`

### 3. Verify DNS (After setup)
```bash
# Check CNAME
nslookup www.example.com

# Check A record
dig example.com

# Verify HTTPS
curl -I https://example.com
```

---

## Performance Optimization

### 1. Enable Gzip Compression

**Netlify**: Automatic
**Vercel**: Automatic
**GitHub Pages**: Automatic
**Custom Server**: Add to `.htaccess` or nginx config

### 2. Set Cache Headers

**.htaccess** (Apache):
```apache
<FilesMatch "\.(html|htm)$">
  Header set Cache-Control "max-age=3600, public"
</FilesMatch>

<FilesMatch "\.(css|js)$">
  Header set Cache-Control "max-age=31536000, public"
</FilesMatch>
```

**nginx**:
```nginx
location ~* \.(html|htm)$ {
    expires 1h;
}

location ~* \.(css|js)$ {
    expires 365d;
}
```

### 3. Minify Assets (Optional)

**HTML Minifier**: online-html-minifier.com
**CSS Minifier**: cleancss.com
**JavaScript Minifier**: jscompress.com

### 4. Use CDN for Chart.js

Already included from CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

This is optimized with:
- Global CDN edge locations
- Automatic compression
- Browser caching

---

## SSL/HTTPS Setup

### Automatic (Recommended)

**Netlify**: Automatic (Let's Encrypt)
**Vercel**: Automatic (Let's Encrypt)
**GitHub Pages**: Automatic (Let's Encrypt)
**Cloudflare Pages**: Automatic

### Manual Setup

**Let's Encrypt with Certbot**:
```bash
sudo apt install certbot python3-certbot-apache
sudo certbot --apache -d example.com
# Renews automatically
```

**Redirect HTTP → HTTPS**:
```apache
# .htaccess
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## Monitoring & Analytics

### 1. Google Analytics
```html
<!-- Add to <head> of each page -->
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. Netlify Analytics
- Built into Netlify
- No additional setup
- Dashboard view of traffic

### 3. Cloudflare Analytics
- Built into Cloudflare Pages
- Real-time metrics
- Bot/DDoS blocking

### 4. Sentry (Error Tracking)
```html
<!-- Add to <script> section -->
<script src="https://browser.sentry-cdn.com/x.x.x/bundle.min.js"></script>
<script>
  Sentry.init({ dsn: "YOUR_DSN_URL" });
</script>
```

---

## Testing Before Deployment

### Checklist
- [ ] Test all 9 pages load correctly
- [ ] Navigation between pages works
- [ ] Sidebar toggle functions
- [ ] Responsive design works (mobile/tablet/desktop)
- [ ] Charts render correctly
- [ ] Images load (if any)
- [ ] Links work (external + internal)
- [ ] No console errors (F12 → Console)
- [ ] Page load time acceptable (< 3s)
- [ ] Mobile performance tested (Chrome DevTools)

### Browser Testing
- [ ] Chrome/Edge latest
- [ ] Firefox latest
- [ ] Safari latest
- [ ] Mobile Chrome
- [ ] Mobile Safari

### Tools
- Lighthouse: `chrome://lighthouse/`
- WebPageTest: webpagetest.org
- GTmetrix: gtmetrix.com

---

## Continuous Deployment (CI/CD)

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Netlify

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v1.1
      with:
        publish-dir: './frontend/html'
        production-branch: main
        github-token: ${{ secrets.GITHUB_TOKEN }}
        deploy-message: "Deploy from GitHub Actions"
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### Setup
1. Get Netlify auth token: netlify.com/user/applications
2. Add to GitHub secrets:
   - `NETLIFY_AUTH_TOKEN`
   - `NETLIFY_SITE_ID`
3. Commit and push—automatic deployment!

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Pages not loading | Check all `.html` files uploaded, verify file names match links |
| Navigation broken | Check `href` attributes point to correct files in same directory |
| Charts not rendering | Verify Chart.js CDN accessible, check browser console |
| Responsive broken | Clear browser cache (Ctrl+Shift+R), verify CSS loaded |
| HTTPS not working | Check DNS configuration, wait for propagation (24h) |
| Slow performance | Enable gzip compression, set cache headers, test with GTmetrix |
| Images not loading | Check file paths, ensure images in correct directory |

---

## Security Recommendations

1. **Keep Redirects Minimal**: Use direct links instead of complex redirects
2. **Set Security Headers**:
   ```
   X-Content-Type-Options: nosniff
   X-Frame-Options: SAMEORIGIN
   X-XSS-Protection: 1; mode=block
   ```
3. **Use HTTPS**: Always encrypt traffic
4. **Monitor Analytics**: Watch for suspicious patterns
5. **Regular Backups**: Keep local copy of all files
6. **Update Chart.js**: Keep CDN link current

---

## Deployment Comparison

| Platform | Cost | Setup | Speed | Custom Domain | HTTPS |
|----------|------|-------|-------|---------------|----- |
| GitHub Pages | Free | 5 min | ⭐⭐⭐⭐ | ✓ | ✓ |
| Netlify | Free | 2 min | ⭐⭐⭐⭐⭐ | ✓ | ✓ |
| Vercel | Free | 3 min | ⭐⭐⭐⭐⭐ | ✓ | ✓ |
| AWS S3 | $1-10 | 15 min | ⭐⭐⭐⭐ | ✓ | ✓ |
| Cloudflare | Free | 5 min | ⭐⭐⭐⭐⭐ | ✓ | ✓ |
| Shared Host | $3-5/mo | 10 min | ⭐⭐⭐ | ✓ | ✓ |

---

## Recommended Setup (2026)

**Best Overall**: Netlify + GitHub
- Free hosting
- Automatic deployments
- Zero configuration
- Excellent performance

**Most Affordable**: Shared Hosting ($3/mo)
- Cheapest option
- Traditional setup
- Still fast enough

**Enterprise**: AWS + CloudFront
- Highly scalable
- Pay-as-you-go
- Full control
- Complex setup

---

**Deployment Guide Version**: 1.0
**Last Updated**: June 27, 2026
**Recommended Platform**: Netlify
**Average Setup Time**: 5 minutes
