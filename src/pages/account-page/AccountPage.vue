<script setup>
import {ref, onMounted} from 'vue';
import {useProfileStore} from '@/stores/profileStore';
import {useEmployeeStore} from '@/stores/employeeStore';
import Multiselect from 'vue-multiselect';
import { useToast } from 'vue-toastification';
import AxiosWrapper from "@/config/AxiosWrapper";

import Header from "@/components/Header.vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import Footer from "@/components/Footer.vue";
import defaultAvatarImg from '/public/img/empty-photo.jpg';

import {mask} from 'vue-the-mask';



const tabs = [
  {name: 'Личный кабинет'},
  {name: 'Расписание'},
  {name: 'История консультаций'},
  {name: 'Команда педагогов'},
  {name: 'Команда психологов'},
  {name: 'Подать заявку на консультацию'},
];

const tableHeaders = [
  {label: 'ФИО специалиста'},
  {label: 'Квалификация'},
  {label: 'День недели + время'},
];

const scheduleList = [
  {teacher: 'Ильина К. В.', post: 'Преподаватель', schedule: 'Понедельник 10:00-11:00'},
  {teacher: 'Сабирова Э. Г.', post: 'Преподаватель', schedule: 'Вторник 10:00-11:00'},
  {teacher: 'Иванова А. К.', post: 'Преподаватель', schedule: 'Среда 10:00-11:00'},
];

const consultationHistory = [
  {
    teacher: 'Ильина К. В.',
    post: 'Преподаватель',
    date: new Date().toDateString(),
    problem: 'Подготовка к школе',
    description: 'Проведена первичная диагностика, даны рекомендации по играм на развитие внимания и памяти.',
  },
  {
    teacher: 'Сабирова Э. Г.',
    post: 'Преподаватель',
    date: new Date().toDateString(),
    problem: 'Эмоциональные всплески у подростка',
    description: 'Консультация была направлена на определение причин, обсуждение особенностей подросткового возраста, ' +
        'подходов к диалогу. Выработана стратегия взаимодействия и предложены упражнения на эмоциональную саморегуляцию.',
  }
];

const scheduleData = ref([]);
const weekStart = ref('2025-08-01'); // Можно изменить на динамическую дату
const loading = ref(false);
const openEmployeeId = ref(null); // Идентификатор сотрудника для открытия/закрытия

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

const toggleEmployeeSlots = (employeeId) => {
  // Переключаем открытие/закрытие слотов для сотрудника
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

const toast = useToast();
const employeeStore = useEmployeeStore();
const profileStore = useProfileStore();

const activeTab = ref(0);
const defaultAvatar = defaultAvatarImg;
const selectedConsultant = ref(null);
const consultationType = ref('');
const selectedDate = ref('');
const selectedTime = ref('');

const submitForm = async () => {
  try {

    const localDate = new Date(selectedDate.value + ' ' + selectedTime.value);

    // Получаем смещение времени в минутах относительно UTC
    const timezoneOffset = localDate.getTimezoneOffset();

    // Преобразуем локальное время в UTC
    const utcDate = new Date(localDate.getTime() - timezoneOffset * 60000);

    // Преобразуем дату в нужный формат ISO с часовым поясом (+00:00)
    const formattedDate = utcDate.toISOString().replace('.000Z', '+00:00');
    const formattedTime = `1970-01-01T${selectedTime.value}:00+00:00`; // Формат времени с искусственной датой

    const requestData = {
      consultationType: consultationType.value,
      consultantId: selectedConsultant.value.id,
      userId: profileStore.userInfo.id,
      requestDate: formattedDate,  // Отправляем дату в формате UTC с часовым поясом
      requestTime: formattedTime,  // Отправляем время с часовым поясом
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
    const currentPhone = profileStore.userInfo.phone || '';
    const originalPhone = profileStore.originalPhone || '';

    let cleanedPhone = currentPhone;

    if (currentPhone !== originalPhone) {
      cleanedPhone = cleanedPhone.replace(/[^\d+]/g, '');

      if (!cleanedPhone.startsWith('+')) {
        cleanedPhone = '+7' + cleanedPhone.replace(/^[78]?/, '');
      } else if (!cleanedPhone.startsWith('+7')) {
        cleanedPhone = '+7' + cleanedPhone.slice(1).replace(/\D/g, '');
      }
      cleanedPhone = cleanedPhone.replace(/\++/g, '+');

      if (!/^\+7\d{10}$/.test(cleanedPhone)) {
        throw new Error('Номер телефона должен быть в формате +7XXXXXXXXXX');
      }
    }

    await profileStore.saveProfile({
      ...profileStore.userInfo,
      phone: cleanedPhone
    });

    await profileStore.fetchProfile();
    toast.success('Профиль обновлен');
  } catch (error) {
    console.error('Ошибка при обновлении профиля:', error);
  }
};

onMounted(() => {
  employeeStore.fetchEmployees();
  profileStore.fetchProfile();
  fetchSchedule();
});
</script>

<template>
  <Header/>
  <section class="personal-page flex flex-col gap-12 px-[55px] py-8 mb-[50px]">
    <div class="flex flex-wrap justify-center gap-[30px] mx-auto">
      <button
          v-for="(tab, index) in tabs"
          :key="tab.name"
          @click="activeTab = index"
          :class="[
          'text-3xl',
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
      <div v-show="activeTab === 0" class="grid grid-cols-2 gap-8 ">
        <div class="flex flex-col gap-3">
          <label class="text-2xl">
            ФИО
          </label>
          <input
              v-model="profileStore.userInfo.fullName"
              type="text"
              class="w-full lg:text-2xl border border-gray-400 rounded-lg p-3"
          />
        </div>

        <div class="flex flex-col gap-3">
          <label class="text-2xl">
            Возраст
          </label>
          <input
              v-model="profileStore.userInfo.age"
              type="number"
              class="w-full lg:text-2xl border border-gray-400 rounded-lg p-3"
          />
        </div>

        <div class="flex flex-col gap-3">
          <label class="text-2xl">Телефон</label>
          <input
              v-model="profileStore.userInfo.phone"
              v-mask="'+7 (###) ###-##-##'"
              type="tel"
              placeholder="+7 (___) ___-__-__"
              class="w-full lg:text-2xl border border-gray-400 rounded-lg p-3"
              required
          />
        </div>

        <div class="flex flex-col gap-3">
          <label class="text-2xl">
            E-mail
          </label>
          <input
              v-model="profileStore.userInfo.email"
              type="text"
              class="w-full lg:text-2xl border border-gray-400 rounded-lg p-3"
          />
        </div>

        <div class="flex flex-col gap-3">
          <label class="text-2xl">
            ФИО ребенка
          </label>
          <input
              v-model="profileStore.userInfo.childName"
              type="text"
              class="w-full lg:text-2xl border border-gray-400 rounded-lg p-3"
          />
        </div>

        <div class="flex flex-col gap-3">
          <label class="text-2xl">
            Возраст ребенка
          </label>
          <input
              v-model="profileStore.userInfo.childrenAge"
              type="number"
              min="1"
              max="120"
              class="w-full lg:text-2xl border border-gray-400 rounded-lg p-3"
          />
        </div>
        <Button label="Сохранить" color="orange" @click="saveProfile"/>
      </div>

      <div v-show="activeTab === 1" class="container mx-auto py-8 px-4">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="text-center mb-6">
            <h2 class="text-3xl font-semibold text-gray-900">Расписание сотрудников на неделю</h2>
            <p class="text-lg text-gray-500 mt-2">Выберите дату, чтобы посмотреть доступные слоты</p>
          </div>

          <div class="flex justify-center mb-6">
            <input
                v-model="weekStart"
                type="date"
                class="border-2 border-gray-300 rounded-md py-2 px-4"
                @change="fetchSchedule"
            />
          </div>

          <div v-if="loading" class="flex justify-center items-center text-lg text-gray-500">
            <span>Загрузка данных...</span>
          </div>

          <div v-else>
            <div v-if="scheduleData.length === 0" class="text-center text-xl text-gray-500">
              Нет доступных слотов на выбранную неделю.
            </div>

            <div v-else class="space-y-4">
              <div v-for="employee in scheduleData" :key="employee.employee_id" class="bg-gray-50 rounded-lg shadow-sm p-4">
                <!-- Имя сотрудника с кнопкой раскрытия -->
                <div @click="toggleEmployeeSlots(employee.employee_id)" class="cursor-pointer flex justify-between text-sm text-gray-700">
                  <span class="text-lg font-medium text-gray-800">{{ employee.firstName }} {{ employee.lastName }}</span>
                  <span :class="openEmployeeId === employee.employee_id ? 'text-indigo-600' : 'text-gray-500'">
                {{ openEmployeeId === employee.employee_id ? 'Скрыть' : 'Показать' }}
              </span>
                </div>

                <!-- Таблица слотов, раскрывается при клике на имя сотрудника -->
                <div v-if="openEmployeeId === employee.employee_id" class="mt-4 overflow-x-auto">
                  <table class="min-w-full table-auto border-collapse">
                    <thead>
                    <tr class="bg-orange-500 text-white">
                      <!-- Выводим уникальные даты -->
                      <th v-for="(date, index) in Object.keys(groupByDate([employee]))" :key="index" class="px-6 py-3  text-center border-r border-gray-600">
                        {{ date }}
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    <!-- Единственная строка с датами и временными слотами для каждого дня -->
                    <tr>
                      <td v-for="date in Object.keys(groupByDate([employee]))" :key="date" class="content-start bg-gray-200 px-6 py-3 text-sm border-r border-gray-600">
                        <!-- Используем Tailwind Grid для выравнивания слотов по одному уровню -->
                        <div class="grid grid-cols-1 gap-6">
                          <div v-for="slot in groupByDate([employee])[date]" :key="slot.start_time" class="text-center rounded px-1 md:px-2 py-1 text-[10px] md:text-sm lg:text-lg space-y-1 md:space-y-2 bg-orange-100">
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
        <div class="px-8 py-3 lg:">
          <div
              class="grid grid-cols-1 lg:grid-cols-2 gap-[30px]"
          >
            <div
                v-for="consultation in consultationHistory"
                class="px-5 py-2.5 flex flex-col gap-2.5 border border-black/50 rounded-[10px]"
            >
              <div class="flex items-center justify-between">
                <div class="space-y-1.5">
                  <div class="text-2xl font-bold">
                    {{ consultation.teacher }}
                  </div>
                  <div class="text-xl">
                    {{ consultation.post }}
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="text-2xl text-right">
                    {{ consultation.date }}
                  </div>
                  <div class="text-2xl text-right">
                    {{ consultation.problem }}
                  </div>
                </div>
              </div>
              <div class="text-2xl">
                {{ consultation.description }}
              </div>
              <Button
                  class="mt-auto !text-2xl"
                  color="orange"
                  @click="activeTab=4"
              >
                Записаться повторно
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div v-show="activeTab === 3">
        <div class="lg:grid lg:grid-cols-2 flex flex-col gap-[50px]">
          <div
              v-for="(teacher, key) in employeeStore.teachers"
              :key="key" class="flex flex-col gap-12 border-2 border-[rgba(255,165,0,0.5)] rounded-[10px] p-[30px]"
          >
            <div class="flex items-center gap-8">
              <img
                  :src="teacher.photoUrl ? `https://orangehelper.ru${teacher.photoUrl}` : defaultAvatar"
                  alt="avatar"
                  class="max-w-[150px] max-h-[150px] rounded-full"
              />
              <div class="flex flex-col gap-2 text-3xl">
                <label>
                  {{ teacher.fullName }}
                </label>
                <label>
                  Возраст: {{ teacher.age }}
                </label>
              </div>
            </div>
            <div class="flex flex-col gap-5">
              <div class="flex items-center gap-[10px] text-3xl">
                <label>
                  Стаж:
                </label>
                <label>
                  {{ teacher.experience }}
                </label>
              </div>
              <div class="flex items-center gap-[10px] text-3xl">
                <label>
                  Образование:
                </label>
                <label>
                  {{ teacher.education }}
                </label>
              </div>
              <div class="flex items-center gap-[10px] text-3xl">
                <label>
                  Специализация:
                </label>
                <label>
                  {{ teacher.specialization }}
                </label>
              </div>
              <div class="flex items-center gap-[10px] text-3xl">
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
        <div class="lg:grid lg:grid-cols-2 flex flex-col gap-[50px]">
          <div
              v-for="(psychologist, key) in employeeStore.psychologists"
              :key="key" class="flex flex-col gap-12 border-2 border-[rgba(255,165,0,0.5)] rounded-[10px] p-[30px]"
          >
            <div class="flex items-center gap-8">
              <div class="w-40 h-40 mx-auto">
                <img
                    :src="psychologist.photoUrl ? `https://orangehelper.ru${psychologist.photoUrl}` : '/default-avatar.jpg'"
                    alt="avatar"
                    class="rounded-full border-gray-400 border-[2px] w-full h-full object-cover"
                />
              </div>
              <div class="flex flex-col gap-2 text-3xl">
                <label>
                  {{ psychologist.fullName }}
                </label>
                <label>
                  Возраст: {{ psychologist.age }}
                </label>
              </div>
            </div>
            <div class="flex flex-col gap-5">
              <div class="flex items-center gap-[10px] text-3xl">
                <label>
                  Стаж:
                </label>
                <label>
                  {{ psychologist.experience }}
                </label>
              </div>
              <div class="flex items-center gap-[10px] text-3xl">
                <label>
                  Образование:
                </label>
                <label>
                  {{ psychologist.education || 'Не указано' }}
                </label>
              </div>
              <div class="flex items-center gap-[10px] text-3xl">
                <label>
                  Специализация:
                </label>
                <label>
                  {{ psychologist.specialization || 'Не указано' }}
                </label>
              </div>
              <div class="flex items-center gap-[10px] text-3xl">
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
        <div class="flex flex-col gap-5">
          <h5 class="text-4xl leading-[100%]">
            Форма для записи
          </h5>
          <form
              action=""
              method="post"
              @submit.prevent="submitForm"
              class="bg-orange-500 flex flex-col gap-5 p-[30px] rounded-[10px]"
          >
            <div class="flex flex-col gap-3">
              <label class="text-white text-3xl leading-[100%]">
                ФИО взрослого
              </label>
              <input
                  v-model="profileStore.userInfo.fullName"
                  type="text"
                  readonly
                  class="w-full lg:text-2xl border border-gray-400 rounded-lg p-3"
              />
            </div>
            <div class="flex flex-col gap-3">
              <label class="text-white text-3xl leading-[100%]">
                ФИО специалиста
              </label>
              <multiselect
                  v-model="selectedConsultant"
                  :options="employeeStore.allEmployees"
                  :searchable="true"
                  :closeOnSelect="true"
                  track-by="id"
                  label="fullName"
                  placeholder="Выберите специалистов"
                  class="custom-multiselect "
              />
            </div>
            <div class="flex flex-col gap-3">
              <label class="text-white text-3xl leading-[100%]">
                Тип консультации
              </label>
              <select v-model="consultationType" class="w-full lg:text-2xl border border-gray-400 rounded-lg p-3">
                <option value="psychological">
                  Психологическая
                </option>
                <option value="pedagogical">
                  Педагогическая
                </option>
              </select>
            </div>
            <div class="flex flex-col gap-3">
              <label class="text-white text-3xl leading-[100%]">
                Дата
              </label>
              <input
                  v-model="selectedDate"
                  type="date"
                  class="w-full lg:text-2xl border border-gray-400 rounded-lg p-3"
              />
            </div>
            <div class="flex flex-col gap-3">
              <label class="text-white text-3xl leading-[100%]">
                Время
              </label>
              <input
                  v-model="selectedTime"
                  type="time"
                  class="w-full lg:text-2xl border border-gray-400 rounded-lg p-3"
                  placeholder="15:00"
              />
            </div>
            <div class="flex flex-col gap-3">
              <label class="text-white text-3xl leading-[100%]">
                ФИО ребенка (если консультация для ребенка)
              </label>
              <input
                  v-model="profileStore.userInfo.childName"
                  type="text"
                  placeholder="Иванов Иван Иванович"
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
                  class="lg:w-[25px] lg:h-[25px] w-[50px] h-[50px]"
              />
              <label for="consent" class="lg:text-2xl text-3xl leading-[100%]">
                Я ознакомлен(-а) с Политикой конфиденциальности
              </label>
            </div>
            <Button
                label="Записаться"
                color="black"
                size="large"
                type="submit"
            />
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



</style>