<template>
  <div
    class="info-card bg-orange-500 rounded-[10px] shadow-[8px_14px_16px_1px_rgba(0,0,0,0.25)] flex flex-col justify-between"
  >
    <div class="text-white flex flex-col items-center gap-2 w-full">
      <div
        v-if="title"
        class="leading-[100%] min-h-[100px] lg:min-h-[160px] "
      >
        <h2 :class="titleSize" class="text-base md:text-lg lg:text-2xl">
          {{ title }}
        </h2>
      </div>
      <div
        v-if="text"
        class="text-base md:text-lg lg:text-xl leading-[100%] truncate"
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
          class="bg-white rounded-[5px] h-[150px]"
        />
      </div>
    </div>

    <button
        v-if="showButton"
        class="bg-white text-orange-500 rounded-[10px] px-4 py-2.5 text-base md:text-xl lg:text-2xl"
    >
      Подробнее
    </button>
  </div>
</template>

<script setup>
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
