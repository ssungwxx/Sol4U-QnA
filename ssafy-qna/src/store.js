import Vue from 'vue';
import Vuex from 'vuex';
import FirebaseService from './services/FirebaseService';

Vue.use(Vuex);

export default new Vuex.Store({
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
    editCardListCommit(state, payload) {
      var list = state.cardList;
      var data = payload;
    },
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
    editCardListMutation(context, payload) {
      context.commit('editCardListCommit', payload);
    },
    refreshCardMutation(context) {
      context.commit('refreshCardCommit');
    },
    getCardMutation(context, payload) {
      context.commit('getCardCommit', payload);
    },
    getRepliesMutation(context, payload) {
      context.commit('getRepliesCommit', payload);
    },
    async setLoginInfo({ commit }) {
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
