<script setup>
import { ref, watch } from 'vue';
import { mask } from 'vue-the-mask';

const props = defineProps({
  placeholder: String,
  type: {
    type: String,
    default: 'text',
  },
  modelValue: String
});

const emit = defineEmits(['update:modelValue']);

const localValue = ref(props.modelValue);

watch(localValue, (newValue) => {
  emit('update:modelValue', newValue);
});

watch(() => props.modelValue, (newValue) => {
  localValue.value = newValue;
});
</script>

<template>
  <input
      v-if="props.type === 'phone'"
      v-mask="'+7 (###) ###-##-##'"
      v-model="localValue"
      :placeholder="props.placeholder"
      class="input w-full text-base md:text-xl lg:text-2xl"
      v-bind="$attrs"
  />

  <input
      v-else
      v-model="localValue"
      :type="props.type"
      :placeholder="props.placeholder"
      class="input w-full text-base md:text-xl lg:text-2xl"
      v-bind="$attrs"
  />
</template>

<style scoped>
.input {
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  padding: 10px;
}
</style>
