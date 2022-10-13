import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import MesItineraires from '../components/MesItineraires.vue';
import CalculerItineraire from '../components/CalculerItineraire.vue';



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
      name: 'CalculerItineraire',
      component: CalculerItineraire
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
