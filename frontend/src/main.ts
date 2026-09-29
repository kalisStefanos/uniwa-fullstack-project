import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'primeicons/primeicons.css';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

axios.defaults.withCredentials = true;

const app = createApp(App)

const options = {
  timeout: 3000, // Duration in milliseconds (e.g., 5000 = 5 seconds)
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: false,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  rtl: false
};

app.use(Toast, options)
app.use(router)
app.mount('#app')
