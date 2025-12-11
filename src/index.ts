import { createRouter, createWebHistory } from 'vue-router'
import { globalStates } from './state'
import { viewNames } from './state'
import view_1 from '@/views/view-1.vue'
import view_2 from '@/views/view-2.vue'
import view_3 from '@/views/view-3.vue'
import view_4 from '@/views/view-4.vue'
import view_5 from '@/views/view-5.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: view_1,
    },
    {
      path: '/' + viewNames[2],
      component: view_2,
      beforeEnter: (to, from, next) => {
        if (globalStates.injectedWeb3WalletProvider == undefined) {
          next('/')
        } else {
          next()
        }
      },
    },
    {
      path: '/' + viewNames[3],
      component: view_3,
      beforeEnter: (to, from, next) => {
        if (globalStates.injectedWeb3WalletProvider == undefined) {
          next('/')
        } else {
          next()
        }
      },
    },
    {
      path: '/' + viewNames[4],
      component: view_4,
      beforeEnter: (to, from, next) => {
        if (globalStates.injectedWeb3WalletProvider == undefined) {
          next('/')
        } else {
          next()
        }
      },
    },
    {
      path: '/' + viewNames[5],
      component: view_5,
      beforeEnter: (to, from, next) => {
        if (globalStates.injectedWeb3WalletProvider == undefined) {
          next('/')
        } else {
          next()
        }
      },
    },
  ],
})

export default router
