<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">รีวิวทั้งหมด</h2>
      <button
        @click="$emit('add-review')"
        class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
      >
        เพิ่มรีวิวใหม่
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-8">
      <p>กำลังโหลด...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="reviews.length === 0" class="text-center py-8">
      <h3 class="text-lg font-medium mb-2">ยังไม่มีรีวิว</h3>
      <p class="mb-4">เริ่มต้นด้วยการเพิ่มรีวิวแรกของคุณ</p>
      <button
        @click="$emit('add-review')"
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        เพิ่มรีวิวแรก
      </button>
    </div>

    <!-- Reviews List -->
    <div v-else class="space-y-3">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="bg-white rounded-lg shadow-md p-4 border"
      >
        <div class="mb-3">
          <div class="flex items-center gap-3 mb-2">
            <h3 class="text-lg font-semibold">{{ review.reviewer }}</h3>
            <div class="flex text-yellow-400">
              <span v-for="star in 5" :key="star">
                {{ star <= Math.round(review.score / 2) ? '★' : '☆' }}
              </span>
            </div>
            <span class="text-sm text-gray-600">{{ review.score }}/10</span>
          </div>
          <p class="text-sm text-gray-500 mb-2">Movie ID: {{ review.movieId }}</p>
          <p class="text-gray-700">{{ review.comment }}</p>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-2 pt-3 border-t">
          <button
            @click="$emit('edit-review', review)"
            class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
          >
            แก้ไข
          </button>
          <button
            @click="$emit('delete-review', review.id)"
            class="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
          >
            ลบ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  reviews: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false }
})

const emit = defineEmits(['add-review', 'edit-review', 'delete-review'])
</script>

<style scoped>
/* Simple styles */
</style>
