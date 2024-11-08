import { links } from '@/helpers/menu'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'defaultLayout',
    redirect: 'dashboard',
    component: () => import('../layouts/defaultLayout.vue'),
    children: [...links]
  },
  {
    path: '/auth',
    name: 'authLayout',
    component: () => import('@/layouts/authLayout.vue'),
    children: [
      {
        path: '',
        name: 'signIn',
        component: () => import('@/views/user/signIn.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/errorPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

import { authStore } from '@/stores/user/auth'
router.beforeEach(async (to, from, next) => {
  const auth_store = authStore()
  if (!['authLayout', 'signIn'].includes(to.name)) {
    await auth_store.checkUser()
  }
  document.title = `Project | ${to?.meta.title}`
  next()
})

export default router
