<template>
  <RegisterAndLoginLayout :max-width="916" :min-width="300">
    <div class="px-5 py-3 space-y-6 w-full">
      <div class="flex items-center flex-col">
        <img
            src="/img/logo-bg__orange.svg"
            class="w-[60px] md:w-[80px]"
        />
        <h1
            class="text-3xl md:text-[32px] text-orange-500 font-medium"
        >
          Регистрация
        </h1>
      </div>

      <form
          class="space-y-7"
          @submit.prevent="handleSubmit"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label class="block text-sm md:text-xl text-orange-500 mb-2.5">ФИО</label>
            <Input
                v-model="formData.fullName"
                type="text"
                placeholder="Иванов Иван Иванович"
                required
                class="w-full"
            />
          </div>

          <div>
            <label class="block text-sm md:text-xl text-orange-500 mb-2.5">Возраст</label>
            <Input
                v-model="formData.age"
                type="number"
                placeholder="29"
                min="18"
                max="99"
                class="w-full"
            />
          </div>
          <div>
            <label class="block text-sm md:text-xl text-orange-500 mb-2.5">Телефон</label>
            <Input
                v-model="formData.phone"
                type="phone"
                placeholder="+7 912 345 67 89"
                class="w-full"
            />
          </div>

          <div>
            <label class="block text-sm md:text-xl text-orange-500 mb-2.5">E-mail</label>
            <Input
                v-model="formData.email"
                type="email"
                placeholder="person123@gmail.com"
                required
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
        </div>

        <button
            type="submit"
            class="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 text-lg md:text-xl"
        >
          Зарегистрироваться
        </button>
      </form>

      <div class="text-center text-gray-500 text-sm md:text-base">
        Уже есть аккаунт?
        <router-link
            to="/login"
            class="text-orange-500 hover:underline"
        >
          Войти
        </router-link>
      </div>
      <Button @click="AxiosWrapper.get('https://orangehelper.ru/api/employees', {
  withCredentials: true
});
">ee
      </Button>
    </div>
  </RegisterAndLoginLayout>
</template>

<script setup>
import {ref} from 'vue';
import RegisterAndLoginLayout from "@/components/RegisterAndLoginLayout.vue";
import Input from "@/components/Input.vue";
import axios from "axios";
import Button from "@/components/Button.vue";
import AxiosWrapper from "@/config/AxiosWrapper";

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
