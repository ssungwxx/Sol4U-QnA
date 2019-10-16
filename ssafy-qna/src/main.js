import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "./plugins/axios";
import firebase from "firebase";
import firebaseConfig from "./firebaseConfig";

Vue.config.productionTip = false;

firebase.initializeApp(firebaseConfig.snippet);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
