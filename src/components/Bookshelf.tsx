import { createSignal, For, onCleanup, onMount, Show } from "solid-js";
import type { Shelf } from "../data/books";
import { shelves } from "../data/books";
import Book from "./Book";
import styles from "./Bookshelf.module.css";

const SCROLL_AMOUNT = 200;

function ShelfSection(props: { shelf: Shelf; onCategoryClick: (shelf: Shelf) => void }) {
  let shelfRowRef!: HTMLDivElement;
  const [canScrollLeft, setCanScrollLeft] = createSignal(false);
  const [canScrollRight, setCanScrollRight] = createSignal(false);

  const updateScrollState = () => {
    const el = shelfRowRef;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  const scrollBy = (dir: number) => {
    shelfRowRef?.scrollBy({ left: dir * SCROLL_AMOUNT, behavior: "smooth" });
  };

  onMount(() => {
    updateScrollState();
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(shelfRowRef);
    onCleanup(() => observer.disconnect());
  });

  return (
    <section class={styles.category}>
      <div
        class={styles.sectionHeader}
        onClick={() => props.onCategoryClick(props.shelf)}
      >
        <span class={styles.sectionTitle}>{props.shelf.category}</span>
      </div>

      <div class={styles.shelfWrapper}>
        <Show when={canScrollLeft()}>
          <button class={`${styles.scrollArrow} ${styles.scrollArrowLeft}`} onClick={() => scrollBy(-1)}>
            &#8249;
          </button>
        </Show>

        <div class={styles.shelfRow} ref={shelfRowRef} onScroll={updateScrollState}>
          <div class={styles.shelfInner}>
            <div class={styles.shelf}>
              <For each={props.shelf.books}>
                {(book) => <Book book={book} expanded={false} />}
              </For>
            </div>
            <div class={styles.shelfBoard} />
          </div>
        </div>

        <Show when={canScrollRight()}>
          <button class={`${styles.scrollArrow} ${styles.scrollArrowRight}`} onClick={() => scrollBy(1)}>
            &#8250;
          </button>
        </Show>
      </div>
    </section>
  );
}

export default function Bookshelf() {
  const [activeShelf, setActiveShelf] = createSignal<Shelf | null>(null);

  const handleCategoryClick = (shelf: Shelf) => {
    setActiveShelf(shelf);
    document.body.style.overflow = "hidden";
  };

  const handleOverlayClose = () => {
    setActiveShelf(null);
    document.body.style.overflow = "";
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && activeShelf()) {
      handleOverlayClose();
    }
  };

  onMount(() => document.addEventListener("keydown", handleKeyDown));
  onCleanup(() => document.removeEventListener("keydown", handleKeyDown));

  return (
    <div class={styles.page}>
      <header class={styles.hero}>
        <span class={styles.welcome}>A Collection</span>
        <h1 class={styles.title}>The Anarcho-Objectivist Canon</h1>
      </header>

      <main class={styles.content}>
        <For each={shelves}>
          {(shelf) => (
            <ShelfSection shelf={shelf} onCategoryClick={handleCategoryClick} />
          )}
        </For>
      </main>

      <Show when={activeShelf()}>
        {(shelf) => (
          <div class={styles.overlay} onClick={handleOverlayClose}>
            <div class={styles.overlayContent} onClick={(e) => e.stopPropagation()}>
              <div class={styles.overlayHeader}>
                <span class={styles.overlayTitle}>{shelf().category}</span>
                <button class={styles.overlayClose} onClick={handleOverlayClose}>
                  &times;
                </button>
              </div>
              <div class={styles.overlayGrid}>
                <For each={shelf().books}>
                  {(book) => <Book book={book} expanded={true} />}
                </For>
              </div>
            </div>
          </div>
        )}
      </Show>

      <footer class={styles.footer}>
        "The State is a gang of thieves writ large — the most immoral, grasping, and unscrupulous individuals in any society." — Murray N. Rothbard
      </footer>
    </div>
  );
}
