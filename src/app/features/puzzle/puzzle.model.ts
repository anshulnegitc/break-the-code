export interface Puzzle {
  question: (string | number)[];
  options: (string | number)[];
  answer: string | number;
}
