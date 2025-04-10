<template>
  <p class="mt-4 text-gray-600">{{ msg }}</p>
</template>

<script setup lang="ts">
defineProps<{
  msg: string;
}>();
</script>
