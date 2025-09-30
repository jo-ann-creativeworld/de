import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import ArtProjects from '../views/ArtProjects.vue';
import Contact from '../views/Contact.vue';
import Products from '../views/Products.vue';
import Impressum from '../views/Impressum.vue';
import Datenschutz from '../views/Datenschutz.vue';


const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'Über mich', component: About },
  { path: '/art-projects', name: 'Kunstprojekte', component: ArtProjects },
  { path: '/contact', name: 'Kontakt', component: Contact },
  { path: '/products', name: 'Produkte', component: Products },
  { path: '/imprint', name: 'Impressum', component: Impressum },
  { path: '/privacy', name: 'Datenschutz', component: Datenschutz },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0, behavior: 'auto' };
  },
});

export default router;
