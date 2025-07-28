<template>
  <RegisterAndLoginLayout :max-width="680" :min-width="320">
    <div class="px-5 py-3 space-y-6 w-full">
      <div class="flex items-center flex-col">
        <img
            src="/img/logo-bg__orange.svg"
            class="w-[60px] md:w-[80px]"
        />
        <h1
            class="text-3xl md:text-[32px] text-orange-500 font-medium"
        >
          Авторизация
        </h1>
      </div>

      <form
          class="space-y-7"
          @submit.prevent="handleSubmit"
      >
        <div>
          <label class="block text-sm md:text-xl text-orange-500 mb-2.5">Телефон</label>
          <Input
              v-model="formData.phoneNumber"
              type="phone"
              placeholder="+7 912 345 67 89"
              class="w-full"
          />
        </div>

        <div>
          <label class="block text-sm md:text-xl text-orange-500 mb-2.5">Пароль</label>
          <Input
              v-model="formData.password"
              type="password"
              placeholder="Введите пароль"
              required
              class="w-full"
          />
        </div>

        <button
            type="submit"
            class="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 text-lg md:text-xl"
        >
          Войти
        </button>
      </form>

      <div class="text-center text-gray-500 text-sm md:text-base">
        Нет аккаунта?
        <router-link
            to="/register"
            class="text-orange-500 hover:underline"
        >
          Зарегистрироваться
        </router-link>
      </div>
    </div>
  </RegisterAndLoginLayout>
</template>

<script setup>
import {reactive} from 'vue';
import RegisterAndLoginLayout from "@/components/RegisterAndLoginLayout.vue";
import Input from "@/components/Input.vue";
import authApi from "@/config/api/authApi"
import Button from "@/components/Button.vue";
import {useAuthStore} from "@/stores/auth";
import {router} from "@/router";

const authStore = useAuthStore();

const formData = reactive({
  phoneNumber: '',
  password: ''
});

const handleSubmit = async () => {
  try {
    // Оставляем только цифры и плюс
    let cleanedPhone = formData.phoneNumber.replace(/[^\d+]/g, '');

    // Гарантируем, что номер начинается с +7
    if (!cleanedPhone.startsWith('+')) {
      cleanedPhone = '+7' + cleanedPhone.replace(/^[78]?/, '');
    } else if (cleanedPhone.startsWith('+') && !cleanedPhone.startsWith('+7')) {
      cleanedPhone = '+7' + cleanedPhone.slice(1).replace(/\D/g, '');
    }

    // Удаляем возможные дубли плюсов
    cleanedPhone = cleanedPhone.replace(/\++/g, '+');

    // Проверяем минимальную длину (например, +79123456789 - 12 символов)
    if (cleanedPhone.length < 12) {
      throw new Error('Номер телефона слишком короткий');
    }

    const requestData = {
      ...formData,
      phoneNumber: cleanedPhone
    };

    // 1. Выполняем запрос на авторизацию
    await authApi.login(requestData);

    // 2. Проверяем авторизацию
    await authStore.check();

    // 3. Получаем URL для редиректа из query параметров
    const redirectPath = router.currentRoute.value.query.redirect || '/';

    // 4. Выполняем переход
    await router.push(redirectPath);
  } catch (err) {
    console.error('Ошибка:', err.message);
  }
};
</script>
