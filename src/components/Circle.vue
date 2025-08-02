<script setup lang="ts">
defineProps({
  label: String
});
</script>

<template>
  <div class="inline-flex flex-col items-center gap-4">
    <div class="circle bg-orange-500 w-4 h-4 md:w-10 md:h-10 lg:w-[75px] lg:h-[75px] rounded-full"></div>
    <div class="text-xs md:text-xl lg:text-4xl  text-center leading-[100%] break-all">
      {{label}}
    </div>
  </div>
</template>

<style scoped>
.circle {
  box-shadow: inset -7px -8px 12.8px 6px rgba(0, 0, 0, 0.25);
}
</style>
