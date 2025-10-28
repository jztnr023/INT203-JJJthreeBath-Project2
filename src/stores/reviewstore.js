import { defineStore } from "pinia";
import { ref } from "vue";
import * as reviewApi from "../libs/ReviewApi.js";

export const useReviewStore = defineStore("review", () => {
  const reviews = ref([]);
  const editingReview = ref(null);

  async function fetchReviewsByMovieId(movieId) {
    reviews.value = await reviewApi.getReviewsByMovieId(movieId);
  }

  async function addReview(reviewData) {
    await reviewApi.addReview(reviewData);
    await fetchReviewsByMovieId(reviewData.movieId);
  }

  async function updateReview(id, updatedReview) {
    await reviewApi.updateReview(id, updatedReview);
    await fetchReviewsByMovieId(updatedReview.movieId);
    clearEditingReview();
  }

  async function deleteReview(id, movieId) {
    await reviewApi.deleteReview(id);
    await fetchReviewsByMovieId(movieId);
  }

  function setEditingReview(review) {
    editingReview.value = review ? { ...review } : null;
  }

  function clearEditingReview() {
    editingReview.value = null;
  }

  return {
    reviews,
    editingReview,
    fetchReviewsByMovieId,
    addReview,
    updateReview,
    deleteReview,
    setEditingReview,
    clearEditingReview,
  };
});
