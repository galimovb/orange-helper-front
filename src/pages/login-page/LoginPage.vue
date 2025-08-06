<template>
  <RegisterAndLoginLayout :max-width="680" :min-width="320">
    <div class="px-5 py-3 space-y-6 w-full">
      <div class="flex items-center flex-col">
        <h1 class="text-3xl md:text-[32px] text-orange-500 font-medium">
          Авторизация
        </h1>
      </div>

      <form class="space-y-7" @submit.prevent="handleSubmit">
        <div v-if="!isResettingPassword">
          <label class="block text-sm md:text-xl text-orange-500 mb-2.5">Телефон</label>
          <Input
              v-model="formData.phoneNumber"
              type="phone"
              placeholder="+7 912 345 67 89"
              @blur="validateField('phoneNumber')"
              :class="{ '!border-red-500 !border-[2px]': errors.phoneNumber }"
              class="w-full"
          />
          <span v-if="errors.phoneNumber" class="text-red-500 text-sm md:text-base lg:text-lg">{{ errors.phoneNumber }}</span>
        </div>

        <div v-if="!isResettingPassword">
          <label class="block text-sm md:text-xl text-orange-500 mb-2.5">Пароль</label>
          <Input
              v-model="formData.password"
              type="password"
              placeholder="Введите пароль"
              @blur="validateField('password')"
              :class="{ '!border-red-500 !border-[2px]': errors.password }"
              class="w-full"
          />
          <span v-if="errors.password" class="text-red-500 text-sm md:text-base lg:text-lg">{{ errors.password }}</span>
        </div>

        <button
            v-if="!isResettingPassword"
            type="submit"
            class="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 text-lg md:text-xl"
            :disabled="isSubmitting"
        >
          <span v-if="!isSubmitting">Войти</span>
          <span v-else>Загрузка...</span>
        </button>
      </form>

      <div
          v-if="!isResettingPassword"
          class="text-center text-gray-500 text-sm md:text-base"
      >
        Нет аккаунта?
        <router-link
            to="/register"
            class="text-orange-500 hover:underline"
        >
          Зарегистрироваться
        </router-link>
      </div>

      <button
          v-if="!isResettingPassword"
          @click="startPasswordReset"
          class="w-full mt-4 text-center text-orange-500 underline hover:text-orange-600"
      >
        Забыли пароль?
      </button>

      <div v-if="isResettingPassword">
        <form @submit.prevent="handleResetStep">
          <div v-if="step === 1">
            <label class="block text-sm md:text-xl text-orange-500 mb-2.5">Email для сброса пароля</label>
            <Input
                v-model="resetData.email"
                type="email"
                placeholder="example@mail.com"
                required
                class="w-full mb-4"
            />
          </div>

          <div v-if="step === 2">
            <label class="block text-sm md:text-xl text-orange-500 mb-2.5">Код из письма (проверьте папку спам!)</label>
            <Input
                v-model="resetData.token"
                type="text"
                placeholder="Введите код"
                required
                class="w-full mb-4"
            />
          </div>

          <div v-if="step === 3">
            <label class="block text-sm md:text-xl text-orange-500 mb-2.5">Новый пароль</label>
            <Input
                v-model="resetData.newPassword"
                type="password"
                placeholder="Введите новый пароль"
                required
                class="w-full mb-4"
            />
          </div>

          <button
              v-if="step < 3"
              type="button"
              @click="handleResetStep"
              class="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 text-lg md:text-xl"
          >
            Далее
          </button>

          <button
              v-if="step === 3"
              type="button"
              @click="submitNewPassword"
              class="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 text-lg md:text-xl"
          >
            Сменить пароль
          </button>

          <button
              @click="cancelReset"
              class="w-full mt-4 text-center text-gray-500 underline hover:text-gray-700"
          >
            Отмена
          </button>
        </form>
      </div>
    </div>
  </RegisterAndLoginLayout>
</template>

<script setup>
import { reactive, ref } from 'vue';
import RegisterAndLoginLayout from "@/components/RegisterAndLoginLayout.vue";
import Input from "@/components/Input.vue";
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

const formData = reactive({
  phoneNumber: '',
  password: ''
});

const resetData = reactive({
  email: '',
  token: '',
  newPassword: ''
});

const isResettingPassword = ref(false);
const step = ref(1);
const isSubmitting = ref(false);
const errors = reactive({
  phoneNumber: '',
  password: ''
});

const startPasswordReset = () => {
  isResettingPassword.value = true;
  step.value = 1;
  resetData.email = '';
  resetData.token = '';
  resetData.newPassword = '';
};

const cancelReset = () => {
  isResettingPassword.value = false;
  step.value = 1;
  resetData.email = '';
  resetData.token = '';
  resetData.newPassword = '';
};

const validateField = (field) => {
  if (field === 'phoneNumber') {
    errors.phoneNumber = formData.phoneNumber.trim() ? '' : 'Телефон обязателен';
  } else if (field === 'password') {
    errors.password = formData.password.trim() ? '' : 'Пароль обязателен';
  }
};

const validateForm = () => {
  validateField('phoneNumber');
  validateField('password');
  return !errors.phoneNumber && !errors.password;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  try {
    isSubmitting.value = true;
    let cleanedPhone = formData.phoneNumber.replace(/[^\d+]/g, '');
    if (!cleanedPhone.startsWith('+')) {
      cleanedPhone = '+7' + cleanedPhone.replace(/^[78]?/, '');
    }
    cleanedPhone = cleanedPhone.replace(/\++/g, '+');
    if (cleanedPhone.length < 12) {
      throw new Error('Номер телефона слишком короткий');
    }
    const requestData = { ...formData, phoneNumber: cleanedPhone };
    await axios.post('/admin/login/check', requestData);
    window.location.href = '/admin';
  } catch (err) {
    toast.error(err.response?.data?.error?.message || err.message || 'Ошибка при авторизации');
  } finally {
    isSubmitting.value = false;
  }
};

const handleResetStep = async () => {
  try {
    if (step.value === 1) {
      if (!resetData.email) {
        toast.error('Email обязателен');
        return;
      }
      await axios.post('https://api.oranzhevyi-pomoshnik.ru/api/reset-password/request', { email: resetData.email });
      toast.success('Код для сброса пароля отправлен на email.');
      step.value++;
    } else if (step.value === 2) {
      if (!resetData.token) {
        toast.error('Код обязателен');
        return;
      }
      await axios.post('https://api.oranzhevyi-pomoshnik.ru/api/reset-password/verify', { email: resetData.email, token: resetData.token });
      toast.success('Код подтверждён. Введите новый пароль.');
      step.value++;
    }
  } catch (err) {
    toast.error(err.response?.data?.message || err.message || 'Ошибка');
  }
};

const submitNewPassword = async () => {
  try {
    if (!resetData.newPassword) {
      toast.error('Введите новый пароль');
      return;
    }
    await axios.post('https://api.oranzhevyi-pomoshnik.ru/api/reset-password/confirm', {
      email: resetData.email,
      token: resetData.token,
      newPassword: resetData.newPassword
    });
    toast.success('Пароль успешно изменён');
    cancelReset();
  } catch (err) {
    toast.error(err.response?.data?.message || err.message || 'Ошибка при смене пароля');
  }
};
</script>
