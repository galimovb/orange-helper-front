<script setup>

import Header from "@/components/Header.vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import Footer from "@/components/Footer.vue";

</script>

<template>
  <div class="new-page">
    <Header />
    <section class="q&a mb-[50px]">
      <h1 class="text-[55px] leading-[100%] text-center text-orange-500">
        Ответы на популярные вопросы
      </h1>
    </section>
    <div class="content-rectangle h-[60px] bg-orange-500 mb-[50px]" />
    <section class="receive px-[55px] mb-[50px]">
      <div class="mb-[20px] lg:flex justify-center items-center hidden">
        <div class="line-left bg-orange-500 h-[5px] inline-block flex-grow"></div>
        <h2 class="inline-block px-[50px] py-[8px] text-[55px]">
          Вы получите
        </h2>
        <div class="line-right bg-orange-500 h-[5px] inline-block flex-grow"></div>
      </div>
      <div class="receive__content flex lg:flex-row flex-col gap-6 justify-center mx-auto">
        <div class="receice__content-left flex flex-col items-center">
          <img
            src="@/assets/img/receive-1.svg"
            alt="receive-1.svg"
          >
          <div class="flex flex-col gap-3">
            <h2 class="text-[55px] leading-[100%] text-center ">
              Индивидуальную консультацию
            </h2>
            <p class="lg:text-2xl text-4xl leading-[100%] text-center">
              Возможность обратиться к психологу или педагогу за персональной поддержкой. Вы получите разбор вашей
              ситуации, рекомендации и пошаговые действия — удобно, онлайн, без очередей и стрессов.
            </p>
          </div>
        </div>
        <img
          src="@/assets/img/plus.svg"
          alt="plus"
          class="hidden lg:block"
        >
        <div class="receive__content-right flex flex-col items-center">
          <img
            src="@/assets/img/receive-2.svg"
            alt="receive-2.svg"
          >
          <div class="flex flex-col gap-3">
            <h2 class="text-[55px] leading-[100%] text-center ">
              Онлайн обучение на платформе
            </h2>
            <p class="lg:text-2xl text-4xl leading-[100%] text-center">
              Доступ к интерактивным курсам, видеоурокам, вебинарам и статьям по воспитанию, развитию и общению с
              ребёнком. Обучение построено на практическом опыте и реальных кейсах.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-orange-500 text-white py-8 px-[55px]">
      <div class="flex flex-col gap-[50px]">
        <div class="flex flex-col gap-5">
          <h3 class="text-[55px] leading-[100%] text-left">
            Забота начинается с понимания
          </h3>
          <p class="text-4xl leading-[100%] text-left">
            Часто мы так сосредоточены на помощи ребёнку, что забываем про
            собственное состояние. Пройдите короткий тест и узнайте, насколько вы сейчас устойчивы эмоционально и
            нуждаетесь ли в поддержке. Это всего пара минут — но может многое подсказать.
          </p>
        </div>
        <Button
          label="Пройти экспресс-тест"
          color="white"
          size="large"
        />
      </div>
    </section>
    <section class="useful-articles p-[55px]">
      <div class="flex flex-col items-center gap-7">
        <h4 class="text-[55px] leading-[100%]">
          Полезные статьи
        </h4>
        <div class="lg:flex-row flex flex-col justify-center items-center lg:gap-[90px] gap-6">
          <div class="flex flex-col lg:max-w-[480px] gap-2 cursor-pointer">
            <a
              href="https://www.google.com"
              target="_blank"
              class="flex flex-col gap-2"
            >
              <img
                src="@/assets/img/useful-articles-1.svg"
                alt="useful-articles-1.svg"
                class="max-h-[374px]"
              >
              <p class="text-[32px] leading-[100%] text-center">
                Как говорить с ребёнком, чтобы он слышал
              </p>
            </a>
          </div>
          <div class="flex flex-col lg:max-w-[480px] gap-2 cursor-pointer">
            <a
              href="https://www.google.com"
              target="_blank"
              class="flex flex-col gap-2"
            >
              <img
                src="@/assets/img/useful-articles-2.svg"
                alt="useful-articles-2.svg"
                class="max-h-[374px]"
              >
              <p class="text-[32px] leading-[100%] text-center">
                Детская тревожность: как распознать и поддержать
              </p>
            </a>
          </div>
        </div>
        <Button
          label="Больше полезных статей"
          color="orange"
          size="large"
        />
      </div>
    </section>
    <div class="content-rectangle h-[60px] bg-orange-500 mb-[50px]" />
    <section class="mailing py-8 px-[55px]">
      <div class="flex flex-col gap-[50px]">
        <div class="flex flex-col gap-5">
          <h5 class="text-[55px] leading-[100%]">
            Хотите получать больше полезных материалов?
          </h5>
          <p class="text-4xl leading-[100%]">
            Подпишитесь на нашу рассылку — и всё самое нужное будет приходить вам прямо на почту.
          </p>
        </div>
        <div class="flex flex-col gap-5">
          <h5 class="text-4xl leading-[100%]">
            Ваш E-mail
          </h5>
          <form
            action=""
            method="post"
            class="flex flex-col gap-5 items-left max-w-[742px]"
          >
            <div>
              <Input
                type="Email"
                placeholder="person123@gmail.com"
              />
            </div>
            <div class="flex items-center gap-2">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                value="yes"
                required
                class="w-[25px] h-[25px]"
              >
              <label for="consent" class="text-2xl leading-[100%]">
                Я ознакомлен(-а) с Политикой конфиденциальности
              </label>
            </div>
            <Button
              label="Подписаться"
              color="orange"
              size="large"
            />
          </form>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<style scoped>

</style>