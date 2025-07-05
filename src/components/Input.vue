<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  placeholder: String,
  type: String,
  modelValue: String
});

const emit = defineEmits(['update:modelValue']);

const localValue = ref(props.modelValue);

watch(localValue, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>

<template>
  <input
    v-bind="$attrs"
    v-model="localValue"
    :type="props.type"
    :placeholder="props.placeholder"
    class="input w-full lg:text-2xl"
  />
</template>

<style scoped>
.input {
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  padding: 10px;
}
</style>
