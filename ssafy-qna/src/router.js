import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import QnA from './views/QnAPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/qna',
      name: 'QnA',
      component: QnA
    }
  ]
})
