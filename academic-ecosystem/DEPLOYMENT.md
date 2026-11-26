# Deployment, repository and domain

This guide takes the site from this folder to its own GitHub repository, a
Vercel project, and a custom domain such as `arjunagrawal.com`.

None of these steps needs passwords or tokens to be shared with anyone. Each
is done in your own GitHub, Vercel or GoDaddy account.

---

## 1. Give the site its own repository

The site was built in the `academic-ecosystem/` folder on the
`claude/cool-ride-ft19au` branch of `ArjunAgrawal101/ib-economics`. That
branch was never merged into `main`, so the live Economics site is unchanged.
To move the site, with its history, into a new repository:

1. On GitHub, create an **empty private** repository named
   `arjun-agrawal-academic-ecosystem`. Do not add a README, licence or
   `.gitignore`.
2. On your computer:

```bash
git clone https://github.com/ArjunAgrawal101/ib-economics.git ecosystem-export
```

```bash
cd ecosystem-export && git fetch origin claude/cool-ride-ft19au
```

```bash
git subtree split --prefix=academic-ecosystem FETCH_HEAD -b ecosystem-main
```

```bash
git push https://github.com/ArjunAgrawal101/arjun-agrawal-academic-ecosystem.git ecosystem-main:main
```

The new repository now holds only the website, at its root, with its commit
history. You can delete the `ecosystem-export` folder and, once you have
checked the new repository, the `claude/cool-ride-ft19au` branch.

---

## 2. Deploy on Vercel

1. In Vercel, choose **Add New… → Project** and import
   `arjun-agrawal-academic-ecosystem`.
2. **Project name:** `arjun-agrawal`. If it is free, the address will be
   `https://arjun-agrawal.vercel.app`. If it is taken, use
   `arjun-agrawal-academic` or `arjunagrawal-ecosystem`.
3. **Framework preset:** Next.js (detected automatically). Leave the build
   and output settings at their defaults. **Root Directory:** leave blank (the
   site is at the root of the new repository).
4. **Environment variables:** none are required for the first deployment.
5. Choose **Deploy**.

Every push to `main` then deploys to production, and every other branch gets
a preview address.

> Want to deploy before moving the repository? You can import
> `ArjunAgrawal101/ib-economics` as a **new** Vercel project with **Root
> Directory** set to `academic-ecosystem` and **Production Branch** set to
> `claude/cool-ride-ft19au`. This is a stopgap: moving to the separate
> repository (step 1) keeps the two sites fully independent.

---

## 3. Check and buy the domain

Domain availability could not be checked from the build environment, so
check it yourself before buying:

- Search for `arjunagrawal.com` at GoDaddy (or any registrar).
- If it is taken, good alternatives are `arjunagrawal.in`,
  `arjunagrawal.academy`, `arjunagrawal.org` or `arjunagrawal.co.in`.

Do not buy any add-ons. Vercel provides SSL (HTTPS) and hosting.

---

## 4. Connect the domain

### In Vercel

1. Open the project → **Settings → Domains**.
2. Add `arjunagrawal.com` (your purchased domain).
3. When Vercel offers it, also add `www.arjunagrawal.com` and choose
   **Redirect to `arjunagrawal.com`** (308 permanent). The domain without
   `www` becomes the canonical address. Every visit to `www.` is redirected
   to it.
4. Vercel now lists the DNS records it needs for each domain, with exact
   values. Keep this page open. **Use the values Vercel shows, not values
   from any guide**, because they can differ by project and change over time.

### In GoDaddy

1. Go to **My Products → (your domain) → DNS → Manage DNS**.
2. **Root domain (`@`):** Vercel will ask for an **A** record.
   - Find the existing **A** record with name `@`. GoDaddy usually points it
     at a "Parked" page. **Edit** it: Type `A`, Name `@`, Value = *the IP
     address Vercel shows*, TTL = default (1 hour is fine).
   - Delete any other `A` or `AAAA` records named `@`. They would send some
     visitors to the parked page.
3. **`www`:** Vercel will ask for a **CNAME** record.
   - Edit the existing **CNAME** named `www` (GoDaddy often points it at
     `@`): Type `CNAME`, Name `www`, Value = *the hostname Vercel shows*.
4. If GoDaddy **Domain Forwarding** is switched on for the domain, turn it
   off. It overrides these records.
5. Leave MX, TXT and other records alone unless you set up email on this
   domain later.

DNS changes usually take effect within minutes, occasionally up to 48 hours.
Vercel shows **Valid Configuration** for each domain when it works, and issues
the HTTPS certificate automatically.

### Make the domain canonical

1. In Vercel → **Settings → Environment Variables**, add
   `NEXT_PUBLIC_SITE_URL` = `https://arjunagrawal.com` (your domain, no
   trailing slash) for the **Production** environment.
2. Redeploy: **Deployments → latest production deployment → ⋯ → Redeploy**.

The canonical URLs, sitemap, robots file, social previews and structured data
then use the custom domain. Without the variable, the site uses Vercel's
production address automatically, so nothing breaks in the meantime.

### After the domain is live

- Submit `https://arjunagrawal.com/sitemap.xml` in **Google Search Console**
  (verify the domain with the TXT record it gives you, added in GoDaddy DNS).
- Use the new address on LinkedIn, in your CV, email signature and visiting
  cards, and link to it from the footers of the three platforms.
- Check the social preview with LinkedIn's **Post Inspector**.

---

## 5. Analytics (optional)

No analytics are included. If you want visitor statistics, enable **Vercel
Web Analytics** in the project dashboard. It uses no cookies. Install
`@vercel/analytics`, add `<Analytics />` to `app/layout.tsx`, and mention it
in a short privacy note.
