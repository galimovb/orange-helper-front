// src/router.ts
import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/pages/main-page/HomePage.vue";
import AboutView from "@/pages/AboutView.vue";
import NewsPage from "@/pages/news-page/NewsPage.vue";
import DiagnosticsPage  from "@/pages/diagnostics-page/DiagnosticsPage.vue";
import UsefulMaterialsPage from "@/pages/useful-materials-page/UsefulMaterialsPage.vue";
import ConsultationPage from "@/pages/consultation-page/ConsultationPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/about", component: AboutView },
  { path: "/news", component: NewsPage },
  { path: "/diagnostics", component: DiagnosticsPage },
  { path: "/useful-materials", component: UsefulMaterialsPage },
  { path: "/consultation", component: ConsultationPage },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
