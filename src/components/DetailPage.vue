<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'; // Для получения ID из маршрута
import { getAllMaterials, getMaterialById } from '@/services/materialService';
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

    if (materialDetail.value && materialDetail.value.materialContent) {
      let content = materialDetail.value.materialContent;
      content = content.replace(/<table>/g, '<table class="styled-table">');
      materialDetail.value.materialContent = content;
    }

  } catch (error) {
    console.error('Ошибка при получении материалов:', error);
  }
});
</script>

<template>
  <Header />
  <div
      v-if="materialDetail"
      class="px-8 py-3 md:px-11 md:py-6 lg:px-[55px] lg:py-8"
  >
    <h1 class="text-lg md:text-xl lg:text-3xl mb-4 lg:mb-8">
      {{ materialDetail.name }}
    </h1>
    <div
        v-html="materialDetail.materialContent"
        class="text-base md:text-lg lg:text-xl">
    </div>
  </div>
</template>

<style>
@media (max-width: 768px) {
  .styled-table {
    font-size: 14px;
    overflow-x: auto;
    display: block;
    -webkit-overflow-scrolling: touch;

  }

  .styled-table th, .styled-table td {
    text-align: center;
  }


  .styled-table-wrapper {
    overflow-x: auto;
  }

  .styled-table, .styled-table th, .styled-table td {
    border: 1px solid #ccc !important;
    padding: 1px !important;
  }
}

.styled-table {
  width: 100%;
  border-collapse: collapse !important;
  margin-top: 20px;
  margin-bottom: 20px;
}

.styled-table, .styled-table th, .styled-table td {
  border: 1px solid #ccc ;
  padding: 8px 12px ;
}

</style>
