// src/services/employeeService.js
import AxiosWrapper from '@/config/AxiosWrapper';

const API_URL = '/employees';

export const getEmployees = async () => {
    try {
        const response = await AxiosWrapper.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении данных о сотрудниках:', error);
        throw error;
    }
};