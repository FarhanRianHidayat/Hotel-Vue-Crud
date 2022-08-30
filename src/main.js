import { createApp } from 'vue'
import App from './App.vue'

// import router
import router from './router'

// Import Bootstrap, Popper, jQuery
import 'bootstrap/dist/css/bootstrap.css'
import 'jquery/dist/jquery.min'
import 'popper.js/dist/popper.min'
import 'bootstrap/dist/js/bootstrap.min'

const app = createApp(App)

// createApp(App).mount('#app')

// use vue router
app.use(router)
app.mount('#app')