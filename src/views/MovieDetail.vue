<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import StarRating from "../components/StarRating.vue";
// import { useMovieStore } from '../stores/movieStore' // wait tm1
// import { useReviewStore } from '../stores/reviewStore' // wait tm2

const route = useRoute();
const movieId = computed(() => parseInt(route.params.id));

// State
const loading = ref(false);
const error = ref(null);
const movie = ref(null);
const reviews = ref([]);
const showAddReviewForm = ref(false);

// Mock Data (ชั่วคราว)
const mockMovies = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi",
    director: "Christopher Nolan",
    poster:
      "https://image.tmdb.org/t/p/original/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
    summary:
      "A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea.",
    rating: 9.0,
  },
  {
    id: 2,
    title: "The Dark Knight",
    year: 2008,
    genre: "Action",
    director: "Christopher Nolan",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    summary:
      "Batman faces the Joker, a criminal mastermind who brings chaos to Gotham City.",
    rating: 9.5,
  },
];

const mockReviews = [
  {
    id: 1,
    movieId: 1,
    reviewer: "Alice",
    comment: "Mind-blowing concept and execution!",
    score: 9.5,
  },
  {
    id: 2,
    movieId: 2,
    reviewer: "Bob",
    comment: "The Joker was phenomenal. A masterpiece.",
    score: 10,
  },
  {
    id: 3,
    movieId: 2,
    reviewer: "Charlie",
    comment: "A thrilling experience from start to finish.",
    score: 7.5,
  },
];

// Fetch Movie (use mock data ชั่วคราว)
const fetchMovie = async () => {
  loading.value = true;
  error.value = null;

  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // TODO: change to movieStore.fetchMovie(movieId) when tm1 done
    const foundMovie = mockMovies.find((m) => m.id === movieId.value);

    if (!foundMovie) {
      movie.value = null;
    } else {
      movie.value = foundMovie;

      // Fetch reviews for this movie
      // TODO: change to reviewStore.fetchReviews(movieId) when tm2 done
      reviews.value = mockReviews.filter((r) => r.movieId === movieId.value);
    }
  } catch (err) {
    error.value = "Unable to load movie data. Please try again later.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// Handle Image Error
const handleImageError = (event) => {
  event.target.src = "https://via.placeholder.com/500x750?text=No+Image";
};

// Edit Review (Placeholder)
const handleEdit = (review) => {
  alert(
    `✏️ Edit Review: ${review.comment}\n\n(Waiting for reviewStore.updateReview() from teammate...)`
  );
};

// Delete Review (Placeholder)
const handleDelete = (review) => {
  if (
    confirm(`🗑️ Are you sure you want to delete ${review.reviewer}'s review?`)
  ) {
    alert("(Waiting for reviewStore.deleteReview() from teammate...)");
  }
};

// Lifecycle
onMounted(() => {
  fetchMovie();
});
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Loading State -->
    <div
      v-if="loading"
      class="flex flex-col items-center justify-center min-h-[60vh] gap-5"
    >
      <div
        class="w-16 h-16 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin"
      ></div>
      <p class="text-lg font-medium text-black">Loading...</p>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="flex flex-col items-center justify-center min-h-[60vh] text-center px-5 py-10"
    >
      <div class="text-8xl mb-5">⚠</div>
      <h2 class="text-3xl font-bold text-black mb-3">Something went wrong</h2>
      <p class="text-base text-gray-500 mb-6 max-w-lg">{{ error }}</p>
      <button
        @click="fetchMovie"
        class="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all hover:-translate-y-0.5"
      >
        Try Again
      </button>
    </div>

    <!-- Movie Not Found -->
    <div
      v-else-if="!movie"
      class="flex flex-col items-center justify-center min-h-[60vh] text-center px-5 py-10"
    >
      <div class="text-8xl mb-5">🎬</div>
      <h2 class="text-3xl font-bold text-black mb-3">Movie Not Found</h2>
      <p class="text-base text-gray-500 mb-6">
        Sorry, we couldn't find the movie you're looking for.
      </p>
      <router-link
        to="/"
        class="inline-block px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all hover:-translate-y-0.5 no-underline"
      >
        Back to Home
      </router-link>
    </div>

    <!-- Movie Content -->
    <div v-else class="max-w-7xl mx-auto px-6 py-8">
      <!-- Back Navigation -->
      <router-link
        to="/"
        class="inline-flex items-center gap-2 text-black font-semibold mb-8 py-2 hover:text-red-600 transition-colors group no-underline"
      >
        <span class="text-xl group-hover:-translate-x-1 transition-transform"
          >←</span
        >
        <span>Back</span>
      </router-link>

      <!-- Movie Section -->
      <div class="grid md:grid-cols-[320px_1fr] gap-12 mb-16">
        <!-- Poster -->
        <div>
          <img
            :src="movie.poster"
            :alt="movie.title"
            @error="handleImageError"
            class="w-full h-auto rounded-lg shadow-2xl"
          />
        </div>

        <!-- Movie Details -->
        <div class="flex flex-col gap-6">
          <h1 class="text-5xl md:text-6xl font-bold text-black leading-tight">
            {{ movie.title }}
          </h1>

          <div class="flex gap-3 flex-wrap">
            <span
              class="px-5 py-2 bg-black text-white rounded-full text-sm font-medium"
              >{{ movie.year }}</span
            >
            <span
              class="px-5 py-2 bg-black text-white rounded-full text-sm font-medium"
              >{{ movie.genre }}</span
            >
            <span
              class="px-5 py-2 bg-black text-white rounded-full text-sm font-medium"
              >{{ movie.director }}</span
            >
          </div>

          <div class="py-4">
            <StarRating :rating="movie.rating" :show-score="true" />
          </div>

          <div>
            <h3 class="text-xl font-bold text-black mb-3">Synopsis</h3>
            <p class="text-base leading-relaxed text-gray-600">
              {{ movie.summary }}
            </p>
          </div>
        </div>
      </div>

      <!-- Reviews Section -->
      <div class="border-t-2 border-gray-200 pt-12">
        <div class="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h2 class="text-3xl font-bold text-black">Reviews</h2>
          <button
            @click="showAddReviewForm = !showAddReviewForm"
            class="px-7 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all hover:-translate-y-0.5"
          >
            <span v-if="showAddReviewForm">✕ Cancel</span>
            <span v-else>+ Add Review</span>
          </button>
        </div>

        <!-- Add Review Form Placeholder -->
        <div v-if="showAddReviewForm" class="mb-8">
          <div
            class="p-12 bg-gray-50 border-2 border-dashed border-red-600 rounded-xl text-center"
          >
            <div class="text-5xl mb-3">📝</div>
            <p class="text-xl font-semibold text-black mb-2">Add Review Form</p>
            <small class="text-sm text-gray-500"
              >Waiting for ReviewForm.vue component...</small
            >
          </div>
        </div>

        <!-- Reviews List -->
        <div
          v-if="reviews.length === 0"
          class="text-center py-20 bg-gray-50 rounded-xl text-gray-500"
        >
          <p>No reviews yet. Be the first to review this movie!</p>
        </div>

        <div v-else class="flex flex-col gap-5">
          <div
            v-for="review in reviews"
            :key="review.id"
            class="bg-white border border-gray-200 rounded-xl p-6 hover:border-red-600 hover:shadow-lg transition-all"
          >
            <div class="flex justify-between items-start gap-4 mb-4 flex-wrap">
              <div class="flex items-center gap-4 flex-1">
                <div
                  class="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold flex-shrink-0"
                >
                  {{ review.reviewer.charAt(0) }}
                </div>
                <div class="flex flex-col gap-1.5">
                  <span class="font-bold text-black">{{
                    review.reviewer
                  }}</span>
                  <StarRating :rating="review.score" :show-score="false" />
                </div>
              </div>
              <div class="flex gap-2">
                <button
                  @click="handleEdit(review)"
                  class="w-10 h-10 px-2.5 bg-gray-100 hover:bg-black hover:text-white rounded-lg transition-colors flex items-center justify-center group"
                  title="Edit"
                >
                  <span class="group-hover:text-white">EDIT</span>
                </button>
                <button
                  @click="handleDelete(review)"
                  class="w-10 h-10 px-7 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-lg transition-colors flex items-center justify-center group"
                  title="Delete"
                >
                  <span class="group-hover:grayscale group-hover:brightness-200"
                    >DELETE</span
                  >
                </button>
              </div>
            </div>
            <p class="text-gray-600 leading-relaxed">{{ review.comment }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap");

* {
  font-family: "Oswald", sans-serif;
}
</style>
