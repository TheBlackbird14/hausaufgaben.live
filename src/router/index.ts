import { createRouter, createWebHistory } from 'vue-router'
import storageService from '@/scripts/storage.service'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Homework',
      component: () => import('../views/HomeworkView.vue')
    },
    {
      path: '/new',
      name: 'Neue Hausaufgabe',
      component: () => import('../views/CreateHomeworkView.vue')
    },
    {
      path: '/mensa',
      name: 'Mensaplan',
      component: () => import('../views/FoodScheduleView.vue')
    },
    {
      path: '/stundenplan',
      name: 'Stundenplan',
      component: () => import('../views/TimetableView.vue')
    },
    {
      path: '/settings',
      name: 'Einstellungen',
      component: () => import('../views/SettingsView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

router.beforeEach((to, from) => {
  if (from.path !== '/login' && storageService.retrieve_credentials() === null) {
    return '/login'
  } else {
    return true
  }
})

export default router
