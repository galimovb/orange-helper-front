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
  <section class="literary-column px-[55px] py-8">
    <div class="flex flex-col gap-[50px]">
      <div class="flex flex-col gap-[30px] text-center">
        <h1 class="text-orange-500 text-[55px] leading-[100%]">
          Литературная колонка
        </h1>
        <p class="text-4xl leading-[100%]">
          Раздел с художественной и познавательной литературой, которая помогает лучше понимать внутренний мир ребёнка и
          развивает читательский интерес.
        </p>
      </div>
      <div class="flex lg:grid lg:grid-cols-3 flex-col items-center justify-center mx-auto gap-y-[50px] gap-x-[150px]">
        <router-link
            v-for="(material, index) in materialStore.materials && Array.isArray(materialStore.materials) ? materialStore.materials.filter(item => item.section === 'LITERARY_COLUMN') : []"
            :key="index"
            :to="`/useful-materials/literary-column/${material.id}`"
            target="_blank"
        >
          <InfoCard
              :title="material.name"
              :showButton="true"
              class="lg:max-w-[273px] lg:h-[426px] h-[350px]   p-[20px] "
          />
        </router-link>
      </div>
    </div>
  </section>
  <div class="content-rectangle h-[60px] bg-orange-500 mb-[50px]"/>
  <section class="workshop flex flex-col lg:gap-5 gap-12 px-[55px] py-8">
    <div class="flex flex-col gap-[30px]">
      <h1 class="text-orange-500 text-[55px] leading-[100%]">
        Творческая мастерская
      </h1>
      <p class="text-4xl leading-[100%]">
        Творчество — это путь к самовыражению. Здесь вы найдёте простые и увлекательные задания, которые помогут ребёнку
        раскрыться.
      </p>
    </div>
    <div class="flex lg:flex-row flex-col gap-[20px]">
      <div class="flex flex-col lg:gap-5 gap-12">
        <router-link
            v-for="(material, index) in materialStore.materials && Array.isArray(materialStore.materials) ? materialStore.materials.filter(item => item.section === 'CREATIVE_WORKSHOP') : []"
            :key="index"
            :to="`/useful-materials/creative-workshop/${material.id}`"
            target="_blank"
        >
          <InfoCard
              :title="material.name"
              :showButton="true"
              class="gap-12 p-[20px]"
          />
        </router-link>
      </div>
      <img src="/img/workshop.svg" alt="workshop">
    </div>
  </section>
  <section class="music bg-orange-500 text-white flex flex-col gap-12 px-[55px] py-8">
    <h1 class="text-[55px] leading-[100%] text-center">
      Музыкальная волна
    </h1>
    <div class="lg:flex grid grid-cols-2 justify-center lg:gap-[133px] gap-[50px]">
      <MediaCard
          v-for="(material, index) in materialStore.materials.filter(item => item.section === 'MUSICAL_WAVE')"
          :key="index"
          :src="material.materialUrl"
          :name="material.name"
          :index="index"
          type="audio"
      />
    </div>
    <p class="text-3xl leading-[100%] text-center">
      Музыка помогает расслабиться, радоваться и познавать мир звуков. В этом разделе — звуковые инструменты развития.
    </p>
  </section>
  <section class="video-library flex flex-col gap-12 px-[55px] py-8 mb-[50px]">
    <div class="flex flex-col gap-[30px]">
      <h1 class="text-orange-500 text-[55px] leading-[100%]">
        Видеотека
      </h1>
      <p class="text-4xl leading-[100%]">
        Видеоматериалы, которые можно смотреть и обсуждать вместе. Это формат, который легко вовлекает ребёнка и
        родителя.
      </p>
    </div>
    <div class="flex lg:flex-row flex-col justify-center lg:gap-[133px] gap-[50px]">
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
