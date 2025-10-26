<script setup>
import { onMounted, ref } from "vue";
import { getAllMovies } from "../libs/MovieApi.js";

const movies = ref([]);

onMounted(async () => {
    movies.value = await getAllMovies();
});
</script>
 
<template>
<div class="min-h-screen bg-black">
    <div>
        <img src="../assets/imgs/F1_movie.jpg" class="w-full h-150">
    </div>

    <div class="grid grid-cols-4 gap-4 p-4 mx-15 mt-10 rounded-lg bg-black/50">
        <div v-for="movie in movies" :key="movie.id" class="bg-white text-black border rounded-lg overflow-hidden shadow-lg hover:bg-red-500/80 transition duration-400">
            <img :src="movie.poster" class="max-w-full h-130 object-cover">
            <div class="p-4 text-center ">
                <h2 class="text-lg font-bold mb-2">{{ movie.title }}</h2>
                <p>Genre: {{ movie.genre }}</p>
                <p>Rating: {{ movie.rating }}</p>
                <p>Director: {{ movie.director }}</p>
            </div>
        </div>

    </div>
</div>
</template>
 
<style scoped>

</style>