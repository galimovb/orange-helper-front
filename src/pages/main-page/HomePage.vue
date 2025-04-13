<script setup lang="ts">
import SectionWithLines from "@/components/main-page/SectionWithLines.vue";
import MemberCard from "@/components/main-page/MemberCard.vue";

const teamMembers = [
  {
    src: "/src/assets/img/team-member.svg",
    name: "Иван Иванов",
    position: "Директор",
    description: "Руководитель команды, ответственен за стратегию и развитие проекта."
  },
  {
    src: "/src/assets/img/team-member.svg",
    name: "Мария Смирнова",
    position: "Менеджер",
    description: "Координирует деятельность команды и общается с партнерами."
  },
  {
    src: "/src/assets/img/consultation.svg",
    name: "Алексей Попов",
    position: "Технический директор",
    description: "Отвечает за техническую поддержку и разработку новых функций."
  },
  {
    src: "/src/assets/img/team-member.svg",
    name: "Мария Смирнова",
    position: "Менеджер",
    description: "Координирует деятельность команды и общается с партнерами."
  },

];
</script>

<template>
  <div class="home-page">
    <div class="content-rectangle h-[60px] bg-orange-500 mb-[50px]" />


    <div class="partners-info bg-white flex justify-center mb-[50px]">
      <div class=" flex flex-col gap-[30px]">
        <div class="partners-info__title p-[10px] max-w-[1024px]">
          <h1 class="text-center leading-none text-4xl">
            Проект создан при поддержке Федерального государственного бюджетного учреждения
            "Фонд содействия развитию малых форм предприятий в научно-технической сфере в рамках программы "Студенческий
            стартап"
          </h1>
        </div>
        <div class="partners-info__icons flex justify-between max-w-[1060px]">
          <div class="partners-info__icon">
            <img
              src="@/assets/img/fond-sodeystviya.svg"
              alt="fond-sodeystviya.svg"
            />
          </div>
          <div class="partners-info__icon">
            <img
              src="@/assets/img/kpfu.svg"
              alt="kpfu.svg"
            />
          </div>
        </div>
      </div>
    </div>
    <section class="project-info bg-orange-500 text-white py-8" id="about-project">
      <div class="project-info__content max-w-[1024px] mx-auto">
        <h1 class="text-center leading-none text-[96px] mb-[30px]">
          О проекте
        </h1>
        <p class="text-center leading-none text-4xl p-[10px]">
          «Оранжевый помощник» — это современный онлайн-портал,
          созданный для
          поддержки родителей и их детей. Мы
          объединяем усилия педагогов, психологов и других специалистов, чтобы помочь семьям выстраивать доверительные,
          теплые и осознанные отношения.
        </p>
      </div>
    </section>
    <section class="project-goals bg-white p-8">
      <div class="mx-auto flex justify-center items-center gap-[30px]">
        <div class="project-goals__image">
          <img
            src="@/assets/img/goals-task.svg"
            alt="goals-task"
          >
        </div>
        <div class="project-goals__content max-w-[800px] leading-[100%] text-4xl text-left">
          <h2 class="text-[55px] text-orange-500 mb-8">
            Цели и задачи проекта
          </h2>
          <div class="project-goals__goals">
            <h3>
              Цели:
            </h3>
            <ul class="list-disc pl-10">
              <li>
                Укрепление детско-родительских отношений через качественное информационное и психологическое
                сопровождение.
              </li>
              <li>
                Создание цифровой среды, способствующей осознанному воспитанию и благополучию семьи.
              </li>
            </ul>
          </div>
          <div class="project-goals__tasks">
            <h3>
              Задачи:
            </h3>
            <ul class="list-disc pl-10">
              <li>
                Разработать и внедрить интерактивные сервисы.
              </li>
              <li>
                Обеспечить доступ к проверенной и актуальной информации по вопросам воспитания, обучения и развития
                детей.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <div class="content-rectangle h-[60px] bg-orange-500 mb-[50px]" />
    <SectionWithLines
      title="Ключевая концепция"
    >
      Создание удобного онлайн-пространства для взаимодействия родителей с педагогами и психологами.
      Проект способствует не только повышению родительской компетентности, но и формирует условия для эффективного
      сотрудничества семьи и образовательных организаций в вопросах сопровождения, воспитания и развития детей.
    </SectionWithLines>
    <div class="useful-platform bg-orange-500 text-white py-8">
      <div class="mx-auto flex justify-center items-end gap-[30px]">
        <div class="useful-platform__content max-w-[925px] text-left">
          <h4 class="text-[55px] mb-8">
            Платформа будет полезна
          </h4>
          <ul class="list-disc pl-10 text-4xl">
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
          src="@/assets/img/useful-platform.svg"
          alt="useful-platform"
        >
      </div>
    </div>
    <div class="consultation py-8">
      <div class="mx-auto flex justify-center items-center gap-[70px]">
        <div class="consultation__image">
          <img
            src="@/assets/img/consultation.svg"
            alt="consultation.svg"
          >
        </div>
        <div class="consultation__content max-w-[630px] leading-[100%] text-4xl text-left">
          <h5 class="text-[55px] mb-8">
            Консультация
          </h5>
          <p>
            Вы можете
          </p>
          <ul class="list-disc pl-10">
            <li>Обратиться к специалисту напрямую</li>
            <li>Получить индивидуальную консультацию в удобное время</li>
            <li>Обсудить актуальные трудности или тревоги</li>
            <li>Найти решение совместно с опытным профессионалом</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="content-rectangle h-[60px] bg-orange-500 mb-[50px]" />
    <SectionWithLines
      title="Финансовая выгода"
    >
      Платформа «Оранжевый помощник» — это доступ к профессиональной помощи без лишних затрат. Мы предлагаем бесплатные
      материалы, гибкие тарифы на консультации и регулярные акции, чтобы каждая семья могла получить поддержку
      независимо от уровня дохода.
      <p>Это выгодная альтернатива дорогостоящим частным специалистам — удобно, доступно и без
        переплат.</p>
    </SectionWithLines>
    <div class="project-team bg-orange-500 text-white py-8">
      <h6 class="text-[55px] mb-8 ml-12">
        Наша команда
      </h6>
      <div class="project-team__members mx-auto flex flex-wrap justify-evenly">
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
  </div>
</template>

<style scoped>

</style>
