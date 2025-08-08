<script setup>
import {ref, onMounted} from "vue";
import {useRoute} from "vue-router";
import {useTestStore} from '@/stores/testStore';

import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import {Label} from "radix-vue";

const route = useRoute();
const testId = route.params.id;
const testStore = useTestStore();

const isDescriptionVisible = ref(true);
const currentQuestionIndex = ref(0);

const answers = ref({});
const result = ref(null);
const isImageVisible = ref(true);
const isExpressTest = ref(true);

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
  } else if (isImageVisible.value) {
    // Если изображение показано, скрываем его и показываем результаты
    isImageVisible.value = false;
  } else if (currentQuestionIndex.value < testStore.currentTest?.questions?.length - 1) {
    currentQuestionIndex.value++;
  } else {
    showResult();
  }
};

const showResult = () => {
  // Инициализация подсчета баллов для каждой шкалы
  let scoreBreakdown = {};

  // Динамически создаем шкалы, основываясь на данных из API
  testStore.currentTest?.scales.forEach(scale => {
    scoreBreakdown[scale.name] = 0;
  });

  // Подсчитываем баллы по шкалам для каждого вопроса
  testStore.currentTest?.questions.forEach((question, index) => {
    const userAnswer = answers.value[index]; // Получаем ответ пользователя для текущего вопроса
    const correctAnswerIndex = question.correctAnswer; // Индекс правильного ответа

    // Проверяем, правильный ли ответ
    const isCorrect = userAnswer === question?.answers[correctAnswerIndex];

    // Если ответ правильный, увеличиваем счет по шкале
    if (isCorrect) {
      const scaleName = testStore.currentTest?.scales.find(scale => scale.id === question.scaleId).name;
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

const goToExpressTest = () => {
  isExpressTest.value = false;
};

onMounted(async () => {
  await testStore.fetchTestById(testId);
});

</script>

<template>
  <Header/>
  <section class="test-page px-8 py-3 md:px-11 md:py-6 lg:px-[55px] lg:py-8">

    <section v-if="testStore.currentTest?.isExpressTest && isExpressTest">
      <div class="flex items-center justify-between mt-4

      lg:mt-9">
        <div class="flex flex-col gap-9">
          <div class="text-2xl md:text-3xl lg:text-5xl leading-[100%]">
            <label class="block text-orange-500 mb-4">
              Экспресс-тестирование
            </label>
            <div>
              {{ testStore.currentTest?.title }}
            </div>
          </div>
          <div class="flex flex-col gap-3 md:gap-5 lg:gap-9">
            <h5 class="text-base md:text-2xl lg:text-3xl leading-[100%]">
              Ваш E-mail
            </h5>
            <form
                @submit.prevent="subscribeToNewsletter"
                class="flex flex-col gap-5 items-left max-w-[742px]"
            >
              <div>
                <Input
                    v-model="email"
                    type="email"
                    required
                    placeholder="person123@gmail.com"
                />
              </div>
              <div class="flex items-center gap-2">
                <Input
                    v-model="consent"
                    type="checkbox"
                    id="consent"
                    name="consent"
                    class="!w-4 !h-4 md:!w-6 md:!h-6 lg:!w-9 lg:!h-9"
                    required
                />
                <label for="consent" class="text-xs md:text-sm lg:text-2xl leading-[100%] text-gray-600">
                  Я ознакомлен(-а) с Политикой конфиденциальности
                </label>
              </div>
              <label class="text-xs md:text-sm lg:text-2xl leading-[100%]">
                Результаты теста будут отправлены на электронную почту. Для этого заполните поле
              </label>
              <button
                  @click="goToExpressTest"
                  type="submit"
                  class="bg-orange-500 text-white rounded-[10px] px-4 py-2  md:py-3  text-base ld:text-4xl md:text-2xl"
              >
                Начать тест
              </button>
            </form>
          </div>

        </div>
        <img
            src="/public/img/express.svg"
            alt="express.svg"
            class="hidden md:block  md:w-1/2 h:w-1/2"
        >
      </div>
    </section>

    <div
        v-else-if="testStore.currentTest"
        class="bg-orange-500 flex flex-col gap-4 lg:gap-8 text-white lg:max-w-[90%] lg:min-h-[650px] lg:h-[70vh] mx-auto p-2 md:p-4 lg:p-8 overflow-y-auto"
    >
      <h1 class="text-lg md:text-xl lg:text-3xl">
        {{ testStore.currentTest.title }}
      </h1>
      <div v-if="isDescriptionVisible" class="flex flex-col gap-2 md:gap-4 lg:gap-6 ">
        <p class="text-base md:text-lg lg:text-xl">
          <b>
            Описание:
          </b>
          <span class="whitespace-pre-line">
            {{ testStore.currentTest.description }}
          </span>
        </p>
        <p class="text-base md:text-lg lg:text-xl">
          <b>
            Инструкция:
          </b>
          <span class="whitespace-pre-line">
            {{ testStore.currentTest.instructions }}
          </span>
        </p>
      </div>
      <div
          v-else-if="result === null && testStore.currentTest.image === null"
          class="test-question-container flex flex-col gap-4"
      >
        <h2 class="text-lg md:text-xl lg:text-2xl">
          {{ testStore.currentTest?.questions[currentQuestionIndex]?.question }}
        </h2>
        <div class="flex flex-col gap-4 lg:gap-8">
          <div
              v-for="(answer, index) in testStore.currentTest?.questions[currentQuestionIndex]?.answers" :key="index"
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

      <div v-else-if="testStore.currentTest.image && isImageVisible">
        <div class="mx-auto w-[50%] h-[50%]">
          <img
              :src="`https://api.oranzhevyi-pomoshnik.ru/${testStore.currentTest.image}`"
              alt="test image"
          />
        </div>
      </div>

      <div v-else-if="!isImageVisible" class="test-results flex flex-col gap-2 lg:gap-4">
        <h2 class="text-lg md:text-xl lg:text-3xl">
          Результаты теста:
        </h2>
        <div
            v-if="testStore.currentTest.image === null"
            class="text-base md:text-lg lg:text-xl"
        >
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
        <p class="text-base md:text-lg lg:text-xl whitespace-pre-line">
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
