<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useMaterialStore} from '@/stores/materialStore';

import MediaCard from '@/components/MediaCard.vue';
import Header from "@/components/Header.vue";
import InfoCard from "@/components/InfoCard.vue";
import Footer from "@/components/Footer.vue";

const materialStore = useMaterialStore();

onMounted(async () => {
  await materialStore.fetchAllMaterials();
})

</script>

<template>
  <Header/>
  <section class="literary-column px-8 py-4 md:px-11 md:py-6 lg:px-[55px] lg:py-10">
    <div class="flex flex-col gap-5 md:gap-9 lg:gap-[50px] py-2 px-7 md:py-0 md:px-0">
      <div class="flex flex-col gap-4 md:gap-6 lg:gap-[30px] text-center">
        <h1 class="text-orange-500 text-xl md:text-4xl lg:text-[55px] leading-[100%]">
          Литературная колонка
        </h1>
        <p class="text-base md:text-2xl lg:text-4xl">
          Раздел с художественной и познавательной литературой, которая помогает лучше понимать внутренний мир ребёнка и
          развивает читательский интерес.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  justify-center mx-auto gap-y-4 md:gap-y-8  md:gap-x-11 lg:gap-y-[50px] lg:gap-x-[150px]">
        <router-link
            v-for="(material, index) in materialStore.materials && Array.isArray(materialStore.materials) ? materialStore.materials.filter(item => item.section === 'LITERARY_COLUMN') : []"
            :key="index"
            :to="`/useful-materials/literary-column/${material.id}`"
            target="_blank"
        >
          <InfoCard
              :title="material.name"
              :showButton="true"
              class="p-[20px] h-full"
          />
        </router-link>
      </div>
    </div>
  </section>

  <div class="content-rectangle h-[30px] md:h-[45px] lg:h-[60px] bg-orange-500 lg:mb-[50px]"/>

  <section class="workshop flex flex-col gap-4 md:gap-6 lg:gap-[30px]  px-8 py-3 md:px-11 md:py-6 lg:px-[55px] lg:py-8">
    <div class="flex flex-col gap-4 md:gap-6 lg:gap-[30px] p-2.5">
      <h1 class="text-orange-500 text-xl md:text-4xl lg:text-[55px] leading-[100%]">
        Творческая мастерская
      </h1>
      <p class="text-base md:text-2xl lg:text-4xl leading-[100%]">
        Творчество — это путь к самовыражению. Здесь вы найдёте простые и увлекательные задания, которые помогут ребёнку
        раскрыться.
      </p>
    </div>
    <div class="flex lg:flex-row flex-col gap-[20px]">
      <div class="flex flex-col gap-5">
        <router-link
            v-for="(material, index) in materialStore.materials && Array.isArray(materialStore.materials) ? materialStore.materials.filter(item => item.section === 'CREATIVE_WORKSHOP') : []"
            :key="index"
            :to="`/useful-materials/creative-workshop/${material.id}`"
            target="_blank"
        >
          <InfoCard
              :title="material.name"
              :showButton="true"
              class="p-[20px]"
          />
        </router-link>
      </div>
      <img
          src="/img/workshop.svg"
          alt="workshop"
          class="w-full"
      >
    </div>
  </section>
  <section class="music bg-orange-500 text-white flex flex-col gap-3 md:gap-9 lg:gap-12 px-8 py-3 md:px-11 md:py-6 lg:px-[55px] lg:py-10">
    <h1 class="text-xl md:text-4xl lg:text-[55px] leading-[100%] text-center">
      Музыкальная волна
    </h1>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-4 md:gap-x-[70px] md:gap-y-10 lg:gap-x-[130px] lg:gap-y-13">
      <MediaCard
          v-for="(material, index) in materialStore.materials.filter(item => item.section === 'MUSICAL_WAVE')"
          :key="index"
          :src="material.materialUrl"
          :name="material.name"
          :index="index"
          type="audio"
      />
    </div>
    <p class="text-base md:text-2xl lg:text-4xl leading-[100%] text-center">
      Музыка помогает расслабиться, радоваться и познавать мир звуков. В этом разделе — звуковые инструменты развития.
    </p>
  </section>

  <section class="video-library flex flex-col gap-6 md:gap-8 lg:gap-10 px-8 py-3 md:px-11 md:py-6 lg:px-[55px] lg:py-10 mb-[50px]">
    <div class="flex flex-col gap-4 md:gap-6 lg:gap-[30px]">
      <h1 class="text-orange-500 text-xl md:text-4xl lg:text-[55px] leading-[100%] p-2.5">
        Видеотека
      </h1>
      <p class="text-base md:text-2xl lg:text-4xl leading-[100%]">
        Видеоматериалы, которые можно смотреть и обсуждать вместе. Это формат, который легко вовлекает ребёнка и
        родителя.
      </p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-x-3 gap-y-4 md:gap-x-12 md:gap-y-8 lg:gap-x-[70px] lg:gap-y-10">
      <MediaCard
          v-for="(material, index) in materialStore.materials.filter(item => item.section === 'VIDEO_LIBRARY')"
          :key="index"
          :src="material.materialUrl"
          :name="material.name"
          :index="index"
          type="video"
      />
    </div>
  </section>
  <Footer/>
</template>

<style scoped>

</style>
