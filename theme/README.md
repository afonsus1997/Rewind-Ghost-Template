# Rewind

A Ghost theme for feelings-first album reviews. No scores: just what an album transmits and the story behind it.

## Install

Ghost admin › Settings › Design › Change theme › Upload theme › `rewind.zip` › Activate.

## Theme settings

Settings › Design › Customize:

- **Homepage**: welcome banner on/off, title, text, image (your avatar), button label and link.
- **Site-wide**: newsletter title, and "Pixel art images" (keeps the welcome image and About avatar crisp).
- **Brand**: the accent colour (default orange `#FF6B2C`) and fonts come from Ghost's Brand settings.

## Writing a review

| Field | Use |
|---|---|
| Title | Album name |
| Feature image | Album cover (square works best) |
| Excerpt | Short teaser shown on the homepage and as the review's lead |
| Tags | Artist, genre(s), year (see below) |

### Sidebar: Listen and Standout tracks

The review sidebar fills itself from the post body:

- **Listen**: the first Spotify / Bandcamp / Apple Music / YouTube embed in the post (paste the link on an empty line and choose "Embed", or + › Spotify) moves to the sidebar.
- **Standout tracks**: add a heading that says exactly `Standout tracks`, with a numbered or bulleted list right under it. Both move to the sidebar, shown as 01, 02, 03…
  To show the album's real track numbers, use a bulleted list and start each line with the number: `3 Track x`, `3. Track x` or `3 - Track x` shows as **03** Track x.
- **Tags**: always shown.

### Tag conventions

- **Artist**: slug must start with `artist-`. Example: name `Rosalía`, slug `artist-rosalia`.
  Shown under the title, linked to an artist page that lists every review of theirs.
  Several artists on one album (a joint album): add one artist tag for each. They show as "Bill Evans & Jim Hall",
  and the review appears on both artist pages. Guest musicians and sidemen get no tag; mention them in the text.
  Compilations: one tag named `Various Artists`, slug `artist-various-artists`.
  A duo or band with its own name (Simon & Garfunkel) is one tag.
- **Genre**: any normal tag (`Rock`, `Art pop`…). Shown as chips on the homepage.
- **Year**: name `2025`, slug `year-2025`. Shown in card metadata, kept out of the genre chips.

The **first tag** is the primary tag: it drives the breadcrumb and "If you liked this".
Put the genre first for genre-based suggestions, or the artist first for same-artist suggestions.

## About page

Create a page with the slug `about`. It automatically uses the About layout:

- The page **title** is the big heading (e.g. "Hi, I'm Afonso Muralha.").
- The **feature image**, or your staff profile picture, is the round portrait.
- The page **excerpt**, or your staff bio, is the intro line.
- Your staff profile **website** becomes the "Personal website" button.
- Write the rest (your story, links to your other sites) in the page body.

## Love letters

Posts about games and films you fell for, told through their music.

**Set up once**

1. Tags › New tag: name `#love-letter` (internal tag; slug `hash-love-letter`).
2. Pages › New page: title `Love letters`, page URL `letters`. Leave the body empty; the excerpt shows as a subtitle.
3. Settings › Navigation: `Love letters` → `/letters/`.

**For each letter**

- **Title:** the game or film. **Feature image:** the soundtrack cover or key art.
- **Tags:** `Soundtrack` · the composer as an artist tag (`artist-…`) · year (`year-…`) · `#love-letter`.
- Standout tracks and the Listen embed work as in reviews.

**What the tag changes:** a "Love letter" badge on cards, "Latest love letter" in the homepage hero, "A love letter to" above the title with a breadcrumb to `/letters/`, and a listing on the Love letters page. The Reviews page gets All / Reviews / Love letters buttons; `/reviews/#letters` opens it filtered.

## Index pages: Artists, Genres, Years

Create three pages with these exact slugs. Their content is generated automatically from your tags:

| Page slug | Lists |
|---|---|
| `reviews` | Every review and love letter (up to 100), with a live filter box, All / Reviews / Love letters, and Newest / A–Z sorting |
| `letters` | Every post with the internal tag `#love-letter` |
| `artists` | Every tag whose slug starts with `artist-` |
| `genres` | Every other public tag (not `artist-` or `year-`) |
| `years` | Every tag whose slug starts with `year-`, newest first |

Each tile shows the tag's image (Tags › edit tag › image) or, if it has none, the cover of its latest review.
The page title, excerpt and any body text you write appear above the list.

## Navigation

Settings › Navigation › Primary, for example:

| Label | URL |
|---|---|
| Reviews | `/reviews/` |
| Love letters | `/letters/` |
| Artists | `/artists/` |
| Genres | `/genres/` |
| Years | `/years/` |
| About | `/about/` |

Secondary navigation appears in the footer.
