import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/directive',
    name: 'Directive',
    // route level code-splitting
    // this generates a separate chunk (directive.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "directive" */ '../views/Directive.vue')
  },
  {
    path: '/dispatch',
    name: 'Dispatch',
    component: () => import(/* webpackChunkName: "dispatch" */ '../views/Dispatch.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
