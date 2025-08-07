<template>
  <RegisterAndLoginLayout :max-width="680" :min-width="320">
    <div class="px-5 py-3 space-y-6 w-full">
      <!-- Заголовок -->
      <div class="flex items-center flex-col">
        <img
            src="/img/logo-bg__orange.png"
            class="w-[60px] md:w-[80px]"
        />
        <h1 class="text-3xl md:text-[32px] text-orange-500 font-medium">
          Авторизация
        </h1>
      </div>

      <!-- Основной контент -->
      <div class="space-y-6">
        <!-- Форма входа -->
        <div v-show="!isResettingPassword">
          <form @submit.prevent="handleSubmit" class="space-y-7">
            <!-- Телефон -->
            <div class="space-y-1 md:space-y-4 ">
              <label class="block text-sm md:text-xl text-orange-500">Телефон</label>
              <Input
                  v-model="formData.phoneNumber"
                  type="phone"
                  placeholder="+7 912 345 67 89"
                  class="w-full"
              />
            </div>

            <!-- Пароль -->
            <div class="space-y-1 md:space-y-4 ">
              <label class="block text-sm md:text-xl text-orange-500">Пароль</label>
              <Input
                  v-model="formData.password"
                  type="password"
                  placeholder="Введите пароль"
                  required
                  class="w-full"
              />
              <button
                  @click="startPasswordReset"
                  class="w-full text-left text-orange-500 underline hover:text-orange-600 text-sm md:text-xl"
              >
                Забыли пароль?
              </button>
            </div>

            <!-- Кнопка входа -->
            <button
                type="submit"
                class="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 text-lg md:text-xl"
                :disabled="isSubmitting"
            >
              <span v-if="!isSubmitting">Войти</span>
              <span v-else>Загрузка...</span>
            </button>
          </form>

          <div class="text-center text-gray-500 text-sm md:text-xl md:text-base mt-2">
            Нет аккаунта?
            <router-link to="/register" class="text-orange-500 hover:underline">Зарегистрироваться</router-link>
          </div>
        </div>

        <!-- Форма сброса пароля -->
        <div v-show="isResettingPassword">
          <!-- Шаг 1 -->
          <form v-show="step === 1" @submit.prevent="handleResetStep" class="space-y-7">
            <div class="space-y-1 md:space-y-4 ">
              <label class="block text-sm md:text-xl text-orange-500">Email для сброса пароля</label>
              <Input
                  v-model="resetData.email"
                  type="email"
                  placeholder="example@mail.com"
                  required
                  class="w-full"
              />
            </div>

            <!-- Капча -->
            <div
                id="captcha-container"
                class="smart-captcha mt-4"
            ></div>

            <!-- Кнопки -->
            <div class="flex flex-col space-y-4">
              <button
                  type="submit"
                  :disabled="isLoading || !captchaToken"
                  class="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 text-lg md:text-xl disabled:opacity-50"
              >
                <span v-if="isLoading">Отправка...</span>
                <span v-else>Далее</span>
              </button>

              <button
                  type="button"
                  @click="cancelReset"
                  class="w-full text-center text-gray-500 underline hover:text-gray-700"
              >
                Отмена
              </button>
            </div>
          </form>

          <!-- Шаг 2 -->
          <form v-show="step === 2" @submit.prevent="handleResetStep" class="space-y-7">
            <div class="space-y-1 md:space-y-4 ">
              <label class="block text-sm md:text-xl text-orange-500">Код из письма (проверьте папку
                спам!)</label>
              <Input
                  v-model="resetData.token"
                  type="text"
                  placeholder="Введите код"
                  required
                  class="w-full"
              />
            </div>

            <div class="flex flex-col space-y-4">
              <button
                  type="submit"
                  class="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 text-lg md:text-xl"
              >
                Далее
              </button>
              <button
                  type="button"
                  @click="cancelReset"
                  class="w-full text-center text-gray-500 underline hover:text-gray-700"
              >
                Отмена
              </button>
            </div>
          </form>

          <!-- Шаг 3 -->
          <form v-show="step === 3" @submit.prevent="submitNewPassword" class="space-y-7">
            <div>
              <label class="block text-sm md:text-xl text-orange-500 mb-2.5">Новый пароль</label>
              <Input
                  v-model="resetData.newPassword"
                  type="password"
                  placeholder="Введите новый пароль"
                  required
                  class="w-full"
              />
            </div>

            <div class="flex flex-col space-y-4">
              <button
                  type="submit"
                  class="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 text-lg md:text-xl"
              >
                Сменить пароль
              </button>
              <button
                  type="button"
                  @click="cancelReset"
                  class="w-full text-center text-gray-500 underline hover:text-gray-700"
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </RegisterAndLoginLayout>
</template>


<script setup>
import {onMounted, reactive, ref} from 'vue';
import RegisterAndLoginLayout from "@/components/RegisterAndLoginLayout.vue";
import Input from "@/components/Input.vue";
import authApi from "@/config/api/authApi";
import {useAuthStore} from "@/stores/auth";
import {router} from "@/router";
import {useToast} from "vue-toastification";
import axios from "axios";
import {BASE_API_URL, YANDEX_CAPTCHA_KEY} from "@/config/apiConfig";

const toast = useToast();
const authStore = useAuthStore();

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
const isLoading = ref(false);
const captchaToken = ref(null);

const errors = reactive({
  phoneNumber: '',
  password: ''
});

const startPasswordReset = () => {
  isResettingPassword.value = true;
  step.value = 1;
  Object.assign(resetData, {email: '', token: '', newPassword: ''});
  captchaToken.value = null;
};

const cancelReset = () => {
  isResettingPassword.value = false;
  step.value = 1;
  Object.assign(resetData, {email: '', token: '', newPassword: ''});
  captchaToken.value = null;
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

    if (cleanedPhone.length < 12) throw new Error('Номер телефона слишком короткий');

    const requestData = {...formData, phoneNumber: cleanedPhone};
    await authApi.login(requestData);
    await authStore.check();

    const redirectPath = router.currentRoute.value.query.redirect || '/';
    await router.push(redirectPath);
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
      if (!captchaToken.value) {
        toast.error('Пожалуйста, подтвердите капчу');
        return;
      }

      isLoading.value = true;

      await axios.post(`${BASE_API_URL}/reset-password/request`, {
        email: resetData.email,
        captcha_token: captchaToken.value
      });

      toast.success('Код отправлен. Проверьте почту (включая Спам).');
      step.value++;
    } else if (step.value === 2) {
      if (!resetData.token) {
        toast.error('Введите код подтверждения');
        return;
      }

      isLoading.value = true;

      await axios.post(`${BASE_API_URL}/reset-password/verify`, {
        email: resetData.email,
        token: resetData.token
      });

      toast.success('Код подтверждён. Введите новый пароль.');
      step.value++;
    }
  } catch (err) {
    toast.error(err.response?.data?.message || err.message || 'Ошибка');
  } finally {
    isLoading.value = false;
  }
};

const submitNewPassword = async () => {
  try {
    if (!resetData.newPassword) {
      toast.error('Введите новый пароль');
      return;
    }

    isLoading.value = true;

    await axios.post(`${BASE_API_URL}/reset-password/confirm`, {
      email: resetData.email,
      token: resetData.token,
      newPassword: resetData.newPassword
    });

    toast.success('Пароль изменён. Теперь войдите заново.');
    cancelReset();
  } catch (err) {
    toast.error(err.response?.data?.message || err.message || 'Ошибка при смене пароля');
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  if (window.smartCaptcha) {
    window.smartCaptcha.render('captcha-container', {
      sitekey: YANDEX_CAPTCHA_KEY,
      hl: 'ru',
      callback: (token) => {
        captchaToken.value = token;
      }
    });
  }
});
</script>

