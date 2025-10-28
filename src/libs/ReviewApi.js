const API_URL = import.meta.env.VITE_API_URL;

// error handling
async function handleResponse(response) {
  if (!response.ok) {
    const error = new Error(`HTTP Error: ${response.status}`);
    error.status = response.status;
    error.statusText = response.statusText;
    throw error;
  }
  return await response.json();
}

// Get reviews by movie ID
export async function getReviewsByMovieId(movieId) {
  try {
    const response = await fetch(`${API_URL}/reviews?movieId=${movieId}`);
    return await handleResponse(response);
  } catch (error) {
    console.error(`Failed to fetch reviews for movie ${movieId}:`, error);
    throw error;
  }
}

// Get all reviews
export async function getAllReviews() {
  try {
    const response = await fetch(`${API_URL}/reviews`);
    return await handleResponse(response);
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    throw error;
  }
}

// Add new review
export async function addReview(reviewData) {
  try {
    const response = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Failed to add review:", error);
    throw error;
  }
}

// Update review
export async function updateReview(id, updatedReview) {
  try {
    const response = await fetch(`${API_URL}/reviews/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedReview),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Failed to update review ${id}:`, error);
    throw error;
  }
}

// Delete review
export async function deleteReview(id) {
  try {
    const response = await fetch(`${API_URL}/reviews/${id}`, {
      method: "DELETE",
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Failed to delete review ${id}:`, error);
    throw error;
  }
}
