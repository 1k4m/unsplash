import { createStore } from 'vuex';
import axios from 'axios';

const unsplashApiKey = 'rIemWcAuvNK4PYg3vrv35nDiQr86feidpuqorZS8_1U';

const state = {
    images: [],
    favoriteImages: [],
};

const getters = {
    images: (state) => state.images,
    favoriteImages: (state) => state.favoriteImages,
};

const mutations = {
    SET_IMAGES: (state, images) => {
        state.images = images;
    },
    ADD_TO_FAVORITES: (state, image) => {
        state.favoriteImages.push(image);
    },
    REMOVE_FROM_FAVORITES: (state, image) => {
        state.favoriteImages = state.favoriteImages.filter((i) => i.id !== image.id);
    },
};

const actions = {
    async fetchImages({ commit }, query) {
        try {
            const response = await axios.get(`https://api.unsplash.com/photos/random?client_id=${unsplashApiKey}&count=9&query=${query}`);
            if (response.status === 200) {
                commit('SET_IMAGES', response.data);
            } else {
                console.error('Ошибка при загрузке изображений');
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса', error);
        }
    },
    addToFavorites({ commit }, image) {
        commit('ADD_TO_FAVORITES', image);
    },
    removeFromFavorites({ commit }, image) {
        commit('REMOVE_FROM_FAVORITES', image);
    },
};

export default createStore({
    state,
    getters,
    mutations,
    actions,
});
