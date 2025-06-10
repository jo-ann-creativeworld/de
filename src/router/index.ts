import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import ArtProjects from '../views/ArtProjects.vue';
import Contact from '../views/Contact.vue';
import Products from '../views/Products.vue';
import Impressum from '../views/Impressum.vue';
import Datenschutz from '../views/Datenschutz.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/art-projects', name: 'ArtProjects', component: ArtProjects },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/products', name: 'Products', component: Products },
  { path: '/impressum', name: 'Impressum', component: Impressum },
  { path: '/datenschutz', name: 'Datenschutz', component: Datenschutz },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
