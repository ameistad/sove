import Vue from 'vue'
import Router from 'vue-router'
import Start from '@/views/Start'
import Entry from '@/views/Entry'
import Overview from '@/views/Overview'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start',
      component: Start
    },
    {
      path: '/d/:date',
      name: 'entry',
      component: Entry
    },
    {
      path: '/o',
      name: 'overview',
      component: Overview
    }
  ],
  mode: 'history'
})
