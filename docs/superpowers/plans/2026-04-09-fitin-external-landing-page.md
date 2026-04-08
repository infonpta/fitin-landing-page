# FITIN "Invest in You" External Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a brand-led, conversion-optimized landing page for FITIN's external "Invest in You" campaign — two location variants (Vancouver, St. Albert) that acquire new clients for the 8-for-$80 semi-private PT offer.

**Architecture:** Pure HTML/CSS/JS, no frameworks. Shared `styles.css` and `script.js` across two HTML page variants (`vancouver.html`, `st-albert.html`). Mobile-first responsive design. Google Fonts as the only external dependency.

**Tech Stack:** HTML5, CSS3 (custom properties, flexbox, grid), vanilla JavaScript (Intersection Observer API), Google Fonts (Playfair Display, Inter)

**Spec:** `docs/superpowers/specs/2026-04-09-fitin-external-landing-page-design.md`

---

## File Structure

```
Landing Page Fitin/
├── vancouver.html        # Vancouver page variant (primary build target)
├── st-albert.html        # St. Albert variant (copied + customized from Vancouver)
├── styles.css            # All CSS — variables, reset, components, responsive
├── script.js             # Sticky CTA, smooth scroll, form handling
└── docs/                 # Specs and plans (already exists)
```

---

### Task 1: CSS Foundation

**Files:**
- Create: `styles.css`

- [ ] **Step 0: Initialize git repo**

```bash
cd "d:/NPTA/FItin Website/Landing Page Fitin"
git init
echo ".superpowers/" > .gitignore
git add .gitignore
git commit -m "chore: initialize repo with gitignore"
```

- [ ] **Step 1: Create `styles.css` with reset, custom properties, and typography**

```css
/* ========================================
   FITIN "Invest in You" Landing Page
   ======================================== */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@300;400;700&display=swap');

/* --- Reset --- */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-primary);
  background: var(--white);
  -webkit-font-smoothing: antialiased;
}

img {
  max-width: 100%;
  display: block;
}

a {
  text-decoration: none;
  color: inherit;
}

/* --- Custom Properties --- */
:root {
  --dark: #2a2a2a;
  --teal: #2a9d8f;
  --teal-hover: #238b7f;
  --cream: #f7f5f2;
  --warm-neutral: #f0ece7;
  --white: #ffffff;
  --text-primary: #2a2a2a;
  --text-secondary: #6b6560;
  --border-warm: #e0dbd5;
  --focus-cream: #f5f0ea;
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', system-ui, -apple-system, sans-serif;
  --max-width: 1200px;
  --section-padding: 100px 24px;
  --transition: 0.2s ease;
}

/* --- Typography --- */
h1, h2, h3 {
  font-family: var(--font-heading);
  font-weight: 300;
  line-height: 1.2;
  color: var(--text-primary);
}

h1 {
  font-size: clamp(2.5rem, 5vw, 4rem);
}

h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 24px;
}

h3 {
  font-size: 1.25rem;
  font-weight: 600;
  font-family: var(--font-body);
  margin-bottom: 12px;
}

p {
  margin-bottom: 16px;
  color: var(--text-secondary);
}

.section-label {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--teal);
  margin-bottom: 16px;
  display: block;
}

/* --- Buttons --- */
.btn {
  display: inline-block;
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 16px 40px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background var(--transition), transform var(--transition);
}

.btn-primary {
  background: var(--teal);
  color: var(--white);
}

.btn-primary:hover {
  background: var(--teal-hover);
  transform: translateY(-1px);
}

/* --- Layout --- */
.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
}

.two-col {
  display: flex;
  align-items: center;
  gap: 60px;
}

.two-col > * {
  flex: 1;
}

section {
  padding: var(--section-padding);
}
```

- [ ] **Step 2: Verify file exists and has no syntax issues**

Run: `ls -la "d:/NPTA/FItin Website/Landing Page Fitin/styles.css"`
Expected: File exists with reasonable size (~2-3KB)

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "feat: add CSS foundation with reset, custom properties, typography, and base components"
```

---

### Task 2: Vancouver HTML Shell + Hero Section

**Files:**
- Create: `vancouver.html`
- Reference: `styles.css` (from Task 1)

- [ ] **Step 1: Create `vancouver.html` with full HTML structure and hero section**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invest in You — FITIN Integrated Wellness | Vancouver</title>
  <meta name="description" content="8 semi-private personal training sessions for $80. Experience integrated wellness with a coach who knows your name. New clients only. Vancouver.">
  <link rel="stylesheet" href="styles.css">
</head>
<body>

  <!-- Sticky CTA Bar (hidden by default, shown via JS) -->
  <div class="sticky-bar" id="stickyBar">
    <div class="sticky-bar__inner">
      <span class="sticky-bar__logo">FITIN</span>
      <a href="#form-section" class="btn btn-primary btn-sm">Start Your Journey</a>
    </div>
  </div>

  <!-- Section 1: Hero -->
  <section class="hero" id="hero">
    <div class="hero__overlay"></div>
    <div class="hero__content">
      <span class="hero__brand">FITIN INTEGRATED WELLNESS</span>
      <h1>Invest in You</h1>
      <p class="hero__subtitle">Your first step toward integrated wellness</p>
      <a href="#form-section" class="btn btn-primary">Start Your Journey</a>
    </div>
    <div class="hero__scroll-indicator">
      <span></span>
    </div>
  </section>

  <!-- Sections 2-6 will be added in subsequent tasks -->

  <script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Add hero CSS to `styles.css`**

Append the following to the end of `styles.css`:

```css
/* ========================================
   Hero
   ======================================== */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  /* Placeholder background — swap with real photo later */
  background: var(--dark) url('') no-repeat center center;
  background-size: cover;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: rgba(35, 30, 25, 0.7);
  z-index: 1;
}

.hero__content {
  position: relative;
  z-index: 2;
  max-width: 700px;
  padding: 24px;
}

.hero__brand {
  display: block;
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 24px;
}

.hero h1 {
  color: var(--white);
  font-weight: 300;
  margin-bottom: 16px;
}

.hero__subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.125rem;
  margin-bottom: 40px;
}

.hero .btn {
  font-size: 0.8125rem;
}

/* Scroll indicator */
.hero__scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.hero__scroll-indicator span {
  display: block;
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.4);
  animation: scrollPulse 2s ease-in-out infinite;
}

@keyframes scrollPulse {
  0%, 100% { opacity: 0.4; transform: scaleY(1); }
  50% { opacity: 1; transform: scaleY(1.2); }
}

/* ========================================
   Sticky CTA Bar
   ======================================== */
.sticky-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: var(--white);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  transform: translateY(-100%);
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.sticky-bar.visible {
  transform: translateY(0);
  opacity: 1;
}

.sticky-bar__inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sticky-bar__logo {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
}

.btn-sm {
  padding: 10px 24px;
  font-size: 0.75rem;
}
```

- [ ] **Step 3: Open `vancouver.html` in browser and verify**

Run: `start "d:/NPTA/FItin Website/Landing Page Fitin/vancouver.html"` (Windows)
Expected: Full-viewport dark hero with "FITIN INTEGRATED WELLNESS" label, "Invest in You" headline, subtitle, teal CTA button, and a pulsing scroll indicator line at the bottom. Sticky bar is hidden (no JS yet).

- [ ] **Step 4: Commit**

```bash
git add vancouver.html styles.css
git commit -m "feat: add Vancouver HTML shell with hero section and sticky CTA bar styles"
```

---

### Task 3: Section 2 — What is Semi-Private PT?

**Files:**
- Modify: `vancouver.html` (add section after hero)
- Modify: `styles.css` (add section CSS)

- [ ] **Step 1: Add Section 2 HTML to `vancouver.html`**

Insert after the closing `</section>` of the hero, before the "Sections 2-6" comment:

```html
  <!-- Section 2: What is Semi-Private PT? -->
  <section class="experience" id="experience">
    <div class="container two-col">
      <div class="experience__image">
        <div class="image-placeholder">
          <span>Coach + Client Photo</span>
        </div>
      </div>
      <div class="experience__text">
        <span class="section-label">The Experience</span>
        <h2>Training That Knows You</h2>
        <p>Semi-private personal training means you get the attention of a dedicated coach in a small group setting. Every session is built around your goals, your body, and your pace — but with the energy and accountability of training alongside others.</p>
        <p>Your coach designs your program, adjusts in real time, and knows your name before you walk through the door.</p>
        <div class="key-points">
          <div class="key-point">
            <svg class="key-point__icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="9" stroke="#2a9d8f" stroke-width="1.5"/>
              <path d="M6 10l3 3 5-5" stroke="#2a9d8f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Personalized programming</span>
          </div>
          <div class="key-point">
            <svg class="key-point__icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="9" stroke="#2a9d8f" stroke-width="1.5"/>
              <path d="M6 10l3 3 5-5" stroke="#2a9d8f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Small group energy</span>
          </div>
          <div class="key-point">
            <svg class="key-point__icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="9" stroke="#2a9d8f" stroke-width="1.5"/>
              <path d="M6 10l3 3 5-5" stroke="#2a9d8f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Coach-led every session</span>
          </div>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Add Section 2 CSS to `styles.css`**

Append to `styles.css`:

```css
/* ========================================
   Section 2: The Experience
   ======================================== */
.experience {
  background: var(--cream);
}

.image-placeholder {
  width: 100%;
  aspect-ratio: 4 / 5;
  background: var(--border-warm);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.experience__text p {
  max-width: 500px;
}

.key-points {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
}

.key-point {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text-primary);
}

.key-point__icon {
  flex-shrink: 0;
}
```

- [ ] **Step 3: Open in browser and verify**

Refresh `vancouver.html` in browser.
Expected: Below the hero, a cream-background section with a gray placeholder image on the left, "THE EXPERIENCE" teal label, "Training That Knows You" heading, two paragraphs of body copy, and three checkmark key points on the right.

- [ ] **Step 4: Commit**

```bash
git add vancouver.html styles.css
git commit -m "feat: add semi-private PT explainer section with key points"
```

---

### Task 4: Section 3 — The FITIN Difference

**Files:**
- Modify: `vancouver.html` (add section after Section 2)
- Modify: `styles.css` (add section CSS)

- [ ] **Step 1: Add Section 3 HTML to `vancouver.html`**

Insert after the closing `</section>` of the experience section:

```html
  <!-- Section 3: The FITIN Difference -->
  <section class="difference" id="difference">
    <div class="container two-col two-col--reverse">
      <div class="difference__text">
        <span class="section-label">The Difference</span>
        <h2>More Than a Gym</h2>
        <p>FITIN brings together personal training, nutrition, physiotherapy, chiropractic care, and RMT — all under one roof. Your wellness team talks to each other, so your training, recovery, and nutrition work together, not in silos.</p>
        <div class="trust-signals">
          <blockquote class="testimonial">
            <p>"The coaches here actually know what I'm working through. It's not just reps and sets — it's a plan that fits my life."</p>
            <cite>— FITIN Member</cite>
          </blockquote>
          <div class="coach-tags">
            <span class="coach-tag">Certified Personal Trainers</span>
            <span class="coach-tag">Registered Nutritionists</span>
            <span class="coach-tag">Physiotherapy On-Site</span>
          </div>
        </div>
      </div>
      <div class="difference__image">
        <div class="image-placeholder">
          <span>Community Photo</span>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Add Section 3 CSS to `styles.css`**

Append to `styles.css`:

```css
/* ========================================
   Section 3: The Difference
   ======================================== */
.difference {
  background: var(--white);
}

.two-col--reverse {
  flex-direction: row-reverse;
}

.difference__text p {
  max-width: 500px;
}

.trust-signals {
  margin-top: 32px;
}

.testimonial {
  border-left: 3px solid var(--teal);
  padding-left: 20px;
  margin-bottom: 24px;
}

.testimonial p {
  font-family: var(--font-heading);
  font-size: 1.125rem;
  font-style: italic;
  color: var(--text-primary);
  line-height: 1.5;
}

.testimonial cite {
  font-family: var(--font-body);
  font-style: normal;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.coach-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.coach-tag {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--teal);
  background: rgba(42, 157, 143, 0.08);
  padding: 6px 14px;
  border-radius: 20px;
}
```

- [ ] **Step 3: Open in browser and verify**

Refresh `vancouver.html`.
Expected: Below Section 2, a white-background section with text on the left (teal-bordered testimonial, coach credential tags) and a gray placeholder image on the right. Visual rhythm alternates from the previous section.

- [ ] **Step 4: Commit**

```bash
git add vancouver.html styles.css
git commit -m "feat: add FITIN difference section with testimonial and coach credentials"
```

---

### Task 5: Section 4 — The Offer

**Files:**
- Modify: `vancouver.html` (add section after Section 3)
- Modify: `styles.css` (add section CSS)

- [ ] **Step 1: Add Section 4 HTML to `vancouver.html`**

Insert after the closing `</section>` of the difference section:

```html
  <!-- Section 4: The Offer -->
  <section class="offer" id="offer">
    <div class="container offer__content">
      <span class="section-label">Your Exclusive Offer</span>
      <h2 class="offer__heading">8 Semi-Private Personal Training Sessions</h2>
      <p class="offer__supporting">Experience integrated wellness with a coach who knows your name</p>
      <div class="offer__price">$80</div>
      <p class="offer__qualifier">New clients only · Vancouver · Ends April 30</p>
      <a href="#form-section" class="btn btn-primary">Claim Your Spot</a>
    </div>
  </section>
```

- [ ] **Step 2: Add Section 4 CSS to `styles.css`**

Append to `styles.css`:

```css
/* ========================================
   Section 4: The Offer
   ======================================== */
.offer {
  background: var(--warm-neutral);
  text-align: center;
}

.offer__content {
  max-width: 700px;
}

.offer__heading {
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 400;
  margin-bottom: 16px;
}

.offer__supporting {
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.offer__price {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.offer__qualifier {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 32px;
}
```

- [ ] **Step 3: Open in browser and verify**

Refresh `vancouver.html`.
Expected: A warm neutral background section with centered content. "YOUR EXCLUSIVE OFFER" teal label at top, large "8 Semi-Private Personal Training Sessions" heading, supporting copy, "$80" (visible but smaller than heading — price is subordinate), qualifier text with "Vancouver", and a teal CTA button.

- [ ] **Step 4: Commit**

```bash
git add vancouver.html styles.css
git commit -m "feat: add offer section with brand-compliant content hierarchy"
```

---

### Task 6: Section 5 — The Form

**Files:**
- Modify: `vancouver.html` (add section after Section 4)
- Modify: `styles.css` (add section CSS)

- [ ] **Step 1: Add Section 5 HTML to `vancouver.html`**

Insert after the closing `</section>` of the offer section:

```html
  <!-- Section 5: The Form -->
  <section class="form-section" id="form-section">
    <div class="container two-col">
      <div class="form-section__reassurance">
        <h2>Ready to Start?</h2>
        <p>Fill in your details and we'll be in touch within 24 hours</p>
        <ul class="trust-points">
          <li class="trust-point">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 10l4 4 6-6" stroke="#2a9d8f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>No commitment required</span>
          </li>
          <li class="trust-point">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 10l4 4 6-6" stroke="#2a9d8f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>First session scheduled at your convenience</span>
          </li>
          <li class="trust-point">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 10l4 4 6-6" stroke="#2a9d8f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Coaches matched to your goals</span>
          </li>
        </ul>
      </div>
      <div class="form-section__form">
        <form id="leadForm" novalidate>
          <input type="hidden" name="location" value="vancouver">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input type="text" id="firstName" name="firstName" required placeholder="First name">
            </div>
            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input type="text" id="lastName" name="lastName" required placeholder="Last name">
            </div>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required placeholder="you@example.com">
          </div>
          <div class="form-group">
            <label for="phone">Phone</label>
            <input type="tel" id="phone" name="phone" required placeholder="(604) 000-0000">
          </div>
          <div class="form-group">
            <label for="goals">What are you looking to achieve?</label>
            <input type="text" id="goals" name="goals" placeholder="e.g., Build strength, improve mobility, feel more energized">
          </div>
          <div class="form-group">
            <label for="schedule">Preferred Schedule</label>
            <select id="schedule" name="schedule">
              <option value="" disabled selected>Select a time</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary btn-full">Claim Your Spot</button>
        </form>
        <div id="formSuccess" class="form-success" hidden>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22" stroke="#2a9d8f" stroke-width="2"/>
            <path d="M15 24l7 7 11-11" stroke="#2a9d8f" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <h3>You're in</h3>
          <p>We'll reach out shortly to get you started.</p>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Add Section 5 CSS to `styles.css`**

Append to `styles.css`:

```css
/* ========================================
   Section 5: The Form
   ======================================== */
.form-section {
  background: var(--white);
}

.form-section__reassurance h2 {
  margin-bottom: 12px;
}

.trust-points {
  list-style: none;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.trust-point {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text-primary);
}

.trust-point svg {
  flex-shrink: 0;
}

/* Form */
.form-section__form {
  background: var(--white);
  border: 1px solid var(--border-warm);
  border-radius: 8px;
  padding: 40px;
}

.form-row {
  display: flex;
  gap: 16px;
}

.form-row .form-group {
  flex: 1;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 6px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px 16px;
  font-family: var(--font-body);
  font-size: 0.9375rem;
  color: var(--text-primary);
  background: var(--cream);
  border: 1px solid var(--border-warm);
  border-radius: 4px;
  transition: border-color var(--transition), background var(--transition);
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--teal);
  background: var(--focus-cream);
}

.form-group input.error,
.form-group select.error {
  border-color: #c44;
}

.btn-full {
  width: 100%;
  text-align: center;
  margin-top: 8px;
}

/* Success state */
.form-success {
  text-align: center;
  padding: 40px 20px;
}

.form-success svg {
  margin: 0 auto 16px;
}

.form-success h3 {
  font-family: var(--font-heading);
  font-size: 1.75rem;
  font-weight: 400;
  margin-bottom: 8px;
}

.form-success p {
  color: var(--text-secondary);
}
```

- [ ] **Step 3: Open in browser and verify**

Refresh `vancouver.html`.
Expected: Two-column layout — left side has "Ready to Start?" heading with three checkmark trust points. Right side has a bordered form card with First Name/Last Name side by side, Email, Phone, Goals input, Schedule dropdown, and a full-width teal "Claim Your Spot" button. Hidden form field has `value="vancouver"`.

- [ ] **Step 4: Commit**

```bash
git add vancouver.html styles.css
git commit -m "feat: add lead capture form section with reassurance content and success state"
```

---

### Task 7: Section 6 — Footer

**Files:**
- Modify: `vancouver.html` (add footer after Section 5, remove placeholder comment)
- Modify: `styles.css` (add footer CSS)

- [ ] **Step 1: Add footer HTML to `vancouver.html`**

Replace the `<!-- Sections 2-6 will be added in subsequent tasks -->` comment (if it still exists) and insert after the closing `</section>` of the form section:

```html
  <!-- Section 6: Footer -->
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <span class="footer__logo">FITIN</span>
        <p class="footer__address">Vancouver Location<br>Address Line 1<br>Vancouver, BC</p>
      </div>
      <div class="footer__contact">
        <p>info@fitintegrated.ca</p>
        <p>(604) 000-0000</p>
        <div class="footer__social">
          <a href="#" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="2" width="16" height="16" rx="4" stroke="currentColor" stroke-width="1.5"/>
              <circle cx="10" cy="10" r="4" stroke="currentColor" stroke-width="1.5"/>
              <circle cx="14.5" cy="5.5" r="1" fill="currentColor"/>
            </svg>
          </a>
          <a href="#" aria-label="Facebook">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M11 20V11h3l.5-3H11V6c0-1 .5-2 2-2h1.5V1.5S13 1 12 1c-2.5 0-4 1.5-4 4.5V8H5v3h3v9h3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
      <div class="footer__legal">
        <a href="#">Privacy Policy</a>
        <span>·</span>
        <a href="#">Terms</a>
        <p class="footer__copyright">&copy; 2026 FITIN Integrated Wellness</p>
      </div>
    </div>
  </footer>
```

- [ ] **Step 2: Add footer CSS to `styles.css`**

Append to `styles.css`:

```css
/* ========================================
   Footer
   ======================================== */
.footer {
  background: var(--dark);
  color: rgba(255, 255, 255, 0.7);
  padding: 60px 24px 40px;
}

.footer__inner {
  display: flex;
  justify-content: space-between;
  gap: 40px;
}

.footer__logo {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--white);
  display: block;
  margin-bottom: 12px;
}

.footer__address {
  font-size: 0.875rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.5);
}

.footer__contact p {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;
}

.footer__social {
  display: flex;
  gap: 16px;
  margin-top: 12px;
}

.footer__social a {
  color: rgba(255, 255, 255, 0.5);
  transition: color var(--transition);
}

.footer__social a:hover {
  color: var(--teal);
}

.footer__legal {
  text-align: right;
  font-size: 0.8125rem;
}

.footer__legal a {
  color: rgba(255, 255, 255, 0.5);
  transition: color var(--transition);
}

.footer__legal a:hover {
  color: var(--white);
}

.footer__legal span {
  margin: 0 8px;
  color: rgba(255, 255, 255, 0.3);
}

.footer__copyright {
  margin-top: 16px;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.3);
}
```

- [ ] **Step 3: Open in browser and verify**

Refresh `vancouver.html`.
Expected: Dark footer at the bottom with three columns — FITIN logo + Vancouver address on the left, contact info + social icons in the middle, Privacy/Terms links + copyright on the right. No competing CTAs.

- [ ] **Step 4: Commit**

```bash
git add vancouver.html styles.css
git commit -m "feat: add minimal footer with location info and social links"
```

---

### Task 8: JavaScript — Sticky CTA, Smooth Scroll, Form Handling

**Files:**
- Create: `script.js`

- [ ] **Step 1: Create `script.js` with all interactive behavior**

```javascript
/* ========================================
   FITIN Landing Page — Interactive Behavior
   ======================================== */

(function () {
  'use strict';

  // --- Sticky CTA Bar ---
  const stickyBar = document.getElementById('stickyBar');
  const hero = document.getElementById('hero');
  const formSection = document.getElementById('form-section');

  if (stickyBar && hero && formSection) {
    const heroObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          // When hero is NOT intersecting (scrolled past), show bar
          if (!entry.isIntersecting) {
            stickyBar.classList.add('visible');
          } else {
            stickyBar.classList.remove('visible');
          }
        });
      },
      { threshold: 0 }
    );

    const formObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          // When form IS intersecting (visible), hide bar
          if (entry.isIntersecting) {
            stickyBar.classList.remove('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    heroObserver.observe(hero);
    formObserver.observe(formSection);
  }

  // --- Form Handling ---
  var leadForm = document.getElementById('leadForm');
  var formSuccess = document.getElementById('formSuccess');

  if (leadForm && formSuccess) {
    leadForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Clear previous errors
      var fields = leadForm.querySelectorAll('.error');
      fields.forEach(function (field) {
        field.classList.remove('error');
      });

      // Validate required fields
      var valid = true;
      var requiredFields = leadForm.querySelectorAll('[required]');
      requiredFields.forEach(function (field) {
        if (!field.value.trim()) {
          field.classList.add('error');
          valid = false;
        }
      });

      // Basic email validation
      var emailField = leadForm.querySelector('[type="email"]');
      if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
        emailField.classList.add('error');
        valid = false;
      }

      if (!valid) return;

      // Show success state
      leadForm.hidden = true;
      formSuccess.hidden = false;
    });
  }
})();
```

- [ ] **Step 2: Open in browser and test all interactions**

Refresh `vancouver.html`.

Test 1 — Sticky CTA: Scroll past the hero. The white sticky bar should fade in at the top with "FITIN" and "Start Your Journey" button. Scroll back up to the hero — it should disappear. Scroll all the way down to the form section — the bar should disappear again.

Test 2 — Smooth scroll: Click "Start Your Journey" in the hero or in the sticky bar. The page should smooth-scroll to the form section.

Test 3 — Form validation: Click "Claim Your Spot" with empty fields. Required fields should get a red border. Fill in a bad email (e.g., "abc") — email field should get red border. Fill all required fields with valid data and submit — the form should disappear and be replaced with the "You're in" success message with a checkmark icon.

- [ ] **Step 3: Commit**

```bash
git add script.js
git commit -m "feat: add sticky CTA bar, smooth scroll, and form validation with success state"
```

---

### Task 9: Responsive CSS

**Files:**
- Modify: `styles.css` (add responsive rules at end of file)

- [ ] **Step 1: Add responsive CSS to `styles.css`**

Append to `styles.css`:

```css
/* ========================================
   Responsive
   ======================================== */

/* Tablet */
@media (max-width: 1024px) {
  :root {
    --section-padding: 80px 24px;
  }

  .two-col {
    gap: 40px;
  }
}

/* Mobile */
@media (max-width: 768px) {
  :root {
    --section-padding: 60px 20px;
  }

  .two-col {
    flex-direction: column;
    gap: 40px;
  }

  .two-col--reverse {
    flex-direction: column;
  }

  .experience__image,
  .difference__image {
    order: -1;
  }

  .image-placeholder {
    aspect-ratio: 16 / 9;
  }

  .form-row {
    flex-direction: column;
    gap: 0;
  }

  .form-section__form {
    padding: 24px;
  }

  .offer__price {
    font-size: 2rem;
  }

  .footer__inner {
    flex-direction: column;
    gap: 32px;
  }

  .footer__legal {
    text-align: left;
  }

  .sticky-bar__inner {
    padding: 10px 16px;
  }

  .btn-sm {
    padding: 8px 16px;
  }

  .hero {
    min-height: 100svh;
  }
}
```

- [ ] **Step 2: Test responsive behavior in browser**

Open `vancouver.html` and resize the browser window (or use browser DevTools device toolbar).

Test at 375px wide (mobile): All two-column sections should stack to single column. Images should appear above text. Form name fields should stack. Footer should be single column. Hero should be full viewport height.

Test at 768px wide (tablet): Two-column layouts may still hold with tighter spacing. Check that nothing overflows.

Test at 1200px+ (desktop): Full layout as designed. Content centered with max-width.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "feat: add mobile-first responsive styles for tablet and phone"
```

---

### Task 10: St. Albert Page Variant

**Files:**
- Create: `st-albert.html` (copy of `vancouver.html` with location changes)

- [ ] **Step 1: Copy `vancouver.html` to `st-albert.html` and update location-specific content**

Copy `vancouver.html` to `st-albert.html`, then make these exact changes:

1. **`<title>` tag** — change `Vancouver` to `St. Albert`:
```html
<title>Invest in You — FITIN Integrated Wellness | St. Albert</title>
```

2. **`<meta name="description">` tag** — change `Vancouver` to `St. Albert`:
```html
<meta name="description" content="8 semi-private personal training sessions for $80. Experience integrated wellness with a coach who knows your name. New clients only. St. Albert.">
```

3. **Offer qualifier** (Section 4) — change `Vancouver` to `St. Albert`:
```html
<p class="offer__qualifier">New clients only · St. Albert · Ends April 30</p>
```

4. **Hidden form field** (Section 5) — change value to `st-albert`:
```html
<input type="hidden" name="location" value="st-albert">
```

5. **Footer address** — change to St. Albert:
```html
<p class="footer__address">St. Albert Location<br>Address Line 1<br>St. Albert, AB</p>
```

All other content, CSS, and JS references remain identical.

- [ ] **Step 2: Open `st-albert.html` in browser and verify**

Check that:
- Offer section says "St. Albert" not "Vancouver"
- Footer says "St. Albert Location" and "St. Albert, AB"
- Hidden form field value is "st-albert" (inspect with DevTools)
- All other sections, styles, and interactions are identical to Vancouver

- [ ] **Step 3: Commit**

```bash
git add st-albert.html
git commit -m "feat: add St. Albert page variant with location-specific content"
```

---

### Task 11: Final Verification

**Files:**
- All files (read-only verification)

- [ ] **Step 1: Verify all files exist**

Run: `ls -la "d:/NPTA/FItin Website/Landing Page Fitin/"*.html "d:/NPTA/FItin Website/Landing Page Fitin/"*.css "d:/NPTA/FItin Website/Landing Page Fitin/"*.js`

Expected:
```
vancouver.html
st-albert.html
styles.css
script.js
```

- [ ] **Step 2: Cross-check spec coverage**

Open both pages in browser and verify against the spec:

| Spec Requirement | Check |
|---|---|
| Hero: brand first, no price | "Invest in You" headline, no price visible |
| Sticky CTA appears on scroll | Scrolling past hero shows white bar |
| Sticky CTA hides at form | Scrolling to form hides the bar |
| Section 2: experience-first, no price | Educational content only |
| Section 3: coach-forward, testimonial | Testimonial quote, coach tags visible |
| Section 4: experience → offer → price hierarchy | Heading > supporting copy > price |
| Section 4: no discount language | "Your Exclusive Offer", not "deal" or "sale" |
| Section 5: form with all fields | First/Last name, email, phone, goals, schedule |
| Section 5: hidden location field | Inspect: `vancouver` / `st-albert` |
| Section 5: success state | Submit with valid data shows "You're in" |
| Section 6: minimal footer, no competing CTA | Address, contact, legal only |
| Responsive: mobile stacks to single column | Resize to 375px |
| Location variants differ correctly | Vancouver vs St. Albert in offer + footer + form |

- [ ] **Step 3: Final commit if any fixes were made**

```bash
git add -A
git commit -m "chore: final polish and verification pass"
```
