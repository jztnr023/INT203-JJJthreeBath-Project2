import { defineStore } from "pinia";
import axios from "axios";

const API_URL = "http://localhost:3000/reviews";

export const useReviewStore = defineStore("review", {
  state: () => ({
    reviews: [],
    loading: false,
    error: null,
  }),

  getters: {
    // Get reviews by movie ID
    getReviewsByMovieId: (state) => (movieId) => {
      return state.reviews.filter((review) => review.movieId === movieId);
    },
  },

  actions: {
    //  GET all reviews (tm2)
    async fetchAllReviews() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(API_URL);
        this.reviews = response.data;
      } catch (error) {
        this.error = "Failed to fetch reviews";
        console.error("Error fetching reviews:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // GET reviews by movie ID (tm2)
    async fetchReviewsByMovieId(movieId) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`${API_URL}?movieId=${movieId}`);
        this.reviews = response.data;
      } catch (error) {
        this.error = "Failed to fetch reviews";
        console.error("Error fetching reviews:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // ADD new review (tm2)
    async addReview(reviewData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post(API_URL, reviewData);
        this.reviews.push(response.data);
        return response.data;
      } catch (error) {
        this.error = "Failed to add review";
        console.error("Error adding review:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // UPDATE review (tm3)
    async updateReview(id, updatedReview) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.put(`${API_URL}/${id}`, updatedReview);

        // Update in local state
        const index = this.reviews.findIndex((review) => review.id === id);
        if (index !== -1) {
          this.reviews[index] = response.data;
        }

        return response.data;
      } catch (error) {
        this.error = "Failed to update review";
        console.error("Error updating review:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // DELETE review (tm3)
    async deleteReview(id) {
      this.loading = true;
      this.error = null;
      try {
        await axios.delete(`${API_URL}/${id}`);

        // Remove from local state
        this.reviews = this.reviews.filter((review) => review.id !== id);

        return true;
      } catch (error) {
        this.error = "Failed to delete review";
        console.error("Error deleting review:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
