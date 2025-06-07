<template>
  <div
    class="info-card bg-orange-500 rounded-[10px] shadow-[8px_14px_16px_1px_rgba(0,0,0,0.25)] flex flex-col justify-between"
    @click="openPopup"
  >
    <div class="text-white flex flex-col items-center gap-6 w-full">
      <div
        v-if="title"
        class="lg:text-2xl text-4xl leading-[100%] lg:min-h-[128px] min-h-[160px]"
      >
        <h2 :class="titleSize">
          {{ title }}
        </h2>
      </div>
      <div
        v-if="text"
        class="lg:text-2xl text-4xl leading-[100%]"
      >
        <p>
          {{ text }}
        </p>
      </div>
      <div class="">
        <img
          v-if="image"
          :src="image"
          alt="image"
          class="bg-white max-w-[241px] min-h-[202px] rounded-[5px] "
        />
      </div>
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
