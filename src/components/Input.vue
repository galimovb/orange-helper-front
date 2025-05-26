<script setup>
defineProps({
  placeholder: String,
  type: String
})
</script>

<template>
  <input
    :type="type"
    :placeholder="placeholder"
    class="input w-full lg:text-2xl text-4xl"
  >
</template>

<style scoped>
.input {
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  padding: 10px;
}
</style>