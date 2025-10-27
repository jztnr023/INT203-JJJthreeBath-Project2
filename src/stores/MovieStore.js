import { defineStore } from "pinia";
import { ref } from "vue";
import { getAllMovies } from "../libs/MovieApi.js";

export const useMovieStore = defineStore("movie", () => {
  const movies = ref([]);
  const searchQuery = ref("");

  async function fetchMovies() {
    movies.value = await getAllMovies();
  }

  return {
    movies,
    searchQuery,
    fetchMovies,
  };
});
