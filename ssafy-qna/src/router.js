import Vue from 'vue'
import Router from 'vue-router'
import Join from './views/JoinPage.vue'
import QnA from './views/QnAPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Join',
      component: Join
    },
    {
      path: '/qna',
      name: 'QnA',
      component: QnA
    }
  ]
})
