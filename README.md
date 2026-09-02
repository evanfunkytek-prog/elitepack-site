# EliteBox Packaging - Standalone Website Package

A complete, static B2B website for a luxury gift box factory, inspired by luxopack.com.
No frameworks, no build step, no external dependencies - open index.html in any browser or upload the folder to any web host.

## Quick start
1. Open `index.html` in a browser (double-click works).
2. For local development: run a simple static server in this folder, e.g. `python -m http.server 8000`.
3. To deploy: upload the contents of this folder to your web host / nginx / object storage.

## Structure
- `index.html`, `products.html`, `industries.html`, `about.html`, `factory-tour.html`, `certifications.html`, `quote.html`, `contact.html`, `blog.html`, `404.html` - main pages
- `products/` - 6 product detail pages (magnetic rigid box, sliding drawer box, mailer box, lid & base box, cylinder box, paper bag)
- `blog/` - 3 article pages (size guide, materials guide, finishing guide)
- `assets/css/style.css` - full design system (colors, layout, responsive breakpoints)
- `assets/js/main.js` - navigation, tabs, filters, FAQ accordion, reveal animations, form handling
- `assets/svg/` - 24 hand-drawn SVG illustrations (product boxes, factory, hero visual, logo, favicon)

## Placeholder info to replace
- Email: `sales@eliteboxpack.com` / `support@eliteboxpack.com`
- WhatsApp: `+86 138 0000 0000` (link wa.me/8613800000000)
- Address: Bao'an District, Shenzhen, China
- Certificates: FSC C153690, ISO 9001:2015 00122Q310344R0M/4400
- Prices, MOQ (100 pcs), lead time (15 days) and testimonials are editable in the HTML pages.

## Customization notes
- Colors and fonts: edit CSS variables at the top of `assets/css/style.css`.
- Products & industries data: duplicated per page for zero dependencies (each page is fully standalone).
- Forms are static: they open the visitor's email app with prefilled content addressed to sales@eliteboxpack.com. Replace with your form backend (Formspree, EmailJS, etc.) when ready.
- All SVG artwork is plain text - edit with any vector tool or text editor.
