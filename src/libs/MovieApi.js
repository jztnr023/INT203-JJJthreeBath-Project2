const API_URL = import.meta.env.VITE_API_URL;

// Error handling
async function handleResponse(response) {
  if (!response.ok) {
    const error = new Error(`HTTP Error: ${response.status}`);
    error.status = response.status;
    error.statusText = response.statusText;
    throw error;
  }
  return await response.json();
}

// Get all movies
export async function getAllMovies() {
  try {
    const response = await fetch(`${API_URL}/movies`);
    return await handleResponse(response);
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    throw error;
  }
}

// Get movie by ID
export async function getMovieById(id) {
  try {
    const response = await fetch(`${API_URL}/movies/${id}`);
    return await handleResponse(response);
  } catch (error) {
    console.error(`Failed to fetch movie ${id}:`, error);
    throw error;
  }
}
