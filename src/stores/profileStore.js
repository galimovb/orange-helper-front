import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getProfile, updateProfile } from '@/services/profileService';

export const useProfileStore = defineStore('profile', () => {
    const userInfo = ref({
        fullName: '',
        email: '',
        phone: '',
        childName: '',
        age: null,
        childrenAge: null,
    });

    const fetchProfile = async () => {
        try {
            const data = await getProfile();
            console.log('Полученные данные профиля:', data);

            // Присваиваем значения с проверкой на null
            userInfo.value.fullName = `${data.firstName || ''} ${data.lastName || ''} ${data.secondName || ''}`;
            userInfo.value.phone = data.phoneNumber || '';
            userInfo.value.age = data.age || '';
            userInfo.value.email = data.email || '';
            userInfo.value.childName = data.childrenFullName || '';
            userInfo.value.childrenAge = data.childrenAge || '';

            console.log('Обновленные данные в store:', userInfo.value);
        } catch (error) {
            console.error('Ошибка при получении данных профиля:', error);
        }
    };

    const saveProfile = async (updatedData) => {
        try {
            const oldPhone = userInfo.value.phone;

            await updateProfile(updatedData);

            // если номер телефона изменился — разлогин
            if (updatedData.phone !== oldPhone) {
                localStorage.removeItem('auth_token');
                window.location.href = '/login'; // или router.push('/login')
            }
        } catch (error) {
            console.error('Ошибка при обновлении профиля:', error);
        }
    };

    return {
        userInfo,
        fetchProfile,
        saveProfile,
    };
});
