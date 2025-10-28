<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import StarRating from "../components/StarRating.vue";
import ReviewForm from "../components/ReviewForm.vue";
import ReviewList from "../components/ReviewList.vue";
import { useMovieStore } from "../stores/MovieStore.js";
import { useReviewStore } from "../stores/ReviewStore.js";

const route = useRoute();
const movieStore = useMovieStore();
const reviewStore = useReviewStore();
const movieId = computed(() => parseInt(route.params.id));

const showAddReviewForm = ref(false);
const isEditMode = ref(false);

const movie = computed(() => movieStore.currentMovie);
const loading = computed(() => !movieStore.currentMovie);
const error = ref(null);

const fetchData = async () => {
  error.value = null;
  movieStore.currentMovie = null;

  try {
    await movieStore.fetchMovieById(movieId.value);
    await reviewStore.fetchReviewsByMovieId(movieId.value);
  } catch (err) {
    console.error(err);
    movieStore.currentMovie = { error: true };
    error.value = "Unable to load movie data. Please try again later."; 
  }
};

const handleImageError = (event) => {
  event.target.src = "https://via.placeholder.com/500x750?text=No+Image";
};

const handleAddReview = async (reviewData) => {
  try {
    await reviewStore.addReview(reviewData);
    showAddReviewForm.value = false;
  } catch (error) {
    alert("Failed to add review. Please try again.");
  }
};

const handleEditReview = (review) => {
  reviewStore.setEditingReview(review);
  isEditMode.value = true;
  showAddReviewForm.value = true;
};

const handleUpdateReview = async (reviewData) => {
  try {
    await reviewStore.updateReview(reviewStore.editingReview.id, reviewData);
    showAddReviewForm.value = false;
    isEditMode.value = false;
  } catch (error) {
    alert("Failed to update review. Please try again.");
  }
};

const handleDeleteReview = async (reviewId) => {
  if (confirm("Are you sure you want to delete this review?")) {
    try {
      await reviewStore.deleteReview(reviewId, movieId.value);
    } catch (error) {
      alert("Failed to delete review. Please try again.");
    }
  }
};

const handleFormSubmit = (reviewData) => {
  if (isEditMode.value) {
    handleUpdateReview(reviewData);
  } else {
    handleAddReview(reviewData);
  }
};

const handleCancelForm = () => {
  showAddReviewForm.value = false;
  isEditMode.value = false;
  reviewStore.clearEditingReview();
};

onMounted(() => {
  fetchData();
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
        @click="fetchData"
        class="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all hover:-translate-y-0.5"
      >
        Try Again
      </button>
    </div>

    <!-- Movie Content -->
    <div v-else-if="movie && !movie.error" class="max-w-7xl mx-auto px-6 py-8">
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
            >
              {{ movie.year }}
            </span>
            <span
              class="px-5 py-2 bg-black text-white rounded-full text-sm font-medium"
            >
              {{ movie.genre }}
            </span>
            <span
              class="px-5 py-2 bg-black text-white rounded-full text-sm font-medium"
            >
              {{ movie.director }}
            </span>
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

        <!-- Review Form -->
        <ReviewForm
          v-if="showAddReviewForm"
          :mode="isEditMode ? 'edit' : 'add'"
          :review-data="reviewStore.editingReview"
          :movie-id="movieId"
          @submit="handleFormSubmit"
          @cancel="handleCancelForm"
        />

        <!-- Review List -->
        <ReviewList
          :reviews="reviewStore.reviews"
          @edit="handleEditReview"
          @delete="handleDeleteReview"
        />
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
