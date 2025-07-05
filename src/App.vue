<script setup>
import {onMounted} from "vue";
import axios from "axios";

onMounted(async () => {
  await axios.get('https://orangehelper.ru/api/employees')
})
</script>
<template>
  <div class="app-container">

    <router-view />
  </div>
</template>
