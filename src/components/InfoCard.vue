<template>
  <div
    class="info-card bg-orange-500 rounded-[10px] shadow-[8px_14px_16px_1px_rgba(0,0,0,0.25)] flex flex-col justify-between"
    @click="openPopup"
  >
      <div class="text-white lg:text-2xl text-4xl flex flex-col items-center justify-center gap-6 w-full">
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
      <Button
        v-if="showButton"
        label="Подробнее"
        color="white"
        size="medium"
      />
  </div>
</template>

<script setup>
import Button from "@/components/Button.vue";

defineProps({
  title: String,
  text: String,
  image: String,
  titleSize: String,
  showButton: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped>

</style>
