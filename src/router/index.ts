import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
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
      path: '/about',
      name: 'About',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
