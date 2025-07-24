<script setup>
import {onMounted, ref} from 'vue';
import {useRoute} from 'vue-router'; // Для получения ID из маршрута
import {getAllMaterials, getMaterialById} from '@/services/materialService';
import Header from "@/components/Header.vue";

const materialDetail = ref(null);
const materials = ref([]);
const route = useRoute();

onMounted(async () => {
  try {
    materials.value = await getAllMaterials();
    const materialId = parseInt(route.params.id);
    console.log('Material ID:', materialId);

    materialDetail.value = getMaterialById(materials.value, materialId);

    // Динамически добавляем стили для таблиц
    if (materialDetail.value && materialDetail.value.materialContent) {
      let content = materialDetail.value.materialContent;
      content = content.replace(/<table>/g, '<table class="styled-table">'); // Добавляем класс к таблице
      materialDetail.value.materialContent = content;
    }

  } catch (error) {
    console.error('Ошибка при получении материалов:', error);
  }
});
</script>

<template>
  <Header/>
  <div v-if="materialDetail" class="px-[55px] py-8">
    <h1 class="text-3xl mb-8">{{ materialDetail.name }}</h1>
    <div v-html="materialDetail.materialContent" class="text-xl"></div>
  </div>
</template>

<style>
/* Стили для таблицы */
.styled-table {
  width: 100%;
  border-collapse: collapse !important;
  margin-top: 20px;
  margin-bottom: 20px;
}

.styled-table, .styled-table th, .styled-table td {
  border: 1px solid #ccc !important; /* Добавляем границы для таблицы */
  padding: 8px 12px !important; /* Добавляем отступы */
}

</style>
