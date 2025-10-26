<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import StarRating from "../components/StarRating.vue";
import ReviewForm from "../components/ReviewForm.vue"; 
import ReviewList from "../components/ReviewList.vue"; 
// import { useMovieStore } from '../stores/movieStore' // wait tm1
import { useReviewStore } from '../stores/reviewstore.js';

const route = useRoute();
const reviewStore = useReviewStore(); // เพิ่มบรรทัดนี้
const movieId = computed(() => parseInt(route.params.id));

// State
const loading = ref(false);
const error = ref(null);
const movie = ref(null);
const reviews = ref([]);
const showAddReviewForm = ref(false);
const editingReview = ref(null); // เพิ่ม
const isEditMode = ref(false); // เพิ่ม

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

// Fetch Movie
const fetchMovie = async () => {
  loading.value = true;
  error.value = null;

  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const foundMovie = mockMovies.find((m) => m.id === movieId.value);

    if (!foundMovie) {
      movie.value = null;
    } else {
      movie.value = foundMovie;
      
      // Fetch reviews from reviewStore
      await reviewStore.fetchReviewsByMovieId(movieId.value);
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

// Add Review
const handleAddReview = async (reviewData) => {
  try {
    await reviewStore.addReview(reviewData);
    showAddReviewForm.value = false;
  } catch (error) {
    alert("Failed to add review");
  }
};

// Edit Review
const handleEditReview = (review) => {
  editingReview.value = review;
  isEditMode.value = true;
  showAddReviewForm.value = true;
};

// Update Review
const handleUpdateReview = async (reviewData) => {
  try {
    await reviewStore.updateReview(editingReview.value.id, reviewData);
    showAddReviewForm.value = false;
    isEditMode.value = false;
    editingReview.value = null;
  } catch (error) {
    alert("Failed to update review");
  }
};

//  Delete Review
const handleDeleteReview = async (reviewId) => {
  if (confirm("Are you sure you want to delete this review?")) {
    try {
      await reviewStore.deleteReview(reviewId);
    } catch (error) {
      alert("Failed to delete review");
    }
  }
};

// Form Submit Handler
const handleFormSubmit = (reviewData) => {
  if (isEditMode.value) {
    handleUpdateReview(reviewData);
  } else {
    handleAddReview(reviewData);
  }
};

// Cancel Form
const handleCancelForm = () => {
  showAddReviewForm.value = false;
  isEditMode.value = false;
  editingReview.value = null;
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
            v-if="!showAddReviewForm"
            @click="showAddReviewForm = true"
            class="px-7 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all hover:-translate-y-0.5"
          >
            + Add Review
          </button>
        </div>

        <!-- Review Form (component) -->
        <ReviewForm
          v-if="showAddReviewForm"
          :mode="isEditMode ? 'edit' : 'add'"
          :review-data="editingReview"
          :movie-id="movieId"
          @submit="handleFormSubmit"
          @cancel="handleCancelForm"
        />

        <!-- Review List (component) -->
        <ReviewList
          :reviews="reviewStore.reviews"
          :loading="reviewStore.loading"
          @edit="handleEditReview"
          @delete="handleDeleteReview"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap');

* {
  font-family: "Oswald", sans-serif;
}
</style>
