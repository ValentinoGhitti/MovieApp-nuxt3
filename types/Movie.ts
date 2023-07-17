export type Movie = {
  id: number;
  title: string;
  genres: {
    id: number;
    name: string;
  }[];
  releaseDate: string;
  runtime: number | null;
  overview: string;
  posterPath: string;
}