<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  placeholder: String,
  type: {
    type: String,
    default: 'text',
  },
  modelValue: String
});

const emit = defineEmits(['update:modelValue']);

const localValue = ref(props.modelValue || '');

// Следим за изменением modelValue извне
watch(() => props.modelValue, (newValue) => {
  if (newValue !== localValue.value) {
    localValue.value = newValue || '';
  }
});

// Отправляем изменения наружу
watch(localValue, (newValue) => {
  emit('update:modelValue', newValue);
});

// Форматирование номера телефона
const formatPhoneNumber = (event) => {
  let value = event.target.value.replace(/\D/g, '');

  // Если поле пустое
  if (value === '') {
    localValue.value = '';
    return;
  }

  // Если начинается не с 7 или 8, добавляем 7
  if (!value.startsWith('7') && !value.startsWith('8')) {
    value = '7' + value;
  }

  // Заменяем первую 8 на 7
  if (value.startsWith('8')) {
    value = '7' + value.slice(1);
  }

  // Ограничиваем длину (11 цифр включая 7 в начале)
  if (value.length > 11) {
    value = value.slice(0, 11);
  }

  // Форматируем с маской
  let formattedValue = '+7';
  if (value.length > 1) {
    const rest = value.slice(1);
    if (rest.length > 0) formattedValue += ' (' + rest.slice(0, 3);
    if (rest.length > 3) formattedValue += ') ' + rest.slice(3, 6);
    if (rest.length > 6) formattedValue += '-' + rest.slice(6, 8);
    if (rest.length > 8) formattedValue += '-' + rest.slice(8, 10);
  }

  localValue.value = formattedValue;
};

// Обработка клавиш для телефона
const handlePhoneKeydown = (event) => {
  // Разрешаем управляющие клавиши
  if ([8, 9, 13, 37, 39, 46].includes(event.keyCode)) {
    return;
  }

  // Запрещаем ввод не цифр
  if (event.keyCode < 48 || event.keyCode > 57) {
    if (event.keyCode < 96 || event.keyCode > 105) {
      event.preventDefault();
    }
  }
};
</script>

<template>
  <input
      v-if="type === 'tel'"
      :value="localValue"
      @input="formatPhoneNumber"
      @keydown="handlePhoneKeydown"
      :placeholder="placeholder"
      class="input w-full text-base md:text-xl lg:text-2xl"
      v-bind="$attrs"
  />

  <input
      v-else
      :value="localValue"
      @input="localValue = $event.target.value"
      :type="type"
      :placeholder="placeholder"
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
