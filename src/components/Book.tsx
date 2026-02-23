import type { Book as BookType } from "../data/books";
import styles from "./Book.module.css";

interface BookProps {
  book: BookType;
}

export default function Book(props: BookProps) {
  return (
    <a
      class={styles.book}
      href={props.book.url}
      target="_blank"
      rel="noopener noreferrer"
      title={`${props.book.title} — ${props.book.author}`}
    >
      <div class={styles.cover} style={{ background: props.book.spineColor }}>
        <div class={styles.coverEdge} />
        <div class={styles.accentBarTop} />
        <div class={styles.accentBarBottom} />
        {props.book.community && <span class={styles.communityBadge}>Community</span>}
        <span class={styles.title}>{props.book.title}</span>
        <span class={styles.coverAuthor}>{props.book.author}</span>
      </div>
      <div class={styles.plaque}>
        <span class={styles.author}>{props.book.author}</span>
      </div>
    </a>
  );
}
