<template>
  <RegisterAndLoginLayout :max-width="916" :min-width="300">
    <div class="px-5 py-3 space-y-6 w-full">
      <div class="flex items-center flex-col">
        <img src="/img/logo-bg__orange.svg" class="w-[60px] md:w-[80px]" />
        <h1 class="text-3xl md:text-[32px] text-orange-500 font-medium">Регистрация</h1>
      </div>

      <form class="space-y-7" @submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label class="block text-sm md:text-xl text-orange-500 mb-2.5">Фамилия</label>
            <Input v-model="formData.lastName" type="text" placeholder="Иванов" required class="w-full" />
          </div>

          <div>
            <label class="block text-sm md:text-xl text-orange-500 mb-2.5">Имя</label>
            <Input v-model="formData.firstName" type="text" placeholder="Иван" required class="w-full" />
          </div>

          <div>
            <label class="block text-sm md:text-xl text-orange-500 mb-2.5">Отчество</label>
            <Input v-model="formData.secondName" type="text" placeholder="Иванович" required class="w-full" />
          </div>

          <div>
            <label class="block text-sm md:text-xl text-orange-500 mb-2.5">Возраст</label>
            <Input v-model="formData.age" type="number" placeholder="29" min="1" max="120" required class="w-full" />
          </div>

          <div>
            <label class="block text-sm md:text-xl text-orange-500 mb-2.5">Телефон</label>
            <Input v-model="formData.phoneNumber" type="phone" placeholder="+7 912 345 67 89" required class="w-full" />
          </div>

          <div>
            <label class="block text-sm md:text-xl text-orange-500 mb-2.5">Пароль</label>
            <Input v-model="formData.password" type="password" placeholder="Введите пароль" required class="w-full" />
          </div>
        </div>

        <button type="submit"
                class="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 text-lg md:text-xl">
          Зарегистрироваться
        </button>

        <p v-if="errorMessage" class="text-red-500 text-sm mt-2 text-center">{{ errorMessage }}</p>
      </form>

      <div class="text-center text-gray-500 text-sm md:text-base">
        Уже есть аккаунт?
        <router-link to="/login" class="text-orange-500 hover:underline">Войти</router-link>
      </div>
    </div>
  </RegisterAndLoginLayout>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import RegisterAndLoginLayout from '@/components/RegisterAndLoginLayout.vue';
import { registerRaw } from '@/config/api/registerRaw';
import Input from '@/components/Input.vue';
import authApi from '@/config/api/authApi';

const router = useRouter();
const errorMessage = ref('');

const formData = reactive({
  firstName: '',
  lastName: '',
  secondName: '',
  age: null,
  phoneNumber: '',
  password: ''
});

const handleSubmit = async () => {
  try {
    let cleanedPhone = formData.phoneNumber.replace(/[^\d+]/g, '');
    if (!cleanedPhone.startsWith('+')) {
      cleanedPhone = '+7' + cleanedPhone.replace(/^[78]?/, '');
    } else if (!cleanedPhone.startsWith('+7')) {
      cleanedPhone = '+7' + cleanedPhone.slice(1).replace(/\D/g, '');
    }
    cleanedPhone = cleanedPhone.replace(/\++/g, '+');

    if (!/^\+7\d{10}$/.test(cleanedPhone)) {
      throw new Error('Номер телефона должен быть в формате +7XXXXXXXXXX');
    }

    const requestData = {
      ...formData,
      phoneNumber: cleanedPhone
    };

    const response = await registerRaw(requestData);
    const token = response.data.token;
    localStorage.setItem('auth_token', token);

    console.log('Отправляем:', requestData);

    router.push('/account');
  } catch (err) {
    console.error('Ошибка входа:', err);
  }
};


</script>

