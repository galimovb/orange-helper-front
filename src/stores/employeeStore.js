// src/stores/employeeStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getEmployees } from '@/services/employeeService';

export const useEmployeeStore = defineStore('employee', () => {
    const teachers = ref([]);
    const psychologists = ref([]);

    const fetchEmployees = async () => {
        try {
            const response = await getEmployees();
            console.log('Полученные данные employees:', response);

            teachers.value = response.teachers || [];
            psychologists.value = response.psychologists || [];
        } catch (error) {
            console.error('Ошибка при получении данных сотрудников:', error);
        }
    };

    return {
        teachers,
        psychologists,
        fetchEmployees,
    };
});
