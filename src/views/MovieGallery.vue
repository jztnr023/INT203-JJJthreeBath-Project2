<script setup>
import { onMounted, ref, computed } from "vue";
import { getAllMovies } from "../libs/MovieApi.js";

const movies = ref([]);
const searchMovie = ref("");

onMounted(async () => {
  movies.value = await getAllMovies();
});

const filteredMovies = computed(() => {
  if (!searchMovie.value) {
    return movies.value;
  }
  return movies.value.filter((movie) =>
    movie.title.toLowerCase().includes(searchMovie.value.toLowerCase())
  );
});
</script>

<template>
  <div class="min-h-screen bg-black">
    <div>
      <img src="../assets/imgs/F1_movie.jpg" class="w-full h-150" />
    </div>
    <div class="flex justify-center mt-10">
      <input
        type="text"
        class="border rounded-md p-1 bg-white w-150"
        placeholder="Search..."
        v-model="searchMovie"
      />
    </div>

    <div v-if="filteredMovies.length > 0" class="grid grid-cols-4 gap-6 p-4 mx-15 mt-5 rounded-lg bg-black/50">
      <RouterLink
        v-for="movie in filteredMovies"
        :key="movie.id"
        :to="{ name: 'MovieDetail', params: { id: movie.id } }"
        class="block"
      >
        <div
          class="bg-white text-black border rounded-lg overflow-hidden shadow-lg hover:bg-red-600 hover:text-white hover:border-red-600 hover:scale-105 transition duration-400"
        >
          <img :src="movie.poster" class="w-full h-auto object-cover" />
          <div class="p-4 text-center">
            <h2 class="text-lg font-bold mb-2">{{ movie.title }} ({{ movie.year }})</h2>
            <p>Genre: {{ movie.genre }}</p>
            <p>Rating: {{ movie.rating }}</p>
            <p>Director: {{ movie.director }}</p>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
