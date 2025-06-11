<script setup lang="ts">
import {
  PopoverArrow,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger
} from 'radix-vue'

import { useRouter, useRoute } from 'vue-router'
import Button from "@/components/Button.vue";

const router = useRouter()
const route = useRoute()

const navItems = [
  { name: 'О нас', path: '/' },
  { name: 'Диагностический инструментарий', path: '/diagnostics' },
  { name: 'Новости', path: '/news' },
  { name: 'Полезные материалы', path: '/useful-materials' },
  { name: 'Консультации', path: '/consultation' },
  { name: 'Личный кабинет', path: '/account' }
]

function navigateTo(path: string) {
  router.push(path)
}
</script>

<template>
  <PopoverRoot>
    <PopoverTrigger>
      <slot name="trigger" />
    </PopoverTrigger>

    <PopoverPortal>
      <PopoverContent
          side="bottom"
          :side-offset="5"
          class="z-[100] rounded w-[260px] px-[30px] pt-6 lg:w-[655px] lg:pt-10 lg:pl-[30px] lg:pr-[30px] pb-5 bg-orange-500 shadow-lg text-white will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
      >
        <div class="">
          <div class="flex flex-col gap-6 text-2xl lg:text-6xl">
            <button
                v-for="item in navItems"
                :key="item.path"
                @click="navigateTo(item.path)"
                :class="[
                'text-left rounded-xl p-2 hover:text-underline',
                route.path === item.path ? 'bg-white opacity-70 text-orange-500' : ''
              ]"
            >
              {{ item.name }}
            </button>

            <Button
                color="white"
                class="!text-orange-500 mt-10 !text-2xl !lg:text-6xl"
                @click="navigateTo('/login')"
                label="Вход и регистрация"
            />
          </div>
        </div>
        <PopoverArrow class="fill-orange-500" />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
