# Author guide

How to write and publish a review on Rewind.

**Contents**

- [What a Rewind review is](#what-a-rewind-review-is)
- [Before you write: tags](#before-you-write-tags)
- [Writing the review](#writing-the-review)
- [The sidebar: Listen and Standout tracks](#the-sidebar-listen-and-standout-tracks)
- [Love letters: games and films](#love-letters-games-and-films)
- [Publishing](#publishing)
- [Checklist](#checklist)
- [Quick reference](#quick-reference)

---

## What a Rewind review is

An album is more than a number, so **there are no scores**. Each review covers two things:

1. **What the album transmits**: its mood, the feelings it carries, how it can move whoever is listening.
2. **Your story with it**: when and how it found you, where you were, what was going on, and the mark it left.

Lead with the album and what it gives the listener; let your own experience carry it. A review that's only about the writer feels like a diary; one with no personal angle feels like a press release.

Good questions to answer:

- Where were you the first time you really heard it?
- What does it sound like it *feels* like, in plain words?
- Who would this album be good for, and when?
- What has stayed with you since?

## Before you write: tags

Tags drive the artist pages, the genre buttons and the index pages, so get them right first.

| What | Name | Slug | Example |
|---|---|---|---|
| **Artist** | The artist's name as printed | `artist-` + name | `Bill Evans` / `artist-bill-evans` |
| **Genre** | Any genre | anything | `Jazz` / `jazz` |
| **Year** | Release year | `year-` + year | `1980` / `year-1980` |

**Create artist and year tags in Ghost admin › Tags › New tag first**, so you can set the slug. If you create a tag by typing it into a post, Ghost builds the slug from the name and the theme won't recognise it as an artist or year.

Optional, but worth it for artists: add a **description** (shown on their artist page) and an **image** (shown on the Artists index instead of their latest album cover).

### Multiple artists

| Situation | What to tag |
|---|---|
| Joint album by named artists (e.g. *Undercurrent*, Bill Evans & Jim Hall) | One artist tag per artist. Shows as "Bill Evans & Jim Hall"; the review appears on both artist pages. |
| Guest musicians, sidemen, featured players | No tag. Mention them in the text. |
| Duo or band with its own name (Simon & Garfunkel) | One tag for the act. |
| "X and the Y" credits | One tag, as printed. |
| Compilations, soundtracks, many artists | One tag: `Various Artists` / `artist-various-artists` |

### Tag order

The **first tag** is the primary tag. It sets the breadcrumb (*Reviews / Jazz*) and what "If you liked this" suggests:

- Genre first: suggestions from the same genre (recommended)
- Artist first: suggestions from the same artist

## Writing the review

In Ghost admin › Posts › **New post**:

| Field | What to put there |
|---|---|
| **Title** | The album name only, e.g. *You Must Believe in Spring* |
| **Feature image** | The album cover. Square, at least 1200×1200 px. Add alt text, e.g. "Cover of You Must Believe in Spring". |
| **Excerpt** (post settings) | One or two sentences: the hook. Shown on the homepage, in the hero and as the review's opening line. |
| **Tags** (post settings) | Genre, artist(s), year, in that order |
| **Body** | Your review |

Body tips:

- Use **headings** (`##`) only for real sections; most reviews don't need any.
- Album details such as label or release date go in the text if you want them; the theme has no separate fields for them.
- **Quote** a line with `>` to get a large pull quote.
- Wide and full-width images work, but stay within the text column on review pages because of the sidebar.

## The sidebar: Listen and Standout tracks

On the published review, the sidebar fills itself from the body. In the editor everything stays where you typed it.

### Listen

Paste a Spotify, Bandcamp, Apple Music or YouTube link on an **empty line** and choose **Embed** (or use **+ › Spotify / YouTube / Other**). The **first** embed in the post moves into the *Listen* box.

### Standout tracks

1. Add a heading: type `## ` and then `Standout tracks` (exact words; capitals don't matter).
2. Directly under it, a list with one track per line.

To show the album's real track numbers, use a **bulleted** list (`- `) and start each line with the number:

```
## Standout tracks
- 3 Track x
- 6 Track y
```

This shows as **03** Track x, **06** Track y. Without numbers, tracks are numbered 01, 02, 03 automatically.

If a review has no embed or no Standout tracks heading, that box doesn't appear. Tags always show.

## Love letters: games and films

Love letters are for games and films you fell for, **told through their music**. They're longer and more personal than a review and can wander into the story, the world and your memories of it, but the soundtrack stays at the centre: that's what keeps Rewind a music blog.

### Setting one up

| Field | What to put there |
|---|---|
| **Title** | The game or film, e.g. *Lantern Tides* |
| **Feature image** | The soundtrack cover (or the game/film key art if there's no album) |
| **Excerpt** | What the music did for you, in a sentence |
| **Tags** | `Soundtrack` (genre) · the composer as an artist tag (`artist-…`) · year · **`#love-letter`** |

`#love-letter` is an **internal tag**: the `#` keeps it hidden from readers, the genre buttons and the index pages, but the theme uses it to:

- show a **Love letter** badge on cards and in the Reviews index
- change the homepage hero to "Latest love letter"
- add "A love letter to" above the title and link the breadcrumb to `/letters/`
- list the post on the **Love letters** page

Create the tag once in Ghost admin › Tags › New tag (name `#love-letter`; Ghost sets the slug to `hash-love-letter`), then pick it on each letter.

Composers get artist pages like any musician, so a game score and the composer's albums end up side by side.

### Keeping the music at the centre

- **Open with a moment in the music:** a theme coming in, a track you replayed, the first time a motif returned.
- Then widen out: the scene it played under, what the game or film was about, where you were in your life.
- Come back to the music to close: what it transmits on its own, outside the game or film.
- **Standout tracks** and the **Listen** embed work exactly as in reviews.
- No scores, here too.

The Reviews index lists both kinds of post; readers can switch between **All**, **Reviews** and **Love letters**. Link straight to a filtered list with `/reviews/#letters` or `/reviews/#reviews`.

## Publishing

1. **Preview** the post (top right) on desktop and mobile.
2. **Publish**. Choose:
   - **Publish only**: the review goes on the site.
   - **Publish and email**: also sends it to newsletter subscribers (needs Mailgun set up).
3. The newest review becomes the homepage hero automatically.

To fix something after publishing, edit and click **Update**. Updates are not re-sent by email.

## Checklist

- [ ] Title is the album name only
- [ ] Square cover uploaded as the feature image, with alt text
- [ ] Excerpt written (one or two sentences)
- [ ] Tags: genre first, then artist(s) with `artist-` slugs, then year with a `year-` slug
- [ ] The review says what the album transmits **and** how it found you
- [ ] Optional: music embed for the Listen box
- [ ] Optional: `Standout tracks` heading + list
- [ ] Previewed on desktop and mobile
- [ ] Decided: publish only, or publish and email

## Quick reference

| I want to… | Do this |
|---|---|
| Change the welcome banner text | Settings › Design › Customize › Homepage |
| Hide the welcome banner | Same place › turn off *Show welcome banner* |
| Change the orange accent | Settings › Design › Brand › Accent colour |
| Add a link to my other sites on About | In the About page body: paste the URL on an empty line › **Bookmark** |
| Add a page to the menu | Settings › Navigation |
| Fix "artist-Name" showing on a review | Tags › edit the tag › Name `Name`, Slug `artist-name` |
| See all reviews | `/reviews/` |
| Make a post a love letter | Add the internal tag `#love-letter` |
| See all love letters | `/letters/` |
