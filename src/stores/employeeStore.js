import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getEmployees } from '@/services/employeeService';

export const useEmployeeStore = defineStore('employeeStore', () => {
    const teachers = ref([]);
    const psychologists = ref([]);
    const allEmployees = ref([]);

    const fetchEmployees = async () => {
        try {
            const { teachers: fetchedTeachers, psychologists: fetchedPsychologists } = await getEmployees();
            teachers.value = fetchedTeachers;
            psychologists.value = fetchedPsychologists;
            allEmployees.value = [...fetchedTeachers, ...fetchedPsychologists];
        } catch (error) {
            console.error('Ошибка при получении сотрудников:', error);
        }
    };

    return {
        teachers,
        psychologists,
        allEmployees,
        fetchEmployees,
    };
});

