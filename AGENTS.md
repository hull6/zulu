# AGENTS.md — The LiquidZulu Canon

Guidelines for AI coding agents operating in this repository.

## Project Overview

A digital bookshelf built with **SolidJS** (NOT React) and **TypeScript**, bundled
with **Vite**. Static single-page app with no routing, no API calls, no state
management beyond SolidJS primitives. Deployed on Vercel.

## Build / Dev Commands

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start Vite dev server              |
| `npm run build`   | Production build to `dist/`        |
| `npm run preview` | Preview production build locally   |
| `npx tsc --noEmit`| TypeScript type-check (no output)  |

There is no linter, formatter, or test runner configured. Always run
`npm run build && npx tsc --noEmit` after making changes to verify correctness.

## Project Structure

```
toot/
  index.html                 # Vite entry HTML
  package.json
  tsconfig.json
  vite.config.ts
  vercel.json                # Vercel SPA rewrite config
  src/
    index.tsx                # Entry point — renders <App/> into #root
    App.tsx                  # Root component
    components/
      Bookshelf.tsx          # Main page layout (hero, category sections, footer)
      Bookshelf.module.css
      Book.tsx               # Individual book cover component
      Book.module.css
    data/
      books.ts               # Static data: shelves[], Book & Shelf interfaces
    styles/
      global.css             # CSS reset, custom properties, base typography
    types/
      modules.d.ts           # Ambient type declarations for *.module.css
```

## SolidJS — Critical Differences from React

- Use `class`, NOT `className`
- Do NOT destructure props — access via `props.x` to preserve reactivity
- Use `<For each={array}>` for list rendering, NOT `.map()`
- Inline styles use object syntax: `style={{ background: value }}`
- Mount with `render(() => <App />, root)` from `solid-js/web`
- JSX import source is `solid-js` (configured in tsconfig)

## Code Style

### Formatting
- 2-space indentation
- Double quotes for all strings
- Semicolons always
- Trailing commas in multi-line arrays, objects, and parameters
- No comments unless explicitly requested

### Imports — Ordering
1. Third-party library imports (`solid-js`, `solid-js/web`)
2. Type-only imports using `import type` syntax
3. Local data/utility imports
4. Local component imports
5. CSS module imports (always last)

```ts
import { For } from "solid-js";
import type { Book as BookType } from "../data/books";
import { shelves } from "../data/books";
import Book from "./Book";
import styles from "./Bookshelf.module.css";
```

### Types
- Prefer `interface` over `type` aliases
- Component prop interfaces: local (not exported), PascalCase, suffixed `Props`
- Data interfaces: exported from the data file
- Use `import type` for type-only imports
- Explicit return types are NOT written — let TypeScript infer them
- Use explicit type annotations on exported constants: `export const x: T[] = []`

### Naming
| Thing              | Convention        | Example                    |
| ------------------ | ----------------- | -------------------------- |
| Components         | PascalCase `.tsx`  | `Bookshelf.tsx`            |
| CSS Modules        | PascalCase `.module.css` | `Bookshelf.module.css` |
| Data files         | camelCase `.ts`    | `books.ts`                 |
| Type declarations  | camelCase `.d.ts`  | `modules.d.ts`             |
| Constants          | SCREAMING_SNAKE    | `BOOKS_PER_ROW`            |
| Functions          | camelCase          | `getCoverColor`            |
| Interfaces         | PascalCase         | `BookProps`, `Shelf`       |
| CSS classes        | camelCase          | `.sectionHeader`           |

### Component Pattern

```tsx
import { For } from "solid-js";
import styles from "./Component.module.css";

const SOME_CONST = 6;

function helperFn() { ... }

interface ComponentProps {
  value: string;
}

export default function Component(props: ComponentProps) {
  return <div class={styles.wrapper}>{props.value}</div>;
}
```

- Components always use `export default function`
- Data/utilities use named exports
- No barrel files — import directly from the source file

### Error Handling
- Guard clauses with `throw new Error()` for critical failures
- Nullish coalescing for defaults: `value ?? fallback`
- No try/catch — there are no async operations

## CSS Approach

- **CSS Modules** co-located with components (same name, `.module.css`)
- **Global CSS** in `src/styles/global.css` — reset, custom properties, base styles
- **Custom properties** on `:root` for all design tokens (colors, fonts, shelf colors)
- `composes` keyword for style composition within modules
- camelCase class names in modules
- Single responsive breakpoint: `@media (max-width: 600px)`
- No preprocessors, no CSS-in-JS, no Tailwind
- No shadows, no gradients, no border-radius — intentionally minimal aesthetic

### Design Tokens (key custom properties)
- `--bg-primary: #faf9f6` — warm off-white background
- `--velvet: #8b2232` — crimson accent color
- `--font-display: "Playfair Display"` — headings (serif)
- `--font-body: "Inter"` — body text (sans-serif)
- `--shelf-wood: #d4c5a9` — bookshelf board color

## Data

Book data lives in `src/data/books.ts` as a `shelves: Shelf[]` array.
Each shelf has a `category` string and a `books` array.

Books only need `title`, `author`, and `url` — cover colors are auto-assigned
via a deterministic hash of the title. Optional `spineColor` overrides.

```ts
interface Book {
  title: string;
  author: string;
  url: string;
  spineColor?: string;
}

interface Shelf {
  category: string;
  books: Book[];
}
```

## Deployment

Deployed on Vercel. `vercel.json` rewrites all routes to `index.html` for SPA
support. Build output is `dist/`. Framework preset: Vite.
