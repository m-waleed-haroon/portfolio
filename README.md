# Waleed Haroon — Portfolio

A responsive portfolio for my work in e-commerce operations, product listings, storefront presentation, and AI workflow exploration.

## Featured content

- SKINEVE: e-commerce operations and catalog management
- BASIM: babywear brand and storefront development (in progress)
- Product listing automation with n8n and Google Sheets (experimental)
- Professional experience, skills, and GitHub contact link

## Publish with GitHub Pages

1. Open repository **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Choose **main** and **/ (root)**, then click **Save**.
4. GitHub will display the published address when deployment completes.

Expected URL after publishing: https://m-waleed-haroon.github.io/portfolio/

## Edit

The homepage content is in `index.html`, its responsive styles are in `studio.css`, and its scroll reveals are in `studio.js`. No installation or build step is required. Serve the repository with a local static server for review, for example `python -m http.server 8000`.

The homepage uses a video-inspired creative studio layout: Electric Lime accents, the existing portrait and holographic W favicon, floating decorative shapes, alternating dark and light sections, and project cards that stack on desktop. Mobile displays project cards in normal document flow. Reduced-motion preferences disable continuous animation, reveals and sticky stacking. Content remains accessible when JavaScript is disabled.

All three pages share `studio.css`, `studio.js`, and matching header/footer markup. Projects retains the full project directory and Contact retains the enquiry form and direct contact links; its clipboard and LinkedIn handoff behavior lives in `contact.js`. The form does not automatically send messages. Update the shared header/footer markup in all three HTML files when changing navigation.

The project panels are typographic artwork, not screenshots of the stores. No client testimonials or project results have been invented.

