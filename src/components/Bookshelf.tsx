import { createSignal, For, onCleanup, onMount, Show } from "solid-js";
import type { Shelf } from "../data/books";
import { shelves } from "../data/books";
import Book from "./Book";
import styles from "./Bookshelf.module.css";

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
            <section class={styles.category}>
              <div
                class={styles.sectionHeader}
                onClick={() => handleCategoryClick(shelf)}
              >
                <span class={styles.sectionTitle}>{shelf.category}</span>
              </div>

              <div class={styles.shelfRow}>
                <div class={styles.shelfInner}>
                  <div class={styles.shelf}>
                    <For each={shelf.books}>
                      {(book) => <Book book={book} expanded={false} />}
                    </For>
                  </div>
                  <div class={styles.shelfBoard} />
                </div>
              </div>
            </section>
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
