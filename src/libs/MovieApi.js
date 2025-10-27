const API_URL = import.meta.env.VITE_API_URL;

export async function getAllMovies() {
    const response = await fetch(`${API_URL}/movies`);
    const data = await response.json();
    return data;
}