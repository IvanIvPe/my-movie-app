// app/movies/page.tsx
"use client";

import { useState, useEffect } from 'react';
import genresData from '../../data/genres.json';
import GenreSlider from '../components/GenreSlider';
import MoviePopup from '../components/MoviePopup';
import type { Movie, Genre, GenreWithMovies } from '../types';

interface GenresJson {
  genres: Genre[];
}

interface TmdbApiResponse {
  results: Movie[];
}

interface SelectedState {
  genreIndex: number;
  movieIndex: number;
}

export default function HomePage() {
  const [genres, setGenres] = useState<GenreWithMovies[]>([]);
  const [selected, setSelected] = useState<SelectedState>({
    genreIndex: 0,
    movieIndex: 0,
  });
  const [popupMovie, setPopupMovie] = useState<Movie | null>(null);

  const apiKey = 'd38aa8716411ef7d8e9054b34a6678ac';

  useEffect(() => {
    const fetchAllMovies = async () => {
      const typedGenresData = genresData as GenresJson;

      const promises = typedGenresData.genres.map(async (genre) => {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}&api_key=${apiKey}&page=1`
        );
        const data = (await res.json()) as TmdbApiResponse;
        return {
          ...genre,
          movies: data.results,
        };
      });

      const allGenresWithMovies = await Promise.all(promises);
      setGenres(allGenresWithMovies);
    };

    fetchAllMovies();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (popupMovie) return;

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          setSelected((prev) => ({
            ...prev,
            genreIndex: Math.max(prev.genreIndex - 1, 0),
          }));
          break;
        case 'ArrowDown':
          event.preventDefault();
          setSelected((prev) => ({
            ...prev,
            genreIndex: Math.min(prev.genreIndex + 1, genres.length - 1),
          }));
          break;
        case 'ArrowLeft':
          event.preventDefault();
          setSelected((prev) => ({
            ...prev,
            movieIndex: Math.max(prev.movieIndex - 1, 0),
          }));
          break;
        case 'ArrowRight':
          event.preventDefault();
          setSelected((prev) => {
            const currentGenre = genres[prev.genreIndex];
            if (!currentGenre) return prev;
            return {
              ...prev,
              movieIndex: Math.min(
                prev.movieIndex + 1,
                currentGenre.movies.length - 1
              ),
            };
          });
          break;
        case 'Enter':
          event.preventDefault();
          const selectedMovie =
            genres[selected.genreIndex]?.movies[selected.movieIndex];
          if (selectedMovie) {
            setPopupMovie(selectedMovie);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [genres, selected, popupMovie]);

  if (genres.length === 0) {
    return <div>Loading movies...</div>;
  }

  return (
    <div>
      {genres.map((genre, index) => (
        <GenreSlider
          key={genre.id}
          genre={genre}
          isGenreActive={index === selected.genreIndex}
          selectedMovieIndex={selected.movieIndex}
        />
      ))}

      {popupMovie && (
        <MoviePopup
          movie={popupMovie}
          onClose={() => setPopupMovie(null)}
        />
      )}
    </div>
  );
}