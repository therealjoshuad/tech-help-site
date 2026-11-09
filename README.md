# Code Check

A one-page, plain-English guide for friends and family who suddenly get a flood of verification codes (texts and emails) they never asked for. It explains what's probably going on, how worried to be, and gives a short checklist.

No build step, no dependencies, no tracking, no external requests. Just HTML, CSS, and a tiny bit of JavaScript.

```
public/
  index.html   all the content
  styles.css   look and feel (colors are variables at the top)
  app.js       saves checklist progress on the device + share button
  _headers     security headers for Cloudflare (strict CSP)
wrangler.jsonc optional, only for deploying with Wrangler
```

## Preview locally

```bash
python3 -m http.server -d public 8000
# open http://localhost:8000
```

## Put it on GitHub

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin git@github.com:therealjoshuad/tech-help-site.git
git push -u origin main
```

## Host it free on Cloudflare

In the Cloudflare dashboard go to **Workers & Pages**, choose **Create**, pick **Pages**, then **Connect to Git** and select the repo. Use these settings:

- Framework preset: **None**
- Build command: *(leave empty)*
- Build output directory: **public**

Every push to `main` redeploys automatically. You get a free `*.pages.dev` address, and you can attach your own domain under **Custom domains**.

If the dashboard steers you to Workers with static assets instead, that works too. `wrangler.jsonc` is already set up, so `npx wrangler deploy` from the repo root publishes the `public` folder.

## Editing

- **Text:** everything is in `public/index.html`. Each checklist item is a `<li>` with a unique `data-step` value. If you add or remove items, update the `max`/`value` and the "0 of 16" text on the progress bar to match the new total (the script recounts on load, so this only affects the no-JavaScript view).
- **Colors and fonts:** the variables at the top of `styles.css`.
- **Links:** click-test the outside links (credit bureaus, FTC, CISA) every so often, since agencies move pages around.
- **Content Security Policy:** `_headers` only allows scripts and styles from the site itself. If you add a font, analytics script, or image host, you'll need to loosen it.

## Sources behind the advice

Guidance in the page lines up with consumer advice from the FTC (identity theft recovery, credit freezes), CISA (password managers, two-step verification, phishing-resistant sign-in such as passkeys), and common security-vendor write-ups on unrequested one-time-code floods. Last reviewed November 2026.
