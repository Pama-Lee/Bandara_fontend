import {createRouter, createWebHistory} from 'vue-router'
import {UserStatus, useUserStore} from "@/stores/user";

const router = createRouter({
  history: createWebHistory(),
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
    },{
        path: "/detail/:uuid",
        name: "detail",
        component: () => import('@/pages/FlightDetail.vue'),
      // 需要登录才能访问
        meta: {
            requireAuth: true
        }
    },{
      path: "/new",
      name: "new",
      component: () => import('@/pages/NewFlight.vue'),
      meta: {
        requireAuth: true
      }
    },{
      path: "/joined",
      name: "joined",
      component: () => import('@/pages/JoinedFlight.vue'),
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userState = useUserStore()

  // 登录拦截器

    if (to.meta.requireAuth) {
      userState.getLoginStatus().then((res) => {
        if (res === UserStatus.LOGINED) {
          next()
        } else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        }
      })

    } else {
        next()
    }
})

export default router
