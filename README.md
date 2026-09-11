# A1 Outdoor

A Next.js company website redesign for A1 Outdoor, featuring outdoor advertising products, company information, the management team, CSR projects, and regional office contacts.

## Stack

- Next.js 16.3.4 with the App Router and TypeScript
- React 19.3.0
- GSAP for the React Bits-inspired staggered navigation drawer
- Lucide React icons
- Responsive CSS and scroll reveals with reduced-motion support

## Run Locally

The project has been tested with Node.js 26.3.0 and pnpm 11.0.5. Dependency versions are recorded in `pnpm-lock.yaml`.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open [localhost:3000](http://localhost:3000). To choose another port:

```sh
pnpm dev --port 3001
```

No environment variables or backend services are required.

## Production

```sh
pnpm build
pnpm start
```

## Project Structure

- `app/page.tsx`: page content and navigation destinations
- `app/StaggeredMenu.tsx`: hamburger header and animated drawer
- `app/staggered-menu.css`: navigation layout and responsive styles
- `app/ScrollReveal.tsx`: progressive scroll animations
- `app/globals.css`: site layout and typography
- `public/assets/`: bundled company imagery and logos

The navigation is adapted from [React Bits StaggeredMenu](https://reactbits.dev/components/staggered-menu). It includes keyboard navigation, focus management, scroll locking, and reduced-motion support.
