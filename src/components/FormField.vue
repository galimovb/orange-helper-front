<template>
  <div class="space-y-1">
    <label class="block text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-orange-600">*</span>
    </label>
    <input
        :type="type"
        :placeholder="placeholder"
        :required="required"
        :min="min"
        :max="max"
        :pattern="pattern"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition"
    >
  </div>
</template>

<script setup>
defineProps({
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  modelValue: [String, Number],
  placeholder: String,
  required: Boolean,
  min: [String, Number],
  max: [String, Number],
  pattern: String
});

defineEmits(['update:modelValue']);
</script>
