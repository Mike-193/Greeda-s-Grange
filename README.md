# Greeda's Grange

A responsive React/Vite website for Greeda's Grange with a client-editable Decap CMS, property gallery, rooms and lodges, direct-booking CTA, and WhatsApp quote workflow.

## Local development

Prerequisites: Node.js

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Client CMS

Open `/admin/` on the deployed Netlify site. The CMS stores editable content and uploaded images in the GitHub repository. The CMS uses Decap GitHub Open Authoring, so the property owner does not need direct repository write access. Publishing a CMS change flows through the GitHub repository and the existing GitHub → Netlify integration automatically rebuilds the site.

## CMS authentication

This project is configured for Decap CMS with the GitHub backend and Open Authoring. On Netlify, configure GitHub as an OAuth authentication provider for Decap CMS using the callback URL `https://api.netlify.com/auth/done`. The CMS itself is static and no custom backend server is included.
