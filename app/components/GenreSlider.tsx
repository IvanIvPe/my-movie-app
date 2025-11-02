"use client";

import { useRef, useEffect } from 'react';
import type { GenreWithMovies } from '../types';
import MovieCard from './MovieCard';

interface GenreSliderProps {
  genre: GenreWithMovies;
  selectedMovieIndex: number;
  isGenreActive: boolean;
}

export default function GenreSlider({
  genre,
  selectedMovieIndex,
  isGenreActive,
}: GenreSliderProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isGenreActive && rowRef.current) {
      const activeMovie = rowRef.current.children[
        selectedMovieIndex
      ] as HTMLDivElement;

      if (activeMovie) {
        activeMovie.scrollIntoView({
          behavior: 'smooth',
          inline: 'nearest',
          block: 'nearest',
        });
      }
    }
  }, [selectedMovieIndex, isGenreActive]);

  return (
    <div className="genre-slider">
      <h2>{genre.name}</h2>
      <div className="movies-row" ref={rowRef}>
        {genre.movies.map((movie, index) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isActive={isGenreActive && index === selectedMovieIndex}
          />
        ))}
      </div>
    </div>
  );
}