// src/router.ts
import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/pages/main-page/HomePage.vue";
import AboutView from "@/pages/AboutView.vue";
import NewsView from "@/pages/NewsView.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/about", component: AboutView },
  { path: "/news", component: NewsView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
