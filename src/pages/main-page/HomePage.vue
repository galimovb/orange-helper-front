<script setup lang="ts">
import SectionWithLines from "@/components/main-page/SectionWithLines.vue";
</script>

<template>
  <div class="home-page">
    <div class="content-rectangle h-[60px] bg-orange-500 mb-[50px]" />


    <div class="partners-info bg-white flex justify-center mb-[50px]">
      <div class=" flex flex-col gap-[30px]">
        <div class="partners-info__title p-[10px] max-w-[1024px]">
          <h1 class="text-center leading-none text-4xl">
            Проект создан при поддержке Федерального государственного бюджетного учреждения
            "Фонд содействия развитию малых форм предприятий в научно-технической сфере в рамках программы "Студенческий стартап"
          </h1>
        </div>
        <div class="partners-info__icons flex justify-between max-w-[1060px]">
          <div class="partners-info__icon">
            <img src="@/assets/img/fond-sodeystviya.svg" />
          </div>
          <div class="partners-info__icon">
            <img src="@/assets/img/kpfu.svg" />
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
        <div>
          <img src="@/assets/img/goals-task.svg" alt="goals-task">
        </div>
        <div class="project-goals__content w-[800px] leading-[100%] text-4xl text-left">
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

    <!--ПЛАТФОРМА БУДЕТ ПОЛЕЗНА-->
    <div class="useful-platform bg-orange-500 text-white py-8">
      <div>
        <div>
          <h4>
            Платформа будет полезна
          </h4>
          <ul>
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
        <div class="useful-platform__image">
          <img src="@/assets/img/useful-platform.svg">
        </div>
      </div>
    </div>

    <!--КОНСУЛЬТАЦИЯ-->

    <SectionWithLines
      title="Финансовая выгода"
    >
      Платформа «Оранжевый помощник» — это доступ к профессиональной помощи без лишних затрат. Мы предлагаем бесплатные
      материалы, гибкие тарифы на консультации и регулярные акции, чтобы каждая семья могла получить поддержку
      независимо от уровня дохода. Это выгодная альтернатива дорогостоящим частным специалистам — удобно, доступно и без
      переплат.
    </SectionWithLines>
  </div>
</template>

<style scoped></style>
