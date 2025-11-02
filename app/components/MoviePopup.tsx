"use client";

import { useEffect } from 'react';
// Uvozimo naš tip za film
import type { Movie } from '../types';

interface MoviePopupProps {
  movie: Movie;
  onClose: () => void;
}

const popupStyles: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const popupContentStyles: React.CSSProperties = {
  background: '#141414',
  padding: '20px',
  borderRadius: '8px',
  maxWidth: '800px',
  display: 'flex',
  gap: '20px',
};

export default function MoviePopup({ movie, onClose }: MoviePopupProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const posterUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  return (
    <div style={popupStyles} onClick={onClose}>
      {<></>}
      <div
        style={popupContentStyles}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <img src={posterUrl} alt={movie.title} style={{ width: '300px' }} />
        <div>
          <h2>{movie.title}</h2>
          <p>IMDb: {movie.vote_average.toFixed(1)} / 10</p>
          <p>{movie.overview}</p>
          <button onClick={onClose}>Close (Esc)</button>
        </div>
      </div>
    </div>
  );
}