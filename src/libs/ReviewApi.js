const API_URL = import.meta.env.VITE_API_URL;

// Get reviews by movie ID
export async function getReviewsByMovieId(movieId) {
  const response = await fetch(`${API_URL}/reviews?movieId=${movieId}`);
  return await response.json();
}

// Get all reviews
export async function getAllReviews() {
  const response = await fetch(`${API_URL}/reviews`);
  return await response.json();
}

// Add new review
export async function addReview(reviewData) {
  const response = await fetch(`${API_URL}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewData),
  });
  return await response.json();
}

// Update review
export async function updateReview(id, updatedReview) {
  const response = await fetch(`${API_URL}/reviews/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedReview),
  });
  return await response.json();
}

// Delete review
export async function deleteReview(id) {
  const response = await fetch(`${API_URL}/reviews/${id}`, {
    method: "DELETE",
  });
  return response.ok;
}
