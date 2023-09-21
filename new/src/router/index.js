import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../pages/MainPage';
import FavoritesImages from '../pages/FavoritesImages';
import MainImg from '../pages/MainImg';
import NotFound from '../pages/PageNotFound';

const routes = [
    {
        path: '/',
        name: 'main',
        component: MainPage,
    },
    {
        path: '/favorites',
        name: 'favorites',
        component: FavoritesImages,
    },
    {
        path: '/main-img/:id',
        name: 'mainImg',
        component: MainImg,
    },
    {
        path: '/:catchAll(.*)',
        name: 'notFound',
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
