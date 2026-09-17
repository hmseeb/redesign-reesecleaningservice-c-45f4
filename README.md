# Reese Professional Cleaning Service — Website Redesign

A complete, from-scratch redesign of reesecleaningservice.com built with vanilla HTML, CSS and JavaScript.

## Stack
- Static site — no build step, no dependencies, no environment variables
- `index.html` is the entry point
- `styles.css` — design system (custom properties, responsive layout, motion)
- `script.js` — mobile nav, sticky header, scroll reveal, quote-form validation + mailto handoff
- `favicon.svg` — brand mark

## Run locally
Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Content & structure
All copy, services, testimonials, awards, service areas and contact details come from the
existing Reese Professional Cleaning Service site:

- Hero — family owned since 1944, OSHA certified, green products only
- Credential marquee — BBB A+, licensed & insured, same-day service, award-winning
- Services — deep cleaning & disinfecting, commercial/office, industrial, school & daycare,
  janitorial equipment rental, exterminator services, residential maid services,
  religious institution cleaning
- Why Reese — training, green products, honesty/dependability, licensing
- Testimonials — Mecca Child Care, The First Presbyterian Church in Philadelphia, PSDC,
  Harry Miller Corporation (original client photography preserved)
- Awards — Best of the Main Line 2020, Premier Business Service Award, Green Business of the Year
- Clients, Reese Blog posts, contact + quote request form, chamber/BBB badges

## Images
- Authentic client and brand imagery (logo, client facility photos, award and chamber badges)
  is reused from the original site.
- Generic stock imagery from the old site was replaced with section-specific photography
  sourced from Pexels.

## Accessibility & SEO
Semantic landmarks, skip link, visible focus styles, descriptive alt text,
`prefers-reduced-motion` support, Open Graph/Twitter meta and `ProfessionalService` JSON-LD.
