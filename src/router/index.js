import { createRouter, createWebHistory } from 'vue-router';
import ListRegions from '../components/ListRegions.vue';
import ListProvinces from '../components/ListProvinces.vue';
import ListCommunes from '../components/ListCommunes.vue';
import ListStreets from '../components/ListStreets.vue';

import EditRegion from '../components/EditRegion.vue';
import EditProvince from '../components/EditProvince.vue';
import EditCommune from '../components/EditCommune.vue';
import EditStreet from '../components/EditStreet.vue';

import AddProvince from '../components/AddProvince.vue';
import AddCommune from '../components/AddCommune.vue';
import AddStreet from '../components/AddStreet.vue';



const routes = [
  { path: '/regiones', component: ListRegions },
  { path: '/provincias', component: ListProvinces },
  { path: '/comunas', component: ListCommunes },
  { path: '/calles', component: ListStreets },
  {
    path: '/regiones/edit/:id',
    name: 'EditRegion',
    component: EditRegion,
    props: true,
  },
  {
    path: '/provinces/edit/:id',
    name: 'EditProvince',
    component: EditProvince,
    props: true, 
  },
  {
    path: '/communes/edit/:id',
    name: 'EditCommune',
    component: EditCommune,
    props: true, 
  },
  {
    path: '/streets/edit/:id',
    name: 'EditStreet',
    component: EditStreet,
    props: true, 
  },
  { path: '/provinces/add', component: AddProvince },
  { path: '/communes/add', component: AddCommune },
  { path: '/streets/add', component: AddStreet },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;