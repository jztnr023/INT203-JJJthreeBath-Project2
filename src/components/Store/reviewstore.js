import { reactive } from 'vue'

// Store for managing reviews
export const useReviewStore = () => {
  const state = reactive({
    reviews: [
      {
        id: 1,
        movieId: 1,
        reviewer: "Alice",
        comment: "Mind-blowing concept and execution!",
        score: 9.5
      },
      {
        id: 2,
        movieId: 2,
        reviewer: "Bob",
        comment: "The Joker was phenomenal. A masterpiece.",
        score: 10
      }
    ]
  })

  // GET all reviews
  const getReviews = () => {
    return state.reviews
  }

  // GET reviews by movie ID
  const getReviewsByMovieId = (movieId) => {
    return state.reviews.filter(review => review.movieId === movieId)
  }

  // ADD new review
  const addReview = (reviewData) => {
    const newReview = {
      id: Date.now(), // Simple ID generation
      movieId: reviewData.movieId,
      reviewer: reviewData.reviewer,
      comment: reviewData.comment,
      score: reviewData.score
    }
    state.reviews.push(newReview)
    return newReview
  }

  return {
    state,
    getReviews,
    getReviewsByMovieId,
    addReview
  }
}
