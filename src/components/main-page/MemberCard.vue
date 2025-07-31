<script setup lang="ts">
defineProps({
  src: String,
  name: String,
  position: String,
  description: String
});
</script>

<template>
  <div class="lg:max-w-[364px]">
    <div class="flex flex-col gap-8 items-center">
      <div class="avatar w-[206px] h-[206px] lg:w-[288px] lg:h-[288px]">
        <img
          :src="src"
          alt="profile image"
          class="rounded-full object-cover object-center w-full h-full"
        />
      </div>
      <div class="flex flex-col gap-5 lg:text-center text-left text-4xl leading-[100%]">
        <h1 class="text-xl md:text-4xl lg:text-[55px] leading-[100%]">
          {{ name }}
        </h1>
        <h2 class="text-base md:text-2xl lg:text-4xl ">
          {{ position }}
        </h2>
        <p class="text-base md:text-2xl lg:text-4xl ">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
