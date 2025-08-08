import { createRouter, createWebHistory } from 'vue-router'
import ReturnView from '@/views/ReturnView.vue'
import RentalView from '@/views/RentalView.vue'
import ExemplarView from '@/views/ExemplarView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/rental', name: 'Rental', component: RentalView },
    { path: '/return', name: 'Return', component: ReturnView },
    { path: '/available-exemplars/:articleId', name: 'Available Exemplars', component: ExemplarView }
  ],
})

export default router
