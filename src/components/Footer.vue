<script setup lang="ts">

</script>

<template>
  <footer class="footer pl-[55px]">
    <div class="bg-white flex flex-wrap justify-between">
      <div class="footer__content flex gap-9 pb-7">
        <div class="footer-menu text-2xl leading-[100%]">
          <div class="flex flex-col gap-8">
            <h1 class="footer__title">
              Меню
            </h1>
            <ul class="flex flex-col gap-5">
              <li>
                <a href="#" target="_blank">
                  О нас
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  Диагностика
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  Новости
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  Полезные материалы
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  Консультации
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  Личный кабинет
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer-contacts text-2xl leading-[100%]">
          <div class="flex flex-col gap-8">
            <h1 class="footer__title">
              Контакты
            </h1>
            <ul class="flex flex-col gap-5">
              <li>
                <a href="tel:+7 912 384 22 00">
                  +7 912 384 22 00
                </a>
              </li>
              <li>
                <a href="mailto:orangehelp@gmail.com">
                  orangehelp@gmail.com
                </a>
              </li>
              <li>
                <a href="mailto:support@orangepomoshnik.ru">
                  support@orangepomoshnik.ru
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer-privacy text-2xl leading-[100%]">
          <div class="flex flex-col gap-8">
            <h1 class="footer__title">
              Политика
            </h1>
            <a href="#" target="_blank">
              Политика конфиденциальности
            </a>
          </div>
        </div>
      </div>
      <div class="footer__logo bg-orange-500 max-w-[400px]">
        <div class="py-3 px-5">
          <h1 class="text-white text-[55px] leading-[100%]">
            Оранжевый помощник
          </h1>
          <img src="@/assets/img/logo-bg__white.svg" alt="logo">
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer__title {
  font-weight: 400;
  font-size: 36px;
  line-height: 100%;
}
</style>