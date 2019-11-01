import Vue from 'vue';
import Vuex from 'vuex';
import FirebaseService from './services/FirebaseService';

Vue.use(Vuex);

export default new Vuex.Store({
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
    getCardCommit(state, payload) {
      state.haveCard = true;
      state.cardList = payload;
    },
    setIsLogin(state, isLogin) {
      state.isLogin = isLogin;
    },
    setUserData(state, userData) {
      state.userData = userData;
    }
  },
  actions: {
    getCardMutation(context, payload) {
      context.commit('getCardCommit', payload);
    },
    async setLoginInfo({ commit }) {
      console.log('dads');

      await FirebaseService.firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in
          const userData = {
            isAnonymous: user.isAnonymous,
            userDisplayName: user.displayName,
            userEmailVerified: user.emailVerified,
            userEmail: user.email
          };

          commit('setIsLogin', true);
          commit('setUserData', userData);
          console.log('dsdsdsdssd');

          console.log(userData);
        } else {
          // User is signed out
          const userData = {
            isAnonymous: null,
            userDisplayName: null,
            userEmailVerified: null,
            userEmail: null
          };
          commit('setIsLogin', false);
          commit('setUserData', userData);
        }
      });
    },
    setLogout({ commit }) {
      const userData = {
        isAnonymous: null,
        userDisplayName: null,
        userEmailVerified: null,
        userEmail: null
      };
      commit('setIsLogin', false);
      commit('setUserData', userData);
    }
  }
});
