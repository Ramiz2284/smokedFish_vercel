# SmokedFish Codebase Instructions

## Project Overview

**SmokedFish** is a React + Vite e-commerce product showcase for smoked fish, sausages, and beverages sold in Antalya, Turkey. The app displays product cards with image sliders and WhatsApp integration for order placement. Optimized for Vercel deployment.

## Architecture & Key Files

### Core Components

- **[src/App.jsx](src/App.jsx)** — Main component containing product data array and layout grid. Products are hardcoded with multilingual fields (Russian descriptions, Turkish prices in ₺)
- **[src/components/ProductCard.jsx](src/components/ProductCard.jsx)** — Individual product card component (NOT used in current build; App.jsx defines its own ProductCard inline)
- **[src/App.css](src/App.css)** — Custom CSS for card flip animations, image sliders with swipe gestures, and responsive grid layout

### Styling Stack

- **Tailwind CSS v4** via `@tailwindcss/postcss` — Utility-first CSS framework (configured in [tailwind.config.js](tailwind.config.js))
- **PostCSS + Autoprefixer** — CSS preprocessing pipeline
- **Custom CSS** — 3D flip animations with `perspective` and `backface-visibility` for front/back card states

### Build & Development

- **Vite v6** — Build tool with HMR support for fast development
- **React 19** — Latest React with automatic JSX transformation
- **Scripts**: `npm run dev` (local dev), `npm run build` (production), `npm run lint` (ESLint), `npm run preview` (preview build)

## Project-Specific Patterns

### Product Data Structure

Products are defined as objects with `id`, `title`, `image`, `price`, `description`, and **`images` array** for multi-image sliders. Always include all fields; the ProductCard component relies on `product.images.length` for carousel logic.

```javascript
{
  id: 1,
  title: 'Product name',
  image: '/images/filename.jpg',  // Primary image for grid
  price: '1100₺ / kg',           // Turkish lira prices
  description: 'Russian text...',
  images: ['/images/img1.jpg', '/images/img2.jpg'], // Slider images
}
```

### Interaction Patterns

- **Card Flip**: Click card toggles `.flipped` class using CSS 3D transforms
- **Image Carousel**: Mouse swipe/touch swipe gestures (threshold > 50px movement) advance slides. Click dots or arrow buttons (❮/❯) to jump to specific images
- **WhatsApp Integration**: Order button constructs `wa.me/{phone}?text=` URL with predefined message. Phone number hardcoded in code (currently `905444558407`)

## Developer Workflows

### Adding New Products

1. Update `products` array in [src/App.jsx](src/App.jsx)
2. Add product images to `public/images/` directory
3. Reference them in `image` and `images` array fields
4. Test carousel and WhatsApp link before commit

### Styling Changes

- **Grid layout**: Modify `.product-grid` in [src/App.css](src/App.css) (currently `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`)
- **Tailwind utilities**: Use classes in JSX; add custom theme extensions in [tailwind.config.js](tailwind.config.js)
- **Animations**: 3D effects use CSS `perspective`, `transform-style: preserve-3d`, `backface-visibility`

### Vercel Deployment

- No special configuration needed; Vite builds to `dist/` folder automatically
- Ensure `npm run build` completes without errors before pushing
- Images in `public/` are served as static assets via Vercel CDN

## Critical Implementation Details

### State Management

Uses only React hooks (`useState`). No external state library. Component state tracks:

- `flipped` — card flip toggle
- `currentSlide` — active carousel image index
- `startX` — swipe gesture starting position for both mouse and touch events

### Event Handling Quirks

- Swipe/arrow/dot click handlers use `e.stopPropagation()` to prevent card flip when interacting with slider
- Both `onMouseDown`/`onMouseUp` (desktop) AND `onTouchStart`/`onTouchEnd` (mobile) events required for carousel
- Swipe direction: left swipe (positive diff) → next image, right swipe (negative diff) → previous image

### Responsive Design

- Cards use `max-width: 250px` with `margin: 0 auto`
- Grid auto-fits: `minmax(250px, 1fr)` — stacks on mobile, expands on desktop
- No media queries needed; CSS Grid handles responsiveness

## Code Conventions

- **React**: Functional components only; no class components
- **Naming**: camelCase for functions/variables, PascalCase for components
- **Imports**: ES6 modules; React 19 enables automatic JSX import
- **Comments**: Russian inline comments in source code (matching product descriptions)
- **Linting**: ESLint configured to ignore capital-letter variables and enforce React Hooks rules

## External Dependencies

- **@vitejs/plugin-react** — Fast Refresh via Babel
- **eslint-plugin-react-hooks** — Validates Hook dependency arrays
- **eslint-plugin-react-refresh** — Warns if non-component exports modify Hooks
- No API calls; all data hardcoded in frontend

## Files to NOT Modify Without Reason

- [vite.config.js](vite.config.js) — Minimal; adding plugins requires build restart
- [postcss.config.cjs](postcss.config.cjs) — Only edit if integrating new CSS tools
- [eslint.config.js](eslint.config.js) — Change only to add new lint rules
