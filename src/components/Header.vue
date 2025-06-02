<template>
  <header class="px-[55px]">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-8 z-20">
        <NavigationTab>
          <template #trigger>
            <button>
              <img src="@/assets/img/menu.svg" alt="menu">
            </button>
          </template>
        </NavigationTab>
        <button>
          <img src="@/assets/img/logo-bg__orange.svg" alt="logo">
        </button>
      </div>
      <div class="text-4xl leading-none">
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
