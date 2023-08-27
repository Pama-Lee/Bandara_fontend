
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  }
})

import App from '@/App.vue'

import router from './router'

import LoadingPage from '@/pages/LoadingPage.vue'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';


const app = createApp(App)
app.component('LoadingCom', LoadingPage)
app.component('LoadingLay', Loading)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
