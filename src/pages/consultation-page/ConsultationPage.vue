<script setup lang="ts">

import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import InfoCard from "@/components/InfoCard.vue";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import Circle from "@/components/Circle.vue";
import SectionWithLines from "@/components/main-page/SectionWithLines.vue";

const cards_1 = [
  {
    text: "Онлайн-формат через Zoom / Skype"
  },
  {
    text: "Длительность — 45 минут"
  },
  {
    text: "Возраст ребёнка — от 3 до 17 лет"
  },
  {
    text: "Стоимость от 1000 рублей"
  }
];

const cards_2 = [
  {
    text: "Онлайн-формат через Zoom / Skype"
  },
  {
    text: "Длительность — 60 минут"
  },
  {
    text: "Гарантированная конфиденциальность "
  },
  {
    text: "Стоимость от 3000 рублей"
  }
];

const cards_3 = [
  {
    text: "Удаленный формат работы "
  },
  {
    text: "Платформа предоставляет инструменты для работы и поддержку"
  },
  {
    text: "Гибкий график "
  },
  {
    text: "Своевременная оплата"
  },
  /*{
    text: "Обязательное наличие профильного образования и опыта работы с детьми/семьями"
  }*/
];

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
</script>

<template>
  <Header />
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
      <img src="@/assets/img/pedagogical-consultation_1.svg" alt="">
      <img src="@/assets/img/pedagogical-consultation_2.svg" alt="">
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
    <div class="flex flex-col items-center gap-12">
      <h1 class="text-orange-500 text-[55px] leading-[100%]">
        Условия
      </h1>
      <div class="lg:flex grid grid-cols-2 gap-[80px]">
        <InfoCard
          v-for="(card,key) in cards_1"
          :key="key"
          :text="card.text"
          class="lg:max-w-[250px] lg:p-[20px] p-[40px]"
        />
      </div>
    </div>
    <div class="content-rectangle h-[5px] bg-orange-500 " />
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
              placeholder="04.05.2025"
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
              ФИО ребенка(если консультация для ребенка)
            </label>
            <Input
              type="name"
              placeholder="Прохова Ирина Ивановна "
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
  <div class="content-rectangle h-[60px] bg-orange-500 mb-[50px]" />
  <section class="psychological-consultation flex flex-col gap-12 px-[55px] py-8 mb-[30px]">
    <div class="flex flex-col gap-[30px]">
      <h1 class="text-orange-500 text-[55px] leading-[100%]">
        Психологическая консультация
      </h1>
      <p class="text-4xl leading-[100%]">
        Онлайн-консультация с психологом, где специалист проведет диагностику и поможет решить проблемы.
      </p>
    </div>
    <div class="flex flex-col items-center gap-12">
      <h1 class="text-orange-500 text-[55px] leading-[100%]">
        Условия
      </h1>
      <div class="lg:flex grid grid-cols-2 gap-[80px]">
        <InfoCard
          v-for="(card,key) in cards_2"
          :key="key"
          :text="card.text"
          class="lg:max-w-[250px] lg:p-[20px] p-[40px]"
        />
      </div>
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
                placeholder="04.05.2025"
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
              ФИО ребенка(если консультация для ребенка)
            </label>
            <Input
                type="name"
                placeholder="Прохова Ирина Ивановна "
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
        <br/>
        <br>
        Для начала работы необходимо заполнить форму, пройти собеседование и внести организационный взнос.
      </p>
    </div>
    <div class="flex flex-col lg:flex-row lg:gap-[250px] gap-[30px]">
      <div class="flex flex-col gap-6">
        <h1 class="text-orange-500 text-4xl leading-[100%]">
          Условия
        </h1>
        <div class="grid grid-cols-2 gap-[80px]">
          <InfoCard
            v-for="(card,key) in cards_3"
            :key="key"
            :text="card.text"
            class="lg:max-w-[420px] lg:p-[20px] p-[40px]"
          />
        </div>
      </div>
      <img src="@/assets/img/useful-platform.svg" alt="">
    </div>
  </section>
  <section class="flex flex-col gap-5 px-[55px] py-8 mb-[30px]">
    <h5 class="text-4xl leading-[100%]">
      Форма для записи
    </h5>
    <form
      action=""
      method="post"
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
          />
        </div>
        <div class="flex flex-col gap-3">
          <label class="text-3xl leading-[100%]">
            Возраст
          </label>
          <Input
            type="number"
            placeholder="18"
          />
        </div>
        <div class="flex flex-col gap-3">
          <label class="text-3xl leading-[100%]">
            Образование
          </label>
          <Input
              type="text"
              placeholder="КФУ"
          />
        </div>
        <div class="flex flex-col gap-3">
          <label class="text-3xl leading-[100%]">
            Опыт работы(где работали)
          </label>
          <Input
            type="text"
            placeholder="1 год"
          />
        </div>
        <div class="flex flex-col gap-3">
          <label class="text-3xl leading-[100%]">
            Стаж работы(сколько работали)
          </label>
          <Input
              type="text"
              placeholder="1 год"
          />
        </div>
        <div class="flex flex-col gap-3">
          <label class="text-3xl leading-[100%]">
            Квалификация
          </label>
          <Input
            type="name"
            placeholder="Психолог/преподаватель"
          />
        </div>
        <div class="flex flex-col gap-3">
          <label class="text-3xl leading-[100%]">
            Контактные данные
          </label>
          <Input
            type="number"
            placeholder="+7 951 234 45 99"
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
        label="Отправить заявку"
        color="black"
        size="large"
      />
    </form>
  </section>
  <Footer />
</template>

<style scoped>

</style>
