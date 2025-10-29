<script setup>
import { defineProps } from "vue";

const props = defineProps({
  movies: {
    type: Array,
    default: () => [],
  },
});
</script>
<template>
  <div class="p-4 mx-15">
    <div v-if="movies && movies.length" class="space-y-4">
      <div
        v-for="movie in movies"
        :key="movie.id"
        class="flex items-center bg-white text-black rounded-lg overflow-hidden shadow-sm p-3 hover:bg-red-600 hover:text-white transition"
      >
        <img :src="movie.poster" class="w-20 h-28 object-cover rounded mr-4" />
        <div class="flex-1">
          <RouterLink :to="{ name: 'MovieDetail', params: { id: movie.id } }" class="text-lg font-bold">
            {{ movie.title }} ({{ movie.year }})
          <div class="text-sm mt-1">
            <div>Genre: {{ movie.genre }}</div>
            <div>Rating: {{ movie.rating }}</div>
            <div>Director: {{ movie.director }}</div>
          </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
