const API_KEY = "cbdb265c859ccdf74025ec6f1f2ac4fd";
const BASE_URL = "https://api.themoviedb.org/3"

export const FetchPopular = async () => {

  const POPULAR_URL = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;

  const res = await fetch(POPULAR_URL);
  const data = await res.json();
  const movie_list = data.results

  return movie_list
};


export const FetchQuery = async (query) => {

    const QUERY_URL = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;

    const res = await fetch(QUERY_URL);
    const data = await res.json();
    const movie_list = data.results
  
    return movie_list
  };
  

export function handleFavorite(movie, isLoved, setIsLoved) {
  const newLoveState = isLoved === "🤍" ? "❤️" : "🤍";
  setIsLoved(newLoveState);

  let lovedMovies = JSON.parse(localStorage.getItem("lovedMovies")) || [];

  if (newLoveState === "❤️") {
    // Avoid duplicate entries
    const alreadyLoved = lovedMovies.find(m => m.id === movie.id);
    if (!alreadyLoved) {
      lovedMovies.push(movie);
      localStorage.setItem("lovedMovies", JSON.stringify(lovedMovies));
    }
  } else {
    // Remove movie from localStorage when un-favorited
    lovedMovies = lovedMovies.filter(m => m.id !== movie.id);
    localStorage.setItem("lovedMovies", JSON.stringify(lovedMovies));
  }
}
