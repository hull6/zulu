import { Show } from "solid-js";
import type { Book as BookType } from "../data/books";
import styles from "./Book.module.css";

interface BookProps {
  book: BookType;
  expanded: boolean;
}

export default function Book(props: BookProps) {
  return (
    <a
      class={styles.book}
      classList={{ [styles.expanded]: props.expanded }}
      href={props.book.url}
      target="_blank"
      rel="noopener noreferrer"
      title={`${props.book.title} — ${props.book.author}`}
    >
      <Show when={!props.expanded}>
        <div class={styles.spine} style={{ background: props.book.spineColor }}>
          <div class={styles.spineEdge} />
          <span class={styles.spineTitle}>{props.book.title}</span>
        </div>
      </Show>
      <Show when={props.expanded}>
        <div class={styles.coverStatic} style={{ background: props.book.spineColor }}>
          <div class={styles.coverEdge} />
          <div class={styles.accentBarTop} />
          <div class={styles.accentBarBottom} />
          <Show when={props.book.community}>
            <span class={styles.communityBadge}>Community</span>
          </Show>
          <span class={styles.title}>{props.book.title}</span>
          <span class={styles.coverAuthor}>{props.book.author}</span>
        </div>
        <div class={styles.plaqueExpanded}>
          <span class={styles.authorExpanded}>{props.book.author}</span>
        </div>
      </Show>
    </a>
  );
}
