import { handleFavorite } from '../services/api';
import { useState, useEffect } from 'react';
import '../css/MovieCard.css';

const MovieCard = ({movie, display, onClick}) => {
  const [isLoved, setIsLoved] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("lovedMovies")) || [];
    const isFavorite = stored.some(m => m.id === movie.id);
    setIsLoved(isFavorite);
  }, [movie.id]);

  return (
    <div onClick={()=> onClick()} style={{ cursor: "pointer" }} className="movie-card">

        <button style={{display:display}} onClick={(e) => {
            e.stopPropagation()
            handleFavorite(movie, isLoved, setIsLoved)}}
            className='love-btn'>{isLoved? "❤️" : "🤍"}
        </button>

        <div className="poster">
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="movie-poster" />
        </div>

        <div className="intro-info">
            <h3>{movie.original_title}</h3>
            <span>{movie.release_date?.split("-")[0]}</span>
        </div>
    </div>
  )
}

export default MovieCard