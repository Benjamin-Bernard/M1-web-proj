import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css';
import FontAwesomeIcon from "./assets/fontawesome-icons";

createApp(App).use(router).component("font-awesome-icon", FontAwesomeIcon).mount('#app');
