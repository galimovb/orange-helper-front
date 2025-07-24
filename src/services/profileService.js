import AxiosWrapper from '@/config/AxiosWrapper';

export const getProfile = async () => {
    try {
        const response = await AxiosWrapper.get('/profile');
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении данных профиля:', error);
        throw error;
    }
};

export const updateProfile = async (updatedData) => {
    try {
        const updatedProfile = {
            firstName: updatedData.fullName.split(' ')[0],
            lastName: updatedData.fullName.split(' ')[1],
            secondName: updatedData.fullName.split(' ')[2],
            phoneNumber: updatedData.phone,
            age: updatedData.age,
            email: updatedData.email,
            childrenFullName: updatedData.childName,
            childrenAge: updatedData.childrenAge,
        };

        await AxiosWrapper.put('/profile', updatedProfile);
    } catch (error) {
        console.error('Ошибка при обновлении профиля:', error);
        throw error;
    }
};


