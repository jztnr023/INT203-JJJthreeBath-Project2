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
  <div class="star-rating">
    <span
      v-for="star in maxStars"
      :key="star"
      class="star"
      :class="getStarClass(star)"
      @click="handleClick(star)"
    >
      {{ getStarIcon(star) }}
    </span>
    <span v-if="showScore" class="rating-score">{{ rating.toFixed(1) }}</span>
  </div>
</template>

<style scoped>
.star-rating {
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

.star {
  font-size: 24px;
  transition: all 0.2s ease;
  user-select: none;
}

.star-full {
  color: #ffd700; /* Gold */
}

.star-half {
  color: #ffd700; /* Gold */
}

.star-empty {
  color: #ddd; /* Light gray */
}

.star.editable {
  cursor: pointer;
}

.star.editable:hover {
  transform: scale(1.2);
}

.rating-score {
  margin-left: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

/* Dark mode support (optional) */
@media (prefers-color-scheme: dark) {
  .star-empty {
    color: #555;
  }

  .rating-score {
    color: #fff;
  }
}
</style>
