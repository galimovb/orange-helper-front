<script setup lang="ts">
import SectionWithLines from "@/components/main-page/SectionWithLines.vue";
import MemberCard from "@/components/main-page/MemberCard.vue";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import Circle from "@/components/Circle.vue";
import Button from "@/components/Button.vue";
import {useRouter} from "vue-router";

const router = useRouter();

const teamMembers = [
  {
    src: "/img/elvira.png",
    name: "Сабирова Эльвира Гильфановна ",
    position: "Научный руководитель",
    description: "Кандидат педагогических наук ИпиО КФУ"
  },
  {
    src: "/img/ksusha.png",
    name: "Ильина Ксения Алексеевна ",
    position: "Руководитель проекта",
    description: "студент 5 курса ИпиО КФУ"
  },
  {
    src: "/img/alyona.png",
    name: "Иванова Алёна Кирилловна ",
    position: "Педагог начального образования",
    description: "Студент 5 курса ИпиО КФУ"
  }
];

const circleLabel = [
  {
    label: "Регистрация"
  },
  {
    label: "Определение запроса и проблемы"
  },
  {
    label: "Подбор специалиста"
  },
  {
    label: "Онлайн-консультация "
  },
  {
    label: "Поддержка и сопровождение"
  }
];

const priceList = [
  {title: 'Первая консультация', prices: ['бесплатная']},
  {title: 'Консультация с психологом', prices: ['30 минут - 1500 руб', '60 минут - 2500 руб']},
  {title: 'Консультация с педагогом', prices: ['30 минут - 1500 руб', '60 минут - 2500 руб']},
]
</script>

<template>

  <div class="home-page">
    <section class="main relative">
      <div
          class="bg-orange-500 rounded-[10px] absolute top-0 left-[55px] right-[50%] bottom-[50%] z-0 xl:block hidden"></div>
      <Header/>
      <div class="main-content flex flex-wrap xl:flex-nowrap justify-between px-[55px]">
        <div>
          <div class="relative z-20 xl:mt-[100px] mt-[50px]">
            <h1 class="xl:text-white text-black leading-[100%] text-2xl md:text-[60px] lg:text-[96px] z-30">
              Оранжевый <br> помощник
            </h1>
          </div>
          <p class="leading-[100%] text-base lg:text-4xl mt-2.5 md:mt-9 lg:mt-[60px]">
            проект для улучшения взаимоотношений родителей и детей.
          </p>
        </div>
        <img src="/img/main-illustration.svg" alt="main-illustration" class="z-20">
      </div>
    </section>
    <div class="content-rectangle h-[30px] md:h-[45px] lg:h-[60px] bg-orange-500 md:mb-7 lg:mb-[50px]"/>
    <section class="partners-info bg-white flex justify-center mb-[50px] px-[55px]">
      <div class=" flex flex-col gap-[30px]">
        <div class="partners-info__title p-[10px] max-w-[1024px]">
          <h1 class="text-center leading-none text-base md:text-2xl lg:text-4xl">
            Проект создан при поддержке Федерального государственного бюджетного учреждения
            "Фонд содействия развитию малых форм предприятий в научно-технической сфере в рамках программы "Студенческий
            стартап"
          </h1>
        </div>
        <div class="partners-info__icons flex justify-between max-w-[1060px]">
          <div class="partners-info__icon">
            <img
                src="/img/fond-sodeystviya.svg"
                alt="fond-sodeystviya.svg"
            />
          </div>
          <div class="partners-info__icon">
            <img
                src="/img/kpfu.svg"
                alt="kpfu.svg"
            />
          </div>
        </div>
      </div>
    </section>
    <section class="project-info bg-orange-500 text-white px-8 md:px-10 lg:px-[55px]" id="about-project">
      <div class="project-info__content max-w-[1024px] mx-auto py-2">
        <h1 class="text-center leading-none text-xl md:text-[56px] lg:text-[96px] md:mb-4 lg:mb-[30px]">
          О проекте
        </h1>
        <p class="text-center leading-none text-base md:text-2xl lg:text-4xl p-[10px]">
          «Оранжевый помощник» это образовательный интернет-сайт, созданный для психолого-педагогической поддержки и
          сопровождения детско-родительских отношений. Мы объединяем усилия педагогов и психологов, чтобы помочь
          родителям и детям выстроить максимально гармоничные взаимоотношения.
        </p>
      </div>
    </section>
    <section class="project-goals bg-white p-8 px-[55px]">
      <div class="mx-auto flex justify-center items-center gap-[30px]">
        <div class="project-goals__image lg:block hidden">
          <img
              src="/img/goals-task.svg"
              alt="goals-task"
          >
        </div>
        <div class="project-goals__content max-w-[800px] leading-[100%] text-4xl text-left">
          <h2 class="text-base md:text-4xl lg:text-[55px] text-orange-500 mb-6 lg:mb-8">
            Цели и задачи проекта:
          </h2>
          <div class="project-goals__goals text-base md:text-2xl lg:text-4xl">
            <h3>
              Цели:
            </h3>
            <ul class="list-disc pl-10">
              <li>
                Гармонизация взаимоотношений между родителями и детьми с помощью онлайн-консультаций.
              </li>
            </ul>
          </div>
          <div class="project-goals__tasks text-base md:text-2xl lg:text-4xl">
            <h3>
              Задачи:
            </h3>
            <ul class="list-disc pl-10">
              <li>
                Выявление проблем, трудностей, недопониманий между родителями и детьми.
              </li>
              <li>
                Решение выявленных проблем с помощью онлайн-консультаций с психологом или педагогом.
              </li>
              <li>
                Предоставление психолого-педагогической адаптированной литературы.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <div class="content-rectangle h-[30px] md:h-[45px] lg:h-[60px] bg-orange-500 md:mb-7 lg:mb-[50px]"/>
    <section class="key-concept bg-white md:px-7 lg:px-[55px] py-6">
      <SectionWithLines
          title="Ключевая концепция"
      >
        Создание удобного онлайн-пространства для взаимодействия родителей с педагогами и психологами.
        Проект представляет собой сервис, где можно пройти экспресс-тестирование, записаться на онлайн-консультацию к
        психологу и (или) педагогу, изучить психолого-педагогический материал.
      </SectionWithLines>
    </section>
    <section class="useful-platform bg-orange-500 text-white py-8 px-[55px]">
      <div class="mx-auto flex lg:flex-row flex-col justify-center  gap-[30px]">
        <div class="useful-platform__content flex flex-col gap-[30px] text-left">
          <h4 class="text-xl md:text-4xl lg:text-[55px]">
            Платформа будет полезна
          </h4>
          <ul class="list-disc pl-10 text-base md:text-2xl lg:text-4xl flex flex-col gap-[20px]">
            <li>
              Родителям и законным представителям, которые хотят лучше понимать своих детей и получать
              профессиональную
              поддержку в воспитании.
            </li>
            <li>
              Педагогам и психологам, желающим делиться знаниями, оказывать помощь и расширять круг
              взаимодействия с
              семьями.
            </li>
            <li>
              Образовательным организациям, заинтересованным в выстраивании партнёрских отношений с
              родителями и
              создании условий для гармоничного развития детей.
            </li>
          </ul>
        </div>
        <img
            src="/img/useful-platform.svg"
            alt="useful-platform"
        >
      </div>
    </section>
    <section class="consultation py-8 px-[55px]">
      <div class="mx-auto flex lg:flex-row flex-col-reverse justify-center items-center gap-[70px]">
        <div class="consultation__image">
          <img
              src="/img/consultation.svg"
              alt="consultation.svg"
          >
        </div>
        <div class="consultation__content max-w-[630px] leading-[100%] text-4xl text-left">
          <h5 class="text-xl md:text-4xl lg:text-[55px] mb-8">
            Консультация
          </h5>
          <p class="text-base md:text-2xl lg:text-4xl ">
            Вы можете
          </p>
          <ul class="list-disc pl-10 text-base md:text-2xl lg:text-4xl ">
            <li>Обратиться к специалисту напрямую</li>
            <li>Получить индивидуальную консультацию в удобное время</li>
            <li>Обсудить актуальные трудности или тревоги</li>
            <li>Найти решение совместно с опытным профессионалом</li>
          </ul>
        </div>
      </div>
    </section>
    <div class="content-rectangle h-[30px] md:h-[45px] lg:h-[60px] bg-orange-500 md:mb-7 lg:mb-[50px]"/>
    <section class="financing bg-white p-8 px-[55px]">
      <SectionWithLines
          title="Финансовая выгода"
      >
        <!--        Платформа «Оранжевый помощник» — это доступ к профессиональной помощи без лишних затрат. Мы предлагаем-->
        <!--        бесплатные-->
        <!--        материалы, гибкие тарифы на консультации и регулярные акции, чтобы каждая семья могла получить поддержку-->
        <!--        независимо от уровня дохода.-->
        <!--        <p>Это выгодная альтернатива дорогостоящим частным специалистам — удобно, доступно и без-->
        <!--          переплат.</p>-->
        <div class="space-y-10">
          <div
              v-for="priceItem in priceList"
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
    </section>
    <section class="project-team bg-orange-500 text-white px-[55px] py-8 lg:mb-12" id="project-team">
      <div class="flex flex-col gap-8">
        <h6 class="text-xl md:text-4xl lg:text-[55px]">
          Наша команда
        </h6>
        <div class="project-team__members flex lg:flex-row flex-col items-center gap-10 justify-between">
          <MemberCard
              v-for="(member, index) in teamMembers"
              :key="index"
              :src="member.src"
              :name="member.name"
              :position="member.position"
              :description="member.description"
          />
        </div>
      </div>
    </section>
    <section class="path-platform gap-5 md:gap-9 lg:px-[55px] py-3 md:py-7 lg:py-11">
      <div class="flex flex-col gap-4 md:gap-11 lg:gap-[75px]">
        <h6 class="text-xl md:text-4xl lg:text-[55px] px-8">
          Путь на платформе
        </h6>
        <div class="grid grid-cols-5 gap-2 md:gap-6 lg:gap-10 mb-5 lg:mb-[50px]">
          <Circle
              v-for="circle in circleLabel"
              :label="circle.label"
          />
        </div>
      </div>
      <div class="flex justify-center mb-[50px]">
        <button
            class="bg-orange-500 text-white rounded-[10px] px-1 py-1 md:px-10 md:py-4 lg:px-4 lg:py-7 text-base ld:text-4xl md:text-2xl"
            @click="router.push('/consultation')"
        >
         Записаться на консультацию
        </button>
      </div>
    </section>
    <div class="content-rectangle h-[2px] bg-orange-500 mb-2 md:mb-7 lg:mb-[50px]"/>
    <Footer/>
  </div>
</template>

<style scoped>

</style>
