import { createRouter, createWebHistory } from 'vue-router'
import ReturnView from '@/views/ReturnView.vue'
import RentalView from '@/views/RentalView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/rental', name: 'Rental', component: RentalView },
    { path: '/return', name: 'Return', component: ReturnView },
  ],
})

export default router
