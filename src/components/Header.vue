<template>
  <header class="px-8 md:px-10 lg:px-[55px] pt-2">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4 lg:gap-8 z-20">
        <NavigationTab>
          <template #trigger>
            <img src="/img/menu.svg" alt="menu" class="w-6 h-6 md:w-10 md:h-10 lg:w-[60px] lg:h-[60px]">
          </template>
        </NavigationTab>
        <button>
          <img src="/img/logo-bg__orange.png" alt="logo" class="h-9 w-11 md:w-[60px] md:h-[60px] lg:w-[100px] lg:h-[100px]">
        </button>
      </div>
      <div class="text-sm md:text-4xl lg:text-4xl leading-none">
        <ul class="flex gap-5">
          <li>
            <a href="/#about-project">
              О проекте
            </a>
          </li>
          <li>
            <a href="/#project-team">
              О команде
            </a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">

import NavigationTab from "@/components/NavigationTab.vue";
</script>

<style scoped>

</style>
