import Vue from "vue";
import Vuex from "vuex";
import FirebaseService from "./services/FirebaseService";
import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      getState: vuexKey => Cookies.getJSON(vuexKey),
      setState: (vuexKey, state) =>
        Cookies.set(vuexKey, state, { expires: 3, secure: true })
    })
  ],
  state: {
    // QnACard
    cardList: [],
    haveCard: false,
    isLogin: false,
    userData: {
      isAnonymous: null,
      userDisplayName: null,
      userEmailVerified: null,
      userEmail: null
    },
    userData2: FirebaseService.firebase.auth().currentUser,

    // 주석 삭제할거임 ~~~ 채널 코드랑 채널 docId 뷰엑스 저장
    channelDocId: '',
    channelCode: ''
  },
  getters: {
    getIsLogin: state => {
      return state.isLogin;
    },
    getUserData: state => {
      return state.userData;
    },
    getChannelDocId: state => { // 창규창규
      return state.channelDocId;
    },
    getChannelCode: state => {
      return state.channelCode;
    }
  },
  mutations: {
    getCardCommit(state, payload) {
      state.haveCard = true;
      state.cardList = payload;
    },
    setIsLogin(state, isLogin) {
      state.isLogin = isLogin;
    },
    setUserData(state, userData) {
      state.userData = userData;
    },
    setChannelDocId(state, channelDocId){ // 창규창규
      state.channelDocId = channelDocId;
    },
    setChannelCode(state, channelCode){
      state.channelCode = channelCode;
    }
  },
  actions: {
    getCardMutation(context, payload) {
      context.commit("getCardCommit", payload);
    },
    async setLoginInfo({ commit }) {
      console.log("dads");

      const userData = await FirebaseService.checkUserIsLogin();
      console.log(userData);

      if (userData.isAnonymous != null) {
        commit("setIsLogin", true);
        commit("setUserData", userData);
      }
    },
    setLogout({ commit }) {
      const userData = {
        isAnonymous: null,
        userDisplayName: null,
        userEmailVerified: null,
        userEmail: null
      };
      commit("setIsLogin", false);
      commit("setUserData", userData);
    },
    async setChannelInfo({ channelCode }) {
    }
  }
});
