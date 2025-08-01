<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import * as yup from 'yup';
import { useToast } from 'vue-toastification';

import AxiosWrapper from '@/config/AxiosWrapper';
import { useProfileStore } from '@/stores/profileStore';
import { useEmployeeStore } from '@/stores/employeeStore';
import { useAuthStore } from '@/stores/auth.js';

import Multiselect from 'vue-multiselect';

import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';
import Circle from '@/components/Circle.vue';
import SectionWithLines from '@/components/main-page/SectionWithLines.vue';

const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();

const profileStore = useProfileStore();
const employeeStore = useEmployeeStore();

onMounted(() => {
  employeeStore.fetchEmployees();
  profileStore.fetchProfile();
});

const checkAuth = () => {
  if (!authStore.isAuthenticated) {
    router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } });
  }
};

// ===================== Педагогическая форма =====================
const selectedConsultantPedagogical = ref(null);
const selectedDatePedagogical = ref('');
const selectedTimePedagogical = ref('');
const consultationTypePedagogical = ref('Педагогическая');

const pedagogicalErrors = reactive({
  consultant: '',
  date: '',
  time: '',
  type: ''
});

const pedagogicalSchema = yup.object({
  consultant: yup.object().required('Выберите специалиста'),
  date: yup.string().required('Выберите дату'),
  time: yup.string().required('Укажите время'),
  type: yup.string().required('Тип консультации обязателен')
});

const submitFormPedagogical = async () => {
  try {
    Object.keys(pedagogicalErrors).forEach(key => pedagogicalErrors[key] = '');

    const dataToValidate = {
      consultant: selectedConsultantPedagogical.value,
      date: selectedDatePedagogical.value,
      time: selectedTimePedagogical.value,
      type: consultationTypePedagogical.value
    };

    await pedagogicalSchema.validate(dataToValidate, {abortEarly: false});

    const requestData = {
      consultationType: 'pedagogical',
      consultantId: selectedConsultantPedagogical.value.id,
      userId: profileStore.userInfo.id,
      requestDate: selectedDatePedagogical.value,
      requestTime: selectedTimePedagogical.value,
      childrenFullName: profileStore.userInfo.childName,
      childrenAge: profileStore.userInfo.childrenAge,
    };

    const response = await AxiosWrapper.post('/consultation-requests', requestData);

    if (response.status === 201) {
      toast.success('Заявка на педагогическую консультацию успешно отправлена!');
    }
  } catch (err) {
    toast.error('Произошла ошибка при создании заявки на консультацию');
  }
};

// ===================== Психологическая форма =====================
const selectedConsultantPsychological = ref(null);
const selectedDatePsychological = ref('');
const selectedTimePsychological = ref('');
const consultationTypePsychological = ref('Психологическая');

const psychologicalErrors = reactive({
  consultant: '',
  date: '',
  time: '',
  type: ''
});

const psychologicalSchema = yup.object({
  consultant: yup.object().required('Выберите специалиста'),
  date: yup.string().required('Выберите дату'),
  time: yup.string().required('Укажите время'),
  type: yup.string().required('Тип консультации обязателен')
});

const submitFormPsychological = async () => {
  try {
    Object.keys(psychologicalErrors).forEach(key => psychologicalErrors[key] = '');

    const dataToValidate = {
      consultant: selectedConsultantPsychological.value,
      date: selectedDatePsychological.value,
      time: selectedTimePsychological.value,
      type: consultationTypePsychological.value
    };

    await psychologicalSchema.validate(dataToValidate, {abortEarly: false});

    const requestData = {
      consultationType: 'psychological',
      consultantId: selectedConsultantPsychological.value.id,
      userId: profileStore.userInfo.id,
      requestDate: selectedDatePsychological.value,
      requestTime: selectedTimePsychological.value,
      childrenFullName: profileStore.userInfo.childName,
      childrenAge: profileStore.userInfo.childrenAge,
    };

    const response = await AxiosWrapper.post('/consultation-requests', requestData);

    if (response.status === 201) {
      toast.success('Заявка на психологическую консультацию успешно отправлена!');
    }
  } catch (err) {
    toast.error('Произошла ошибка при создании заявки на консультацию');
  }
};

// ===================== Заявка на работу =====================
const formData = ref({
  fullName: '',
  age: '',
  education: '',
  workPlace: '',
  beenWorkingYears: '',
  employeeSphera: '',
  phone: '',
  email: '',
});

const jobErrors = reactive({
  fullName: '',
  age: '',
  education: '',
  workPlace: '',
  beenWorkingYears: '',
  employeeSphera: '',
  phone: '',
  email: ''
});

const jobSchema = yup.object().shape({
  fullName: yup.string()
      .required('ФИО обязательно')
      .transform(value => value === '' ? null : value),

  age: yup.number()
      .typeError('Возраст должен быть числом')
      .required('Возраст обязателен')
      .min(18, 'Минимальный возраст: 18')
      .max(50, 'Максимальный возраст: 50')
      .transform(value => value === '' ? null : value),

  education: yup.string()
      .required('Образование обязательно')
      .transform(value => value === '' ? null : value),

  workPlace: yup.string()
      .nullable()
      .transform(value => value === '' ? null : value),

  beenWorkingYears: yup.string()
      .nullable()
      .transform(value => value === '' ? null : value),

  employeeSphera: yup.string()
      .required('Выберите квалификацию')
      .oneOf(['PEDAGOGY', 'PSYCHOLOGY'], 'Неверное значение квалификации')
      .transform(value => value === '' ? null : value),

  phone: yup.string()
      .required('Телефон обязателен')
      .matches(/^\+?[0-9]{7,15}$/, 'Некорректный формат телефона')
      .transform(value => value === '' ? null : value),
  email: yup
      .string()
      .required('Email обязателен')
      .email('Некорректный email'),
});

const handleJobSubmit = async () => {
  try {
    // Очистка ошибок
    Object.keys(jobErrors).forEach(key => jobErrors[key] = '');

    // Очистка телефона от мусора
    let cleanedPhone = formData.value.phone.replace(/[^\d+]/g, '');
    if (!cleanedPhone.startsWith('+')) {
      cleanedPhone = '+7' + cleanedPhone.replace(/^[78]?/, '');
    } else if (cleanedPhone.startsWith('+') && !cleanedPhone.startsWith('+7')) {
      cleanedPhone = '+7' + cleanedPhone.slice(1).replace(/\D/g, '');
    }
    cleanedPhone = cleanedPhone.replace(/\++/g, '+');

    // Валидация
    const dataToValidate = {
      ...formData.value,
      phone: cleanedPhone
    };

    await jobSchema.validate(dataToValidate, {abortEarly: false});

    const payload = {
      ...formData.value,
      phone: cleanedPhone
    };

    await AxiosWrapper.post('/job/request', payload);
    toast.success('Заявка успешно отправлена!');
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.inner.forEach(e => {
        jobErrors[e.path] = e.message;
      });
    } else {
      toast.error('Ошибка при отправке заявки');
      alert('Ошибка при отправке формы: ' + (err.response?.data?.message || err.message));
    }
  }
};

// ===================== Прочее =====================
const circleLabel = [
  {label: "Вы оставляете заявку"},
  {label: "Наш специалист уточняет детали с вами"},
  {label: "Прохождение консультациии"},
  {label: "Получение рекомендаций"}
];

const priceListPedagogic = [
  {title: 'Первая консультация', prices: ['бесплатная']},
  {title: 'Консультация с педагогом', prices: ['30 минут - 1500 руб', '60 минут - 2500 руб']}
];

const priceListPsychologic = [
  {title: 'Первая консультация', prices: ['бесплатная']},
  {title: 'Консультация с психологом', prices: ['30 минут - 1500 руб', '60 минут - 2500 руб']}
];
</script>


<template>
  <Header/>
  <section class="pedagogical-consultation flex flex-col gap-12 px-[55px] py-8 mb-[30px]">
    <div class="flex flex-col gap-[30px]">
      <h1 class="text-orange-500 text-[55px] leading-[100%]">
        Педагогическая консультация
      </h1>
      <p class="text-4xl leading-[100%]">
        Онлайн-консультация с педагогом, где специалист проведет диагностику и поможет решить проблемы.
      </p>
    </div>
    <div class="flex justify-center">
      <img src="/img/pedagogical-consultation_1.svg" alt="">
      <img src="/img/pedagogical-consultation_2.svg" alt="">
    </div>
  </section>
  <SectionWithLines
      title="Стоимость"
  >
    <div class="space-y-10">
      <div
          v-for="priceItem in priceListPedagogic"
          class="flex items-center justify-between"
      >
            <span>
              {{ priceItem.title }}
            </span>
        <div class="flex flex-col gap-2 text-orange-500">
              <span
                  v-for="price in priceItem.prices"
              >
              {{ price }}
              </span>
        </div>
      </div>
    </div>
  </SectionWithLines>
  <section class="conditions flex flex-col gap-12 px-[55px] py-8 mb-[40px]">
    <div class="flex flex-col gap-5">
      <h5 class="text-4xl leading-[100%]">
        Форма для записи
      </h5>
      <form
          @submit.prevent="submitFormPedagogical"
          class="bg-orange-500 flex flex-col gap-5 p-[30px] rounded-[10px]"
      >
        <div class="lg:grid lg:grid-cols-2 flex flex-col gap-5">
          <div class="flex flex-col gap-3">
            <label class="text-white text-3xl leading-[100%]">
              ФИО взрослого
            </label>
            <input
                v-model="profileStore.userInfo.fullName"
                type="text"
                readonly
                class="w-full lg:text-2xl border border-gray-400 rounded-lg p-3"
                @focus="checkAuth"
            />
          </div>

          <div class="flex flex-col gap-3">
            <label class="text-white text-3xl leading-[100%]">
              ФИО специалиста
            </label>
            <multiselect
                v-model="selectedConsultantPedagogical"
                :options="employeeStore.allEmployees"
                :searchable="true"
                :closeOnSelect="true"
                track-by="id"
                label="fullName"
                placeholder="Выберите специалистов"
                class="custom-multiselect "
                @focus="checkAuth"
                :class="{ '!border-black !border-[2px]': pedagogicalErrors.consultant }"
            />
            <span v-if="pedagogicalErrors.consultant"
                  class="text-black text-sm md:text-base">{{ pedagogicalErrors.consultant }}</span>
          </div>
          <div class="flex flex-col gap-3">
            <label class="text-white text-3xl leading-[100%]">
              Тип консультации
            </label>
            <input
                v-model="consultationTypePedagogical"
                type="text"
                readonly
                class="w-full lg:text-2xl border border-gray-400 rounded-lg p-3"
                value="Педагогическая"
                @focus="checkAuth"

            />
          </div>
          <div class="flex flex-col gap-3">
            <label class="text-white text-3xl leading-[100%]">
              Дата
            </label>
            <input
                v-model="selectedDatePedagogical"
                type="date"
                class="w-full lg:text-2xl border border-gray-400 rounded-lg p-3"
                @focus="checkAuth"
                :class="{ '!border-black border-[2px]': pedagogicalErrors.date }"

            />
            <span v-if="pedagogicalErrors.date" class="text-black text-sm md:text-base">{{
                pedagogicalErrors.date
              }}</span>
          </div>

          <div class="flex flex-col gap-3">
            <label class="text-white text-3xl leading-[100%]">
              Желаемое время
            </label>
            <input
                v-model="selectedTimePedagogical"
                type="time"
                class="w-full lg:text-2xl border border-gray-400 rounded-lg p-3"
                placeholder="15:00"
                @focus="checkAuth"
                :class="{ '!border-black border-[2px]': pedagogicalErrors.date }"
            />
            <span v-if="pedagogicalErrors.time" class="text-black text-sm md:text-base">{{
                pedagogicalErrors.time
              }}</span>
          </div>

          <div class="flex flex-col gap-3">
            <label class="text-white text-3xl leading-[100%]">
              ФИО ребенка
            </label>
            <input
                v-model="profileStore.userInfo.childName"
                type="text"
                placeholder="Иванов Иван Иванович"
                required
                class="w-full lg:text-2xl border border-gray-400 rounded-lg p-3"
                @focus="checkAuth"
            />
          </div>
        </div>
        <div class="flex items-center gap-2">
          <input
              type="checkbox"
              id="consent"
              name="consent"
              value="yes"
              required
              class="lg:w-[25px] lg:h-[25px] w-[50px] h-[50px]"
          >
          <label for="consent" class="lg:text-2xl text-3xl leading-[100%]">
            Я ознакомлен(-а) с Политикой конфиденциальности
          </label>
        </div>
        <Button
            label="Записаться"
            color="black"
            size="large"
        />
      </form>
    </div>
  </section>
  <div class="content-rectangle h-[60px] bg-orange-500 mb-[50px]"/>
  <section class="psychological-consultation flex flex-col gap-12 px-[55px] py-8 mb-[30px]">
    <div class="flex flex-col gap-[30px]">
      <h1 class="text-orange-500 text-[55px] leading-[100%]">
        Психологическая консультация
      </h1>
      <p class="text-4xl leading-[100%]">
        Онлайн-консультация с психологом, где специалист проведет диагностику и поможет решить проблемы.
      </p>
    </div>
    <SectionWithLines
        title="Стоимость"
        class="!mx-0"
    >
      <div class="space-y-10">
        <div
            v-for="priceItem in priceListPsychologic"
            class="flex items-center justify-between"
        >
            <span>
              {{ priceItem.title }}
            </span>
          <div class="flex flex-col gap-2 text-orange-500">
              <span
                  v-for="price in priceItem.prices"
              >
              {{ price }}
              </span>
          </div>
        </div>
      </div>
    </SectionWithLines>
    <div class="flex flex-col gap-5">
      <h5 class="text-4xl leading-[100%]">
        Форма для записи
      </h5>
      <form
          @submit.prevent="submitFormPsychological"
          class="bg-orange-500 flex flex-col gap-5 p-[30px] rounded-[10px]"
      >
        <div class="lg:grid lg:grid-cols-2 flex flex-col gap-5">
          <div class="flex flex-col gap-3">
            <label class="text-white text-3xl leading-[100%]">
              ФИО взрослого
            </label>
            <input
                v-model="profileStore.userInfo.fullName"
                type="text"
                placeholder="Булат Галимов Сайдашеви"
                readonly
                class="w-full lg:text-2xl border border-gray-400 rounded-lg p-3"
                @focus="checkAuth"

            />
          </div>

          <div class="flex flex-col gap-3">
            <label class="text-white text-3xl leading-[100%]">
              ФИО специалиста
            </label>
            <multiselect
                v-model="selectedConsultantPsychological"
                :options="employeeStore.allEmployees"
                :searchable="true"
                :closeOnSelect="true"
                track-by="id"
                label="fullName"
                placeholder="Выберите специалистов"
                class="custom-multiselect "
                @focus="checkAuth"
                :class="{ '!border-black !border-[2px]': psychologicalErrors.consultant }"

            />
            <span v-if="psychologicalErrors.consultant"
                  class="text-black text-sm md:text-base">{{ psychologicalErrors.consultant }}</span>
          </div>
          <div class="flex flex-col gap-3">
            <label class="text-white text-3xl leading-[100%]">
              Тип консультации
            </label>
            <input
                v-model="consultationTypePsychological"
                type="text"
                readonly
                class="w-full lg:text-2xl border border-gray-400 rounded-lg p-3"
                value="Психологическая"
                @focus="checkAuth"

            />
          </div>
          <div class="flex flex-col gap-3">
            <label class="text-white text-3xl leading-[100%]">
              Дата
            </label>
            <input
                v-model="selectedDatePsychological"
                type="date"
                class="w-full lg:text-2xl border border-gray-400 rounded-lg p-3"
                @focus="checkAuth"
                :class="{ '!border-black border-[2px]': psychologicalErrors.date }"

            />
            <span v-if="psychologicalErrors.date" class="text-black text-sm md:text-base">{{
                psychologicalErrors.date
              }}</span>
          </div>

          <div class="flex flex-col gap-3">
            <label class="text-white text-3xl leading-[100%]">
              Желаемое время
            </label>
            <input
                v-model="selectedTimePsychological"
                type="time"
                class="w-full lg:text-2xl border border-gray-400 rounded-lg p-3"
                placeholder="15:00"
                @focus="checkAuth"
                :class="{ '!border-black border-[2px]': psychologicalErrors.time }"

            />
            <span v-if="psychologicalErrors.consultant"
                  class="text-black text-sm md:text-base">{{ psychologicalErrors.time }}</span>
          </div>

          <div class="flex flex-col gap-3">
            <label class="text-white text-3xl leading-[100%]">
              ФИО ребенка
            </label>
            <input
                v-model="profileStore.userInfo.childName"
                type="text"
                placeholder="Иванов Иван Иванович"
                class="w-full lg:text-2xl border border-gray-400 rounded-lg p-3"
                @focus="checkAuth"

            />
          </div>
        </div>
        <div class="flex items-center gap-2">
          <input
              type="checkbox"
              id="consent"
              name="consent"
              value="yes"
              required
              class="lg:w-[25px] lg:h-[25px] w-[50px] h-[50px]"
          >
          <label for="consent" class="lg:text-2xl text-3xl leading-[100%]">
            Я ознакомлен(-а) с Политикой конфиденциальности
          </label>
        </div>
        <Button
            label="Записаться"
            color="black"
            size="large"
        />
      </form>

    </div>
  </section>
  <section class="consultations-going px-[55px]">
    <div class="flex flex-col items-center gap-[75px]">
      <h6 class="text-[55px]">
        Как проходят консультации?
      </h6>
      <div class="grid grid-cols-4 gap-10 mb-[50px]">
        <Circle
            v-for="circle in circleLabel"
            :label="circle.label"
        />
      </div>
    </div>
  </section>
  <section class="want-to-work flex flex-col gap-12 px-[55px] py-8 mb-[30px]">
    <div class="flex flex-col gap-[30px]">
      <h1 class="text-orange-500 text-[55px] leading-[100%]">
        Хочу работать у вас
      </h1>
      <p class="text-4xl leading-[100%]">
        Если вы — педагог или психолог и хотите присоединиться к проекту «Оранжевый помощник», мы открыты для
        сотрудничества. Работайте в удобное время, консультируйте родителей и вносите вклад в развитие
        детско-родительских отношений.
      </p>
      <p class="text-4xl leading-[100%]">
        Условия: проведение онлайн-консультаций, гибкий график, своевременная оплата.
      </p>

      <p class="text-4xl leading-[100%]">
        Для начала работы необходимо заполнить форму, пройти собеседование и внести организационный взнос.
      </p>
    </div>
  </section>
  <section class="flex flex-col gap-5 px-[55px] py-8 mb-[30px]">
    <h5 class="text-4xl leading-[100%]">
      Форма для записи
    </h5>
    <form
        @submit.prevent="handleJobSubmit"
        class="flex flex-col gap-5 p-[30px] rounded-[10px]"
    >
      <div class="lg:grid lg:grid-cols-2 flex flex-col gap-5">
        <div class="flex flex-col gap-3">
          <label class="text-3xl leading-[100%]">
            ФИО
          </label>
          <Input
              type="name"
              placeholder="Иванов Иван Иванович"
              v-model="formData.fullName"
              :class="{ '!border-red-500 !border-[2px]': jobErrors.fullName }"
          />
          <span v-if="jobErrors.fullName" class="text-red-500 text-sm md:text-base">{{ jobErrors.fullName }}</span>
        </div>
        <div class="flex flex-col gap-3">
          <label class="text-3xl leading-[100%]">
            Возраст
          </label>
          <Input
              type="number"
              placeholder="18"
              v-model="formData.age"
              :class="{ '!border-red-500 !border-[2px]': jobErrors.age }"
          />
          <span v-if="jobErrors.age" class="text-red-500 text-sm md:text-base">{{ jobErrors.age }}</span>
        </div>
        <div class="flex flex-col gap-3">
          <label class="text-3xl leading-[100%]">
            Образование
          </label>
          <Input
              type="text"
              placeholder="КФУ"
              v-model="formData.education"
              :class="{ '!border-red-500 !border-[2px]': jobErrors.age }"
          />
          <span v-if="jobErrors.education" class="text-red-500 text-sm md:text-base">{{ jobErrors.education }}</span>
        </div>
        <div class="flex flex-col gap-3">
          <label class="text-3xl leading-[100%]">
            Опыт работы(где работали)
          </label>
          <Input
              type="text"
              placeholder="1 год"
              v-model="formData.workPlace"
          />
        </div>
        <div class="flex flex-col gap-3">
          <label class="text-3xl leading-[100%]">
            Стаж работы(сколько работали)
          </label>
          <Input
              type="text"
              placeholder="1 год"
              v-model="formData.beenWorkingYears"
          />
        </div>
        <div class="flex flex-col gap-3">
          <label class="text-3xl leading-[100%]">
            Квалификация
          </label>
          <select
              v-model="formData.employeeSphera"
              class="w-full lg:text-2xl border border-[rgba(0,0,0,0.4)] rounded-[10px] p-[10px]"
              :class="{ '!border-red-500 border-[2px]': jobErrors.employeeSphera }"
          >
            <option disabled value="">Выберите квалификацию</option>
            <option value="PSYCHOLOGY">Психолог</option>
            <option value="PEDAGOGY">Педагог</option>
          </select>

          <span v-if="jobErrors.employeeSphera" class="text-red-500 text-sm md:text-base">{{
              jobErrors.employeeSphera
            }}</span>
        </div>
        <div class="flex flex-col gap-3">
          <label class="text-3xl leading-[100%]">
            Контактные данные
          </label>
          <Input
              type="phone"
              placeholder="+7 951 234 45 99"
              v-model="formData.phone"
              :class="{ '!border-red-500 !border-[2px]': jobErrors.phone }"
          />
          <span v-if="jobErrors.phone" class="text-red-500 text-sm md:text-base">{{ jobErrors.phone }}</span>
        </div>

        <div class="flex flex-col gap-3">
          <label class="text-3xl leading-[100%]">
            Почта
          </label>
          <Input
              type="email"
              placeholder="orangehelper@gmail.com"
              v-model="formData.email"
              :class="{ '!border-red-500 !border-[2px]': jobErrors.email }"
          />
          <span v-if="jobErrors.email" class="text-red-500 text-sm md:text-base">{{ jobErrors.email }}</span>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <input
            type="checkbox"
            id="consent-job"
            name="consent"
            value="yes"
            required
            class="lg:w-[25px] lg:h-[25px] w-[50px] h-[50px]"
        >
        <label for="consent-job" class="lg:text-2xl text-3xl leading-[100%]">
          Я ознакомлен(-а) с Политикой конфиденциальности
        </label>
      </div>
      <Button
          label="Отправить заявку"
          color="black"
          size="large"
      />
    </form>
  </section>
  <Footer/>
</template>

<style scoped>
@media (min-width: 1024px) {
  .custom-multiselect {
    font-size: 1.5rem;
    line-height: 2rem;
  }
}

button {
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

</style>
