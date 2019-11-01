import Vue from "vue";
import Vuex from "vuex";
import FirebaseService from "./services/FirebaseService";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";

Vue.use(Vuex);
const ls = new SecureLS({ isCompression: false });

export default new Vuex.Store({
  // plugins: [
  //   createPersistedState({
  //     storage: {
  //       getItem: key => ls.get(key),
  //       setItem: (key, value) => ls.set(key, value.userData),
  //       removeItem: key => ls.remove(key)
  //     }
  //   })
  // ],
  state: {
    // QnACard List
    cardList: [],
    haveCard: false,
    // Reply List
    replyList: [],
    haveReply: false,
    // Login
    isLogin: false,
    userData: {
      isAnonymous: null,
      userDisplayName: null,
      userEmailVerified: null,
      userEmail: null
    }
  },
  getters: {
    getIsLogin: state => {
      return state.isLogin;
    },
    getUserData: state => {
      return state.userData;
    }
  },
  mutations: {
    refreshCardCommit(state) {
      state.cardList = [];
    },
    getCardCommit(state, payload) {
      state.haveCard = true;
      state.cardList.push(payload);
    },
    getRepliesCommit(state, payload) {
      const docId = payload.questionDocId;

      state.cardList.forEach(card => {
        if (card.questionDocId === docId) {
          card.replies.push(payload);
        }
      });
    },
    setIsLogin(state, isLogin) {
      state.isLogin = isLogin;
    },
    setUserData(state, userData) {
      state.userData = userData;
    }
  },
  actions: {
    refreshCardMutation(context) {
      context.commit("refreshCardCommit");
    },
    getCardMutation(context, payload) {
      context.commit("getCardCommit", payload);
    },
    getRepliesMutation(context, payload) {
      context.commit("getRepliesCommit", payload);
    },
    async setLoginInfo({ commit }) {
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
    }
  }
});
