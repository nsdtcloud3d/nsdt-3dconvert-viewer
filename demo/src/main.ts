// import { createHead } from '@vueuse/head'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import './assets/index.postcss'
import router from './router'
import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue'
// const head = createHead()
const app = createApp(App)
app.use(createPinia())
app.use(router)
// app.use(head)
app.use(Antd)


app.mount('#app')
