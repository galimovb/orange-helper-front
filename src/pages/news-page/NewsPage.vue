<script setup>
import Header from "@/components/Header.vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import Footer from "@/components/Footer.vue";
import Accordion from "@/components/Accordion.vue";
import AxiosWrapper from "@/config/AxiosWrapper";
import {useToast} from "vue-toastification";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";

import {useMaterialStore} from '@/stores/materialStore';
import {useTestStore} from "@/stores/testStore";

const materialStore = useMaterialStore();
const testStore = useTestStore();

const toast = useToast();
const router = useRouter();

const email = ref('');
const consent = ref(false);

const images = [
  '/img/useful-articles-1.svg',
  '/img/useful-articles-2.svg',
];

const goToExpressTest = async () => {
  await testStore.fetchAllTests();

  const expressTest = testStore.tests.find(test => test.isExpressTest === true);

  if (expressTest) {
    router.push(`/test/${expressTest.id}`);
  } else {
    console.log('Экспресс-тест не найден');
  }
};

const getImageForIndex = (index) => {
  return images[index % images.length];
};

const subscribeToNewsletter = async () => {
  // Валидация
  if (!email.value) {
    toast.error('Пожалуйста, введите email')
    return
  }

  try {
    const response = await AxiosWrapper.post('/newsletter/subscribe', {
      email: email.value
    })

    toast.success('Вы успешно подписались на рассылку!')
    email.value = ''
    consent.value = false
  } catch (error) {
    if (error.response && error.response.status === 409) {
      toast.warning('Этот email уже подписан на рассылку')
    } else {
      toast.error('Ошибка при подписке: ' + (error.response?.data?.message || 'Попробуйте позже'))
      console.error('Subscription error:', error)
    }
  }
}

const accordion = [
  {
    title: "Как записаться на консультацию?",
    content: "Перейдите в раздел Консультации, выберите нужный тип консультации (психологическая/педагогическая), заполните соответствующую форму."
  },
  {
    title: "Как выбрать тип консультации?",
    content: "Для начала сформулируте запрос – что Вас беспокоит. Например, если ребенок не понимает как сделать то или иное задание, следует выбрать педагогическую консультацию. Если ребенок не хочет учиться, следует выбрать психологическую консультацию."
  },
];

onMounted(async () => {
  await materialStore.fetchAllMaterials();
});

</script>

<template>
  <div class="new-page">
    <Header/>
    <section
        class="q&a flex flex-col gap-[50px]  px-8 md:px-10 lg:px-[55px] py-3 md:py-6 lg:pt-10 lg:pb-5 lg:mb-[50px]">
      <h1 class="text-xl md:text-4xl lg:text-[55px] leading-[100%] text-center text-orange-500">
        Ответы на популярные вопросы
      </h1>
      <div class="flex flex-col gap-6 md:gap-8 lg:gap-10">
        <Accordion
            v-for="(item, index) in accordion"
            :key="index"
            :title="item.title"
            :content="item.content"
        />
      </div>
    </section>
    <div class="content-rectangle h-[30px] md:h-[45px] lg:h-[60px] bg-orange-500 lg:mb-[50px]"/>
    <section class="receive px-8 py-3 md:px-10 md:py-4 lg:px-[55px] lg:py-[30px] lg:mb-[50px]">
      <div class="mb-[20px] lg:flex justify-center items-center hidden">
        <div class="line-left bg-orange-500 h-[5px] inline-block flex-grow"></div>
        <h2 class="inline-block px-[50px] py-[8px] text-xl md:text-4xl lg:text-[55px]">
          Вы получите
        </h2>
        <div class="line-right bg-orange-500 h-[5px] inline-block flex-grow"></div>
      </div>
      <div class="receive__content flex lg:flex-row flex-col gap-6 items-center justify-center mx-auto">
        <div class="receice__content-left flex flex-col items-center justify-center max-w-[600px] py-3 gap-2 lg:gap-4">
          <img
              src="/img/receive-1.svg"
              alt="receive-1.svg"
              class="h-[200px] md:h-[240px] lg:h-[330px]"
          >
          <div class="flex flex-col gap-3">
            <h2 class="text-xl md:text-2xl lg:text-4xl leading-[100%] text-center ">
              Индивидуальную консультацию
            </h2>
            <p class="text-base md:text-xl lg:text-2xl leading-[100%] text-center">
              Возможность обратиться к психологу или педагогу за персональной поддержкой. Вы получите разбор вашей
              ситуации, рекомендации и пошаговые действия — удобно, онлайн, без очередей и стрессов.
            </p>
          </div>
        </div>
        <img
            src="/img/plus.svg"
            alt="plus"
            class="w-10 h-10 lg:h-[100px] lg:w-[100px] block"
        >
        <div class="receive__content-right flex flex-col items-center max-w-[400px] py-3 gap-2 lg:gap-4">
          <img
              src="/img/receive-2.svg"
              alt="receive-2.svg"
              class="h-[200px] md:h-[240px] lg:h-[330px]"
          >
          <div class="flex flex-col gap-3">
            <h2 class="text-xl md:text-2xl lg:text-4xl leading-[100%] text-center ">
              Расширение кругозора
            </h2>
            <p class="text-base md:text-xl lg:text-2xl leading-[100%] text-center">
              Доступ к видео, аудио-материалам, педагогической и психологической литературе для развития, воспитания,
              обучения детей.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-orange-500 text-white px-8 py-3 md:px-10 md:py-4 lg:px-[55px] lg:py-[30px]">
      <div class="flex flex-col  gap-6 md:gap-9 lg:gap-[50px]">
        <div class="flex flex-col md:gap-2.5 lg:gap-5">
          <h3 class="text-xl md:text-4xl lg:text-[55px] leading-[100%] text-left p-2.5">
            Забота начинается с понимания
          </h3>
          <p class="text-base md:text-2xl lg:text-4xl leading-[100%] text-left p-2.5">
            Часто мы так сосредоточены на помощи ребёнку, что забываем про
            собственное состояние. Пройдите короткий тест и узнайте, насколько вы сейчас устойчивы эмоционально и
            нуждаетесь ли в поддержке. Это всего пара минут — но может многое подсказать.
          </p>
        </div>
        <button
            @click="goToExpressTest"
            target="_blank"
            class="text-orange-500 bg-white rounded-[10px] px-1 py-1 md:px-10 md:py-4 lg:px-4 lg:py-7 text-base ld:text-4xl md:text-2xl"
        >
          Пройти экспресс-тест
        </button>
      </div>
    </section>
    <section class="useful-articles px-8 pt-3 pb-7  md:px-10 md:pt-9 md:pb-9 lg:px-[55px] lg:py-[50px] ">
      <div class="flex flex-col items-center gap-7">
        <h4 class="text-xl md:text-4xl lg:text-[55px] leading-[100%] p-2.5">
          Полезные статьи
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center mx-auto">
          <router-link
              v-for="(material, key) in materialStore.materials && Array.isArray(materialStore.materials) ? materialStore.materials.filter(item => item.section === 'USEFUL_ARTICLES') : []"
              :key="key"
              :to="`/news/useful-articles/${material.id}`"
              target="_blank"
          >
            <div class="flex flex-col gap-2 items-center">
              <img
                  :src="getImageForIndex(key)"
                  :alt="`useful-articles-${(key % 2) + 1}.svg`"
                  class="h-[150px] lg:h-[250px]"
              />
              <p class="text-base md:text-2xl lg:text-[32px] leading-[100%] text-center">
                {{ material.name }}
              </p>
            </div>
          </router-link>
        </div>
      </div>
    </section>
    <div class="content-rectangle h-[30px] md:h-[45px] lg:h-[60px] bg-orange-500 lg:mb-[50px]"/>
    <section class="mailing px-8 py-3 md:px-10 md:py-4 lg:px-[55px] lg:py-[30px]">
      <div class="flex flex-col gap-6 md:gap-6 lg:gap-[50px]">
        <div class="flex flex-col gap-5">
          <h5 class="text-orange-500 text-xl md:text-4xl lg:text-[55px] !leading-[120%]">
            Хотите получать больше полезных материалов?
          </h5>
          <p class="text-base md:text-2xl lg:text-4xl leading-[100%]">
            Подпишитесь на нашу рассылку — и всё самое нужное будет приходить вам прямо на почту.
          </p>
        </div>
        <div class="flex flex-col gap-2 md:gap-3.5 lg:gap-5">
          <h5 class="text-base md:text-2xl lg:text-[32px] leading-[100%]">
            Ваш E-mail
          </h5>
          <form
              @submit.prevent="subscribeToNewsletter"
              class="flex flex-col gap-5 items-left max-w-[800px]"
          >
            <div>
              <Input
                  v-model="email"
                  type="email"
                  placeholder="person123@gmail.com"
              />
            </div>
            <div class="flex items-center gap-4 md:gap-8 lg:gap-10">
              <input
                  v-model="consent"
                  type="checkbox"
                  id="consent"
                  name="consent"
                  class="!w-8 !h-8 lg:!w-16 lg:!h-16"
                  required
              />
              <span class="text-xs md:text-sm lg:text-2xl leading-[100%] text-gray-600">
                Я ознакомлен(-а) с
                <a
                    href="/files/Privacy_policy.docx"
                    download="Политика конфиденциальности.docx"
                    target="_blank"
                    class="text-blue-600 underline"
                >
                  Политикой конфиденциальности
                </a>
                и согласием на
                <a
                    href="/files/Consent_to_Marketing_Emails.docx"
                    download="Согласие_на_рекламную_и_информационную_рассылку.docx"
                    target="_blank"
                    class="text-blue-600 underline"
                >
                  рекламную и информационную рассылку
                </a>
              </span>
            </div>
            <button
                type="submit"
                class="bg-orange-500 text-white rounded-[10px] px-4 py-2  md:py-3  text-base ld:text-4xl md:text-2xl"
            >
              Получать рассылку
            </button>
          </form>
        </div>
      </div>
    </section>
    <Footer/>
  </div>
</template>

<style scoped>

</style>
