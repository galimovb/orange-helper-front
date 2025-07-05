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
              v-model="formData.phone"
              type="tel"
              placeholder="+7 912 345 67 89"
              pattern="\+7\s?[0-9]{3}\s?[0-9]{3}\s?[0-9]{2}\s?[0-9]{2}"
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
import {ref} from 'vue';
import RegisterAndLoginLayout from "@/components/RegisterAndLoginLayout.vue";
import Input from "@/components/Input.vue";

const formData = ref({
  fullName: '',
  age: '',
  phone: '',
  email: '',
  password: ''
});

const handleSubmit = () => {
  console.log('Форма отправлена:', formData.value);
  // Логика отправки формы
};
</script>
