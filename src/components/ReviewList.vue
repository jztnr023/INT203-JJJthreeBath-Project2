<script setup>
import StarRating from './StarRating.vue'

const props = defineProps({
  reviews: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false }
})

const emit = defineEmits(['edit', 'delete'])

const handleEdit = (review) => {
  emit('edit', review)
}

const handleDelete = (reviewId) => {
  emit('delete', reviewId)
}
</script>

<template>
  <div class="w-full">
    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-16">
      <div class="w-12 h-12 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin mb-4"></div>
      <p class="text-gray-600 font-medium">Loading reviews...</p>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="reviews.length === 0"
      class="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300"
    >
      <div class="text-6xl mb-4">📝</div>
      <h3 class="text-2xl font-bold text-black mb-2">No Reviews Yet</h3>
      <p class="text-gray-600">Be the first to share your thoughts about this movie!</p>
    </div>

    <!-- Reviews List -->
    <div v-else class="flex flex-col gap-5">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="bg-white border-2 border-gray-200 rounded-xl p-6 transition-all hover:border-red-600 hover:shadow-xl hover:translate-x-1 relative overflow-hidden group"
      >
        <!-- Red accent line -->
        <div class="absolute left-0 top-0 w-1 h-full bg-red-600 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>

        <!-- Review Header -->
        <div class="flex justify-between items-start gap-4 mb-4">
          <!-- Reviewer Info -->
          <div class="flex items-center gap-4 flex-1">
            <!-- Avatar -->
            <div class="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center text-xl font-bold flex-shrink-0">
              {{ review.reviewer.charAt(0).toUpperCase() }}
            </div>
            
            <!-- Name & Rating -->
            <div class="flex flex-col gap-2">
              <h3 class="text-lg font-bold text-black">{{ review.reviewer }}</h3>
              <StarRating :rating="review.score" :show-score="true" />
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-2">
            <button
              @click="handleEdit(review)"
              class="w-9 h-9 bg-gray-200 text-black rounded-lg hover:bg-gray-800 hover:text-white transition-all hover:-translate-y-0.5 flex items-center justify-center px-2.5"
              title="Edit review"
            >
              EDIT
            </button>
            <button
              @click="handleDelete(review.id)"
              class="w-9 h-9 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all hover:-translate-y-0.5 flex items-center justify-center px-7"
              title="Delete review"
            >
              DELETE
            </button>
          </div>
        </div>

        <!-- Review Content -->
        <div class="pl-2">
          <p class="text-gray-600 leading-relaxed">{{ review.comment }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>