export type Movie = {
  id: number;
  title: string;
  description: string;
  image: string;
  rating: number;
};

export type Movies = Movie[];

export type Genre = {
  id: number;
  name: string;
};

export type Genres = Genre[];

export type ApiGenresResponse = {
  genres: Genres;
};

export type ApiPopularResponse = {
  /**
   * Page sur laquelle on se trouve actuelement
   */
  page: number;
  /**
   * Liste des Films
   */
  results: ApiMovie[];
  total_pages: number;
  total_results: number;
};

export interface ApiMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
