import { defineStore } from "pinia";
import { ref } from "vue";
import * as movieApi from "../libs/MovieApi.js";

export const useMovieStore = defineStore("movie", () => {
  const movies = ref([]);
  const currentMovie = ref(null);
  const searchQuery = ref("");

  async function fetchMovies() {
    movies.value = await movieApi.getAllMovies();
  }

  async function fetchMovieById(id) {
    currentMovie.value = await movieApi.getMovieById(id);
  }

  return {
    movies,
    currentMovie,
    searchQuery,
    fetchMovies,
    fetchMovieById,
  };
});
