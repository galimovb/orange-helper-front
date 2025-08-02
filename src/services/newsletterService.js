import AxiosWrapper from "@/config/AxiosWrapper";

export const newsSubscribe = async (updatedData) => {
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
