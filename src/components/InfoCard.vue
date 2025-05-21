<template>
  <div class="info-card bg-orange-500 text-white lg:text-2xl text-4xl text-center rounded-[10px] shadow-[8px_14px_16px_1px_rgba(0,0,0,0.25)]  flex flex-col items-center justify-center gap-6 w-full">
    <h2 :class="titleSize">
      {{ title }}
    </h2>
    <p
      v-if="text"
      class="break-words"
    >
      {{ text }}
    </p>
    <img
      v-if="image"
      :src="image"
      alt="image"
      class="bg-white max-w-[241px] max-h-[202px] rounded-[5px] "
    />
  </div>
</template>

<script setup>
defineProps({
  title: String,
  text: String,
  image: String,
  titleSize: String
})
</script>

<style scoped>

</style>
