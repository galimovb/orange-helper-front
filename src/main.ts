// src/main.ts
import {createApp} from "vue";
import App from "./App.vue";
import {router} from "./router";
import "./assets/styles/main.css";
import VueTheMask from 'vue-the-mask';
import { createPinia } from 'pinia'
import AxiosWrapper from '@/config/AxiosWrapper.js'

const app = createApp(App);

AxiosWrapper.initialize(router);

app.use(createPinia())
app.use(VueTheMask)
app.use(router)
app.mount("#app");
