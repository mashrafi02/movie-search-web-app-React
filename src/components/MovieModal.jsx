import { useEffect, useState } from "react";
import "../css/MovieModal.css";

const MovieModal = ({ movie, onClose }) => {
  const [isLoved, setIsLoved] = useState(true);

  useEffect(() => {
    const lovedMovies = JSON.parse(localStorage.getItem("lovedMovies")) || [];
    const isMovieLoved = lovedMovies.some(m => m.id === movie.id);
    setIsLoved(isMovieLoved);
  }, [movie.id]);

  const handleRemoveFavorite = () => {
    let lovedMovies = JSON.parse(localStorage.getItem("lovedMovies")) || [];
    lovedMovies = lovedMovies.filter(m => m.id !== movie.id);
    localStorage.setItem("lovedMovies", JSON.stringify(lovedMovies));
    setIsLoved(false);
    onClose()
  };

  return (
    <div className={`modal-overlay ${onClose ? "active" : ""}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>X</button>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
        <h2>
          {movie.title}
        </h2>
        <p><strong>Release:</strong> {movie.release_date}</p>
        <p>{movie.overview}</p>
        <p><strong>Rating:</strong> {movie.vote_average}</p>

        {isLoved && (
          <button onClick={handleRemoveFavorite} className="remove-fav-btn">
            Remove from Favorites
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
