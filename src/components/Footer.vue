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
                <a href="#" target="_blank" class="text-xs md:text-lg lg:text-2xl">
                  О нас
                </a>
              </li>
              <li>
                <a href="#" target="_blank" class="text-xs md:text-lg lg:text-2xl">
                  Диагностика
                </a>
              </li>
              <li>
                <a href="#" target="_blank" class="text-xs md:text-lg lg:text-2xl">
                  Новости
                </a>
              </li>
              <li>
                <a href="#" target="_blank" class="text-xs md:text-lg lg:text-2xl break-all">
                  Полезные материалы
                </a>
              </li>
              <li>
                <a href="#" target="_blank" class="text-xs md:text-lg lg:text-2xl break-all">
                  Консультации
                </a>
              </li>
              <li>
                <a href="#" target="_blank" class="text-xs md:text-lg lg:text-2xl break-all">
                  Личный кабинет
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer-contacts leading-[100%]">
          <div class="flex flex-col gap-1 md:gap-4 lg:gap-8">
            <h1 class="footer__title text-base md:text-2xl lg:text-4xl ">
              Контакты
            </h1>
            <ul class="flex flex-col gap-1 md:gap-3 lg:gap-5">
              <li>
                <a href="tel:+7 912 384 22 00" class="text-xs md:text-lg lg:text-2xl">
                  +7 912 384 22 00
                </a>
              </li>
              <li>
                <a href="mailto:orangehelp@gmail.com" class="text-xs md:text-lg lg:text-2xl break-all">
                  orangehelp@gmail.com
                </a>
              </li>
              <li>
                <a href="mailto:support@orangepomoshnik.ru" class="text-xs md:text-lg lg:text-2xl break-all">
                  support@orangepomoshnik.ru
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer-privacy leading-[100%]">
          <div class="flex flex-col gap-1 md:gap-4 lg:gap-8">
            <h1 class="footer__title text-base md:text-2xl lg:text-4xl">
              Политика
            </h1>
            <a href="#" target="_blank" class="text-xs md:text-lg lg:text-2xl break-all">
              Политика конфиденциальности
            </a>
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
