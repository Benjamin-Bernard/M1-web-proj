import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import MyRoutes from '../components/MyRoutes.vue';
import RouteCalculation from '../components/RouteCalculation.vue';
import MapRoute from '../components/MapRoute.vue';
import TrafficInfo from "../components/TrafficInfo.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component:HomePage
    },
    {
      path: '/RouteCalculation',
      name: 'RouteCalculation',
      component: RouteCalculation
    },
    {
      path: '/TrafficInfo',
      name:'TrafficInfo',
      component:TrafficInfo
    },
    {
      path:'/MyRoutes',
      name:'MyRoutes',
      component:MyRoutes
    },
    {
      path:'/MapRoute',
      name:'MapRoute',
      component:MapRoute
    }
  ]
})

export default router;
