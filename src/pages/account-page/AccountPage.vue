<script setup>
import { ref } from 'vue';
import Header from "@/components/Header.vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import Footer from "@/components/Footer.vue";

const tabs = [
  { name: 'Личный кабинет' },
  { name: 'Расписание' },
  { name: 'История консультаций' },
  { name: 'Команда педагогов' },
  { name: 'Команда психологов' },
  { name: 'Подать заявку на консультацию' },
];

const userInfo = ref({
  fullName: "Иванов Иван Иванович",
  email: "ivanov@mail.com",
  phone: "+71234567890",
  childName: "Дмитрий Иванов",
  age: 32,
  childrenAge: 7,
});

const employees = [
  {
    fullName: "Сабирова Эльвира Гильфановна ",
    age: "31 год",
    experience: "8 лет",
    education: "ИпиО КФУ",
    specialization: "Подростковый возраст, самооценка",
    rating: "5,0",
    avatar: "/src/assets/img/elvira.png"
  },
  {
    fullName: "Ильина Ксения Алексеевна ",
    age: "23 года",
    experience: "2 года ",
    education: "ИпиО КФУ",
    specialization: "Подростковый возраст, самооценка",
    rating: "5,0",
    avatar: "/src/assets/img/ksusha.png"
  },
  {
    fullName: "Иванова Алёна Кирилловна ",
    age: "23 года",
    experience: "2 года",
    education: "ИпиО КФУ",
    specialization: "Подростковый возраст, самооценка",
    rating: "5,0",
    avatar: "/src/assets/img/alyona.png"
  },
]

const tableHeaders = [
  {label: 'ФИО специалиста'},
  {label: 'Квалификация'},
  {label: 'День недели + время'},
]

const scheduleList = [
  {teacher: 'Ильина К. В.', post: 'Преподаватель', schedule: 'Понедельник 10:00-11:00'},
  {teacher: 'Сабирова Э. Г.', post: 'Преподаватель', schedule: 'Вторник 10:00-11:00'},
  {teacher: 'Иванова А. К.', post: 'Преподаватель', schedule: 'Среда 10:00-11:00'},
]

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
]

const activeTab = ref(0);
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
      <div
        v-show="activeTab === 0"
        class="flex flex-col gap-8 lg:w-1/2 w-full"
      >
        <div class="flex flex-col gap-3">
          <label class="text-2xl">
            ФИО
          </label>
          <Input
            v-model="userInfo.fullName"
            type="text"
          />
        </div>

        <div class="flex flex-col gap-3">
          <label class="text-2xl">
            Возраст
          </label>
          <Input
              v-model="userInfo.fullName"
              type="number"
          />
        </div>

        <div class="flex flex-col gap-3">
          <label class="text-2xl">
             Телефон
          </label>
          <Input
              v-model="userInfo.phone"
              type="text"
          />
        </div>

        <div class="flex flex-col gap-3">
          <label class="text-2xl">
            E-mail
          </label>
          <Input
            v-model="userInfo.email"
            type="text"
          />
        </div>

        <div class="flex flex-col gap-3">
          <label class="text-2xl">
            ФИО ребенка
          </label>
          <Input
            v-model="userInfo.childName"
            type="text"
          />
        </div>

        <div class="flex flex-col gap-3">
          <label class="text-2xl">
            Возраст ребенка
          </label>
          <Input
              v-model="userInfo.childrenAge"
              type="number"
          />
        </div>

        <Button
          label="Сохранить"
          color="orange"
        >
        </Button>
      </div>

      <div v-show="activeTab === 1">
        <div class="lg:px-14 lg:py-11">
          <div class="w-full text-black bg-orange-500 rounded-sm">
            <div class="bg-orange-500 grid grid-cols-3 border [&>*:not(:last-child)]:border-r border-gray-600">
              <div
                  v-for="head in tableHeaders"
                  class="px-3 py-2.5 text-base lg:text-xl border-gray-600 break-all"
              >
                {{ head.label }}
              </div>
            </div>
            <div class="bg-gray-200  border-r border-l border-gray-600">
              <div
                  v-for="schedule in scheduleList"
                  class="grid grid-cols-3 border-b border-gray-600  [&>*:not(:last-child)]:border-r"
              >
                <div
                    class="px-3 py-2.5 text-base lg:text-xl break-all border-gray-600 "
                >
                  {{ schedule.teacher }}
                </div>
                <div
                    class="px-3 py-2.5 text-base lg:text-xl break-all border-gray-600 "
                >
                  {{ schedule.post }}
                </div>
                <div
                    class="px-3 py-2.5 text-base lg:text-xl break-all border-gray-600 "
                >
                  {{ schedule.schedule }}
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
                  <div class="text-2xl font-bold">{{consultation.teacher}}</div>
                  <div class="text-xl">{{consultation.post}}</div>
                </div>
                <div class="space-y-1.5">
                  <div class="text-2xl text-right">{{consultation.date}}</div>
                  <div class="text-2xl text-right">{{consultation.problem}}</div>
                </div>
              </div>
              <div class="text-2xl">
                {{consultation.description}}
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
            v-for="(employee, key) in employees"
            :key=key
            class="flex flex-col gap-12 border-2 border-[rgba(255,165,0,0.5)] rounded-[10px] p-[30px]"
          >
            <div class="flex items-center gap-8">
              <img
                :src=employee.avatar
                alt="avatar"
                class="max-w-[150px] max-h-[150px] rounded-full"
              >
              <div class="flex flex-col gap-2 text-3xl">
                <label>
                  {{ employee.fullName }}
                </label>
                <label>
                  {{employee.age}}
                </label>
              </div>
            </div>
            <div class="flex flex-col gap-5">
              <div class="flex items-center gap-[10px] text-3xl">
                <label>Стаж:</label>
                <label>{{employee.experience}}</label>
              </div>
              <div class="flex items-center gap-[10px] text-3xl">
                <label>Образование:</label>
                <label>{{employee.education}}</label>
              </div>
              <div class="flex items-center gap-[10px] text-3xl">
                <label>Специализация: </label>
                <label>{{employee.specialization}}</label>
              </div>
              <div class="flex items-center gap-[10px] text-3xl">
                <label>Отзывы:</label>
                <label>{{ employee.rating }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-show="activeTab === 4">
        <div class="lg:grid lg:grid-cols-2 flex flex-col gap-[50px]">
          <div
              v-for="(employee, key) in employees"
              :key=key
              class="flex flex-col gap-12 border-2 border-[rgba(255,165,0,0.5)] rounded-[10px] p-[30px]"
          >
            <div class="flex items-center gap-8">
              <img
                  :src=employee.avatar
                  alt="avatar"
                  class="max-w-[150px] max-h-[150px] rounded-full"
              >
              <div class="flex flex-col gap-2 text-3xl">
                <label>
                  {{ employee.fullName }}
                </label>
                <label>
                  {{employee.age}}
                </label>
              </div>
            </div>
            <div class="flex flex-col gap-5">
              <div class="flex items-center gap-[10px] text-3xl">
                <label>Стаж:</label>
                <label>{{employee.experience}}</label>
              </div>
              <div class="flex items-center gap-[10px] text-3xl">
                <label>Образование:</label>
                <label>{{employee.education}}</label>
              </div>
              <div class="flex items-center gap-[10px] text-3xl">
                <label>Специализация: </label>
                <label>{{employee.specialization}}</label>
              </div>
              <div class="flex items-center gap-[10px] text-3xl">
                <label>Отзывы:</label>
                <label>{{ employee.rating }}</label>
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
            class="bg-orange-500 flex flex-col gap-5 p-[30px] rounded-[10px]"
          >
            <div class="lg:grid lg:grid-cols-2 flex flex-col gap-5">
              <div class="flex flex-col gap-3">
                <label class="text-white text-3xl leading-[100%]">
                  ФИО взрослого
                </label>
                <Input
                  type="name"
                  placeholder="Прохова Ирина Ивановна "
                />
              </div>

              <div class="flex flex-col gap-3">
                <label class="text-white text-3xl leading-[100%]">
                  ФИО специалиста
                </label>
                <Input
                    type="name"
                    placeholder="Прохова Ирина Ивановна "
                />
              </div>
              <div class="flex flex-col gap-3">
                <label class="text-white text-3xl leading-[100%]">
                  Дата
                </label>
                <Input
                    type="date"
                />
              </div>

              <div class="flex flex-col gap-3">
                <label class="text-white text-3xl leading-[100%]">
                  Время
                </label>
                <Input
                  type="time"
                  placeholder="15:00"
                />
              </div>
              <div class="flex flex-col gap-3">
                <label class="text-white text-3xl leading-[100%]">
                  ФИО ребенка(если консультация для ребенка)
                </label>
                <Input
                  type="name"
                  placeholder="Прохова Ирина Ивановна "
                />
              </div>

              <div class="flex flex-col gap-3 justify-end">
                <label class="text-white text-3xl leading-[100%]">
                  Возраст ребенка
                </label>
                <Input
                  type="age"
                  placeholder="18"
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
