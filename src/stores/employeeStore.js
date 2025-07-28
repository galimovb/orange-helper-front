// // src/stores/employeeStore.js
// import { defineStore } from 'pinia';
// import { ref } from 'vue';
// import { getTeachers, getPsychologists } from '@/services/employeeService';
//
// export const useEmployeeStore = defineStore('employeeStore', () => {
//     const teachers = ref([]);
//     const psychologists = ref([]);
//
//     const fetchTeachers = async () => {
//         try {
//             const data = await getTeachers();
//             teachers.value = data;
//         } catch (error) {
//             console.error('Ошибка при получении преподавателей:', error);
//         }
//     };
//
//     const fetchPsychologists = async () => {
//         try {
//             const data = await getPsychologists();
//             psychologists.value = data;
//         } catch (error) {
//             console.error('Ошибка при получении психологов:', error);
//         }
//     };
//
//     return {
//         teachers,
//         psychologists,
//         fetchTeachers,
//         fetchPsychologists,
//     };
// });


// src/stores/employeeStore.js
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

