import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import MesItineraires from '../components/MesItineraires.vue';
import CalculerItineraire from '../components/CalculerItineraire.vue';
import InfosTrafic from '../components/InfosTrafic.vue';
import MapItineraire from '../components/MapItineraire.vue';


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
      name:'InfosTrafic',
      component:InfosTrafic
    },
    {
      path:'/MesItineraires',
      name:'MesItineraires',
      component:MesItineraires
    },
    {
      path:'/MapItineraire',
      name:'MapItineraire',
      component:MapItineraire
    }
  ]
})

export default router;
