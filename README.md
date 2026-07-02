# Bruin Quant Traders — Website

The official website for **Bruin Quant Traders (BQT)**, UCLA's premier quantitative trading club. Modeled after peer sites like [Traders@MIT](https://traders.mit.edu/) and [Traders at Berkeley](https://traders.studentorg.berkeley.edu/), and built as a fast, static, single-page site.

## Stack

Plain HTML/CSS/JS — no build step, no dependencies. Deployed via GitHub Pages.

```
index.html            # all page content
assets/css/styles.css # styling (UCLA blue + gold branding)
assets/js/main.js     # nav, scroll reveals, stat counters
.github/workflows/    # GitHub Pages deploy workflow
```

## Local preview

Open `index.html` directly, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deployment (GitHub Pages)

Pushing to `main` triggers `.github/workflows/deploy.yml`, which publishes the site.

One-time setup on GitHub:

1. Push this repo to GitHub.
2. Go to **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**.
3. Every push to `main` redeploys automatically.

## Important: private data

`all-drive-data/` holds applicant responses, ratings, and personal information. It is
**git-ignored on purpose** so it is never committed or published. Do not remove it from
`.gitignore`.

## Custom domain

The site is served at **bruinquant.com** (see `CNAME`). For this to resolve, add these DNS
records at your domain registrar:

- Apex `bruinquant.com` → four `A` records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- (optional) `AAAA` records: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
- `www` → `CNAME` to `bruinquantraders.github.io`

Then in **Settings → Pages**, confirm the custom domain and enable **Enforce HTTPS**.

## TODO before going live

- Update the Instagram link in the Join section.
- Add real sponsor logos once partnerships are confirmed.
