<script setup>
import {ref} from 'vue';
import Header from "@/components/Header.vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import Footer from "@/components/Footer.vue";

const tabs = [
  {name: 'Личные данные'},
  {name: 'Расписание'},
  {name: 'История консультаций'},
  {name: 'Команда специалистов'},
  {name: 'Записаться'},
];

const userInfo = ref({
  fullName: "Иванов Иван Иванович",
  email: "ivanov@mail.com",
  phone: "+71234567890",
  childName: "Дмитрий Иванов"
});

const tableHeaders = [
  {label: 'Специалист'},
  {label: 'Должность'},
  {label: 'ПН'},
  {label: 'ВТ'},
  {label: 'СР'},
  {label: 'ЧТ'},
  {label: 'ПТ'},
  {label: 'СБ'},
  {label: 'ВС'},
]

const scheduleList = [
  {
    teacher: 'Ильина К. В.', post: 'Преподаватель', schedule: [
      '10:00-11:00',
      '',
      '',
      '10:00-11:00',
      '',
      '',
      '10:00-11:00'
    ]
  },
  {
    teacher: 'Сабирова Э. Г.', post: 'Преподаватель', schedule: [
      '',
      '10:00-11:00',
      '',
      '',
      '10:00-11:00',
      '',
      ''
    ]
  },
  {
    teacher: 'Иванова А. К.', post: 'Преподаватель', schedule: [
      '',
      '',
      '10:00-11:00',
      '',
      '',
      '10:00-11:00',
      ''
    ]
  }
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
  <section class="personal-page flex flex-col gap-12  mb-[50px]">
    <div class="flex flex-wrap justify-center gap-[30px] px-[55px] py-8 mx-auto">
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
    <div class="personal-content py-3 px-8 lg:px-14 lg:py-11">
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
            Ваш E-mail
          </label>
          <Input
              v-model="userInfo.email"
              type="text"
          />
        </div>
        <div class="flex flex-col gap-3">
          <label class="text-2xl">
            Контактный номер
          </label>
          <Input
              v-model="userInfo.phone"
              type="text"
          />
        </div>
        <div class="flex flex-col gap-3">
          <label class="text-2xl">
            Имя ребенка
          </label>
          <Input
              v-model="userInfo.childName"
              type="text"
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
            <div class="bg-orange-500 grid grid-cols-9 border [&>*:not(:last-child)]:border-r border-gray-600">
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
                  class="grid grid-cols-9 border-b border-gray-600  [&>*:not(:last-child)]:border-r"
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
                    v-for="scheduleDay in schedule.schedule"
                    class="px-3 py-2.5 text-base lg:text-xl break-all border-gray-600 "
                >
                  {{ scheduleDay }}
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
        <h2>Команда специалистов</h2>
      </div>

      <div v-show="activeTab === 4">
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
                  ФИО родителя
                </label>
                <Input
                    type="name"
                    placeholder="Прохова Ирина Ивановна "
                />
              </div>
              <div class="flex flex-col gap-3">
                <label class="text-white text-3xl leading-[100%]">
                  Желаемое время
                </label>
                <Input
                    type="time"
                    placeholder="15:00"
                />
              </div>
              <div class="flex flex-col gap-3">
                <label class="text-white text-3xl leading-[100%]">
                  ФИО ребенка
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
                    placeholder="04.05.2025"
                />
              </div>
              <div class="flex flex-col gap-3">
                <label class="text-white text-3xl leading-[100%]">
                  Фамилия специалиста
                </label>
                <Input
                    type="name"
                    placeholder="Козлова"
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
