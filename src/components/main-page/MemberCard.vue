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
      <div class="avatar w-[288px] h-[288px]">
        <img
          :src="src"
          alt="profile image"
          class="rounded-full object-cover object-center w-full h-full"
        />
      </div>
      <div class="flex flex-col gap-5 lg:text-center text-left text-4xl leading-[100%]">
        <h1 class="text-[55px] leading-[100%]">
          {{ name }}
        </h1>
        <h2>
          {{ position }}
        </h2>
        <p>
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>