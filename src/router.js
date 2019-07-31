import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/database',
      name: 'Database',
      component: () => import(/* webpackChunkName: "database" */ './views/Database.vue')
    },
    {
      path: '/getdata',
      name: 'getdata',
      component: () => import(/* webpackChunkName: "getdata" */ './views/GetData.vue')
    }
  ]
})
