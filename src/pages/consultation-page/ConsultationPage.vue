<script setup>
import {onMounted, ref} from 'vue';
import AxiosWrapper from '@/config/AxiosWrapper';
import {useProfileStore} from '@/stores/profileStore';
import {useEmployeeStore} from '@/stores/employeeStore';
import {useAuthStore} from "@/stores/auth.js";
import Multiselect from "vue-multiselect";
import {useToast} from 'vue-toastification';
import {useRouter} from "vue-router";


import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import Circle from "@/components/Circle.vue";
import SectionWithLines from "@/components/main-page/SectionWithLines.vue";

const authStore = useAuthStore();
const router = useRouter();

const checkAuth = () => {
  if (!authStore.isAuthenticated) {
    router.push({name: "login", query: {redirect: router.currentRoute.value.fullPath}});
  }
};

const toast = useToast();
const employeeStore = useEmployeeStore();
const profileStore = useProfileStore();

const selectedConsultantPedagogical = ref(null);
const selectedDatePedagogical = ref('');
const selectedTimePedagogical = ref('');
const consultationTypePedagogical = ref('Педагогическая')

const selectedConsultantPsychological = ref(null);
const selectedDatePsychological = ref('');
const selectedTimePsychological = ref('');
const consultationTypePsychological = ref('Психологическая')

const submitFormPedagogical = async () => {
  try {

    const localDate = new Date(selectedDatePedagogical.value + ' ' + selectedTimePedagogical.value);

    // Получаем смещение времени в минутах относительно UTC
    const timezoneOffset = localDate.getTimezoneOffset();

    // Преобразуем локальное время в UTC
    const utcDate = new Date(localDate.getTime() - timezoneOffset * 60000);

    // Преобразуем время в нужный формат ISO с часовым поясом (+00:00)
    const formattedDate = utcDate.toISOString().replace('.000Z', '+00:00');
    const formattedTime = `1970-01-01T${selectedTimePedagogical.value}:00+00:00`;

    const requestData = {
      consultationType: 'pedagogical',
      consultantId: selectedConsultantPedagogical.value.id,
      userId: profileStore.userInfo.id,
      requestDate: formattedDate,
      requestTime: formattedTime,
      childrenFullName: profileStore.userInfo.childName || null,
      childrenAge: profileStore.userInfo.childrenAge  || null,
    };

    const response = await AxiosWrapper.post('/consultation-requests', requestData);

    if (response.status === 201) {
      toast.success('Заявка на педагогическую консультацию успешно отправлена!');

      selectedTimePedagogical.value = null;
      selectedDatePedagogical.value = '';
      selectedTimePedagogical.value = '';
      profileStore.userInfo.childName = null;
    }
  } catch (error) {
    console.error('Ошибка при отправке заявки:', error);
    toast.error('Произошла ошибка при отправке заявки.', error);
  }
};

const submitFormPsychological = async () => {
  try {

    const localDate = new Date(selectedDatePsychological.value + ' ' + selectedTimePsychological.value);

    // Получаем смещение времени в минутах относительно UTC
    const timezoneOffset = localDate.getTimezoneOffset();

    // Преобразуем локальное время в UTC
    const utcDate = new Date(localDate.getTime() - timezoneOffset * 60000);

    // Преобразуем время в нужный формат ISO с часовым поясом (+00:00)
    const formattedDate = utcDate.toISOString().replace('.000Z', '+00:00');
    const formattedTime = `1970-01-01T${selectedTimePsychological.value}:00+00:00`;

    const requestData = {
      consultationType: 'psychological',
      consultantId: selectedConsultantPsychological.value.id,
      userId: profileStore.userInfo.id,
      requestDate: formattedDate,
      requestTime: formattedTime,
      childrenFullName: profileStore.userInfo.childName || null,
      childrenAge: profileStore.userInfo.childrenAge || null,
    };

    const response = await AxiosWrapper.post('/consultation-requests', requestData);

    if (response.status === 201) {
      toast.success('Заявка на психологическую консультацию успешно отправлена!');

      selectedConsultantPsychological.value = null;
      selectedDatePsychological.value = '';
      selectedTimePsychological.value = '';
      profileStore.userInfo.childName = null;
    }

  } catch (error) {
    console.error('Ошибка при отправке заявки:', error);
    toast.error('Произошла ошибка при отправке заявки.');
  }
};


const formData = ref({
  fullName: '',
  age: '',
  education: '',
  workPlace: '',
  beenWorkingYears: '',
  employeeSphera: '',
  phone: ''
});

const handleJobSubmit = async () => {
  try {
    let cleanedPhone = formData.value.phone.replace(/[^\d+]/g, '');

    if (!cleanedPhone.startsWith('+')) {
      cleanedPhone = '+7' + cleanedPhone.replace(/^[78]?/, '');
    } else if (cleanedPhone.startsWith('+') && !cleanedPhone.startsWith('+7')) {
      cleanedPhone = '+7' + cleanedPhone.slice(1).replace(/\D/g, '');
    }

    cleanedPhone = cleanedPhone.replace(/\++/g, '+');

    if (cleanedPhone.length < 12) {
      throw new Error('Номер телефона слишком короткий');
    }

    const payload = {
      ...formData.value,
      phone: cleanedPhone
    };

    await AxiosWrapper.post('/job/request', payload);
    alert('Заявка успешно отправлена!');
  } catch (err) {
    console.error('Ошибка при отправке заявки:', err.response?.data || err.message);
    alert('Ошибка при отправке формы: ' + (err.response?.data?.message || err.message));
  }
};

const circleLabel = [
  {
    label: "Вы оставляете заявку"
  },
  {
    label: "Наш специалист уточняет детали с вами"
  },
  {
    label: "Прохождение консультациии"
  },
  {
    label: "Получение рекомендаций"
  }

];

const priceListPedagogic = [
  {title: 'Первая консультация', prices: ['бесплатная']},
  {title: 'Консультация с педагогом', prices: ['30 минут - 1500 руб', '60 минут - 2500 руб']},
]

const priceListPsychologic = [
  {title: 'Первая консультация', prices: ['бесплатная']},
  {title: 'Консультация с психологом', prices: ['30 минут - 1500 руб', '60 минут - 2500 руб']},
]

onMounted(() => {
  employeeStore.fetchEmployees();
  profileStore.fetchProfile();
});
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
          action=""
          method="post"
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
                required
                @focus="checkAuth"
            />
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
                required
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
                required
                @focus="checkAuth"
            />
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
                required
                @focus="checkAuth"
            />
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
          action=""
          method="post"
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
                required
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
                required
                @focus="checkAuth"

            />
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
                required
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
                required
                @focus="checkAuth"

            />
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
                required
                @focus="checkAuth"

            />
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
                required
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
        action=""
        method="post"
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
          />
        </div>
        <div class="flex flex-col gap-3">
          <label class="text-3xl leading-[100%]">
            Возраст
          </label>
          <Input
              type="number"
              placeholder="18"
              v-model="formData.age"
          />
        </div>
        <div class="flex flex-col gap-3">
          <label class="text-3xl leading-[100%]">
            Образование
          </label>
          <Input
              type="text"
              placeholder="КФУ"
              v-model="formData.education"
          />
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
          >
            <option disabled value="">Выберите квалификацию</option>
            <option value="PSYCHOLOGY">Психолог</option>
            <option value="PEDAGOGY">Педагог</option>
          </select>

        </div>
        <div class="flex flex-col gap-3">
          <label class="text-3xl leading-[100%]">
            Контактные данные
          </label>
          <Input
              type="phone"
              placeholder="+7 951 234 45 99"
              v-model="formData.phone"
          />
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
