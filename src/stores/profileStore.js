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

    const originalPhone = ref('');

    const fetchProfile = async () => {
        try {
            const data = await getProfile();
            console.log('Полученные данные профиля:', data);

            userInfo.value.fullName = `${data.firstName || ''} ${data.lastName || ''} ${data.secondName || ''}`;
            userInfo.value.phone = data.phoneNumber || '';
            userInfo.value.age = data.age || '';
            userInfo.value.email = data.email || '';
            userInfo.value.childName = data.childrenFullName || '';
            userInfo.value.childrenAge = data.childrenAge || '';

            originalPhone.value = data.phoneNumber || '';

            console.log('Обновленные данные в store:', userInfo.value);
        } catch (error) {
            console.error('Ошибка при получении данных профиля:', error);
        }
    };

    const saveProfile = async (updatedData) => {
        try {
            if (updatedData.phone !== originalPhone.value) {
                let cleanedPhone = updatedData.phone?.replace(/[^\d+]/g, '') || '';

                if (!cleanedPhone.startsWith('+')) {
                    cleanedPhone = '+7' + cleanedPhone.replace(/^[78]?/, '');
                } else if (!cleanedPhone.startsWith('+7')) {
                    cleanedPhone = '+7' + cleanedPhone.slice(1).replace(/\D/g, '');
                }
                cleanedPhone = cleanedPhone.replace(/\++/g, '+');

                if (cleanedPhone.length < 12) {
                    throw new Error('Номер телефона слишком короткий');
                }

                updatedData.phone = cleanedPhone;
            }

            await updateProfile(updatedData);
        } catch (error) {
            console.error('Ошибка при обновлении профиля:', error);
            throw error;
        }
    };

    return {
        userInfo,
        fetchProfile,
        saveProfile,
        originalPhone,
    };
});
