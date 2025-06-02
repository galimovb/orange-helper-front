<template>
  <a
      href="#"
      class="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
  >
    {{ text }}
  </a>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true
  }
});
</script>
