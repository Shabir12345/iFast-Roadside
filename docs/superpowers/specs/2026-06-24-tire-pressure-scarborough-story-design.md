# Design Spec — "Correct Tire Pressure" Scarborough Customer-Story SEO Page

**Date:** 2026-06-24
**Author:** iFAST team (via Claude Code)
**Status:** Approved design — ready for implementation

## Goal

Publish one new SEO page built around a real customer story: technician **Fayaz**
helped **Selena Alleyne** at a Scarborough gas station (near Finch & Kennedy) after
she accidentally inflated her tires to **72 PSI** with a child in the back seat. He
corrected the pressure, taught her the right PSI, and she left a 5-star Google review.
The page must rank for tire-pressure + Scarborough searches and get **indexed in
Google Search Console** — indexing is the session's success criterion.

## Approach (approved)

- **Page type:** New blog post — a data entry appended to `BLOG_POSTS` in
  `data/blogContent.tsx`. Reuses the existing `/blog/:slug` route and `BlogPost.tsx`
  renderer. No new components or routes.
- **Angle:** Educational tire-pressure safety guide anchored by the true story.
- **Attribution:** Technician **Fayaz** named, matching Selena's public Google review.

### Why this approach

The blog system already emits `BlogPosting` + `FAQPage` JSON-LD, per-page canonical,
OG/Twitter meta, and is wired into the build-time prerender → static HTML → Vercel
pipeline. Four existing posts indexed this exact way. Lowest-risk, fastest path to a
crawlable, indexable page.

## URL & metadata

- **Slug:** `correct-tire-pressure-scarborough`
- **Canonical:** `https://www.ifastroadside.ca/blog/correct-tire-pressure-scarborough`
- **Category:** `Emergency Tips` (reuses existing category color map)
- **publishDate:** `2026-06-24`
- **readTime:** `6 min read`
- **heroImage:** `/tire_service_hero.jpg` (existing asset) — alt: "iFAST technician
  checking and correcting tire pressure for a driver in Scarborough"
- **seoTitle:** `Correct Tire Pressure Saved This Scarborough Mom | What PSI Your Tires Need — iFAST`
- **seoDescription:** `A Scarborough driver pumped her tires to a dangerous 72 PSI with
  her child in the car. Here's what correct tire pressure actually is, why overinflated
  tires are dangerous, and how iFAST's mobile tire service helps across Scarborough & East GTA.`
- **keywords:** `correct tire pressure, what PSI should my tires be, overinflated tires
  danger, tire pressure check Scarborough, mobile tire service Scarborough, tire pressure
  help near me, too much air in tires, tire safety Scarborough, mobile tire service East GTA,
  recommended tire pressure`

## Page structure (sections)

1. **Intro hook** — the gas-station moment near Finch & Kennedy; mother + child; 72 PSI;
   stakes. Lead paragraph styled like other posts (`text-xl text-gray-600 font-medium`).
2. **"72 PSI is a loaded gun: what over-inflation actually does"** — blowout risk,
   reduced grip/longer stopping distance, harsh ride, center-tread wear, danger in heat.
3. **"So what *should* your tires be? (The number almost everyone gets wrong)"** —
   door-jamb sticker is the source of truth; typical 30–35 PSI; the sidewall number is the
   **max**, not the target; check when cold. This is exactly what Fayaz taught Selena.
4. **"What happened in that Scarborough parking lot"** — the rescue told properly:
   Fayaz steps in, bleeds the pressure down to spec, explains it so she can do it herself,
   confirms she + her child are safe to drive.
5. **Selena's review — verbatim callout** — Google "G", 5 stars, name, "1 day ago",
   quoted word-for-word.
6. **"Tire pressure help & mobile tire service across Scarborough"** — soft service pitch
   + coverage (Scarborough, Pickering, Ajax, Whitby, Oshawa) + CTA.
7. **FAQ** (drives `FAQPage` schema).

Mid-article `BlogCTA` after sections 3 and 5; standard bottom CTA from `BlogPost.tsx`.
New `trackPhoneCall` source labels: `blog_tirepressure_mid1`, `blog_tirepressure_mid2`.

## Side change — add Selena to static reviews

Append Selena's verbatim review to `GOOGLE_REVIEWS` in `constants.tsx` (id 6) so the
fallback cards and the on-page callout stay consistent. Verbatim text:

> "I had a great experience with Fayaz this past weekend. I accidentally put too much air
> in my tires at a gas station, and he kindly stepped in to help me fix the issue. He took
> the time to make sure everything was safe and explained what he was doing, which I really
> appreciated. It's not often you come across someone who is both knowledgeable and genuinely
> willing to help a stranger without hesitation. His professionalism and kindness really
> stood out. I highly recommend Fayaz if you're looking for someone reliable and trustworthy.
> Thanks again for your help!"

`timeAgo: "1 day ago"`, `rating: 5`, `name: "Selena Alleyne"`.

## Draft copy (for tone review)

**Intro:**
> It was a quiet weekend at a gas station near Finch and Kennedy in Scarborough when our
> technician Fayaz noticed something that made him stop. A woman was fighting with the air
> pump at the side of the lot, a young child buckled in the back seat of her car. When Fayaz
> walked over to help, he checked her tires and his stomach dropped: **72 PSI.** More than
> double what most cars are built to run. She had no idea she'd done anything wrong — and she
> was about to drive her child home on four tires inflated like rock-hard balloons. This is
> the story of how a two-minute conversation may have prevented a blowout — and everything you
> need to know about correct tire pressure so it never happens to you.

**Section 2 — what over-inflation does (key points, punchy):**
- A tire stamped for ~35 PSI pumped to 72 is carrying double its designed pressure. Add a
  hot highway and summer pavement and you're inviting a blowout.
- Over-inflated tires ride on the center of the tread only — less rubber on the road means
  **less grip and longer stopping distances**, exactly when you can least afford it.
- The ride turns harsh and skittish; every bump becomes a bounce, and the car gets twitchy
  at speed.
- You'll wear out the middle of the tire prematurely and throw money away on rubber.

**Section 3 — correct PSI:**
> Here's the part Fayaz explained to her, and the part most drivers get wrong: the big number
> molded into the tire sidewall is the **maximum** pressure the tire can hold — it is *not* the
> pressure your car wants. The right number lives on a sticker inside the driver's door jamb
> (and in your owner's manual). For most cars and SUVs in the GTA that's somewhere between
> **30 and 35 PSI**. Check them cold — before you've driven on them — because driving heats the
> air and inflates the reading.

**Section 4 — the rescue:**
> Fayaz didn't just bleed the pressure down and walk off. He let each tire down to the number
> on her door jamb, walked her through how to read it herself, and showed her how to use the
> gauge so she'd never be guessing again. Then he made sure she and her little one were good to
> drive home — safe, on tires that would actually grip the road. No charge for the kindness, no
> catch. Just the right thing to do.

**Section 5 — review intro:**
> A couple of days later, Selena left us this on Google. We didn't ask for it — and it's the
> kind of thing that means the most:

**Section 6 — service pitch:**
> Not sure what pressure your tires should be? Warning light on the dash? A slow leak you keep
> topping up? That's exactly what we do. iFAST runs **mobile tire service across Scarborough**
> and the East GTA — we come to you, check and correct your pressure, repair or replace flat
> tires on-site, and reset your TPMS light before we leave. No tow, no waiting room.

## FAQ (FAQPage schema)

1. **What PSI should my tires be?** — Check the sticker in your driver's-side door jamb or your
   owner's manual; most cars and SUVs run 30–35 PSI. Never use the max number on the tire
   sidewall as your target — that's the ceiling, not the goal.
2. **Can overinflated tires explode or blow out?** — Yes. Significant over-inflation (like 72 PSI
   on a tire built for ~35) makes the tire rigid and far more likely to blow out, especially in
   summer heat or at highway speed. Bring it back to the recommended pressure as soon as possible.
3. **Is it safe to drive with 70 PSI in my tires?** — No. That's roughly double the recommended
   pressure for most vehicles. It reduces grip, lengthens stopping distance, and raises blowout
   risk. Let the tires down to the door-jamb spec before driving any distance.
4. **Where can I get my tire pressure checked in Scarborough?** — iFAST offers mobile tire service
   across Scarborough and the East GTA — we come to your location to check and correct tire
   pressure, repair flats, and reset your TPMS light. Call +1 437-215-3468.
5. **Does iFAST do mobile tire service in Scarborough?** — Yes. We cover Scarborough, Pickering,
   Ajax, Whitby, and Oshawa with on-site tire repair, replacement, pressure correction, and
   seasonal swaps — typically arriving in 15–30 minutes.

## Files touched

1. `data/blogContent.tsx` — append POST 5 entry to `BLOG_POSTS`.
2. `constants.tsx` — append Selena (id 6) to `GOOGLE_REVIEWS`.
3. `public/sitemap.xml` — add `<url>` for the new slug (priority 0.8) under the Blog block.

## Build, deploy, indexing

1. `npm run build` (from `C:\Users\khati\ifast-build` per Drive-hazard memory) — must
   prerender the new route to `dist/blog/correct-tire-pressure-scarborough/index.html`
   with full HTML, title, meta, and JSON-LD.
2. Verify the static HTML contains the title + `BlogPosting` JSON-LD.
3. Commit + push to `main` → Vercel auto-deploys.
4. Confirm the live URL returns 200 with rendered HTML.
5. Resubmit sitemap + request indexing via Google Search Console (GSC MCP tools and/or
   the `request-indexing` script).
6. **Success = the page is submitted/accepted for indexing in GSC.**

## Out of scope

- No new route, component, or design system changes.
- No changes to the live Featurable widget (it already syncs Selena's review automatically).
- No pricing or service-area changes.
