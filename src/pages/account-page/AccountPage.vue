
<script setup>
import { ref } from 'vue';
import Header from "@/components/Header.vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import Footer from "@/components/Footer.vue";

const tabs = [
  { name: 'Личные данные' },
  { name: 'Расписание' },
  { name: 'История консультаций' },
  { name: 'Команда специалистов' },
  { name: 'Записаться' },
];

const userInfo = ref({
  fullName: "Иванов Иван Иванович",
  email: "ivanov@mail.com",
  phone: "+71234567890",
  childName: "Дмитрий Иванов"
});

const employees = [
  {
    fullName: "Белов Артём Викторович",
    age: "31 год",
    experience: "8 лет ",
    education: "СПбГУ, клиническая психология",
    specialization: "Подростковый возраст, самооценка",
    rating: "4,7",
    avatar: "src/assets/img/employee-ava_1.jpg"
  },
  {
    fullName: "Белов Артём Викторович",
    age: "31 год",
    experience: "8 лет ",
    education: "СПбГУ, клиническая психология",
    specialization: "Подростковый возраст, самооценка",
    rating: "4,7",
    avatar: "src/assets/img/employee-ava_1.jpg"
  },
  {
    fullName: "Белов Артём Викторович",
    age: "31 год",
    experience: "8 лет ",
    education: "СПбГУ, клиническая психология",
    specialization: "Подростковый возраст, самооценка",
    rating: "4,7",
    avatar: "src/assets/img/employee-ava_1.jpg"
  },
  {
    fullName: "Белов Артём Викторович",
    age: "31 год",
    experience: "8 лет ",
    education: "СПбГУ, клиническая психология",
    specialization: "Подростковый возраст, самооценка",
    rating: "4,7",
    avatar: "src/assets/img/employee-ava_1.jpg"
  },
  {
    fullName: "Белов Артём Викторович",
    age: "31 год",
    experience: "8 лет ",
    education: "СПбГУ, клиническая психология",
    specialization: "Подростковый возраст, самооценка",
    rating: "4,7",
    avatar: "src/assets/img/employee-ava_1.jpg"
  },
  {
    fullName: "Белов Артём Викторович",
    age: "31 год",
    experience: "8 лет ",
    education: "СПбГУ, клиническая психология",
    specialization: "Подростковый возраст, самооценка",
    rating: "4,7",
    avatar: "src/assets/img/employee-ava_1.jpg"
  },
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
        <h2>Расписание</h2>
      </div>

      <div v-show="activeTab === 2">
        <h2>История консультаций</h2>
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
