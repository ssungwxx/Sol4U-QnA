import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from './plugins/axios'
import firebase from 'firebase'

Vue.config.productionTip = false

let config = {
  apiKey: "AAAArx-2b2o:APA91bF9-deVNiDvvlT2XYKZqiXNGYmzqHD6zs45AM3st8ZSbBiQu83zp24zefOe_d8Ng2RkOBmDmCR3jVegbbSQq3VjFLuTmiokfv6kQlP9U_1H7RfGQvUG9Tp308HSAeX9-DVGsFTU",
  authDomain: "https://ssafyfinal.firebaseapp.com/",
  databaseURL: "https://ssafyfinal.firebaseio.com",
  projectId: "ssafyfinal",
  storageBucket: "ssafyfinal.appspot.com",
  messagingSenderId: "752151326570"
};

firebase.initializeApp(config);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
