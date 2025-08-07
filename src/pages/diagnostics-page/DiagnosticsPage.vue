<script setup>
import {onMounted, computed} from 'vue';
import {useTestStore} from '@/stores/testStore';
import {useMaterialStore} from '@/stores/materialStore';

import Header from "@/components/Header.vue";
import InfoCard from "@/components/InfoCard.vue";
import Button from "@/components/Button.vue";
import Footer from "@/components/Footer.vue";
import {useRouter} from "vue-router";

const router = useRouter();
const materialStore = useMaterialStore();
const testStore = useTestStore();

const images = [
  "/img/infoCard_1.svg",
  "/img/infoCard_2.svg",
  "/img/infoCard_3.svg",
  "/img/infoCard_4.svg",
  "/img/infoCard_5.svg",
  "/img/infoCard_6.svg"
];

const filteredTests = computed(() => {
  return testStore.tests.filter(test => test.isExpressTest === false);
});

onMounted(async () => {
  await materialStore.fetchAllMaterials();
  await testStore.fetchAllTests();
});
</script>

<template>
  <Header/>
  <section class="diagnostics px-8 md:px-10 lg:px-[55px] pt-3 md:pt-6 lg:pt-[40px]">
    <div class="flex lg:flex-row flex-col gap-6 items-center">
      <div class="flex flex-col lg:gap-16 gap-6">
        <h1 class="text-orange-500 text-xl md:text-4xl lg:text-[55px] leading-[100%]">
          Диагностика как первый шаг к осознанному родительству
        </h1>
        <p class="text-base md:text-2xl lg:text-4xl  leading-[100%]">
          Данный раздел посвящен психологическому и педагогическому материалу, включающий в себя адаптированную
          литературу, а также тестирования педагогами и психологами.
        </p>
      </div>

      <img
          src="/img/diagnostics.svg "
          alt="diagnostics"
          class="w-[160px] lg:w-[400px]"
      >
    </div>
  </section>

  <div class="content-rectangle h-[30px] md:h-[45px] lg:h-[60px] bg-orange-500 md:mb-7 lg:mb-[50px]"/>

  <section class="pedagogy px-8 py-3 md:px-11 md:py-6 lg:px-[55px] lg:py-8">
    <div class="flex flex-col gap-[50px]">
      <div class="flex flex-col items-center text-center gap-6">
        <h2 class="text-orange-500 text-xl md:text-4xl lg:text-[55px] leading-[100%]">
          Поговорим о педагогике
        </h2>
        <p class="text-base md:text-2xl lg:text-4xl leading-[100%]">
          Вы узнаете, как эффективно выстраивать образовательную траекторию ребёнка, развивать интерес к обучению и
          выстраивать уважительное взаимодействие.
        </p>
      </div>
      <div class="flex lg:flex-row flex-col-reverse items-center justify-center gap-6 md:gap-6 lg:gap-[50px] ">
        <img
            src="/img/pedagogy.svg"
            alt="pedagogy"
            class="w-[160px] md:w-[340px] lg:w-[535px]"
        >
        <div class="grid grid-cols-2 gap-6 md:gap-8 lg:gap-[41px] lg:max-w-[535px]">
          <router-link
              v-for="(material, index) in materialStore.materials && Array.isArray(materialStore.materials) ? materialStore.materials.filter(item => item.section === 'PEDAGOGY_TALK') : []"
              :key="index"
              :to="`/diagnostics/pedagogy/${material.id}`"
              target="_blank"
          >
            <InfoCard
                :title="material.name"
                class="p-3 lg:h-full text-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
            />
          </router-link>
        </div>
      </div>
    </div>
  </section>
  <section class="about-psychology bg-orange-500 flex flex-col gap-8 px-8 md:px-10 lg:px-[55px] py-8">
    <div class="flex flex-col gap-6">
      <h3 class="text-white text-xl md:text-4xl lg:text-[55px] leading-[100%]">
        Поговорим о психологии
      </h3>
      <p class="text-base md:text-2xl lg:text-4xl leading-[100%]">
        Фрагменты из книг и психологических обзоров помогут лучше понять поведение, эмоции и потребности ребёнка в
        разные возрастные периоды.
      </p>
    </div>
    <div class="flex flex-col gap-8">
      <router-link
          v-for="(material, key) in materialStore.materials && Array.isArray(materialStore.materials) ? materialStore.materials.filter(item => item.section === 'PSYCHOLOGY_TALK') : []"
          :key="key"
          :to="`/diagnostics/psychology/${material.id}`"
          target="_blank"
          class="bg-white text-base md:text-xl lg:text-2xl text-left rounded-[5px] px-4 py-8 lg:px-7 lg:py-5 cursor-pointer hover:bg-orange-50 transition"
      >
        <p>
          {{ material.name }}
        </p>
      </router-link>
    </div>
  </section>
  <section class="psychological-testing px-8 md:px-10 lg:px-[55px] py-8">
    <div class="flex flex-col gap-4 mb-[40px]">
      <h4 class="text-orange-500 text-xl md:text-4xl lg:text-[55px]leading-[100%]">
        Педагогическое и психологическое тестирования
      </h4>
      <p class="text-base md:text-2xl lg:text-4xl leading-[100%]">
        Этот раздел содержит опросники и тесты, которые помогут оценить уровень развития и готовности ребёнка к
        обучению, выявить его сильные и уязвимые стороны в образовательной сфере, а также понять эмоциональное состояние
        ребенка.
      </p>
    </div>
    <div class="grid lg:grid-cols-3 grid-cols-2 gap-[30px] md:px-9 lg:px-[72px]">
      <router-link
          v-for="(test, key) in filteredTests"
          :key="key"
          :to="`/test/${test.id}`"
          target="_blank"
          class="cursor-pointer"
      >
        <InfoCard
            :title="test.title"
            :image="images[key % images.length]"
            class="px-3 py-[26px] text-white text-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
        />
      </router-link>
    </div>
  </section>
  <section class="results bg-orange-500 px-[55px] py-12 mb-8">
    <div class="flex flex-col lg:gap-6 gap-12 lg:items-start">
      <h3 class="text-xl md:text-4xl lg:text-[55px] leading-[100%]">
        Как интерпретировать результаты?
      </h3>
      <p class="text-white text-base md:text-2xl lg:text-4xl leading-[100%]">
        Если вы получили результат, вызывающий беспокойство — не делайте поспешных выводов. Вы можете обратиться за
        профессиональной консультацией, и наши специалисты помогут вам разобраться, поддержать и предложить дальнейшие
        шаги.
      </p>
      <button
          class="text-orange-500 bg-white rounded-[10px] px-1 py-1 md:px-10 md:py-4 lg:px-4 lg:py-7 text-base ld:text-4xl md:text-2xl"
          @click="router.push('/consultation')"
      >
        Записаться на консультацию
      </button>
    </div>
  </section>
  <Footer/>
</template>
