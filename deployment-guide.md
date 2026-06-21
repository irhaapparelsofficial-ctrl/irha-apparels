# Deployment Guide - Irha Apparels

## Step 1: Verify GitHub Repository

✅ Repository created: `irhaapparelsofficial-ctrl/irha-apparels`

## Step 2: Supabase Configuration

### Run Setup SQL
1. Go to Supabase Dashboard → SQL Editor
2. Create new query
3. Copy content from `supabase-setup.sql`
4. Execute

### Enable Authentication
1. Go to Authentication → Providers
2. Enable Email/Password
3. Enable Google OAuth (optional)

## Step 3: Cloudflare Configuration

### DNS Setup
1. Go to Cloudflare Dashboard → Domains → irhaapparels.com
2. Add DNS records:
   - Type: A
   - Name: irhaapparels.com
   - Value: Your server IP or Pages IP
   - Proxied: Yes

### Workers Deployment
1. Install Wrangler: `npm install -g wrangler`
2. Configure authentication: `wrangler login`
3. Deploy: `npm run deploy:cloudflare`

### Pages Setup
1. Go to Cloudflare Pages
2. Create new project from GitHub
3. Select: `irhaapparelsofficial-ctrl/irha-apparels`
4. Build settings:
   - Framework: Vite
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Add environment variables from `.env.local`
6. Deploy

## Step 4: GitHub Actions (CI/CD)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - uses: cloudflare/pages-action@1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: irha-apparels
          directory: dist
```

## Step 5: Verify Deployment

✅ Check GitHub repository
✅ Run Supabase setup SQL
✅ Configure Cloudflare DNS
✅ Deploy to Cloudflare Pages
✅ Test domain: https://irhaapparels.com

## Environment Variables Configured

```
✅ VITE_SUPABASE_URL
✅ VITE_SUPABASE_ANON_KEY
✅ SUPABASE_SERVICE_ROLE_KEY
✅ CLOUDFLARE_ACCOUNT_ID
✅ CLOUDFLARE_API_TOKEN
✅ CLOUDFLARE_ZONE_ID
✅ VITE_DOMAIN
✅ VITE_DOMAIN_URL
✅ VITE_ENV
```

## Testing

1. Run locally:
   ```bash
   npm install
   npm run dev
   ```

2. Test Supabase connection:
   - Check console for connection status
   - Try authentication flow

3. Test Cloudflare Workers:
   - Visit `/health` endpoint
   - Check `/api/products` endpoint

## Monitoring

- GitHub: Check workflow runs
- Cloudflare: Monitor Pages deployments
- Supabase: Check API usage and errors

## Troubleshooting

### Build fails
- Check Node.js version: `node --version` (should be 18+)
- Clear cache: `rm -rf node_modules && npm install`

### Deployment fails
- Verify environment variables are set
- Check Cloudflare API token is valid
- Ensure GitHub token has correct permissions

### Database connection fails
- Verify Supabase URL and keys
- Check RLS policies
- Test connection manually
