<script setup lang="ts">
defineProps({
  label: String
});
</script>

<template>
  <div class="inline-flex flex-col items-center gap-[15px] ">
    <div class="circle bg-orange-500 w-[75px] h-[75px] rounded-full"></div>
    <div class="lg:text-4xl text-2xl text-center leading-[100%] ">
      {{label}}
    </div>
  </div>
</template>

<style scoped>
.circle {
  box-shadow: inset -7px -8px 12.8px 6px rgba(0, 0, 0, 0.25);
}
</style>