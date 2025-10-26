<script setup>
import { computed } from "vue";

const props = defineProps({
  rating: {
    type: Number,
    default: 0,
    validator: (value) => value >= 0 && value <= 10,
  },
  maxStars: {
    type: Number,
    default: 5,
  },
  editable: {
    type: Boolean,
    default: false,
  },
  showScore: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:rating"]);

// แปลง rating (0-10) เป็น stars (0-5)
const normalizedRating = computed(() => {
  return (props.rating / 10) * props.maxStars;
});

const getStarClass = (starPosition) => {
  const rating = normalizedRating.value;
  if (starPosition <= rating) {
    return "star-full";
  } else if (starPosition - 0.5 <= rating) {
    return "star-half";
  } else {
    return "star-empty";
  }
};

const getStarIcon = (starPosition) => {
  const rating = normalizedRating.value;
  if (starPosition <= rating) {
    return "★"; // Full star
  } else if (starPosition - 0.5 <= rating) {
    return "⯨"; // Half star
  } else {
    return "☆"; // Empty star
  }
};

const handleClick = (starPosition) => {
  if (props.editable) {
    // แปลงกลับเป็น rating 0-10
    const newRating = (starPosition / props.maxStars) * 10;
    emit("update:rating", newRating);
  }
};
</script>

<template>
  <div class="inline-flex items-center gap-0.5">
    <span
      v-for="star in maxStars"
      :key="star"
      class="text-2xl transition-all duration-200 select-none"
      :class="[
        getStarClass(star),
        editable ? 'cursor-pointer hover:scale-110' : '',
      ]"
      @click="handleClick(star)"
    >
      {{ getStarIcon(star) }}
    </span>
    <span
      v-if="showScore"
      class="ml-2 text-base font-semibold text-gray-800 dark:text-white"
    >
      {{ rating.toFixed(1) }}
    </span>
  </div>
</template>
<style scoped></style>
