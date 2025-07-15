import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getTestById, getAllTests } from '@/services/testService';

export const useTestStore = defineStore('test', () => {
    const currentTest = ref(null);
    const tests = ref([]);
    const result = ref({
        totalScore: 0,
        scoreBreakdown: {
            "Принятие-отвержение": 0,
            "Кооперация": 0,
            "Авторитарная гиперсоциализация": 0,
            "Маленький неудачник": 0,
        },
    });

    const fetchTestById = async (id) => {
        try {
            const data = await getTestById(id);
            currentTest.value = data;
        } catch (error) {
            console.error('Ошибка при получении теста:', error);
        }
    };

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
