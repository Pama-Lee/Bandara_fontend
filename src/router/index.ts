import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/HomePage.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/AboutUs.vue')
    },
    {
      path: "/loginwithrootjam",
      name: "rootjam",
      component: () => import('@/pages/LoginWithRootJam.vue')
    },
    {
      path: "/login",
      name: "login",
      component: () => import('@/pages/LoginPage.vue')
    }
  ]
})

export default router
