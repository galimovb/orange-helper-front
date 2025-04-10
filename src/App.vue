<!-- src/App.vue -->
<template>
  <div class="p-6">
    <nav class="flex gap-4 text-blue-600 underline mb-6">
      <router-link to="/">Главная</router-link>
      <router-link to="/about">О проекте</router-link>
      <router-link to="/news">Новости</router-link>
      <router-link to="/contact">Контакты</router-link>
    </nav>

    <router-view />
  </div>
</template>
