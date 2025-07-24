import AxiosWrapper from '@/config/AxiosWrapper';

// Получить все материалы
export const getAllMaterials = async () => {
    try {
        const response = await AxiosWrapper.get('/materials');
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении материалов:', error);
        throw error;
    }
};

export const getMaterialById = (materials, id) => {
    return materials.find(material => material.id === id);
};
