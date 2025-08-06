import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getTestById, getAllTests } from '@/services/testService';

export const useTestStore = defineStore('test', () => {
    // Текущее состояние теста
    const currentTest = ref(null);

    // Список всех тестов
    const tests = ref([]);

    // Результаты теста
    const result = ref({
        totalScore: 0,
        scoreBreakdown: {},
    });

    // Получение данных теста по ID
    const fetchTestById = async (id) => {
        try {
            const data = await getTestById(id);
            currentTest.value = data;

            // Инициализация scoreBreakdown для динамических шкал
            result.value.scoreBreakdown = {};
            currentTest.value.scales.forEach((scale) => {
                result.value.scoreBreakdown[scale.name] = 0; // Инициализация каждой шкалы с нулем
            });
        } catch (error) {
            console.error('Ошибка при получении теста:', error);
        }
    };

    // Получение всех тестов
    const fetchAllTests = async () => {
        try {
            const data = await getAllTests();
            tests.value = data;
        } catch (error) {
            console.error('Ошибка при получении всех тестов:', error);
        }
    };

    return {
        currentTest,
        tests,
        result,
        fetchTestById,
        fetchAllTests,
    };
});
