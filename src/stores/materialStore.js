import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getAllMaterials, getMaterialById } from '@/services/materialService';

export const useMaterialStore = defineStore('material', () => {
    const materials = ref([]);
    const currentMaterial = ref(null);

    const fetchAllMaterials = async () => {
        try {
            const data = await getAllMaterials();
            materials.value = data || [];
        } catch (error) {
            console.error('Ошибка при получении всех материалов:', error);
        }
    };

    const fetchMaterialById = async (id) => {
        try {
            const data = await getMaterialById(id);
            currentMaterial.value = data;
        } catch (error) {
            console.error('Ошибка при получении материала:', error);
        }
    };

    return {
        materials,
        currentMaterial,
        fetchAllMaterials,
        fetchMaterialById,
    };
});
