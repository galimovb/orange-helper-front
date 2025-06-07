// src/router.ts
import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/pages/main-page/HomePage.vue";
import AboutView from "@/pages/AboutView.vue";
import NewsPage from "@/pages/news-page/NewsPage.vue";
import DiagnosticsPage  from "@/pages/diagnostics-page/DiagnosticsPage.vue";
import UsefulMaterialsPage from "@/pages/useful-materials-page/UsefulMaterialsPage.vue";
import ConsultationPage from "@/pages/consultation-page/ConsultationPage.vue";
import NotFoundPage from "@/pages/not-found-page/NotFoundPage.vue";
import AccountPage from "@/pages/account-page/AccountPage.vue";
import TestPage from "@/pages/test-page/TestPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/about", component: AboutView },
  { path: "/news", component: NewsPage },
  { path: "/diagnostics", component: DiagnosticsPage },
  { path: "/useful-materials", component: UsefulMaterialsPage },
  { path: "/consultation", component: ConsultationPage },
  { path: "/:pathMatch(.*)*", component: NotFoundPage },
  { path: "/account", component: AccountPage },
  { path: "/test/:id", component: TestPage, props: true },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,

});


