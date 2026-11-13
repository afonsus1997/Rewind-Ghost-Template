# Installing Rewind

This guide sets up a self-hosted Ghost 6 site running the Rewind theme, using Docker Compose behind **Nginx Proxy Manager** (NPM), with **Cloudflare** DNS and **Mailgun** email. Adapt the proxy and DNS steps if you use something else.

**Contents**

1. [What you need](#1-what-you-need)
2. [DNS](#2-dns)
3. [Start Ghost with Docker Compose](#3-start-ghost-with-docker-compose)
4. [Reverse proxy and HTTPS](#4-reverse-proxy-and-https)
5. [Create your admin account](#5-create-your-admin-account)
6. [Install the theme](#6-install-the-theme)
7. [Set up the site](#7-set-up-the-site)
8. [Email: sign-in links and newsletters](#8-email-sign-in-links-and-newsletters)
9. [Backups](#9-backups)
10. [Updating](#10-updating)
11. [Troubleshooting](#11-troubleshooting)
12. [Auto-deploy the theme from GitHub](#auto-deploy-the-theme-from-github)

---

## 1. What you need

- A Linux server with **Docker** and the **Compose plugin** (`docker compose version` works)
- A reverse proxy that handles HTTPS, already serving ports 80 and 443 (these steps use Nginx Proxy Manager)
- A domain, e.g. `rewind.example.com`
- Optional, for email: a **Mailgun** account

## 2. DNS

Create a DNS record for your blog's domain pointing to your server's **public** IP:

| Type | Name | Content | Proxy (Cloudflare) |
|---|---|---|---|
| `A` | `rewind` | your public IP | Proxied or DNS only, see below |

- If your home IP changes, use a `CNAME` to a hostname your dynamic DNS updater keeps current.
- **Cloudflare proxied (orange cloud):** set SSL/TLS mode to **Full (strict)**. *Flexible* causes an endless redirect loop with Ghost.
- If the certificate request in step 4 fails while proxied, switch the record to **DNS only** (grey cloud) until the certificate is issued, or use NPM's DNS challenge with a Cloudflare API token.
- If the server is at home, forward ports 80 and 443 on your router to the machine running the proxy.

Check the record from outside your network:

```bash
nslookup rewind.example.com 1.1.1.1
```

## 3. Start Ghost with Docker Compose

Copy the `deploy/` folder to your server, e.g. `/mnt/containers/rewind`:

```bash
cd /mnt/containers/rewind
cp .env.example .env
```

Edit `.env`:

```bash
DOMAIN=rewind.example.com

# Use a different random value for each (openssl rand -hex 24)
DB_PASSWORD=...
DB_ROOT_PASSWORD=...

# Transactional email (see step 8). Ghost runs without it, but sign-in links won't send.
MAIL_FROM="Rewind <noreply@rewind.example.com>"
SMTP_HOST=smtp.eu.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@rewind.example.com
SMTP_PASS=...
```

> **Passwords:** prefer hex strings from `openssl rand -hex 24`. Characters like `&`, `#` and `$` can be misread in `.env` files.
> MySQL only reads the passwords **the first time** it creates its database. Changing them later in `.env` alone causes `Access denied` errors (see [Troubleshooting](#11-troubleshooting)).

Start it:

```bash
docker compose up -d
docker compose logs -f ghost
```

The first start creates the database and takes 20 to 30 seconds. Wait for `Ghost booted`.

Data is stored next to the compose file:

```
data/ghost/   images, themes, settings files
data/mysql/   the database
```

Ghost listens on port **8098** on the host. Opening `http://<server-ip>:8098` directly in a browser redirects to HTTPS and fails; that's expected. Ghost only answers properly through the proxy.

## 4. Reverse proxy and HTTPS

In Nginx Proxy Manager › Hosts › Proxy Hosts › **Add Proxy Host**:

| Tab | Setting | Value |
|---|---|---|
| Details | Domain Names | `rewind.example.com` |
| | Scheme | `http` |
| | Forward Hostname / IP | your server's LAN IP |
| | Forward Port | `8098` |
| | Block Common Exploits | on |
| | Websockets Support | on |
| SSL | SSL Certificate | Request a new SSL Certificate |
| | Force SSL, HTTP/2 Support | on |

NPM sends the `X-Forwarded-Proto: https` header that Ghost needs to avoid redirect loops.

## 5. Create your admin account

Open `https://rewind.example.com/ghost` and create the owner account. Then delete Ghost's sample posts.

## 6. Install the theme

1. Get `rewind.zip` from the root of the repository (on GitHub: open the file › **Download raw file**), from the latest GitHub release, or build it yourself: `./scripts/build.sh`
2. Ghost admin › **Settings › Design › Change theme › Upload theme**, choose the zip, then **Activate**.
   When updating, upload the new zip and choose to overwrite.

## 7. Set up the site

### General and brand

- **Settings › General:** title, description, timezone, language.
- **Settings › Design › Brand:** accent colour (Rewind's default is `#FF6B2C`), publication icon, and fonts if you want to change them.
- **Your profile** (avatar at the bottom left › Your profile): name, profile picture, bio, **website**. The bio and website appear on the About page.

### Theme settings

**Settings › Design › Customize**:

| Setting | What it does |
|---|---|
| Show welcome banner | Turns the homepage banner on or off |
| Welcome title / text | Banner heading and intro |
| Welcome image | Round image in the banner (your avatar) |
| Welcome button label / link | Banner button, e.g. "About me" → `/about/` |
| Pixel art images | Keeps the banner image and About portrait crisp (turn off for photos) |
| Newsletter title | Heading of the signup form in the footer |

### Pages

Create these pages (**Pages › New page**, then set the **Page URL** in page settings):

| Slug | Title (example) | Notes |
|---|---|---|
| `about` | Hi, I'm Your Name. | Feature image = portrait. Excerpt = intro line. Body = your story and links. |
| `reviews` | Reviews | Leave the body empty: the list of all reviews is generated. |
| `artists` | Artists | Generated from artist tags. |
| `genres` | Genres | Generated from genre tags. |
| `years` | Years | Generated from year tags. |

The excerpt of each index page shows as a subtitle; anything in the body shows below the list.

### Navigation

**Settings › Navigation › Primary**:

| Label | URL |
|---|---|
| Reviews | `/reviews/` |
| Artists | `/artists/` |
| Genres | `/genres/` |
| Years | `/years/` |
| About | `/about/` |

**Secondary** navigation shows in the footer.

### Turn off what you don't use

- **Settings › Network:** turn off ActivityPub if you don't run it (this setup doesn't). Otherwise Ghost logs `Could not get webhook secret for ActivityPub` on boot; harmless.
- **Settings › Analytics:** web analytics needs Tinybird, which this setup doesn't include.
- **Settings › Membership:** free signups only is enough for the newsletter.

## 8. Email: sign-in links and newsletters

Ghost sends two kinds of email, configured in two places:

| Email | Examples | Configured in | Mailgun credential |
|---|---|---|---|
| Transactional | Member sign-in links, signup confirmations, staff invites | `.env` (SMTP) | SMTP user + password |
| Newsletters | A review emailed to all subscribers | Ghost admin › Settings › Email newsletter | API key |

Steps:

1. In Mailgun, add your sending domain (e.g. `rewind.example.com`), choosing the **EU** or **US** region.
2. Add the DNS records Mailgun shows (SPF, DKIM, MX) in Cloudflare as **DNS only**.
3. Copy the SMTP credentials (Domain settings › SMTP credentials) into `.env`, then run `docker compose up -d`.
4. In Ghost admin › Settings › Email newsletter, enter the Mailgun domain, region and **API key**.
5. Send yourself a test newsletter.

Mailgun's free plan allows about 100 emails a day, enough for roughly 100 subscribers. Past that, a paid plan is needed. Bulk newsletters can't be sent over plain SMTP.

## 9. Backups

Everything lives in the deploy folder: `data/`, `.env` and `docker-compose.yml`.

**Simple (a few seconds of downtime):**

```bash
docker compose stop
tar czf rewind-backup-$(date +%F).tar.gz data .env docker-compose.yml
docker compose start
```

**No downtime:** dump the database, then back up `data/ghost` plus the dump:

```bash
docker compose exec db sh -c 'mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" ghost' > ghost-db-$(date +%F).sql
```

Don't copy `data/mysql` while MySQL is running. `.env` contains passwords: keep backups private.

You can also export content as JSON in Ghost admin › Settings › Migration tools › Export.

## 10. Updating

**Ghost:**

```bash
docker compose pull
docker compose up -d
```

Back up first. The compose file tracks the `ghost:6-alpine` image, so this stays on Ghost 6.

**Theme:** upload the new `rewind.zip` and overwrite, or use auto-deploy (below).

## 11. Troubleshooting

| Symptom | Cause and fix |
|---|---|
| `Access denied for user 'ghost'` in the logs | The database was created with different passwords. Fresh install: `docker compose down`, delete `data/mysql`, `docker compose up -d`. Existing data: change the password inside MySQL with `ALTER USER`, then in `.env`. |
| Browser shows `ERR_SSL_UNRECOGNIZED_NAME_ALERT` after opening `http://IP:8098` | Ghost redirected to HTTPS on the bare IP. Expected: use the domain through the proxy. |
| `DNS_PROBE_FINISHED_NXDOMAIN` but `nslookup <domain> 1.1.1.1` works | Your local DNS cached "not found". Run `resolvectl flush-caches` (Linux), flush your Pi-hole or router cache, or wait. |
| Cloudflare error **522** | Cloudflare can't reach your server. Check port forwarding for 80/443 and that the proxy is running. |
| Endless redirect loop | Cloudflare SSL mode is *Flexible* (set **Full (strict)**), or the proxy isn't sending `X-Forwarded-Proto`. |
| Sign-in or signup emails never arrive | SMTP settings in `.env` are missing or wrong. Check `docker compose logs ghost` after a signup. |
| An artist shows as "artist-Name" | The `artist-` prefix belongs in the tag **slug**, not its name. See the author guide. |

## Auto-deploy the theme from GitHub

The CI workflow can upload the theme to your site on every push to `main`:

1. Ghost admin › **Settings › Integrations › Add custom integration**, name it "GitHub deploy". Copy the **Admin API key** and **API URL**.
2. On GitHub: repository › Settings › Secrets and variables › Actions:
   - **Secrets:** `GHOST_ADMIN_API_URL` and `GHOST_ADMIN_API_KEY`
   - **Variables:** `GHOST_DEPLOY` = `true`
3. Push a change under `theme/`. The *Deploy* job uploads and activates the theme.

Leave `GHOST_DEPLOY` unset to keep deploys off.
