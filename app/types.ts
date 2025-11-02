export interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  vote_average: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenreWithMovies extends Genre {
  movies: Movie[];
}