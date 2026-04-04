import axios from 'axios';
import type { Movie } from '../types/movie';

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
console.log("Мій токен:", API_TOKEN);
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

interface TMDBResponse {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<TMDBResponse>('/search/movie', {
    params: {
      query: query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      accept: 'application/json',
    },
  });
  return response.data.results;
};