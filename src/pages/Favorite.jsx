import { useState, useEffect } from "react"
import MovieCard from "../components/MovieCard"
import MovieModal from "../components/MovieModal"
import "../css/Favorite.css"

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Load favorites on mount
  useEffect(() => {
    const stored = localStorage.getItem("lovedMovies");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  // Update favorites when modal removes one
  const handleModalClose = () => {
    const updated = JSON.parse(localStorage.getItem("lovedMovies")) || [];
    setFavorites(updated);
    setSelectedMovie(null);
  };

  return (
    <div className="favorite-container">
      <h2>❤️ Favorite Movies</h2>

      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <div className="movie-list-container">
          {favorites.map((movie) => (
            <MovieCard
              display="none"
              key={movie.id}
              movie={movie}
              onClick={() => setSelectedMovie(movie)}
            />
          ))}
        </div>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default Favorite;
