import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import MesItineraires from '../components/MesItineraires.vue';



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component:HomePage
    },
    {
      path: '/CalculerItineraire',
      name: 'CalculerItineraire'
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import('../views/AboutView.vue')
    },
    {
      path: '/ItineraireActuel',
      name: 'ItineraireActuel'
    },
    {
      path: '/InfosTrafic',
      name:'InfosTrafic'
    },
    {
      path:'/MesItineraires',
      name:'MesItineraires',
      component:MesItineraires
    }
  ]
})

export default router;
