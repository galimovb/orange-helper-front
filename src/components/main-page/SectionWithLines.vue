<template>
  <section class="section-with-lines mx-auto text-center">
    <div class="section-with-lines__title mb-[20px] flex justify-center items-center">
      <div class="line-left bg-orange-500 h-[5px] inline-block flex-grow"></div>
      <h2 class="bg-orange-500 text-white inline-block px-2.5 py-2 md:px-[30px] lg:px-[50px] lg:py-2 text-xl md:text-3xl lg:text-4xl rounded-[10px]">
        {{ title }}
      </h2>
      <div class="line-right bg-orange-500 h-[5px] inline-block flex-grow"></div>
    </div>
    <div class="section-with-lines__content max-w-[1024px] mx-auto px-[10px] py-[22px]">
      <p class="text-base md:text-3xl lg:text-4xl leading-[100%]">
        <slot></slot>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps({
  title: String
});
</script>

<style scoped>

</style>
