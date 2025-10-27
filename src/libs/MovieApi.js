const API_URL = import.meta.env.VITE_API_URL;

// Get all movies
export async function getAllMovies() {
  const response = await fetch(`${API_URL}/movies`);
  return await response.json();
}

// Get movie by ID
export async function getMovieById(id) {
  const response = await fetch(`${API_URL}/movies/${id}`);
  return await response.json();
}
