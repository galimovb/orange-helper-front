<script setup>
import {ref, onMounted} from "vue";
import {useRoute} from "vue-router";
import {useTestStore} from '@/stores/testStore';

import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

const route = useRoute();
const testId = route.params.id;
const testStore = useTestStore();

const isDescriptionVisible = ref(true);
const currentQuestionIndex = ref(0);

const answers = ref({});
const result = ref(null);

onMounted(async () => {
  await testStore.fetchTestById(testId);
});

const prevQuestion = () => {
  if (currentQuestionIndex.value === 0) {
    isDescriptionVisible.value = true;
  } else {
    currentQuestionIndex.value--;
  }
};

const nextQuestion = () => {
  if (isDescriptionVisible.value) {
    isDescriptionVisible.value = false;
  } else if (currentQuestionIndex.value < testStore.currentTest.questions.length - 1) {
    currentQuestionIndex.value++;
  } else {
    showResult();
  }
};

const showResult = () => {
  // Инициализация подсчета баллов для каждой шкалы
  let scoreBreakdown = {};

  // Динамически создаем шкалы, основываясь на данных из API
  testStore.currentTest.scales.forEach(scale => {
    scoreBreakdown[scale.name] = 0;
  });

  // Подсчитываем баллы по шкалам для каждого вопроса
  testStore.currentTest.questions.forEach((question, index) => {
    const userAnswer = answers.value[index]; // Получаем ответ пользователя для текущего вопроса
    const correctAnswerIndex = question.correctAnswer; // Индекс правильного ответа

    // Проверяем, правильный ли ответ
    const isCorrect = userAnswer === question.answers[correctAnswerIndex];

    // Если ответ правильный, увеличиваем счет по шкале
    if (isCorrect) {
      const scaleName = testStore.currentTest.scales.find(scale => scale.id === question.scaleId).name;
      scoreBreakdown[scaleName]++;
    }
  });

  // Подсчитываем общий балл
  const totalScore = Object.values(scoreBreakdown).reduce((sum, score) => sum + score, 0);

  result.value = {
    totalScore,
    scoreBreakdown,
  };
};
</script>

<template>
  <Header/>
  <section class="test-page px-8 py-3 md:px-11 md:py-6 lg:px-[55px] lg:py-8">
    <div
        v-if="testStore.currentTest"
        class="bg-orange-500 flex flex-col gap-4 lg:gap-8 text-white lg:max-w-[90%] lg:min-h-[650px] lg:h-[70vh] mx-auto p-2 md:p-4 lg:p-8 overflow-y-auto"
    >
      <h1 class="text-lg md:text-xl lg:text-3xl">
        {{ testStore.currentTest.title }}
      </h1>
      <div v-if="isDescriptionVisible" class="flex flex-col gap-2 md:gap-4 lg:gap-6 text-base md:text-xl lg:text-2xl ">
        <p class="text-base md:text-xl lg:text-2xl">
          <b>
            Описание:
          </b>
          {{ testStore.currentTest.description }}
        </p>
        <p class="text-base md:text-xl lg:text-2xl">
          <b>
            Инструкция:
          </b>
          {{ testStore.currentTest.instructions }}
        </p>
      </div>
      <div
          v-else-if="result === null"
          class="test-question-container flex flex-col gap-4"
      >
        <h2 class="text-lg md:text-xl lg:text-3xl">
          {{ testStore.currentTest.questions[currentQuestionIndex].question }}
        </h2>
        <div class="flex flex-col lg:gap-4 gap-8">
          <div
              v-for="(answer, index) in testStore.currentTest.questions[currentQuestionIndex].answers" :key="index"
              class="flex items-center gap-2"
          >
            <input
                type="radio"
                v-model="answers[currentQuestionIndex]"
                :value="answer"
                class="w-6 h-6 "
            />
            <label class="text-2xl leading-[100%]">
              {{ answer }}
            </label>
          </div>
        </div>
      </div>
      <div v-else class="test-results flex flex-col gap-2 lg:gap-4">
        <h2 class="text-lg md:text-xl lg:text-3xl">
          Результаты теста:
        </h2>
        <div class="text-base md:text-lg lg:text-xl">
          <p>
            <b>Общий балл:</b>
            {{ result.totalScore }}
          </p>
          <ul>
            <li v-for="(score, scale) in result.scoreBreakdown" :key="scale">
              <b>{{ scale }}:</b>
              {{ score }}
            </li>
          </ul>
        </div>
        <p class="text-base md:text-lg lg:text-xl">
          {{ testStore.currentTest.result }}
        </p>
      </div>
      <div class="flex gap-6 mt-auto justify-end">
        <button
            @click="prevQuestion"
            class="transform rotate-90 border-2 border-white p-2 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 l-4 lg:w-6 lg:h-6  fill-white stroke-white"
               viewBox="0 0 24 24"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <button
            @click="nextQuestion"
            class="transform rotate-90 border-2 border-white p-2 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 l-4 lg:w-6 lg:h-6  fill-white stroke-white"
               viewBox="0 0 24 24"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 15l7-7 7 7"></path>
          </svg>
        </button>
      </div>

    </div>
  </section>
  <Footer/>
</template>

<style scoped>
</style>
