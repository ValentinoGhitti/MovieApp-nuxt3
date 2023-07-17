import { Movie } from "./Movie";

export type APIResponse = {
  page: number;
  results: Movie[];
  totalPages: number;
  totalResults: number;
}