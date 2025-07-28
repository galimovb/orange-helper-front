import AxiosWrapper from '@/config/AxiosWrapper';

export const getEmployees = async () => {
    try {
        const response = await AxiosWrapper.get('/employees');
        const teachers = response.data.teachers || [];
        const psychologists = response.data.psychologists || [];

        return { teachers, psychologists };
    } catch (error) {
        console.error('Ошибка при получении сотрудников:', error);
        throw error;
    }
};
