<script setup>
import { onMounted, ref, computed } from "vue";
import { useMovieStore } from "../stores/MovieStore.js";
import MovieList from "../components/MovieList.vue";

const movieStore = useMovieStore();
const showList = ref(false);

onMounted(async () => {
  await movieStore.fetchMovies();
});

const filteredMovies = computed(() => {
  const q = movieStore.searchQuery || "";
  if (!q) {
    return movieStore.movies;
  }
  return movieStore.movies.filter((movie) =>
    movie.title.toLowerCase().includes(q.toLowerCase())
  );
});
</script>

<template>
  <div class="min-h-screen max-w-screen bg-black">
    <div>
      <RouterLink :to="{ name: 'MovieDetail', params: { id: 20 } }">
        <img src="../assets/imgs/dune-black-3840x2160-15808.jpg" class="w-full h-auto" />
      </RouterLink>
    </div>
    <div class="flex justify-center">
      <button
        @click="showList = !showList"
        class="border-none text-black rounded-md p-1 bg-white hover:bg-red-600 hover:scale-105 hover:text-black"
      >
        {{ showList ? 'Show Grid' : 'Show List' }}
      </button>
    </div>

    <div v-if="showList">
      <MovieList :movies="filteredMovies" />
    </div>

    <div v-else v-if="filteredMovies.length > 0" class="grid grid-cols-4 gap-4 p-4 mx-15 mt-5 rounded-lg bg-black">
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
