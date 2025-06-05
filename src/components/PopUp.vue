<template>
  <div
    class="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50"
    v-if="isVisible"
    @click.self="closePopup"
  >
    <div class="bg-white p-8 rounded-lg max-w-screen-xl w-full lg:h-[70vh] h-full overflow-y-auto flex flex-col">
      <h2 class="lg:text-3xl text-[55px] font-semibold mb-4">
        {{ card?.title }}
      </h2>
      <p class="lg:text-lg text-4xl leading-[100%]">
        {{ card?.description }}
      </p>
      <div class="mt-auto pt-6 flex justify-end">
        <Button
          @click="closePopup"
          label="Закрыть"
          color="orange"
          class="text-2xl px-6 py-4 lg:text-base lg:px-4 lg:py-2"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import Button from "@/components/Button.vue";

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true
  },
  card: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(["close"]);

const closePopup = () => {
  emit("close");
};
</script>

<style scoped>

.bg-gray-700 {
  background-color: rgba(0, 0, 0, 0.5);
}

</style>
