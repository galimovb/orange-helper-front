<script setup>
</script>
<template>
  <div class="p-6">
    <nav class="flex gap-4 bg-orange-foreground-200 font-bold underline mb-6">
      <router-link to="/contact" class="font-thin">Помощь</router-link>
      <router-link to="/contact" class="font-light">Контакты</router-link>
      <router-link to="/" class="font-normal">Главная</router-link>
      <router-link to="/news" class="font-semibold">Новости</router-link>
      <router-link to="/about" class="font-bold">О проекте</router-link>
      <router-link to="/contact" class="font-extrabold">Вопросы</router-link>
    </nav>
    <router-view />
  </div>
</template>
