<script setup>
import {ref, onMounted} from "vue";
import {useRoute} from "vue-router";
import {useTestStore} from '@/stores/testStore'; // Подключаем хранилище для тестов

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
  let scoreBreakdown = {
    "Принятие-отвержение": 0,
    "Кооперация": 0,
    "Авторитарная гиперсоциализация": 0,
    "Маленький неудачник": 0
  };

  testStore.currentTest.questions.forEach((question, index) => {
    const userAnswer = answers.value[index];

    const isCorrect = (userAnswer === "+" && question.correctAnswer === true) || (userAnswer === "-" && question.correctAnswer === false);

    if (isCorrect) {
      scoreBreakdown[question.scale]++;
    }
  });

  const totalScore = Object.values(scoreBreakdown).reduce((sum, score) => sum + score, 0);

  result.value = {
    totalScore,
    scoreBreakdown
  };
};
</script>

<template>
  <Header/>
  <section class="test-page px-[55px] py-8">
    <div
        v-if="testStore.currentTest"
        class="bg-orange-500 flex flex-col gap-8 text-white lg:max-w-[90%] lg:min-h-[650px] lg:h-[70vh] mx-auto p-8 overflow-y-auto"
    >
      <h1 class="lg:text-[32px] text-4xl">
        {{ testStore.currentTest.title }}
      </h1>
      <div v-if="isDescriptionVisible" class="flex flex-col gap-6 lg:text-2xl text-[32px]">
        <b>
          {{ testStore.currentTest.source }}
        </b>
        <p>
          {{ testStore.currentTest.description }}
        </p>
        <div class="lg:text-2xl text-[32px]">
          <b>
            Опросник состоит из четырех шкал:
          </b>
          <ol>
            <li>1. Принятие – отвержение.</li>
            <li>2. Кооперация.</li>
            <li>3. Авторитарная гиперсоциализация.</li>
            <li>4. Маленький неудачник.</li>
          </ol>
        </div>
        <p>
          <b>
            Инструкция:
          </b>
          Внимательно прочитайте каждое утверждение. Если Вы согласны с утверждением, поставьте в листе ответов знак
          «+», если не согласны знак «-».
        </p>
      </div>
      <div
          v-else-if="result === null"
          class="test-question-container flex flex-col gap-4"
      >
        <h2 class="lg:text-3xl text-4xl">
          {{ testStore.currentTest.questions[currentQuestionIndex].question }}
        </h2>
        <div class="flex flex-col lg:gap-4 gap-8">
          <div class="flex items-center gap-2">
            <input
                type="radio"
                v-model="answers[currentQuestionIndex]"
                value="+"
                class="lg:w-[25px] lg:h-[25px] w-[50px] h-[50px]"
            />
            <label class="lg:text-2xl text-4xl leading-[100%]">
              +
            </label>
          </div>
          <div class="flex items-center gap-2">
            <input
                type="radio"
                v-model="answers[currentQuestionIndex]"
                value="-"
                class="lg:w-[25px] lg:h-[25px] w-[50px] h-[50px]"
            />
            <label class="lg:text-2xl text-4xl leading-[100%]">
              -
            </label>
          </div>
        </div>
      </div>
      <div v-else class="test-results flex flex-col gap-4">
        <h2 class="lg:text-3xl text-4xl">
          Результаты теста:
        </h2>
        <div class="text-xl">
          <p>
            <b>Общий балл:</b>
            {{ result.totalScore }}
          </p>
          <ul>
            <li>
              <b>Принятие-отвержение:</b>
              {{ result.scoreBreakdown["Принятие-отвержение"] }}
            </li>
            <li>
              <b>Кооперация:</b>
              {{ result.scoreBreakdown["Кооперация"] }}
            </li>
            <li>
              <b>Авторитарная гиперсоциализация:</b>
              {{ result.scoreBreakdown["Авторитарная гиперсоциализация"] }}
            </li>
            <li>
              <b>Маленький неудачник:</b>
              {{ result.scoreBreakdown["Маленький неудачник"] }}
            </li>
          </ul>
        </div>
        <p class="text-xl ">
          Шкала «принятие — отвержение» — максимальная сумма составляет 13 баллов.
          <br>
          Если взрослый набирает от 0 до 4 баллов, то это говорит о том, что взрослому (педагогу или родителю) нравятся
          дети такими, какие они есть. Он уважает индивидуальность каждого ребенка, симпатизирует ему. Взрослый
          стремится проводить много времени вместе с детьми, принимает их интересы и планы.
          <br>
          Если испытуемый набирает от 4 баллов и выше, то это говорит о том, что он воспринимает детей не воспитанными,
          неприспособленными, неудачливыми. По большей части взрослый испытывает к детям досаду, раздражение,
          агрессивность. В целом он не доверяет детям и затрудняется в выражении уважительного отношения кличности
          ребенка.
          <br><br>
          Шкала «Кооперация» — максимальная сумма составляет 7 баллов
          Если взрослый по данной шкале набирает 5-7 баллов, то это говорит о том, что взрослый заинтересован в делах и
          планах детей, старается поддерживать детей и сочувствовать им. Он может высоко оценивать интеллектуальные и
          творческие способности детей и испытывать чувство гордости за своих воспитанников. Взрослый поощряет
          инициативу и самостоятельность детей, старается быть с ними на равных, доверяет им, способен принять их точку
          зрения в спорных вопросах.
          Если же взрослый набирает 4 балла и ниже, то это свидетельствует о том, что взрослый не включен, либо
          формально включен в дела ребенка, что в свою очередь предопределяет у ребенка чувство одиночества. При таких
          данных, как правило, ребенок или дети остаются один на один с трудностями, возникающими в коллективе
          сверстников, со взрослыми, и соответственно испытывают трудности в принятии решения и адекватных форм
          реагирования.
          <br><br>
          Шкала «Авторитарная гиперсоциализация» — максимальная сумма составляет 7 баллов.
          Если взрослый набирает от 0 до 3 баллов, то это свидетельствует о норме. Если испытуемый набирает выше 3
          баллов — в его отношении отчетливо просматривается авторитаризм. Взрослый требует от детей безоговорочного
          послушания и дисциплины. Он стремится навязать детям свою волю, не в состоянии принять их точку зрения. За
          проявление своеволия дети наказываются. Взрослый ориентирован на социальные достижения детей, требует
          социального успеха и не заинтересован в личностном развитии. При этом он хорошо знает детей, их индивидуальные
          способности, привычки, мысли и чувства.
          <br><br>
          Шкала «Маленький неудачник» — максимальная сумма составляет 9 баллов
          Если взрослый набирает 2 балла, то это является нормой.
          3 балла и выше по этой шкале характеризуют позицию взрослого, которая заключается в том, что в ребенке
          взрослый не видит личной и социальной состоятельности, что и способствует инфантилизации ребенка. Взрослый
          видит ребенка младшим по сравнению с реальным возрастом. Интересы, увлечения, мысли и чувства детей
          воспринимаются как детские и несерьезные. Дети представляются неприспособленными, неуспешными, открытыми для
          дурных влияний. Взрослый не доверяет детям, досадует на их неуспешность и неумелость. В связи с этим он
          старается строго контролировать и регламентировать действия ребенка.
          Если же испытуемый набрал 8-9 баллов, то психологу следует обратить серьезное внимание на неадекватное
          эмоциональное отношение взрослого к возрастным и индивидуальным возможностям детей.
        </p>
      </div>
      <div class="flex gap-6 mt-auto justify-end">
        <button
            @click="prevQuestion"
            class="transform rotate-90 border-2 border-white p-2 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-white stroke-white" viewBox="0 0 24 24"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <button
            @click="nextQuestion"
            class="transform rotate-90 border-2 border-white p-2 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-white stroke-white" viewBox="0 0 24 24"
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
