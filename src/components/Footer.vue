<script setup lang="ts">

</script>

<template>
  <footer class="footer pl-9 md:pl-11 lg:pl-[55px]">
    <div class="bg-white flex justify-between gap-3 md:gap-[56px] lg:gap-[100px]">
      <div class="footer__content grid grid-cols-3 gap-2 md:gap-5 lg:gap-9 pb-7">
        <div class="footer-menu leading-[100%]">
          <div class="flex flex-col gap-1 md:gap-4 lg:gap-8">
            <h1 class="footer__title text-base md:text-2xl lg:text-4xl">
              Меню
            </h1>
            <ul class="flex flex-col gap-1 md:gap-3 lg:gap-5">
              <li>
                <a
                    href="/#about-project"
                    target="_blank"
                    class="text-xs md:text-lg lg:text-2xl"
                >
                  О нас
                </a>
              </li>
              <li>
                <a
                    href="/diagnostics"
                    target="_blank"
                    class="text-xs md:text-lg lg:text-2xl"
                >
                  Диагностика
                </a>
              </li>
              <li>
                <a
                    href="#"
                    target="_blank"
                    class="text-xs md:text-lg lg:text-2xl"
                >
                  Новости
                </a>
              </li>
              <li>
                <a
                    href="/news"
                    target="_blank"
                    class="text-xs md:text-lg lg:text-2xl break-all"
                >
                  Полезные материалы
                </a>
              </li>
              <li>
                <a
                    href="/consultation"
                    target="_blank"
                    class="text-xs md:text-lg lg:text-2xl break-all"
                >
                  Консультации
                </a>
              </li>
              <li>
                <a
                    href="/account"
                    target="_blank"
                    class="text-xs md:text-lg lg:text-2xl break-all"
                >
                  Личный кабинет
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer-privacy leading-[100%]">
          <div class="flex flex-col gap-1 md:gap-4 lg:gap-8">
            <h1 class="footer__title text-base md:text-2xl lg:text-4xl">
              Документы
            </h1>
            <a
                href="/privacy-policy"
                target="_blank"
                class="text-xs md:text-lg lg:text-2xl break-all"
            >
              Политика конфиденциальности
            </a>
            <a
                href="/consent-to-data-processing"
                target="_blank"
                class="text-xs md:text-lg lg:text-2xl break-all"
            >
              Согласие на обработку персональных данных
            </a>
            <a
                href="/consent-to-marketing-emails"
                target="_blank"
                class="text-xs md:text-lg lg:text-2xl break-all"
            >
              Согласие на рекламную и информационну рассылку
            </a>
            <a
                href="/offer-agreement"
                target="_blank"
                class="text-xs md:text-lg lg:text-2xl break-all"
            >
              Договор-оферта
            </a>
          </div>
        </div>

        <div class="footer-contacts leading-[100%]">
          <div class="flex flex-col gap-1 md:gap-4 lg:gap-8">
            <h1 class="footer__title text-base md:text-2xl lg:text-4xl ">
              Контакты
            </h1>
            <ul class="flex flex-col gap-1 md:gap-3 lg:gap-5">
              <li>
                <a
                    href="https://t.me/orange_helper"
                    target="_blank"
                    class="text-xs md:text-lg lg:text-2xl break-all"
                >
                  tg: @orange_helper
                </a>
              </li>
              <li>
                <a
                    href="mailto:orange_helper@mail.ru"
                    target="_blank"
                    class="text-xs md:text-lg lg:text-2xl break-all"
                >
                  orange_helper@mail.ru
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer__logo bg-orange-500 hidden lg:block">
        <div class="py-3 px-5 space-y-4">
          <h1 class="text-white text-xs md:text-3xl lg:text-[55px] !leading-[150%]">
            Оранжевый помощник
          </h1>
          <img src="/img/logo-bg__white.jpg" alt="logo" class="rounded-full w-6 h-6 md:w-[92px] md:h-[92px] lg:w-[160px] lg:h-[160px]">
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
</style>
