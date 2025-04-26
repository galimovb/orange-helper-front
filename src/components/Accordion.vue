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
  <div class="accordion flex flex-col gap-4 mb-4">
    <div class="flex items-center justify-between cursor-pointer" @click="toggleAccordion">
      <h1 class="text-4xl leading-[100%]">
        {{title}}
      </h1>
      <img
        src="@/assets/img/accordion-icon.svg"
        alt="accordion-icon"
        :class="{ 'transform rotate-180': isOpen }"
        class="transition-transform duration-200"
      >
    </div>
    <p class="text-2xl leading-[100%]" v-if="isOpen">
      {{content}}
    </p>
  </div>
</template>
