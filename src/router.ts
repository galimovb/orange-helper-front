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
import DetailPage from "@/components/DetailPage.vue";
import RegistrationPage from "@/pages/register-page/RegistrationPage.vue";
import LoginPage from "@/pages/login-page/LoginPage.vue";
import { useAuthStore } from '@/stores/auth.js';

const routes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage, name: "login" },
  { path: "/register", component: RegistrationPage },
  { path: "/about", component: AboutView },
  { path: "/news", component: NewsPage },
  { path: "/diagnostics", component: DiagnosticsPage },
  { path: "/diagnostics/pedagogy/:id", component: DetailPage, props: true },
  { path: "/diagnostics/psychology/:id", component: DetailPage, props: true },
  { path: "/useful-materials", component: UsefulMaterialsPage },
  { path: "/useful-materials/literary-column/:id", component: DetailPage, props: true },
  { path: "/useful-materials/creative-workshop/:id", component: DetailPage, props: true },
  { path: "/consultation", component: ConsultationPage },
  { path: "/account", component: AccountPage,  },
  { path: "/test/:id", component: TestPage, props: true,  meta: { requiresAuth: true }},
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

  // Если требуется авторизация и пользователь не авторизован
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Сохраняем исходный маршрут в query параметре 'redirect'
    return next({
      name: 'login',
      query: { redirect: to.fullPath }
    });
  }

  // Если пользователь уже авторизован, не пускать на /login
  if (to.name === 'login' && authStore.isAuthenticated) {
    // Если есть redirect параметр - идём туда, иначе на главную
    const redirectPath = from.query.redirect || '/';
    return next(redirectPath);
  }

  next();
});

export default router;