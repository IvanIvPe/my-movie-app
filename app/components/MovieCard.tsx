"use client";

import type { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  isActive: boolean;
}

export default function MovieCard({ movie, isActive }: MovieCardProps) {
  const className = `movie-card ${isActive ? 'active' : ''}`;
  const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`;

  return (
    <div className={className}>
      <img src={imageUrl} alt={movie.title} />
      <p>{movie.title}</p>
    </div>
  );
}