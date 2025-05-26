<script setup>

import Header from "@/components/Header.vue";
import InfoCard from "@/components/InfoCard.vue";
import Button from "@/components/Button.vue";
import Footer from "@/components/Footer.vue";

const cards = [
  {
    title: "«О педагогике сотрудничества»",
    text: "Выдержки из трудов В.А. Сухомлинского"
  },
  {
    title: "«Понимание детского мышления»",
    text: "Обзор подхода Л.С. Выготского"
  },
  {
    title: "«Игровая деятельность как путь развития ребёнка»",
    text: "Методические рекомендации"
  },
  {
    title: "«Ошибки в воспитании: как их избежать»",
    text: "Современные педагогические взгляды"
  }
];

const cardsWithImage = [
  {
    title: "«Готов ли ребёнок к школе?»",
    image: "/src/assets/img/infoCard_1.svg"
  },
  {
    title: " «Какой у ребёнка учебный стиль?»",
    image: "/src/assets/img/infoCard_2.svg"
  },
  {
    title: "«Учебная мотивация школьников»",
    image: "/src/assets/img/infoCard_3.svg"
  },
  {
    title: "«Уровень тревожности ребёнка»",
    image: "/src/assets/img/infoCard_4.svg"
  },
  {
    title: "«Родительское выгорание»",
    image: "/src/assets/img/infoCard_5.svg"
  },
  {
    title: "Диагностика детских страхов (по возрасту)",
    image: "/src/assets/img/infoCard_6.svg"
  }

];
</script>

<template>
  <Header />
  <section class="diagnostics px-[55px] py-8">
    <div class="flex lg:flex-row flex-col gap-6 items-center">
      <div class="flex flex-col lg:gap-16 gap-6">
        <h1 class="text-orange-500 text-[55px] leading-[100%]">
          Диагностика как первый шаг к осознанному родительству
        </h1>
        <p class="text-4xl leading-[100%]">
          Здесь вы найдёте проверенные материалы по педагогике и психологии, а также простые и доступные тесты. Они
          помогут вам лучше понять себя, ребёнка и особенности ваших взаимоотношений. Все материалы отобраны
          специалистами
          и подходят для самостоятельного использования родителями, педагогами и психологами.
        </p>
      </div>
      <img
        src="@/assets/img/diagnostics.svg"
        alt="diagnostics"
      >
    </div>
  </section>
  <div class="content-rectangle h-[60px] bg-orange-500 mb-[50px]" />
  <section class="pedagogy px-[55px] py-8">
    <div class="flex flex-col gap-[50px]">
      <div class="flex flex-col items-center text-center gap-6 ">
        <h2 class="text-orange-500 text-[55px] leading-[100%]">
          Поговорим о педагогике
        </h2>
        <p class="text-4xl leading-[100%]">
          Вы узнаете, как эффективно выстраивать образовательную траекторию ребёнка, развивать интерес к обучению и
          выстраивать уважительное взаимодействие.
        </p>
      </div>
      <div class="flex lg:flex-row flex-col-reverse items-center justify-center gap-[50px] ">
        <img
          src="@/assets/img/pedagogy.svg"
          alt="pedagogy"
        >
        <div class="grid grid-cols-2 gap-[41px] lg:max-w-[535px]">
          <InfoCard
            v-for="(card, key) in cards"
            :key="key"
            :title="card.title"
            :text="card.text"
            class="p-3 lg:h-full h-[350px] text-center"
          />
        </div>
      </div>
    </div>
  </section>
  <section class="about-psychology bg-orange-500 flex flex-col gap-8 px-[55px] py-8">
    <div class="flex flex-col gap-6">
      <h3 class="text-white text-[55px] leading-[100%]">
        Поговорим о психологии
      </h3>
      <p class="text-4xl leading-[100%]">
        Фрагменты из книг и психологических обзоров помогут лучше понять поведение, эмоции и потребности ребёнка в
        разные возрастные периоды.
      </p>
    </div>
    <div class="flex flex-col gap-8">
      <div class="bg-white lg:text-2xl text-4xl text-left rounded-[5px] px-[30px] py-[18px]">
        <p>
          «Привязанность: как она формируется и почему это важно» — выдержки из книги Дж. Боулби
        </p>
      </div>
      <div class="bg-white lg:text-2xl text-4xl text-left rounded-[5px] px-[30px] py-[18px]">
        <p>
          «Что скрывают детские капризы?» — объяснения от детского психолога
        </p>
      </div>
      <div class="bg-white lg:text-2xl text-4xl text-left rounded-[5px] px-[30px] py-[18px]">
        <p>
          «Родительское выгорание и как его распознать» — современный взгляд на ресурсы взрослого
        </p>
      </div>
      <div class="bg-white lg:text-2xl text-4xl text-left rounded-[5px] px-[30px] py-[18px]">
        <p>
          «Как переживаются перемены у детей» — советы по адаптации в семье и школе
        </p>
      </div>
    </div>
  </section>
  <section class="psychological-testing px-[55px] py-8">
    <div class="flex flex-col gap-4 mb-[40px]">
      <h4 class="text-orange-500 text-[55px] leading-[100%]">
        Педагогическое и психологическое тестирования
      </h4>
      <p class="text-4xl leading-[100%]">
        Этот раздел содержит опросники и тесты, которые помогут оценить уровень развития и готовности ребёнка к
        обучению, выявить его сильные и уязвимые стороны в образовательной сфере, а также понять эмоциональное состояние
        ребенка.
      </p>
    </div>
    <div class="grid lg:grid-cols-3 grid-cols-2 gap-[30px] px-[72px]">
      <InfoCard
        v-for="(card, key) in cardsWithImage"
        :key="key"
        :title="card.title"
        :image="card.image"
        :titleSize="`text-4xl`"
        class="px-3 py-[26px] text-white text-center  text-4xl"
      />
    </div>
  </section>
  <section class="results bg-orange-500 px-[55px] py-12 mb-8">
    <div class="flex flex-col lg:gap-6 gap-12 lg:items-start">
      <h3 class="text-[55px] leading-[100%]">
        Как интерпретировать результаты?
      </h3>
      <p class="text-white text-4xl leading-[100%]">
        Если вы получили результат, вызывающий беспокойство — не делайте поспешных выводов. Вы можете обратиться за
        профессиональной консультацией, и наши специалисты помогут вам разобраться, поддержать и предложить дальнейшие
        шаги.
      </p>
      <Button
        label="Записаться на консультацию"
        color="white"
        size="large"
      />
    </div>
  </section>
  <Footer/>
</template>