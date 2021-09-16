import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import TranslateHelper from "@/I18n/TranslateHelper";
import { en } from "@/I18n/locales/en.ts";
import mitt from 'mitt';

const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");

const defaultLocale = "en";
app.use(TranslateHelper, {
  locales: {
    en: en
  },
  defaultLocale: defaultLocale
});

const emitter = mitt();
app.config.globalProperties.$emitter = emitter;