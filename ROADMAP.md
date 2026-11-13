# Roadmap

Theme development tracker. For albums to review, see [docs/REVIEW-TRACKER.md](docs/REVIEW-TRACKER.md).

## Done

- [x] Dark editorial design, accent colour from Ghost Brand settings
- [x] Dismissible welcome banner with avatar, configurable in Ghost admin
- [x] Latest review hero and cover grid on the homepage
- [x] Genre chips on the homepage
- [x] Review page with album meta, pull quotes and Koenig card styling
- [x] Review sidebar: Listen (first embed), Standout tracks (with real track numbers), Tags
- [x] "If you liked this" related reviews
- [x] Artist pages via `artist-` tags, with multiple artists shown as "A & B"
- [x] Index pages: Reviews (filter and sort), Artists, Genres, Years
- [x] About page layout
- [x] Newsletter signup with Ghost members
- [x] Docker Compose deployment behind a reverse proxy
- [x] CI: gscan validation, zip build, GitHub releases, optional auto-deploy

## Next

- [ ] Paginate the Reviews index with a `routes.yaml` channel (needed past 100 reviews)
- [ ] Nicer artist URLs (`/artist/bill-evans/`) via `routes.yaml`
- [ ] "More by this artist" block on review pages when the artist isn't the primary tag
- [ ] Ghost native comments styling (if comments are turned on)

## Ideas

- [ ] Light mode, following the visitor's system setting
- [ ] Album details card (label, release date, length) using a structured HTML card
- [ ] RSS feed per artist
- [ ] Open Graph images generated from the cover and title
- [ ] Translations (Portuguese)

Suggest something by opening an issue with the **Feature request** template.
