import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import router from './router/index';
import store from './store/index';

const app = createApp(App);

const vueRouter = createRouter({
  history: createWebHistory(), 
  routes: router.options.routes,
});

app.use(vueRouter);

app.use(store);

app.mount('#app');
