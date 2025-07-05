<script setup lang="ts">
const props = defineProps({
  minWidth:{
    type: Number,
    required: true,
    default: 100,
  },
  maxWidth:{
    type: Number,
    required: true,
    default: 300,
  }
})
</script>

<template>
  <div class="bg-orange-500 h-screen flex justify-center items-center">
    <div
        class="bg-white rounded-[10px] w-full"
        :style="{
        minWidth: `${props.minWidth}px`,
        maxWidth: `${props.maxWidth}px`
      }"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>

</style>
