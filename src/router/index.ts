import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Hausaufgaben',
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
      name: 'Info',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach((to) => {
  const title: string = to.name as string;

  const defaultTitle = 'Webuntis Hausaufgaben';

  document.title = title || defaultTitle;
})

export default router
