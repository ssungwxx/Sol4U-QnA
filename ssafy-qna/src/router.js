import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import QnA from './views/QnAPage.vue'
import createchannel from './views/ChannelCreatePage.vue'
import Test from "./views/Test.vue"
import DashBoard from './views/DashBoard.vue';

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/qna/:code?",
      name: "QnA",
      component: QnA
    },
    {
      path: "/test",
      name: "Test",
      component: Test
    },
    {
      path: '/channel/create',
      name: 'createchannel',
      component: createchannel
    },
    {
      path:"/dashboard",
      name: "dashboard",
      component: DashBoard
    }
  ]
});
