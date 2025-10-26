<template>
  <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
    <h2 class="text-xl font-bold mb-4">
      {{ mode === 'add' ? 'เพิ่มรีวิว' : 'แก้ไขรีวิว' }}
    </h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-3">
      <div>
        <label class="block text-sm font-medium mb-1">Movie ID</label>
        <input
          type="number"
          v-model="formData.movieId"
          required
          class="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">ชื่อผู้รีวิว</label>
        <input
          type="text"
          v-model="formData.reviewer"
          required
          class="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">คะแนน (1-10)</label>
        <input
          type="number"
          v-model="formData.score"
          min="1"
          max="10"
          step="0.1"
          required
          class="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">ความคิดเห็น</label>
        <textarea
          v-model="formData.comment"
          required
          rows="3"
          class="w-full px-3 py-2 border rounded-md"
        ></textarea>
      </div>

      <div class="flex gap-2">
        <button
          type="submit"
          class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          {{ mode === 'add' ? 'เพิ่มรีวิว' : 'อัปเดตรีวิว' }}
        </button>
        
        <button
          type="button"
          @click="handleCancel"
          class="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
        >
          ยกเลิก
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  mode: { type: String, required: true },
  reviewData: { type: Object, default: null }
})

const emit = defineEmits(['submit', 'cancel'])

const formData = ref({
  movieId: '',
  reviewer: '',
  comment: '',
  score: ''
})

// เติมข้อมูลเมื่อเป็นโหมด edit
watch(() => props.reviewData, (newData) => {
  if (newData && props.mode === 'edit') {
    formData.value = { ...newData }
  }
}, { immediate: true })

const handleSubmit = () => {
  emit('submit', {
    movieId: parseInt(formData.value.movieId),
    reviewer: formData.value.reviewer,
    comment: formData.value.comment,
    score: parseFloat(formData.value.score)
  })
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
