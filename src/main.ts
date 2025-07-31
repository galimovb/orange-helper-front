// src/main.ts
import {createApp} from "vue";
import App from "./App.vue";
import {router} from "./router";
import "./assets/styles/main.css";
import VueTheMask from 'vue-the-mask';
import { createPinia } from 'pinia'
import AxiosWrapper from '@/config/AxiosWrapper.js'
import 'vue-multiselect/dist/vue-multiselect.css'
import 'vue-toastification/dist/index.css'
import Toast from 'vue-toastification'

const app = createApp(App);

AxiosWrapper.initialize(router);

app.use(createPinia())
app.use(VueTheMask)
app.use(Toast)
app.use(router)
app.mount("#app");
