<script setup>
import {ref, onMounted, computed, watch, reactive} from 'vue';
import {useProfileStore} from '@/stores/profileStore';
import {useEmployeeStore} from '@/stores/employeeStore';
import Multiselect from 'vue-multiselect';
import * as yup from 'yup';
import {useToast} from 'vue-toastification';
import AxiosWrapper from "@/config/AxiosWrapper";

import Header from "@/components/Header.vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import Footer from "@/components/Footer.vue";
import defaultAvatarImg from '/public/img/empty-photo.jpg';

import {mask} from 'vue-the-mask';
import {Label} from "radix-vue";
import {useAuthStore} from "@/stores/auth";
import {useRouter} from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const tabs = [
  {name: 'Личный кабинет'},
  {name: 'Расписание'},
  {name: 'История консультаций'},
  {name: 'Команда педагогов'},
  {name: 'Команда психологов'},
  {name: 'Подать заявку на консультацию'},
];


const toast = useToast();
const employeeStore = useEmployeeStore();
const profileStore = useProfileStore();

const activeTab = ref(0);
const defaultAvatar = defaultAvatarImg;
const selectedConsultant = ref(null);
const consultationType = ref('');
const selectedDate = ref('');
const selectedTime = ref('');

const consultationData = ref([]);
const scheduleData = ref([]);
const weekStart = ref('');
const loading = ref(false);
const openEmployeeId = ref(null);
const searchQuery = ref('');
const consultationVisibility = ref([]);
const ratings = ref({});

const profileErrors = reactive({
  fullName: '',
  age: '',
  email: '',
  childName: '',
  childrenAge: ''
});

const profileSchema = yup.object().shape({
  fullName: yup.string().required('ФИО обязательно'),
  age: yup.number().required('Возраст обязателен').min(1, 'Возраст должен быть больше 0').max(120, 'Возраст не может быть больше 120'),
  email: yup.string().email('Некорректный email').required('Email обязателен'),
  childName: yup.string().nullable(),

});


const setRating = (consultationId, value) => {
  ratings.value[consultationId] = value;
};

const toggleDescription = (index) => {
  consultationVisibility.value[index] = !consultationVisibility.value[index];
}

const filteredConsultants = computed(() => {
  if (!consultationType.value) return [];

  return consultationType.value === 'psychological'
      ? employeeStore.psychologists
      : employeeStore.teachers;
});

// Следим за изменением типа консультации
watch(consultationType, (newVal) => {
  // Сбрасываем выбранного консультанта при изменении типа
  selectedConsultant.value = null;
});

const fetchSchedule = async () => {
  loading.value = true;
  try {
    const response = await AxiosWrapper.get(`/schedule/availability?week_start=${weekStart.value}`);
    scheduleData.value = response.data;
  } catch (error) {
    toast.error('Ошибка при загрузке данных');
  } finally {
    loading.value = false;
  }

};

const fetchConsultation = async () => {
  loading.value = true;
  try {
    const response = await AxiosWrapper.get(`/consultations`);
    consultationData.value = response.data;
  } catch (error) {
    toast.error('Ошибка при загрузке данных');
  } finally {
    loading.value = false;
  }
};

const completedConsultations = computed(() => {
  return consultationData.value.filter((consultation) => consultation.status === 'COMPLETED');
});

const getConsultantName = (consultantId) => {
  const consultant = employeeStore.teachers.concat(employeeStore.psychologists)
      .find((employee) => employee.id === consultantId);


  return consultant ? `${consultant.fullName}` : 'Не найден';
};

const toggleEmployeeSlots = (employeeId) => {
  openEmployeeId.value = openEmployeeId.value === employeeId ? null : employeeId;

};

const groupByDate = (data) => {
  const grouped = {};

  data.forEach((employee) => {
    employee.available_slots.forEach((slot) => {
      if (!grouped[slot.date]) {
        grouped[slot.date] = [];
      }
      grouped[slot.date].push({
        employeeId: employee.employee_id,
        name: `${employee.firstName} ${employee.lastName}`,
        start_time: slot.start_time,
        end_time: slot.end_time
      });
    });

  });

  return grouped;
};

const filteredEmployees = computed(() => {
  return scheduleData.value.filter(employee => {
    const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.value.toLowerCase());
  });

});

const submitReview = async (consultation) => {
  const reviewData = {
    rating: ratings.value[consultation.id],
    comment: consultation.comment || '',
    consultationId: consultation.id
  };

  try {
    const response = await AxiosWrapper.post('/reviews', reviewData);
    console.log('Отзыв отправлен:', response.data);
    toast.success('Отзыв успешно отправлен!');
  } catch (error) {
    console.error('Ошибка при отправке отзыва:', error);
    toast.error('Произошла ошибка при отправке отзыва.');
  }
};

const submitForm = async () => {
  try {
    // Создаем объект Date из выбранной даты и времени
    const localDate = new Date(`${selectedDate.value} ${selectedTime.value}`);

    // Получаем смещение времени в минутах относительно UTC
    const timezoneOffset = localDate.getTimezoneOffset(); // Смещение в минутах относительно UTC

    // Преобразуем локальное время в UTC, вычитая смещение для поля requestTime
    const utcDate = new Date(localDate.getTime() - timezoneOffset * 60000); // Смещение в миллисекундах (вычитаем для получения UTC)

    // Преобразуем дату в строку в формате ISO с часовым поясом (+00:00)
    const formattedDate = utcDate.toISOString().split('T')[0]; // Получаем только дату, без времени

    // Преобразуем время в нужный формат для requestTime (часы и минуты)
    const formattedTime = new Date(`${selectedDate.value}T${selectedTime.value}:00`).toISOString().split('T')[1].split('.')[0];

    // Формируем итоговый requestDate (в UTC)
    const requestDate = `${formattedDate}T${formattedTime}+00:00`;

    const requestData = {
      consultationType: consultationType.value,
      consultantId: selectedConsultant.value.id,
      userId: profileStore.userInfo.id,
      requestDate: requestDate,  // Отправляем дату в UTC с нужным временем
      requestTime: `1970-01-01T${formattedTime}+00:00`,  // Отправляем время в UTC
      childrenFullName: profileStore.userInfo.childName || null,
      childrenAge: profileStore.userInfo.childrenAge || null
    };

    const response = await AxiosWrapper.post('/consultation-requests', requestData);

    if (response.status === 201) {
      toast.success('Заявка на консультацию успешно отправлена!');
    }
  } catch (error) {
    console.error('Ошибка при отправке заявки:', error);
    toast.error('Произошла ошибка при отправке заявки.');
  }
};








const saveProfile = async () => {
  try {
    Object.keys(profileErrors).forEach((key) => (profileErrors[key] = ''));

    if (profileStore.userInfo.childrenAge === "") {
      profileStore.userInfo.childrenAge = null;  // Отправляем null, если поле пустое
    }

    await profileSchema.validate(profileStore.userInfo, { abortEarly: false });

    loading.value = true;

    await profileStore.saveProfile({
      ...profileStore.userInfo
    });

    await profileStore.fetchProfile();
    toast.success('Профиль обновлен');
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Обработка ошибок валидации
      error.inner.forEach((e) => {
        profileErrors[e.path] = e.message;
      });
    } else {
      toast.error('Произошла ошибка при обновлении профиля');
    }
  } finally {
    loading.value = false;
  }
};







onMounted(() => {
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  weekStart.value = formattedDate;

});
const checkAuth = () => {
  if (!authStore.isAuthenticated) {
    router.push({name: 'login', query: {redirect: router.currentRoute.value.fullPath}});
  }
};

onMounted(() => {
  checkAuth();
  employeeStore.fetchEmployees();
  profileStore.fetchProfile();
  fetchSchedule();
  fetchConsultation();
});
</script>

<template>
  <Header/>
  <section
      class="personal-page flex flex-col gap-3 md:gap-5 lg:gap-8 px-8 pt-4 md:px-11 md:pt-6 lg:px-[55px] lg:pt-10 mb-[30px]">
    <div class="flex flex-wrap justify-center gap-3 md:gap-5 lg:gap-8">
      <button
          v-for="(tab, index) in tabs"
          :key="tab.name"
          @click="activeTab = index"
          :class="[
          'text-sm md:text-2xl lg:text-3xl',
          activeTab === index ? 'text-black' : 'text-gray-300'
        ]"
      >
        {{ tab.name }}
        <div
            :class="[
            'h-[10px] rounded-[10px] mt-3',
            activeTab === index ? 'bg-orange-500 ' : 'bg-gray-300'
          ]"
        />
      </button>
    </div>
    <div class="personal-content">
      <div
          v-show="activeTab === 0"
          class="flex flex-col gap-3 md:gap-5 lg:grid lg:grid-cols-2 lg:gap-8"
      >
        <div class="flex flex-col gap-2 md:gap-3.5 lg:gap-5">
          <label class="text-sm md:text-xl lg:text-2xl">
            ФИО
          </label>
          <input
              v-model="profileStore.userInfo.fullName"
              type="text"
              required
              class="w-full text-sm md:text-xl lg:text-2xl p-3 border border-gray-400 rounded-lg"
          />
          <span
              v-if="profileErrors.fullName"
              class="text-red-500 text-sm"
          >
            {{ profileErrors.fullName }}
          </span>
        </div>

        <div class="flex flex-col gap-2 md:gap-3.5 lg:gap-5">
          <label class="text-sm md:text-xl lg:text-2xl">
            Возраст
          </label>
          <input
              v-model="profileStore.userInfo.age"
              type="number"
              required
              class="w-full text-sm md:text-xl lg:text-2xl p-3 border border-gray-400 rounded-lg"
          />
          <span
              v-if="profileErrors.age"
              class="text-red-500 text-sm"
          >
            {{ profileErrors.age }}
          </span>
        </div>

        <div class="flex flex-col gap-2 md:gap-3.5 lg:gap-5">
          <label class="text-sm md:text-xl lg:text-2xl">
            Телефон
          </label>
          <input
              v-model="profileStore.userInfo.phone"
              v-mask="'+7 (###) ###-##-##'"
              type="tel"
              placeholder="+7 (___) ___-__-__"
              class="w-full text-sm md:text-xl lg:text-2xl p-3 border border-gray-400 rounded-lg"
              required
          />
        </div>

        <div class="flex flex-col gap-2 md:gap-3.5 lg:gap-5">
          <label class="text-sm md:text-xl lg:text-2xl">
            E-mail
          </label>
          <input
              v-model="profileStore.userInfo.email"
              type="text"
              required
              class="w-full text-sm md:text-xl lg:text-2xl p-3 border border-gray-400 rounded-lg"
          />
          <span
              v-if="profileErrors.email"
              class="text-red-500 text-sm"
          >
            {{ profileErrors.email }}
          </span>
        </div>

        <div class="flex flex-col gap-2 md:gap-3.5 lg:gap-5">
          <label class="text-sm md:text-xl lg:text-2xl">
            ФИО ребенка
          </label>
          <input
              v-model="profileStore.userInfo.childName"
              type="text"
              class="w-full text-sm md:text-xl lg:text-2xl p-3 border border-gray-400 rounded-lg"
          />
        </div>

        <div class="flex flex-col gap-2 md:gap-3.5 lg:gap-5">
          <label class="text-sm md:text-xl lg:text-2xl">
            Возраст ребенка
          </label>
          <input
              v-model="profileStore.userInfo.childrenAge"
              type="number"
              min="1"
              max="120"
              class="w-full text-sm md:text-xl lg:text-2xl p-3 border border-gray-400 rounded-lg"
          />
        </div>
        <button
            @click="saveProfile"
            class="bg-orange-500 text-white rounded-[10px] text-base md:text-2xl lg:text-[32px] px-4 py-2.5"
        >
          Сохранить
        </button>
      </div>

      <div
          v-show="activeTab === 1"
          class="container mx-auto "
      >
        <div class="bg-white rounded-xl shadow-lg p-3 lg:p-6">
          <div class="text-center mb-6">
            <h2 class="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900">
              Расписание сотрудников на неделю
            </h2>
            <p class="text-sm md:text-base lg:text-lg text-gray-500 mt-2">
              Выберите дату, чтобы посмотреть доступные слоты
            </p>
          </div>
          <div class="flex flex-col-reverse lg:flex-row gap-4 justify-between mb-4">
            <div>
              <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Поиск по ФИО..."
                  class="text-sm md:text-base lg:text-lg border-2 border-gray-300 rounded-md py-2 px-4 w-full "
              />
            </div>
            <div>
              <input
                  v-model="weekStart"
                  type="date"
                  class="text-sm md:text-base lg:text-lg border-2 border-gray-300 rounded-md py-2 px-4 w-full "
                  @change="fetchSchedule"
              />
            </div>
          </div>
          <div
              v-if="loading"
              class="flex justify-center items-center text-lg text-gray-500"
          >
            <span>
              Загрузка данных...
            </span>
          </div>
          <div v-else>
            <div
                v-if="filteredEmployees.length === 0"
                class="text-center text-xl text-gray-500"
            >
              Нет доступных слотов на выбранную неделю.
            </div>
            <div
                v-else
                class="space-y-4"
            >
              <div
                  v-for="employee in filteredEmployees"
                  :key="employee.employee_id"
                  class="bg-gray-50 rounded-lg shadow-sm p-4"
              >
                <div
                    @click="toggleEmployeeSlots(employee.employee_id)"
                    class="cursor-pointer flex justify-between text-sm text-gray-700"
                >
                  <span
                      class="text-base lg:text-lg font-medium text-gray-800">
                    {{ employee.firstName }} {{ employee.lastName }}
                  </span>
                  <span :class="openEmployeeId === employee.employee_id ? 'text-indigo-600' : 'text-gray-500'">
                    {{ openEmployeeId === employee.employee_id ? 'Скрыть' : 'Показать' }}
                  </span>
                </div>

                <div
                    v-if="openEmployeeId === employee.employee_id"
                    class="mt-4 overflow-x-auto"
                >
                  <table class="min-w-full table-auto border-collapse">
                    <thead>
                    <tr class="bg-orange-500 text-white">
                      <th
                          v-for="(date, index) in Object.keys(groupByDate([employee]))"
                          :key="index"
                          class="text-sm md:text-base lg:text-lg px-6 py-3 text-center border-r border-gray-600"
                      >
                        {{ date }}
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td
                          v-for="date in Object.keys(groupByDate([employee]))"
                          :key="date"
                          class="content-start bg-gray-200 px-6 py-3 text-sm border-r border-gray-600"
                      >
                        <div class="grid grid-cols-1 gap-6">
                          <div
                              v-for="slot in groupByDate([employee])[date]"
                              :key="slot.start_time"
                              class="text-center rounded px-1 md:px-2 py-1 text-[10px] md:text-sm lg:text-lg space-y-1 md:space-y-2 bg-orange-100"
                          >
                            {{ slot.start_time }} - {{ slot.end_time }}
                          </div>
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-show="activeTab === 2">
        <div class="lg:px-8 lg:py-3 ">
          <div
              class="grid grid-cols-1 lg:grid-cols-2 gap-[30px]"
          >
            <div
                v-for="(consultation, index) in completedConsultations"
                :key="consultation.id"
                class="px-3 py-2 lg:px-5 lg:py-2.5 flex flex-col gap-2.5 border border-black/50 rounded-[10px]"
            >
              <div class="flex  justify-between">
                <div class="space-y-1.5">
                  <div class="text-base md:text-xl lg:text-2xl font-bold">
                    {{ getConsultantName(consultation.consultantId) }}
                  </div>
                  <div class="text-sm md:text-base lg:text-xl">
                    {{ consultation.consultationType === 'PEDAGOGICAL' ? 'Педагогическая' : 'Психологическая' }}
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="text-base md:text-xl lg:text-2xl text-right">
                    {{
                      new Date(consultation.consultationDate).toISOString().split('T')[0].split('-').reverse().join('-')
                    }}
                  </div>
                  <div class="text-sm md:text-base lg:text-xl text-right">
                    {{ new Date(consultation.consultationTime).toLocaleTimeString() }}
                  </div>
                </div>
              </div>
              <div
                  @click="toggleDescription(index)"
                  class="text-base md:text-lg lg:text-xl cursor-pointer"
              >
                Пометка от консультанта
              </div>
              <div
                  v-if="consultationVisibility[index]"
                  class="text-base md:text-lg lg:text-xl"
              >
                {{ consultation.description }}
              </div>
              <div
                  v-if="!consultation?.isReviewExist"
                  class="flex flex-col gap-y-4 mt-auto"
              >
                <div class="">
                  <label class="block text-base md:text-lg lg:text-xl mb-2">
                    Оставить отзыв
                  </label>
                  <textarea
                      v-model="consultation.comment"
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-auto"
                      placeholder="Оценка консультации.."
                      style="height: 111px;"
                  >

                </textarea>
                </div>
                <div class="flex gap-2">
                <span
                    v-for="index in 5"
                    :key="index"
                    @click="setRating(consultation.id, index)"
                    :class="{
                      'text-yellow-500': ratings[consultation.id] >= index,
                      'text-black': ratings[consultation.id] < index
                    }"
                    class="cursor-pointer text-3xl lg:text-5xl"
                >
                  &#9733;
                </span>
                </div>
                <button
                    @click="submitReview(consultation)"
                    class="w-full bg-orange-500 text-white rounded-[10px] text-base md:text-xl lg:text-2xl px-4 py-2.5 mt-auto"
                >
                  Отправить отзыв
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-show="activeTab === 3">
        <div class="lg:grid lg:grid-cols-2 flex flex-col gap-4 md:gap-8 lg:gap-[50px]">
          <div
              v-for="(teacher, key) in employeeStore.teachers"
              :key="key"
              class="flex flex-col gap-12 border-2 border-[rgba(255,165,0,0.5)] rounded-[10px] p-2 md:p-4 lg:p-[30px]"
          >
            <div class="flex items-center gap-4 lg:gap-8">
              <div class="w-10 h-10 md:w-20 md:h-20 lg:w-40 lg:h-40">
                <img
                    :src="teacher.photoUrl ? `https://orangehelper.ru${teacher.photoUrl}` : '/default-avatar.jpg'"
                    alt="avatar"
                    class="rounded-full border-gray-400 border-[2px] w-full h-full object-cover"
                />
              </div>
              <div class="flex flex-col gap-1 lg:gap-2 text-base md:text-xl lg:text-3xl">
                <label>
                  {{ teacher.fullName }}
                </label>
                <label>
                  Возраст: {{ teacher.age }}
                </label>
              </div>
            </div>
            <div class="flex flex-col gap-2 lg:gap-5">
              <div class="flex gap-[10px] text-base md:text-xl lg:text-2xl">
                <label>
                  Стаж:
                </label>
                <label>
                  {{ teacher.experience }}
                </label>
              </div>
              <div class="flex gap-[10px] text-base md:text-xl lg:text-2xl ">
                <label>
                  Образование:
                </label>
                <label>
                  {{ teacher.education }}
                </label>
              </div>
              <div class="flex  gap-[10px] text-base md:text-xl lg:text-2xl">
                <label>
                  Специализация:
                </label>
                <label>
                  {{ teacher.specialization }}
                </label>
              </div>
              <div class="flex  gap-[10px] text-base md:text-xl lg:text-2xl">
                <label>
                  Отзывы:
                </label>
                <label>
                  {{ teacher.rating }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="activeTab === 4">
        <div class="lg:grid lg:grid-cols-2 flex flex-col gap-4 md:gap-8 lg:gap-[50px]">
          <div
              v-for="(psychologist, key) in employeeStore.psychologists"
              :key="key"
              class="flex flex-col gap-2 md:gap-8 lg:gap-12 border-2 border-[rgba(255,165,0,0.5)] rounded-[10px] p-2 md:p-4 lg:p-[30px]"
          >
            <div class="flex items-center gap-4 lg:gap-8">
              <div class="w-10 h-10 md:w-20 md:h-20 lg:w-40 lg:h-40">
                <img
                    :src="psychologist.photoUrl ? `https://orangehelper.ru${psychologist.photoUrl}` : '/default-avatar.jpg'"
                    alt="avatar"
                    class="rounded-full border-gray-400 border-[2px] w-full h-full object-cover"
                />
              </div>
              <div class="flex flex-col gap-1 lg:gap-2 text-base md:text-xl lg:text-3xl">
                <label>
                  {{ psychologist.fullName }}
                </label>
                <label>
                  Возраст: {{ psychologist.age }}
                </label>
              </div>
            </div>
            <div class="flex flex-col gap-2 lg:gap-5">
              <div class="flex gap-[10px] text-base md:text-xl lg:text-2xl">
                <label>
                  Стаж:
                </label>
                <label>
                  {{ psychologist.experience }}
                </label>
              </div>
              <div class="flex  gap-[10px] text-base md:text-xl lg:text-2xl">
                <label>
                  Образование:
                </label>
                <label>
                  {{ psychologist.education || 'Не указано' }}
                </label>
              </div>
              <div class="flex gap-[10px] text-base md:text-xl lg:text-2xl">
                <label>
                  Специализация:
                </label>
                <label>
                  {{ psychologist.specialization || 'Не указано' }}
                </label>
              </div>
              <div class="flex  gap-[10px] text-base md:text-xl lg:text-2xl">
                <label>
                  Отзывы:
                </label>
                <label>
                  {{ psychologist.rating }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="activeTab === 5">
        <div class="flex flex-col gap-3 lg:gap-5">
          <h5 class="text-xl md:text-[28px] lg:text-4xl leading-[100%]">
            Форма для записи
          </h5>
          <form
              action=""
              method="post"
              @submit.prevent="submitForm"
              class="bg-orange-500 flex flex-col gap-5 p-4  lg:p-8 rounded-[10px]"
          >
            <div class="flex flex-col gap-3">
              <label class="text-white text-sm md:text-xl lg:text-2xl leading-[100%]">
                ФИО взрослого
              </label>
              <input
                  v-model="profileStore.userInfo.fullName"
                  type="text"
                  required
                  readonly
                  class="w-full lg:text-2xl border border-gray-400 rounded-lg p-3"
              />
            </div>
            <div class="flex flex-col gap-3">
              <label class="text-white text-sm md:text-xl lg:text-2xl leading-[100%]">
                Тип консультации
              </label>
              <select
                  v-model="consultationType"
                  required
                  class="w-full lg:text-2xl border border-gray-400 rounded-lg p-3"
              >
                <option value="psychological">
                  Психологическая
                </option>
                <option value="pedagogical">
                  Педагогическая
                </option>
              </select>
            </div>

            <div class="flex flex-col gap-3">
              <label class="text-white text-sm md:text-xl lg:text-2xl leading-[100%]">
                ФИО специалиста
              </label>
              <multiselect
                  v-model="selectedConsultant"
                  :options="filteredConsultants"
                  :searchable="true"
                  :closeOnSelect="true"
                  :disabled="!consultationType"
                  track-by="id"
                  label="fullName"
                  placeholder="Выберите специалиста"
                  class="custom-multiselect"
                  :class="{ 'opacity-50 cursor-not-allowed': !consultationType }"
                  required
              >
                <template #noOptions>
                  {{ consultationType ? 'Нет доступных специалистов' : 'Сначала выберите тип консультации' }}
                </template>
              </multiselect>
            </div>
            <div class="flex flex-col gap-3">
              <label class="text-white text-sm md:text-xl lg:text-2xl leading-[100%]">
                Дата
              </label>
              <input
                  v-model="selectedDate"
                  type="date"
                  required
                  class="w-full lg:text-2xl border border-gray-400 rounded-lg p-3"
              />
            </div>
            <div class="flex flex-col gap-3">
              <label class="text-white text-sm md:text-xl lg:text-2xl leading-[100%]">
                Время
              </label>
              <input
                  v-model="selectedTime"
                  type="time"
                  required
                  placeholder="15:00"
                  class="w-full lg:text-2xl border border-gray-400 rounded-lg p-3"
              />
            </div>
            <div class="flex flex-col gap-3">
              <label class="text-white text-sm md:text-xl lg:text-2xl leading-[100%]">
                ФИО ребенка (если консультация для ребенка)
              </label>
              <input
                  v-model="profileStore.userInfo.childName"
                  type="text"
                  placeholder="Иванов Иван Иванович"
                  class="w-full lg:text-2xl border border-gray-400 rounded-lg p-3"
              />
            </div>
            <div class="flex flex-col gap-3">
              <label class="text-white text-sm md:text-xl lg:text-2xl leading-[100%]">
                Возраст ребенка
              </label>
              <input
                  v-model="profileStore.userInfo.childrenAge"
                  type="number"
                  class="w-full lg:text-2xl border border-gray-400 rounded-lg p-3"
              />
            </div>

            <div class="flex items-center gap-2">
              <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  value="yes"
                  required
                  class="w-4 h-4 md:w-6 md:h-6 lg:w-9 lg:h-9"
              />
              <label for="consent" class="text-xs md:text-sm lg:text-2xl leading-[100%] text-gray-600">
                Я ознакомлен(-а) с Политикой конфиденциальности
              </label>
            </div>
            <button
                class="bg-black text-white rounded-[10px] text-base md:text-2xl lg:text-[32px]px-4 py-2.5"
            >
              Записаться
            </button>
            <!--            <Button-->
            <!--                label="Записаться"-->
            <!--                color="black"-->
            <!--                size="large"-->
            <!--                type="submit"-->
            <!--            />-->
          </form>
        </div>
      </div>
    </div>
  </section>
  <Footer/>
</template>

<style scoped>

button {
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.custom-multiselect {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  padding: 0.75rem;
  background-color: white;
  cursor: pointer;
}

.text-yellow-500 {
  color: #fbbf24;
}

.text-black {
  color: black;
}
</style>
