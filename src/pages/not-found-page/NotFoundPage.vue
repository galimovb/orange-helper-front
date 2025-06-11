<script setup lang="ts">

import Button from "@/components/Button.vue";
</script>

<template>
<div class="h-screen flex items-center justify-center">
  <div class="flex flex-col  items-center">
    <div class="flex flex-col gap-3 items-center">
      <img src="/img/infoCard_4.svg" class="w-[200px] h-[200px] lg:w-[250px] lg:h-[250px] "/>
      <h1 class="text-9xl text-orange-500 text-center">404</h1>
      <span class="text-3xl lg:text-5xl text-center opacity-80">Такой страницы нет, или она пока в разработке...</span>
    </div>
    <Button color="orange" class="mt-16">
      <router-link to="/">На главную</router-link>
    </Button>
  </div>
</div>
</template>

<style scoped>

</style>
