import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Homework',
      component: () => import('../views/HomeworkView.vue')
    }
  ]
})

export default router
