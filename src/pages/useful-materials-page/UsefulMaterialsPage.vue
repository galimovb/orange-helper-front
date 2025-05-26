<script setup lang="ts">

import Header from "@/components/Header.vue";
import InfoCard from "@/components/InfoCard.vue";
import Circle from "@/components/Circle.vue";
import Footer from "@/components/Footer.vue";

const cards = [
  {
    text: "«Сказки, которые лечат» — подборка рассказов, помогающих справиться с тревогами и страхами»",
    showButton: "true"
  },
  {
    text: "«Маленький принц» как повод поговорить о чувствах»",
    showButton: "true"
  },
  {
    text: "«Стихи А. Барто, С. Михалкова и современных авторов для чтения перед сном",
    showButton: "true"
  }
];
const cardsWorkshop = [
  {
    text: "«Моя семья в рисунках»  Задание для детей: нарисовать свою семью и рассказать о каждом. Помогает раскрыть внутренние переживания ребёнка и укрепить связь с близкими.»",
    showButton: "true"
  },
  {
    text: "Творческий альбом «Я — это я» Распечатка с заданиями: нарисуй себя, свои мечты, любимое занятие. Упражнение на самоосознание.",
    showButton: "true"
  },
  {
    text: "Аппликация из бумаги: «Дерево настроений» Дети создают дерево, где каждый листик — это их сегодняшнее чувство. Развивает эмоциональную осознанность.",
    showButton: "true"
  }
];
</script>

<template>
  <Header />
  <section class="literary-column px-[55px] py-8">
    <div class="flex flex-col gap-[50px]">
      <div class="flex flex-col gap-[30px] text-center">
        <h1 class="text-orange-500 text-[55px] leading-[100%]">
          Литературная колонка
        </h1>
        <p class="text-4xl leading-[100%]">
          Раздел с художественной и познавательной литературой, которая помогает лучше понимать внутренний мир ребёнка и
          развивает читательский интерес.
        </p>
      </div>
      <div class="flex lg:flex-row flex-col items-center justify-center gap-[50px]  ">
        <template v-for="(card, key) in cards">
          <InfoCard
            :text="card.text"
            :showButton="card.showButton"
            class="lg:max-w-[273px] lg:h-[426px] h-[350px]   p-[20px] "
          />
          <Circle
            v-if="key < cards.length - 1"
          />
        </template>
      </div>
    </div>
  </section>
  <div class="content-rectangle h-[60px] bg-orange-500 mb-[50px]" />
  <section class="workshop flex flex-col lg:gap-5 gap-12 px-[55px] py-8">
    <div class="flex flex-col gap-[30px]">
      <h1 class="text-orange-500 text-[55px] leading-[100%]">
        Творческая мастерская
      </h1>
      <p class="text-4xl leading-[100%]">
        Творчество — это путь к самовыражению. Здесь вы найдёте простые и увлекательные задания, которые помогут ребёнку
        раскрыться.
      </p>
    </div>
    <div class="flex lg:flex-row flex-col gap-[20px]">
      <div class="flex flex-col lg:gap-5 gap-12">
        <InfoCard
          v-for="(card, key) in cardsWorkshop"
          :key="key"
          :text="card.text"
          :showButton="card.showButton"
          class="gap-12  p-[20px] "
        />
      </div>
      <img src="@/assets/img/workshop.svg" alt="workshop">
    </div>
  </section>
  <section class="music bg-orange-500 text-white flex flex-col gap-12 px-[55px] py-8">
    <h1 class="text-[55px] leading-[100%] text-center">
      Музыкальная волна
    </h1>
    <div class="lg:flex grid grid-cols-2 justify-center lg:gap-[133px] gap-[50px]">
      <!--Заглушка-->
      <div class="flex flex-col  items-center gap-3 ">
        <img
          src="@/assets/img/music_1.svg"
          alt="music"
          class="max-w-[319px] max-h-[319px]"
        >
        <label class="text-3xl leading-[100%] text-center">
          Плейлист «Музыка на ночь»
        </label>
      </div>
      <div class="flex flex-col items-center gap-3">
        <img
          src="@/assets/img/music_2.svg"
          alt="music"
          class="max-w-[319px] max-h-[319px]"
        >
        <label class="text-3xl leading-[100%] text-center">
          «Угадай инструмент»
        </label>
      </div>
      <div class="flex flex-col items-center gap-3">
        <img
          src="@/assets/img/music_3.svg"
          alt="music"
          class="max-w-[319px] max-h-[319px]"

        >
        <label class="text-3xl leading-[100%] text-center">
          Песенка «Про дружбу»
        </label>
      </div>
    </div>
    <p class="text-3xl leading-[100%] text-center">
      Музыка помогает расслабиться, радоваться и познавать мир звуков. В этом разделе — звуковые инструменты развития.
    </p>
  </section>
  <section class="video-library flex flex-col gap-12 px-[55px] py-8 mb-[50px]">
    <div class="flex flex-col gap-[30px]">
      <h1 class="text-orange-500 text-[55px] leading-[100%]">
        Видеотека
      </h1>
      <p class="text-4xl leading-[100%]">
        Видеоматериалы, которые можно смотреть и обсуждать вместе. Это формат, который легко вовлекает ребёнка и
        родителя.
      </p>
    </div>
    <!--Заглушка-->
    <div class="flex lg:flex-row flex-col justify-center lg:gap-[133px] gap-[50px]">
      <div class="flex flex-col lg:items-center gap-3 ">
        <img
          src="@/assets/img/video_1.svg"
          alt="music"
          class="lg:max-w-[319px] lg:max-h-[190px]"
        >
        <label class="lg:text-3xl text-4xl leading-[100%]  text-center">
          «Как справляться с эмоциями» (мультфильм)
        </label>
      </div>
      <div class="flex flex-col lg:items-center gap-3 ">
        <img
          src="@/assets/img/video_2.svg"
          alt="music"
          class="lg:max-w-[319px] lg:max-h-[190px]"
        >
        <label class="lg:text-3xl text-4xl leading-[100%]  text-center">
          Видеоинструкция: «Пальчиковый массаж»
        </label>
      </div>
      <div class="flex flex-col lg:items-center gap-3 ">
        <img
          src="@/assets/img/video_3.svg"
          alt="music"
          class="lg:max-w-[319px] lg:max-h-[190px]"
        >
        <label class="lg:text-3xl text-4xl leading-[100%] text-center">
          Мини-лекция: «Как говорить, чтобы ребёнок слушал»
        </label>
      </div>
    </div>
  </section>
  <Footer />
</template>

<style scoped>

</style>