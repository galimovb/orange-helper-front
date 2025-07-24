import AxiosWrapper from '@/config/AxiosWrapper';

export const getTestById = async (id) => {
    try {
        const response = await AxiosWrapper.get(`/tests/${id}`);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении теста:', error);
        throw error;
    }
};

export const getAllTests = async () => {
    try {
        const response = await AxiosWrapper.get('/tests');
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении всех тестов:', error);
        throw error;
    }
};