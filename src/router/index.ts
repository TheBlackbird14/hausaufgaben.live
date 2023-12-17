import { createRouter, createWebHistory } from 'vue-router'

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
    }
  ]
})

export default router
