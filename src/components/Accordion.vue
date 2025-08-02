<script setup>
import { ref } from 'vue'

defineProps({
  title: String,
  content: String
})

const isOpen = ref(false)

const toggleAccordion = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="accordion flex flex-col gap-4">
    <div class="flex items-center justify-between gap-2 cursor-pointer" @click="toggleAccordion">
      <h1 class="text-base md:text-2xl lg:text-4xl leading-[100%]">
        {{title}}
      </h1>
      <img
        src="/img/accordion-icon.svg"
        alt="accordion-icon"
        :class="{ 'transform rotate-180': isOpen }"
        class="transition-transform duration-200 w-6 h-2.5 md:w-9 md:h-4 lg:w-13 lg:h-6"
      >
    </div>
    <p class="text-base md:text-2xl lg:text-4xl leading-[100%]" v-if="isOpen">
      {{content}}
    </p>
  </div>
</template>
