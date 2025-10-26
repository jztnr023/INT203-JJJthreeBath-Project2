import { ref } from "vue";
import { defineStore } from "pinia";

const API_URL = "http://localhost:3000/reviews";

async function handleResponse(res) {
  if (res.ok) {
    if (res.status === 204) return null;
    const contentType = res.headers.get("content-type") || "";
    return contentType.includes("application/json") ? res.json() : res.text();
  } else {
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
    const err = new Error(res.statusText || "HTTP error");
    err.status = res.status;
    err.data = data;
    throw err;
  }
}

export const useReviewStore = defineStore("review", () => {
  const reviews = ref([]);

  // Get reviews by movie ID (tm2)
  function getReviewsByMovieId(movieId) {
    return reviews.value.filter((review) => review.movieId === movieId);
  }

  // GET all reviews (tm2)
  async function fetchAllReviews() {
    try {
      const res = await fetch(API_URL);
      const data = await handleResponse(res);
      reviews.value = data;
      return data;
    } catch (err) {
      console.error("Error fetching reviews:", err);
      throw err;
    }
  }

  // GET reviews by movie ID (tm2)
  async function fetchReviewsByMovieId(movieId) {
    try {
      const url = `${API_URL}?movieId=${encodeURIComponent(movieId)}`;
      const res = await fetch(url);
      const data = await handleResponse(res);
      reviews.value = data;
      return data;
    } catch (err) {
      console.error("Error fetching reviews:", err);
      throw err;
    }
  }

  // ADD new review (tm2)
  async function addReview(reviewData) {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });
      const created = await handleResponse(res);
      reviews.value.push(created);
      return created;
    } catch (err) {
      console.error("Error adding review:", err);
      throw err;
    }
  }

  // UPDATE review (tm3)
  async function updateReview(id, updatedReview) {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedReview),
      });
      const updated = await handleResponse(res);
      const index = reviews.value.findIndex((r) => r.id === id);
      if (index !== -1) reviews.value[index] = updated;
      return updated;
    } catch (err) {
      console.error("Error updating review:", err);
      throw err;
    }
  }

  // DELETE review (tm3)
  async function deleteReview(id) {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      await handleResponse(res);
      reviews.value = reviews.value.filter((r) => r.id !== id);
      return true;
    } catch (err) {
      console.error("Error deleting review:", err);
      throw err;
    }
  }

  return {
    reviews,
    getReviewsByMovieId,
    fetchAllReviews,
    fetchReviewsByMovieId,
    addReview,
    updateReview,
    deleteReview,
  };
});
