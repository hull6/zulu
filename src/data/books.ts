export interface Book {
  title: string;
  author: string;
  url: string;
  spineColor?: string;
  community?: boolean;
}

export interface Shelf {
  category: string;
  books: Book[];
}

const COVER_COLORS = [
  "#8b2232",
  "#2d4a3e",
  "#4a3728",
  "#3b3a5c",
  "#5c4a2d",
  "#6b3a3a",
  "#2e4a5c",
  "#5c2d4a",
  "#3a5c4a",
  "#4a4a4a",
  "#6b4a2d",
  "#2d3a5c",
  "#5c3a2d",
  "#3a2d5c",
  "#4a5c2d",
  "#5c2d3a",
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export function getCoverColor(title: string): string {
  return COVER_COLORS[hashString(title) % COVER_COLORS.length];
}

function withColors(books: Book[]): Book[] {
  return books.map((book) => ({
    ...book,
    spineColor: book.spineColor ?? getCoverColor(book.title),
  }));
}

export const shelves: Shelf[] = [
  {
    category: "Libertarianism",
    books: withColors([
      {
        title: "The Law",
        author: "Frédéric Bastiat",
        url: "https://oll.libertyfund.org/title/bastiat-the-law",
      },
      {
        title: "The Road to Serfdom",
        author: "Friedrich A. Hayek",
        url: "https://mises.org/library/road-serfdom-0",
      },
      {
        title: "Man, Economy, and State",
        author: "Murray N. Rothbard",
        url: "https://mises.org/library/man-economy-and-state-power-and-market",
      },
      {
        title: "Human Action",
        author: "Ludwig von Mises",
        url: "https://mises.org/library/human-action-0",
      },
      {
        title: "Economics in One Lesson",
        author: "Henry Hazlitt",
        url: "https://mises.org/library/economics-one-lesson",
      },
      {
        title: "The Ethics of Liberty",
        author: "Murray N. Rothbard",
        url: "https://mises.org/library/ethics-liberty",
      },
      {
        title: "Anatomy of the State",
        author: "Murray N. Rothbard",
        url: "https://mises.org/library/anatomy-state",
      },
      {
        title: "No Treason",
        author: "Lysander Spooner",
        url: "https://oll.libertyfund.org/title/spooner-no-treason-no-vi-the-constitution-of-no-authority-1870",
      },
      {
        title: "For a New Liberty",
        author: "Murray N. Rothbard",
        url: "https://mises.org/library/new-liberty-libertarian-manifesto",
      },
      {
        title: "The Machinery of Freedom",
        author: "David D. Friedman",
        url: "http://www.daviddfriedman.com/The_Machinery_of_Freedom_.pdf",
      },
      {
        title: "Democracy: The God That Failed",
        author: "Hans-Hermann Hoppe",
        url: "https://mises.org/library/democracy-god-failed-1",
      },
      {
        title: "The Market for Liberty",
        author: "Morris & Linda Tannehill",
        url: "https://mises.org/library/market-liberty-1",
      },
      {
        title: "Our Enemy, the State",
        author: "Albert Jay Nock",
        url: "https://mises.org/library/our-enemy-state-2",
      },
      {
        title: "Economic Calculation in the Socialist Commonwealth",
        author: "Ludwig von Mises",
        url: "https://mises.org/library/economic-calculation-socialist-commonwealth",
      },
      {
        title: "Capitalism and Freedom",
        author: "Milton Friedman",
        url: "https://www.amazon.com/dp/0226264211",
      },
      {
        title: "The Production of Security",
        author: "Gustave de Molinari",
        url: "https://mises.org/library/production-security-0",
      },
      {
        title: "Argumentation Ethics: A Systematization",
        author: "catalaxia",
        url: "https://anarquismo.substack.com/p/argumentation-ethics-a-systematization",
        community: true,
      },
    ]),
  },
  {
    category: "Objectivism",
    books: withColors([
      {
        title: "Atlas Shrugged",
        author: "Ayn Rand",
        url: "https://www.amazon.com/dp/0451191145",
      },
      {
        title: "The Fountainhead",
        author: "Ayn Rand",
        url: "https://www.amazon.com/dp/0451191153",
      },
      {
        title: "The Virtue of Selfishness",
        author: "Ayn Rand",
        url: "https://www.amazon.com/dp/0451163931",
      },
      {
        title: "Capitalism: The Unknown Ideal",
        author: "Ayn Rand",
        url: "https://www.amazon.com/dp/0451147952",
      },
      {
        title: "Introduction to Objectivist Epistemology",
        author: "Ayn Rand",
        url: "https://www.amazon.com/dp/0452010306",
      },
      {
        title: "Philosophy: Who Needs It",
        author: "Ayn Rand",
        url: "https://www.amazon.com/dp/0451138937",
      },
      {
        title: "The Romantic Manifesto",
        author: "Ayn Rand",
        url: "https://www.amazon.com/dp/0451149165",
      },
      {
        title: "Objectivism: The Philosophy of Ayn Rand",
        author: "Leonard Peikoff",
        url: "https://www.amazon.com/dp/0452011019",
      },
      {
        title: "The Ominous Parallels",
        author: "Leonard Peikoff",
        url: "https://www.amazon.com/dp/0452011175",
      },
      {
        title: "We the Living",
        author: "Ayn Rand",
        url: "https://www.amazon.com/dp/0451187849",
      },
      {
        title: "Anthem",
        author: "Ayn Rand",
        url: "https://www.amazon.com/dp/0452281253",
      },
    ]),
  },
  {
    category: "Ecological Psychology",
    books: withColors([
      {
        title: "The Ecological Approach to Visual Perception",
        author: "James J. Gibson",
        url: "https://www.routledge.com/The-Ecological-Approach-to-Visual-Perception/Gibson/p/book/9781848725782",
      },
      {
        title: "The Senses Considered as Perceptual Systems",
        author: "James J. Gibson",
        url: "https://www.amazon.com/dp/0313239614",
      },
      {
        title: "Ecological Psychology in Context",
        author: "Harry Heft",
        url: "https://www.amazon.com/Ecological-Psychology-Context-Gibson-William/dp/0805856927",
      },
      {
        title: "Radical Embodied Cognitive Science",
        author: "Anthony Chemero",
        url: "https://mitpress.mit.edu/9780262516471/radical-embodied-cognitive-science/",
      },
      {
        title: "An Ecological Approach to Perceptual Learning and Development",
        author: "Eleanor J. Gibson & Anne D. Pick",
        url: "https://www.amazon.com/dp/0195165497",
      },
      {
        title: "Perceptual Control Theory",
        author: "William T. Powers",
        url: "https://www.amazon.com/Perceptual-Control-Theory-Overview-Psychology/dp/1938090128",
      },
    ]),
  },
];
