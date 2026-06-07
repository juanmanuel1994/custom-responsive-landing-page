================================================================================
  CUSTOM LANDING PAGE — RESPONSIVE WEBSITE
  README & SETUP GUIDE
================================================================================

WHAT YOU RECEIVED
-----------------
A fully hand-coded, responsive website built with HTML, CSS, and vanilla
JavaScript. No frameworks, no page builders, no subscriptions — you own
100% of the source code and can host it anywhere.

FILES INCLUDED
--------------
  index3.html              Main page (open this in your browser to preview)
  styles3.css              All visual styles and responsive layout
  main3.js                 Animations, form validation, and interactions
  lib/
    manifest3.js           Your brand data (name, tagline, contact info)
    gsap3.min.js           Animation library (GSAP)
    ScrollTrigger3.min.js  Scroll-based animation plugin
    lenis3.min.js          Smooth scroll library
  assets/
    img/                   All website images (WebP format, optimized)
    credits.json           Image attribution (Openverse / Unsplash)
  .htaccess                Cache and performance settings for Apache hosts
  README.txt               This file


WHAT THE PAGE INCLUDES
----------------------
  - Sticky navigation bar (transparent → solid on scroll, mobile hamburger menu)
  - Hero section with animated gradient background, headline, and stats counter
  - Scrolling marquee ticker with services keywords
  - Services section — 3 cards with images, descriptions, and feature tags
  - About section — story text, photo, and values list
  - Testimonials section — 3 client quotes with team photo
  - Process section — 3-step numbered breakdown (dark background)
  - Contact section — full form with live validation and animated success state
  - Footer with navigation links and copyright

SEO FEATURES INCLUDED
---------------------
  - Optimized <title> and <meta description>
  - <meta keywords> with 13 targeted search terms
  - Open Graph tags (Facebook, LinkedIn, WhatsApp sharing)
  - Twitter Card tags
  - Canonical URL tag
  - JSON-LD structured data (Google rich results — ProfessionalService schema)
  - Semantic HTML5 (h1/h2/h3 hierarchy, aria-labels, alt text on all images)
  - Mobile-first responsive design (passes Google Mobile-Friendly test)
  - Fast load: optimized WebP images, deferred scripts, preloaded hero image


HOW TO CUSTOMIZE
----------------
1. BRAND NAME & TAGLINE
   Open lib/manifest3.js and update:
     name: "Your Business Name"
     tagline: "Your tagline here"

2. CONTACT INFO (email, phone, location)
   In index3.html, search for "Example" and replace with your real info.
   Also update lib/manifest3.js contact fields.

3. PAGE TEXT (headlines, descriptions, testimonials)
   Open index3.html in any text editor and find the text you want to change.
   All content is written directly in HTML — no special tool needed.

4. COLORS
   Open styles3.css and find the :root block at the top.
   Change --accent (#ff6b35) to your brand color.

5. LOGO
   Replace the "✦" symbol and "Your Business" text in the nav with your
   logo image: <img src="assets/img/logo.webp" alt="Your Logo" />

6. IMAGES
   Replace the files in assets/img/ with your own photos.
   Keep the same filenames (hero.webp, about.webp, etc.) or update the
   src attributes in index3.html to match your new filenames.

7. SEO META TAGS
   In index3.html, update:
     - <title> tag
     - <meta name="description">
     - <meta property="og:url"> → your real domain
     - <link rel="canonical"> → your real domain
     - JSON-LD block: name, url, email, telephone fields

8. CONTACT FORM
   The form currently shows a success animation (simulated).
   To make it send real emails, connect it to a service such as:
     - Formspree (formspree.io) — free tier available, no backend needed
     - Web3Forms (web3forms.com) — free, easy setup
     - Your own server-side script (PHP mail, Node.js, etc.)


HOW TO DEPLOY
-------------
OPTION A — Hostinger / any Apache shared hosting:
  1. Log in to your hosting control panel.
  2. Open File Manager → public_html (or your domain folder).
  3. Upload ALL files and folders (keep the folder structure intact).
  4. The .htaccess file handles cache and performance automatically.
  5. Visit your domain — the site is live.

OPTION B — Netlify (free):
  1. Go to netlify.com → "Add new site" → "Deploy manually".
  2. Drag and drop the entire project folder.
  3. Your site gets a free .netlify.app URL instantly.
  4. Connect a custom domain in Settings → Domain management.

OPTION C — GitHub Pages (free):
  1. Create a new GitHub repository.
  2. Upload all files. Rename index3.html to index.html first.
  3. Go to Settings → Pages → select main branch → Save.
  4. Your site is live at username.github.io/repo-name.


BROWSER SUPPORT
---------------
Tested and working on:
  Chrome 110+, Firefox 110+, Safari 16+, Edge 110+
  iOS Safari 16+, Android Chrome 110+


TECHNICAL NOTES
---------------
  - Pure HTML / CSS / JavaScript — no npm, no build step, no dependencies
  - All libraries are local (lib/ folder) — works offline and on file://
  - Images are in WebP format (30% smaller than JPG, universal browser support)
  - Animations use GSAP + ScrollTrigger (industry-standard, MIT licensed)
  - Form validation is client-side only — connect a backend to send emails
  - The .htaccess file is for Apache servers (Hostinger, cPanel hosts)
    If you use Nginx (VPS), ask your host for the equivalent config


PLACEHOLDER TEXT TO REPLACE BEFORE GOING LIVE
----------------------------------------------
Search for these in index3.html and lib/manifest3.js and replace them:

  "Your Business Name"   → your real business name
  "your@email.com"       → your real email address
  "yourdomain.com"       → your real domain
  "+10000000000"         → your real phone number
  "Example"              → your real contact details
  All testimonial names and quotes → real client quotes (or remove section)
  Stats (150+, 98%, 8y)  → your real numbers (or remove stats)


================================================================================
  Delivered as clean, commented source code ready for customization.
  All content is placeholder — replace with your real business information
  before publishing.
================================================================================
