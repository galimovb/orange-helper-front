<template>
  <RegisterAndLoginLayout :max-width="916" :min-width="300">
    <div class="px-5 py-3 space-y-6 w-full">
      <div class="flex items-center flex-col">
        <img src="/img/logo-bg__orange.svg" class="w-[60px] md:w-[80px]" />
        <h1 class="text-3xl md:text-[32px] text-orange-500 font-medium">Регистрация</h1>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-7">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <!-- Фамилия -->
          <div>
            <label class="block text-sm md:text-xl text-orange-500 mb-2.5">Фамилия</label>
            <Input
                v-model="formData.lastName"
                type="text"
                placeholder="Иванов"
                @blur="validateField('lastName')"
                :class="{ '!border-red-500 !border-[2px]': errors.lastName }"
            />
            <span v-if="errors.lastName" class="text-red-500 text-sm">{{ errors.lastName }}</span>
          </div>

          <!-- Имя -->
          <div>
            <label class="block text-sm md:text-xl text-orange-500 mb-2.5">Имя</label>
            <Input
                v-model="formData.firstName"
                type="text"
                placeholder="Иван"
                @blur="validateField('firstName')"
                :class="{ '!border-red-500 !border-[2px]': errors.firstName }"
            />
            <span v-if="errors.firstName" class="text-red-500 text-sm">{{ errors.firstName }}</span>
          </div>

          <!-- Отчество -->
          <div>
            <label class="block text-sm md:text-xl text-orange-500 mb-2.5">Отчество</label>
            <Input
                v-model="formData.secondName"
                type="text"
                placeholder="Иванович"
                @blur="validateField('secondName')"
                :class="{ '!border-red-500 !border-[2px]': errors.secondName }"
            />
            <span v-if="errors.secondName" class="text-red-500 text-sm">{{ errors.secondName }}</span>
          </div>

          <!-- Возраст -->
          <div>
            <label class="block text-sm md:text-xl text-orange-500 mb-2.5">Возраст</label>
            <Input
                v-model="formData.age"
                type="number"
                placeholder="29"
                min="1"
                max="120"
                @blur="validateField('age')"
                :class="{ '!border-red-500 !border-[2px]': errors.age }"
            />
            <span v-if="errors.age" class="text-red-500 text-sm">{{ errors.age }}</span>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm md:text-xl text-orange-500 mb-2.5">Email</label>
            <Input
                v-model="formData.email"
                type="email"
                placeholder="example@mail.ru"
                @blur="validateField('email')"
                :class="{ '!border-red-500 !border-[2px]': errors.email }"
            />
            <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
          </div>

          <!-- Телефон -->
          <div>
            <label class="block text-sm md:text-xl text-orange-500 mb-2.5">Телефон</label>
            <Input
                v-model="formData.phoneNumber"
                type="tel"
                placeholder="+7 912 345 67 89"
                @blur="validateField('phoneNumber')"
                :class="{ '!border-red-500 !border-[2px]': errors.phoneNumber }"
            />
            <span v-if="errors.phoneNumber" class="text-red-500 text-sm">{{ errors.phoneNumber }}</span>
          </div>

          <!-- Пароль -->
          <div>
            <label class="block text-sm md:text-xl text-orange-500 mb-2.5">Пароль</label>
            <Input
                v-model="formData.password"
                type="password"
                placeholder="Введите пароль"
                @blur="validateField('password')"
                :class="{ '!border-red-500 !border-[2px]': errors.password }"
            />
            <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</span>
          </div>
        </div>

        <button
            type="submit"
            class="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 text-lg md:text-xl"
            :disabled="isSubmitting"
        >
          <span v-if="!isSubmitting">Зарегистрироваться</span>
        </button>
      </form>

      <div class="text-center text-gray-500 text-sm md:text-base">
        Уже есть аккаунт?
        <router-link to="/login" class="text-orange-500 hover:underline">Войти</router-link>
      </div>
    </div>
  </RegisterAndLoginLayout>
</template>

<script setup>
import {onBeforeUnmount, onMounted, reactive, ref} from 'vue';
import { useRouter } from 'vue-router';
import * as yup from 'yup';
import RegisterAndLoginLayout from '@/components/RegisterAndLoginLayout.vue';
import Input from '@/components/Input.vue';
import { registerRaw } from '@/config/api/registerRaw';
import {useToast} from "vue-toastification";

const router = useRouter();
const isSubmitting = ref(false);

const toast = useToast();

// Данные формы
const formData = reactive({
  firstName: '',
  lastName: '',
  secondName: '',
  age: null,
  email: '',
  phoneNumber: '',
  password: ''
});

// Ошибки валидации
const errors = reactive({
  firstName: '',
  lastName: '',
  secondName: '',
  age: '',
  email: '',
  phoneNumber: '',
  password: ''
});

// Схема валидации Yup
const schema = yup.object().shape({
  firstName: yup
      .string()
      .required('Имя обязательно'),
  lastName: yup
      .string()
      .required('Фамилия обязательна'),
  secondName: yup
      .string(),
  age: yup
      .number()
      .required('Возраст обязателен')
      .min(18, 'Минимальный возраст: 18 лет'),
  email: yup
      .string()
      .required('Email обязателен')
      .email('Некорректный email'),
  phoneNumber: yup
      .string()
      .required('Телефон обязателен')
      .matches(/^\+7\d{10}$/, 'Формат: +7XXXXXXXXXX'),
  password: yup
      .string()
      .required('Пароль обязателен')
      .min(6, 'Минимум 6 символов')
      .matches(
          /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
          'Пароль должен содержать только английские буквы и символы'
      )
});

// Валидация одного поля
const validateField = async (field) => {
  try {
    await schema.validateAt(field, formData);
    errors[field] = '';
  } catch (err) {
    errors[field] = err.message;
  }
};

// Отправка формы
const handleSubmit = async () => {
  try {
    // Валидация всей формы
    await schema.validate(formData, { abortEarly: false });
    isSubmitting.value = true;

    // Нормализация телефона
    const cleanedPhone = formData.phoneNumber.replace(/[^\d+]/g, '');

    // Подготовка данных для отправки
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      secondName: formData.secondName,
      age: formData.age,
      email: formData.email,
      phoneNumber: cleanedPhone,
      password: formData.password
    };

    // Отправка на сервер
    const response = await registerRaw(payload);

    router.push('/login')
  } catch (err) {
    toast.error(err?.response.data.error.message);
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  // Удаляем все существующие viewport мета-теги
  const metas = document.querySelectorAll('meta[name="viewport"]');
  metas.forEach(meta => document.head.removeChild(meta));

  // Создаём и вставляем свой
  const newMeta = document.createElement('meta');
  newMeta.name = 'viewport';
  newMeta.content = 'width=device-width, initial-scale=1.0';
  document.head.appendChild(newMeta);
});

onBeforeUnmount(() => {
  // Удаляем все viewport мета-теги (включая наш)
  const metas = document.querySelectorAll('meta[name="viewport"]');
  metas.forEach(meta => {
    if (document.head.contains(meta)) {
      document.head.removeChild(meta);
    }
  });
});

</script>
