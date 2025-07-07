import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/main-page/HomePage.vue";
import AboutView from "@/pages/AboutView.vue";
import NewsPage from "@/pages/news-page/NewsPage.vue";
import DiagnosticsPage from "@/pages/diagnostics-page/DiagnosticsPage.vue";
import UsefulMaterialsPage from "@/pages/useful-materials-page/UsefulMaterialsPage.vue";
import ConsultationPage from "@/pages/consultation-page/ConsultationPage.vue";
import NotFoundPage from "@/pages/not-found-page/NotFoundPage.vue";
import AccountPage from "@/pages/account-page/AccountPage.vue";
import TestPage from "@/pages/test-page/TestPage.vue";
import PedagogyDetailPage from "@/pages/diagnostics-page/PedagogyDetailPage.vue";
import PsychologyDetailPage from "@/pages/diagnostics-page/PsychologyDetailPage.vue";
import RegistrationPage from "@/pages/register-page/RegistrationPage.vue";
import LoginPage from "@/pages/login-page/LoginPage.vue";
import { useAuthStore } from '@/stores/auth.js'

const routes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage, name: "login" },
  { path: "/register", component: RegistrationPage },
  { path: "/about", component: AboutView },
  { path: "/news", component: NewsPage },
  { path: "/diagnostics", component: DiagnosticsPage },
  { path: "/diagnostics/pedagogy/:id", component: PedagogyDetailPage, props: true },
  { path: "/diagnostics/psychology/:id", component: PsychologyDetailPage, props: true },
  { path: "/useful-materials", component: UsefulMaterialsPage },
  { path: "/consultation", component: ConsultationPage },
  { path: "/account", component: AccountPage, meta: { requiresAuth: true } },
  { path: "/test/:id", component: TestPage, props: true, meta: { requiresAuth: true } },
  { path: "/:pathMatch(.*)*", component: NotFoundPage },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Если ещё не знаем, авторизован ли пользователь, проверим
  if (!authStore.isChecked) {
    await authStore.check();
  }

  // Если требуется авторизация и пользователь не авторизован — редирект на login
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'login' });
  }

  // Если пользователь уже авторизован, не пускать на /login
  if (to.name === 'login' && authStore.isAuthenticated) {
    return next('/account');
  }

  next();
});
