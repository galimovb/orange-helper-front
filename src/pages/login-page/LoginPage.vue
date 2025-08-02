<template>
  <RegisterAndLoginLayout :max-width="680" :min-width="320">
    <div class="px-5 py-3 space-y-6 w-full">
      <div class="flex items-center flex-col">
        <img
            src="/img/logo-bg__orange.png"
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
        <div class="space-y-1 md:space-y-4 ">
          <label class="block text-sm md:text-xl text-orange-500">Телефон</label>
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

        <div class="space-y-1 md:space-y-4 ">
          <label class="block text-sm md:text-xl text-orange-500">Пароль</label>
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
            type="submit"
            class="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 text-lg md:text-xl"
            :disabled="isSubmitting"
        >
          <span v-if="!isSubmitting">Войти</span>
          <span v-else>Загрузка...</span>
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
import {onBeforeUnmount, onMounted, reactive, ref} from 'vue';
import RegisterAndLoginLayout from "@/components/RegisterAndLoginLayout.vue";
import Input from "@/components/Input.vue";
import authApi from "@/config/api/authApi"
import {useAuthStore} from "@/stores/auth";
import {router} from "@/router";
import {useToast} from "vue-toastification";

const toast = useToast();
const authStore = useAuthStore();
const isSubmitting = ref(false);

const formData = reactive({
  phoneNumber: '',
  password: ''
});

const errors = reactive({
  phoneNumber: '',
  password: ''
});

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

    const requestData = {
      ...formData,
      phoneNumber: cleanedPhone
    };

    await authApi.login(requestData);
    await authStore.check();

    const redirectPath = router.currentRoute.value.query.redirect || '/';
    await router.push(redirectPath);
  } catch (err) {
    toast.error(err?.response?.data?.error?.message || 'Ошибка входа');
  } finally {
    isSubmitting.value = false;
  }
};
</script>
