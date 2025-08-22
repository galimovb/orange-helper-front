<script setup lang="ts">
defineProps({
  src: String,
  name: String,
  position: String,
  description: String
});
</script>

<template>
  <div class="flex flex-col items-center text-center leading-[100%] max-w-[400px]  p-2">
    <div class="avatar w-[206px] h-[206px] mb-4">
      <img
          :src="src"
          alt="profile image"
          class="rounded-full object-cover object-center w-full h-full"
      />
    </div>
    <h1 class="text-xl md:text-2xl lg:text-4xl leading-[100%] mb-2">
      {{ name }}
    </h1>
    <h2 class="text-base md:text-xl lg:text-2xl  leading-[100%] mb-2">
      {{ position }}
    </h2>
    <p class="text-base lg:text-xl leading-[100%] mb-2">
      {{ description }}
    </p>
  </div>
</template>

<style scoped>

</style>
