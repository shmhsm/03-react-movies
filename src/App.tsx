import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from './components/SearchBar/SearchBar';
import MovieGrid from './components/MovieGrid/MovieGrid';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import MovieModal from './components/MovieModal/MovieModal';
import { fetchMovies } from './services/movieService';
import type { Movie } from './types/movie';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setIsError(false);
      setIsLoading(true);
      setMovies([]);

      const results = await fetchMovies(query);

      if (results.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }
      setMovies(results);
    } catch (error) {
      console.error("Детальна помилка API:", error); 
      
      setIsError(true);
      toast.error("An error occurred while fetching movies.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />
      
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      
      {movies.length > 0 && !isLoading && !isError && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}

      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}
    </>
  );
}