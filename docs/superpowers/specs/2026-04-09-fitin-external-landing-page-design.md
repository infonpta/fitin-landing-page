# FITIN "Invest in You" — External Landing Page Design Spec

## Overview

A conversion-focused landing page for the FITIN "Invest in You" campaign's external track. Acquires new clients via the 8-for-$80 semi-private PT offer. Paid media (Meta feed, Stories/Reels, Google Search) drives traffic here.

**Campaign:** Invest in You
**Run time:** April 13–30, 2026
**Locations:** Vancouver + St. Albert (one page variant per location)
**Offer:** 8 semi-private personal training sessions for $80 — new clients only
**Success metric:** 30% full package conversion rate from 8-for-$80 leads

## Brand Guardrails

These are non-negotiable across every element of the page:

- Never lead with price. Experience and community first, offer second, price last.
- No discount language. Use: offer / member benefit / exclusive / investment. Never: sale / deal / savings / discount.
- Warm tone in all copy. Coach voice, not marketing voice. Personal, not broadcast.
- Visual aesthetic: warm, grounded, premium. Editorial wellness — not gym promo. Generous whitespace, natural tones.
- Photography: warm, authentic. Coach-forward where applicable.

## Approach

**Hybrid: Brand + Convert.** The page leads with brand storytelling (aspirational hero, educational content about semi-private PT, community/coach trust building) while keeping conversion frictionless via a sticky CTA button that follows the user down the page. Price appears only in the offer section, well below the fold.

## Technical Decisions

- **Pure HTML/CSS/JS** — no frameworks, no dependencies. Lightweight, hosts anywhere.
- **Two page variants** — `vancouver.html` and `st-albert.html`. Identical design, different location name + address + hidden form field.
- **Responsive / mobile-first** — Meta ads drive mostly mobile traffic.
- **Google Fonts** for typography (only external dependency).
- **No backend** — form is client-side HTML. Easy to connect to any backend/service later.

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| Dark | `#2a2a2a` | Hero overlay, footer, dark sections |
| Teal | `#2a9d8f` | CTA buttons, section labels, accents |
| Cream | `#f7f5f2` | Alternate section backgrounds |
| Warm neutral | `#f0ece7` | Offer section background |
| White | `#ffffff` | Form section, clean content areas |
| Text primary | `#2a2a2a` | Headings, body text |
| Text secondary | `#6b6560` | Supporting copy, qualifiers |

## Typography

- **Headings:** Light/thin weight, large size. Editorial feel, not shouty.
- **Section labels:** Small, uppercase, tracked (letter-spacing), teal color.
- **Body:** Regular weight, warm readable size. Coach voice.
- **CTA buttons:** Medium weight, uppercase, generous padding.
- Font stack: Google Fonts — **Playfair Display** for headings (serif, editorial), **Inter** for body and UI elements (clean sans-serif). Fallbacks: Georgia for serif, system-ui for sans.

## Page Structure

### Section 1: Hero

**Layout:** Full-width, full-viewport-height. Dark semi-transparent overlay on a background image placeholder. Content centered vertically and horizontally.

**Content (top to bottom):**
1. FITIN logo/wordmark — small, top of hero
2. **"Invest in You"** — large, light-weight headline
3. "Your first step toward integrated wellness" — smaller supporting line
4. CTA button: **"Start Your Journey"** — teal background, scrolls smoothly to the form section
5. Subtle scroll indicator (chevron or line) at bottom edge

**Visual notes:**
- Background: placeholder image area for warm, authentic coach/client photography
- Overlay: warm semi-transparent black (not cold/blue-tinted)
- No price. No offer details. Pure brand moment.

### Sticky CTA Bar

**Behavior:** A slim fixed bar appears at the top of the viewport once the user scrolls past the hero section. Contains FITIN wordmark (left) and "Start Your Journey" button (right). Disappears when the form section enters the viewport.

**Visual notes:**
- White background with subtle shadow
- Slim height — not intrusive
- Smooth fade-in/fade-out transitions

### Section 2: What is Semi-Private PT?

**Layout:** Two columns on desktop — image left, text right. Stacks vertically on mobile (image on top).

**Background:** Warm off-white/cream (`#f7f5f2`)

**Content:**
1. Section label: "THE EXPERIENCE" — small, teal, uppercase, tracked
2. Heading: **"Training That Knows You"**
3. Body: 2–3 short paragraphs explaining semi-private PT — small group format, personalized programming, coach attention. Warm coach voice.
4. Three key points (icon + text, simple):
   - "Personalized programming"
   - "Small group energy"
   - "Coach-led every session"

**Image:** Placeholder for a coach working with a client.

**Notes:** No offer or price mentioned. Purely educational.

### Section 3: The FITIN Difference

**Layout:** Two columns on desktop — text left, image right (flipped from section 2 for visual rhythm). Stacks vertically on mobile (image on top).

**Background:** White (`#ffffff`)

**Content:**
1. Section label: "THE DIFFERENCE" — small, teal, uppercase, tracked
2. Heading: **"More Than a Gym"**
3. Body: Short paragraph about FITIN's integrated wellness approach — coaches, community, holistic care (nutrition, physio, RMT under one roof).
4. 2–3 trust signals: client testimonial quotes or coach names + credentials. Warm, personal tone.

**Image:** Placeholder for community/group photo.

**Notes:** Coach names visible if possible (coach-forward guardrail). Still no price or offer.

### Section 4: The Offer

**Layout:** Full-width, centered content. Distinct background to create a visual "moment."

**Background:** Warm neutral (`#f0ece7`)

**Content (hierarchy follows guardrail: experience → offer → price):**
1. Section label: "YOUR EXCLUSIVE OFFER" — small, teal, uppercase, tracked
2. Heading: **"8 Semi-Private Personal Training Sessions"** — the largest text element
3. Supporting line: "Experience integrated wellness with a coach who knows your name"
4. Price: **"$80"** — visible but visually subordinate to the headline above
5. Qualifier: "New clients only · Vancouver [or St. Albert] · Ends April 30"
6. CTA button: **"Claim Your Spot"** — teal, scrolls to form

**Notes:**
- No discount language. "Exclusive offer," not "deal."
- Location name differs per page variant.
- Price is present but not the dominant visual element.

### Section 5: The Form

**Layout:** Two columns on desktop — reassurance content left, form right. Stacks vertically on mobile (reassurance on top, form below).

**Background:** White (`#ffffff`)

**Left column — reassurance:**
1. Heading: **"Ready to Start?"**
2. Supporting line: "Fill in your details and we'll be in touch within 24 hours"
3. Three trust points (checkmark icon style):
   - "No commitment required"
   - "First session scheduled at your convenience"
   - "Coaches matched to your goals"

**Right column — form fields:**
1. First name + Last name (two separate fields, side by side on desktop)
2. Email
3. Phone
4. Fitness goals — short text input ("What are you looking to achieve?")
5. Preferred schedule — dropdown: Morning / Afternoon / Evening / Flexible
6. Hidden field: location (Vancouver or St. Albert, set by page variant)
7. Submit button: **"Claim Your Spot"** — teal, full-width within form

**Form styling:**
- Soft borders, warm cream focus states (not cold gray)
- Clean, no visual noise around the form

**Success state:** On submit, form is replaced with a confirmation message: "You're in — we'll reach out shortly." (Client-side only for now.)

**Sticky CTA behavior:** The sticky bar hides once this section enters the viewport.

### Section 6: Footer

**Layout:** Full-width, minimal. Dark background matching the hero tone.

**Background:** Dark (`#2a2a2a`)

**Content:**
1. FITIN logo/wordmark — small
2. Location address (Vancouver or St. Albert, per variant)
3. Phone number + email
4. Links: Privacy Policy · Terms
5. Social media icons (Instagram, Facebook)
6. Copyright: "© 2026 FITIN Integrated Wellness"

**Notes:** No competing CTAs. The form above is the final conversion action.

## Page Variants

Two files with identical design, differing only in:

| Element | Vancouver | St. Albert |
|---------|-----------|------------|
| Offer qualifier text | "Vancouver" | "St. Albert" |
| Footer address | Vancouver address | St. Albert address |
| Hidden form field | `location=vancouver` | `location=st-albert` |

## Responsive Behavior

- **Mobile (< 768px):** Single column. All two-column sections stack vertically (image on top, text below). Form fields full-width. Hero remains full-viewport. Sticky CTA bar remains functional.
- **Tablet (768px–1024px):** Two-column sections preserved with tighter spacing. Form may stack depending on width.
- **Desktop (> 1024px):** Full two-column layouts with generous whitespace. Max content width ~1200px, centered.

## Interactions

- **Smooth scroll:** All CTA buttons scroll smoothly to the form section.
- **Sticky CTA:** Fades in when hero scrolls out of view. Fades out when form section is in view. Uses Intersection Observer.
- **Form submission:** Client-side only. Replaces form with success message on submit. No validation beyond required fields and basic email format check.
- **Hover states:** Buttons darken slightly on hover. Subtle transitions (0.2s).

## Out of Scope

- Backend / form submission handling (to be connected later)
- Analytics / UTM tracking implementation (ops team handles)
- A/B testing setup
- Internal track landing page (separate project)
- Real photography (placeholders for now, swapped in later)
