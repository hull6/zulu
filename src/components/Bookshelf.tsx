import { For } from "solid-js";
import type { Book as BookType } from "../data/books";
import { shelves } from "../data/books";
import Book from "./Book";
import styles from "./Bookshelf.module.css";

const BOOKS_PER_ROW = 6;

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export default function Bookshelf() {
  return (
    <div class={styles.page}>
      <header class={styles.hero}>
        <span class={styles.welcome}>A Collection</span>
        <h1 class={styles.title}>The LiquidZulu Canon</h1>

      </header>

      <main class={styles.content}>
        <For each={shelves}>
          {(shelf) => {
            const rows = chunkArray(shelf.books, BOOKS_PER_ROW);
            return (
              <section class={styles.category}>
                <div class={styles.sectionHeader}>
                  <span class={styles.sectionLine} />
                  <span class={styles.sectionTitle}>{shelf.category}</span>
                  <span class={styles.sectionLine} />
                </div>

                <For each={rows}>
                  {(row) => (
                    <>
                      <div class={styles.shelf}>
                        <For each={row}>
                          {(book: BookType) => <Book book={book} />}
                        </For>
                      </div>
                      <div class={styles.shelfBoard} />
                    </>
                  )}
                </For>
              </section>
            );
          }}
        </For>
      </main>

      <footer class={styles.footer}>
        "The State is a gang of thieves writ large — the most immoral, grasping, and unscrupulous individuals in any society." — Murray N. Rothbard
      </footer>
    </div>
  );
}
