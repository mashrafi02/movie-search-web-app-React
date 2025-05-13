import MovieCard from "../components/MovieCard"
import MovieModal from "../components/MovieModal"
import "../css/Home.css"

import { useState, useEffect } from "react"
import {FetchPopular, FetchQuery} from "../services/api"

const Home = () => {

  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsloading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
      const loadPopularMovies = async () => {
        try{
            let popular = await FetchPopular();
            setMovies(popular)
        }catch(err){
          console.log(err);
          setIsError(err);
        }finally{
          setIsloading(false)
        }
      }
      loadPopularMovies()
  }, []);

  function handleSubmit(query){
    if(query.trim() != "" && isLoading != true){
      setIsloading(true);
      const loadSerachMovieas = async () => {
        try{
          let searchMovies = await FetchQuery(query);
          const filteredMovies = searchMovies?.filter(movie => movie.original_title.toLowerCase().startsWith(query));
          setMovies(filteredMovies);
        }catch(err){
          console.log(err);
          setIsError(err);
        }finally{
          setIsloading(false)
        }
    }
    loadSerachMovieas()
    }
  } 

  const showModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);  // Open modal
  };

  const hideModal = () => {
    setIsModalOpen(false);  // Close modal
  };
  return (
    <>
      <div className={`home-container ${isModalOpen ? "blur" : ""}`}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(query);
          }}
        >
          <input
            type="text"
            placeholder="Search for a movie..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <button type="submit">Search</button>
        </form>
        
        <div className="movie-list-container">
          {isError && <h1>{isError}</h1>}

          {isLoading && <h1>Loading...</h1>}

          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard
                onClick={() => showModal(movie)}
                display="inline-block"
                movie={movie}
                key={movie.id}
              />
            ))
          ) : (
            <h1 style={{gridColumn:"-1/1"}}>No movies found</h1>
          )}
        </div>
      </div>
  
      {selectedMovie && isModalOpen && (
        <MovieModal movie={selectedMovie} onClose={hideModal} />
      )}
    </>
    );
}


export default Home