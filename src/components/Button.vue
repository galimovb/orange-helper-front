<script setup>
defineProps({
  label: String,
  color: {
    type: String,
    validator: (value) => ['orange', 'white', 'black'].includes(value),
    default: 'orange'
  },
  size: {
    type: String,
    validator: (value) => ['large, medium, small'].includes(value),
    default: 'large'
  },
  hideDefaultStyles: {
    type:Boolean,
    default: true
  }
});
</script>

<template>
  <button :class="['btn', `btn_${color}`, `btn_${size}`]">
    {{ label }}
    <slot/>
  </button>
</template>

<style scoped>
.btn {
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 400;
  cursor: pointer;
}

.btn_large {
  padding: 15px 28px;
  font-size: 36px;
}

.btn_medium {
  padding: 15px 28px;
  font-size: 32px;
}

.btn_small {
  padding: 15px 28px;
  font-size: 16px;
}

.btn_orange {
  background-color: #FF8019;
  color: white;
}

.btn_white {
  background-color: white;
  color: #FF8019;
}

.btn_black {
  background-color: black;
  color: white;
}

</style>
