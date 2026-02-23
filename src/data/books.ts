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
        url: "https://en.wikipedia.org/wiki/Capitalism_and_Freedom",
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
        url: "https://en.wikipedia.org/wiki/Atlas_Shrugged",
      },
      {
        title: "The Fountainhead",
        author: "Ayn Rand",
        url: "https://en.wikipedia.org/wiki/The_Fountainhead",
      },
      {
        title: "The Virtue of Selfishness",
        author: "Ayn Rand",
        url: "https://en.wikipedia.org/wiki/The_Virtue_of_Selfishness",
      },
      {
        title: "Capitalism: The Unknown Ideal",
        author: "Ayn Rand",
        url: "https://en.wikipedia.org/wiki/Capitalism:_The_Unknown_Ideal",
      },
      {
        title: "Introduction to Objectivist Epistemology",
        author: "Ayn Rand",
        url: "https://en.wikipedia.org/wiki/Introduction_to_Objectivist_Epistemology",
      },
      {
        title: "Philosophy: Who Needs It",
        author: "Ayn Rand",
        url: "https://en.wikipedia.org/wiki/Philosophy:_Who_Needs_It",
      },
      {
        title: "The Romantic Manifesto",
        author: "Ayn Rand",
        url: "https://en.wikipedia.org/wiki/The_Romantic_Manifesto",
      },
      {
        title: "Objectivism: The Philosophy of Ayn Rand",
        author: "Leonard Peikoff",
        url: "https://en.wikipedia.org/wiki/Objectivism:_The_Philosophy_of_Ayn_Rand",
      },
      {
        title: "The Ominous Parallels",
        author: "Leonard Peikoff",
        url: "https://en.wikipedia.org/wiki/The_Ominous_Parallels",
      },
      {
        title: "We the Living",
        author: "Ayn Rand",
        url: "https://en.wikipedia.org/wiki/We_the_Living",
      },
      {
        title: "Anthem",
        author: "Ayn Rand",
        url: "https://en.wikipedia.org/wiki/Anthem_(novella)",
      },
    ]),
  },
  {
    category: "Ecological Psychology",
    books: withColors([
      {
        title: "The Ecological Approach to Visual Perception",
        author: "James J. Gibson",
        url: "https://en.wikipedia.org/wiki/The_Ecological_Approach_to_Visual_Perception",
      },
      {
        title: "The Senses Considered as Perceptual Systems",
        author: "James J. Gibson",
        url: "https://en.wikipedia.org/wiki/The_Senses_Considered_as_Perceptual_Systems",
      },
      {
        title: "Ecological Psychology in Context",
        author: "Harry Heft",
        url: "https://en.wikipedia.org/wiki/Ecological_psychology",
      },
      {
        title: "Radical Embodied Cognitive Science",
        author: "Anthony Chemero",
        url: "https://mitpress.mit.edu/9780262516471/radical-embodied-cognitive-science/",
      },
      {
        title: "An Ecological Approach to Perceptual Learning and Development",
        author: "Eleanor J. Gibson & Anne D. Pick",
        url: "https://en.wikipedia.org/wiki/Eleanor_J._Gibson",
      },
      {
        title: "Affordances and the Body",
        author: "Christopher Fraleigh",
        url: "https://en.wikipedia.org/wiki/Affordance",
      },
      {
        title: "Information and the Internal Environment",
        author: "Robert E. Shaw & Michael T. Turvey",
        url: "https://en.wikipedia.org/wiki/Michael_Turvey",
      },
      {
        title: "Perceptual Control Theory",
        author: "William T. Powers",
        url: "https://en.wikipedia.org/wiki/Perceptual_control_theory",
      },
    ]),
  },
];
