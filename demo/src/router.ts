import { createRouter, createWebHistory, createWebHashHistory,  } from 'vue-router'


import { defineAsyncComponent } from 'vue'
const _import = (path: string) => defineAsyncComponent(() => import(`@/pages/${path}.vue`));

import IndexPage from '@/pages/IndexPage.vue'


const routes = [
  {
    path: '/',
    component: IndexPage,
    meta: {
      title: '3dconvert-viewerjs demo',
    },
  },

]

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes,
})

export default router
