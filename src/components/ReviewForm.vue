<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  mode: { type: String, required: true }, // 'add' or 'edit'
  reviewData: { type: Object, default: null },
  movieId: { type: Number, default: null }
})

const emit = defineEmits(['submit', 'cancel'])

const formData = ref({
  movieId: props.movieId || '',
  reviewer: '',
  comment: '',
  score: 5
})

// Fill data when in edit mode
watch(() => props.reviewData, (newData) => {
  if (newData && props.mode === 'edit') {
    formData.value = { ...newData }
  }
}, { immediate: true })

// Reset form when switching to add mode
watch(() => props.mode, (newMode) => {
  if (newMode === 'add') {
    formData.value = {
      movieId: props.movieId || '',
      reviewer: '',
      comment: '',
      score: 5
    }
  }
})

const handleSubmit = () => {
  const submitData = {
    movieId: parseInt(formData.value.movieId),
    reviewer: formData.value.reviewer,
    comment: formData.value.comment,
    score: parseFloat(formData.value.score)
  }
  
  // Include ID for edit mode
  if (props.mode === 'edit' && props.reviewData?.id) {
    submitData.id = props.reviewData.id
  }
  
  emit('submit', submitData)
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<template>
  <div class="bg-white border-2 border-gray-200 rounded-xl p-8 mb-8 shadow-lg">
    <h2 class="text-2xl font-bold text-black mb-6 pb-4 border-b-2 border-red-600">
      {{ mode === 'add' ? '✍️ Add Review' : '✏️ Edit Review' }}
    </h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-5">
      <!-- Movie ID (hidden in edit mode) -->
      <div v-if="mode === 'add'" class="space-y-2">
        <label class="block text-sm font-bold text-black uppercase tracking-wide">
          Movie ID
        </label>
        <input
          type="number"
          v-model="formData.movieId"
          required
          :disabled="movieId !== null"
          class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-100 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>

      <!-- Reviewer Name -->
      <div class="space-y-2">
        <label class="block text-sm font-bold text-black uppercase tracking-wide">
          Your Name
        </label>
        <input
          type="text"
          v-model="formData.reviewer"
          required
          placeholder="Enter your name"
          class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-100 transition-all"
        />
      </div>

      <!-- Score -->
      <div class="space-y-2">
        <label class="block text-sm font-bold text-black uppercase tracking-wide">
          Score (0-10)
        </label>
        <div class="flex items-center gap-4">
          <input
            type="number"
            v-model.number="formData.score"
            min="0"
            max="10"
            step="0.1"
            required
            class="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-100 transition-all"
          />
          <span class="text-xl font-bold text-red-600 min-w-[70px]">
            {{ formData.score }}/10
          </span>
        </div>
      </div>

      <!-- Comment -->
      <div class="space-y-2">
        <label class="block text-sm font-bold text-black uppercase tracking-wide">
          Your Review
        </label>
        <textarea
          v-model="formData.comment"
          required
          rows="4"
          placeholder="Share your thoughts about this movie..."
          class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-100 transition-all resize-none"
        ></textarea>
      </div>

      <!-- Buttons -->
      <div class="flex gap-3 pt-2">
        <button
          type="submit"
          class="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg"
        >
          {{ mode === 'add' ? '+ Add Review' : '✓ Update Review' }}
        </button>
        
        <button
          type="button"
          @click="handleCancel"
          class="flex-1 px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all hover:-translate-y-0.5 shadow-md"
        >
          ✕ Cancel
        </button>
      </div>
    </form>
  </div>
</template>
<style scoped></style>