# Smoked Fish Antalya

Vite + React landing page for smoked salmon and smoked trout in Antalya with a Vercel serverless endpoint for official Google Reviews.

## Local development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Google Reviews setup

The site uses the official Google Maps Platform Places API through the Vercel serverless route:

- `/api/google-reviews`

Required environment variables in Vercel:

- `GOOGLE_MAPS_API_KEY`
- `GOOGLE_PLACE_ID`
- `GOOGLE_MAPS_URL`

Recommended values:

- `GOOGLE_MAPS_API_KEY`: server-side Google Maps Platform API key
- `GOOGLE_PLACE_ID`: Place ID of the business listing
- `GOOGLE_MAPS_URL`: public Google Maps listing URL, for example `https://share.google/TruYWAT9NwOFrC2iW`

## Google Maps Platform requirements

Enable billing and make sure the Places API is available for the project. The reviews section is designed to fail gracefully:

- if Google returns rating and reviews, the site shows rating, total review count, and up to 3 reviews
- if only rating data is available, the site still shows the Google rating summary
- if the API is not configured, the site falls back to a safe Google Maps trust block with a direct link to the listing

## How to get the Place ID

Use an official Google Maps Platform Place ID tool or the business profile inside Google Maps Platform. Then put the final ID into:

- `GOOGLE_PLACE_ID`

The implementation intentionally does not depend on automatic place resolution from a share URL, because explicit `PLACE_ID` is more stable in production.
