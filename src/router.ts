// src/router.ts
import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/pages/main-page/HomePage.vue";
import AboutView from "@/pages/AboutView.vue";
import NewsPage from "@/pages/news-page/NewsPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/about", component: AboutView },
  { path: "/news", component: NewsPage },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
