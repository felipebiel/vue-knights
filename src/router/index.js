import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'
import KnightsForm from '@/views/knightsForm/KnightsForm.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/knight/add',
    name: 'knight-add',
    component: KnightsForm
  },
  {
    path: '/knight/:id',
    name: 'knight-edit',
    props: true,
    component: KnightsForm
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
