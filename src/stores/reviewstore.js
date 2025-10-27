import { defineStore } from "pinia";
import { ref } from "vue";

export const useReviewStore = defineStore("review", () => {
  // State
  const editingReview = ref(null);

  // Actions
  const setEditingReview = (review) => {
    editingReview.value = review ? { ...review } : null;
  };

  const clearEditingReview = () => {
    editingReview.value = null;
  };
  
  return {
    editingReview,
    setEditingReview,
    clearEditingReview,
  };
});
