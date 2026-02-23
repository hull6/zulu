# AGENTS.md — The LiquidZulu Canon

Guidelines for AI coding agents operating in this repository.

## Project Overview

A digital bookshelf built with **SolidJS** (NOT React) and **TypeScript**, bundled
with **Vite**. Static single-page app — no routing, no API calls, no state
management beyond SolidJS primitives (`createSignal`, `onMount`, `onCleanup`).
Deployed on Vercel.

## Build / Dev Commands

| Command                              | Description                      |
| ------------------------------------ | -------------------------------- |
| `npm run dev`                        | Start Vite dev server            |
| `npm run build`                      | Production build to `dist/`      |
| `npm run preview`                    | Preview production build locally |
| `npx tsc --noEmit`                   | TypeScript type-check (no output)|
| `npm run build && npx tsc --noEmit`  | **Always run after changes**     |

There is no linter, formatter, or test runner configured. No single-test command exists.

## Project Structure

```
toot/
  index.html                 # Vite entry HTML
  package.json               # type: "module", deps: solid-js
  tsconfig.json              # strict, jsx: preserve, jsxImportSource: solid-js
  vite.config.ts             # vite-plugin-solid only
  vercel.json                # SPA rewrite config
  src/
    index.tsx                # Entry point — renders <App/> into #root
    App.tsx                  # Root component
    components/
      Bookshelf.tsx          # Main layout: hero, shelves, overlay, footer
      Bookshelf.module.css
      Book.tsx               # Book component (spine + cover modes)
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
- Use `classList={{ [styles.active]: condition }}` for conditional classes
- Do NOT destructure props — access via `props.x` to preserve reactivity
- Use `<For each={array}>` for list rendering, NOT `.map()`
- Use `<Show when={condition}>` for conditional rendering
- Inline styles use object syntax: `style={{ background: value }}`
- Mount with `render(() => <App />, root)` from `solid-js/web`
- Lifecycle: `onMount` / `onCleanup` (not useEffect)
- State: `createSignal` (not useState) — returns `[getter, setter]`

## Code Style

### Formatting
- 2-space indentation, double quotes, semicolons always
- Trailing commas in multi-line arrays, objects, and parameters
- No comments unless explicitly requested

### Imports — Ordering
1. Third-party library imports (`solid-js`, `solid-js/web`)
2. Type-only imports using `import type` syntax
3. Local data/utility imports
4. Local component imports
5. CSS module imports (always last)

```ts
import { createSignal, For, Show } from "solid-js";
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

| Thing              | Convention               | Example                    |
| ------------------ | ------------------------ | -------------------------- |
| Components         | PascalCase `.tsx`        | `Bookshelf.tsx`            |
| CSS Modules        | PascalCase `.module.css` | `Bookshelf.module.css`     |
| Data files         | camelCase `.ts`          | `books.ts`                 |
| Type declarations  | camelCase `.d.ts`        | `modules.d.ts`             |
| Constants          | SCREAMING_SNAKE          | `BOOKS_PER_ROW`            |
| Functions          | camelCase                | `getCoverColor`            |
| Interfaces         | PascalCase               | `BookProps`, `Shelf`       |
| CSS classes        | camelCase                | `.sectionHeader`           |

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
- **Custom properties** on `:root` for all design tokens
- `composes` keyword for style composition within modules
- camelCase class names in modules
- Single responsive breakpoint: `@media (max-width: 600px)`
- No preprocessors, no CSS-in-JS, no Tailwind

### Design Tokens (custom properties on `:root`)
- Backgrounds: `--bg-primary: #faf9f6` / `--bg-secondary: #f2f0eb` / `--bg-card: #fff`
- Text: `--text-primary: #1a1a1a` / `--text-secondary: #555` / `--text-muted: #888`
- Accent: `--velvet: #8b2232` / `--velvet-dark: #5c1622` / `--velvet-light: #a83245`
- Fonts: `--font-display: "Playfair Display"` (serif) / `--font-body: "Inter"` (sans)
- Shelf: `--shelf-wood: #d4c5a9` / `--shelf-wood-dark: #b8a88a` / `--shelf-shadow: #c4b494`

## Data

Book data lives in `src/data/books.ts` as a `shelves: Shelf[]` array.
Each shelf has a `category` string and a `books` array. Cover colors are
auto-assigned via a deterministic hash of the title. Optional `spineColor`
overrides. The `community` flag marks community contributions (green badge).

```ts
interface Book {
  title: string;
  author: string;
  url: string;
  spineColor?: string;
  community?: boolean;
}

interface Shelf {
  category: string;
  books: Book[];
}
```

## Architecture Notes

- Books have two visual modes: **spine** (collapsed, vertical title) and
  **cover** (expanded, showing title + author + optional community badge).
- Shelves display spines in a horizontally-scrolling row.
- Clicking a category plaque opens a fullscreen **overlay** showing all covers
  in a wrapping grid. Escape key or backdrop click dismisses it.
- Scroll is locked on `document.body` while the overlay is open.

## Deployment

Deployed on Vercel. `vercel.json` rewrites all routes to `index.html`.
Build output: `dist/`. Framework preset: Vite.
