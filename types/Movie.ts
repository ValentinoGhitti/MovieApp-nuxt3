export type Movie = {
  id: number;
  title: string;
  genres: {
    id: number;
    name: string;
  }[];
  release_date: string;
  runtime: number | null;
  overview: string;
  poster_path: string;
  vote_average: string | number;
  vote_count: string | number;
  backdrop_path: string;
}