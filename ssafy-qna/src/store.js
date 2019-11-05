import Vue from "vue";
import Vuex from "vuex";
import FirebaseService from "./services/FirebaseService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // QnACard List
    cardList: [],
    haveCard: false,
    // Login
    isLogin: false,
    userData: {
      isAnonymous: null,
      userDisplayName: null,
      userEmailVerified: null,
      userEmail: null
    },
    // dashboard
    userTableChannelData: [],
    createChannelData: [],
    allMyChannelData: []
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
    removeReplyCommit(state, payload) {
      var index = state.cardList.findIndex(
        item => item.questionDocId === payload.questionDocId
      );
      var reIndex = state.cardList[index].replies.findIndex(
        item => item.reply_doc_id === payload.reply_doc_id
      );
      state.cardList[index].replies.splice(reIndex, 1);
    },
    removeCardCommit(state, payload) {
      var index = state.cardList.findIndex(
        item => item.questionDocId === payload.questionDocId
      );
      state.cardList.splice(index, 1);
    },
    editCardListCommit(state, payload) {
      var data = payload;
      var index = state.cardList.findIndex(
        item => item.questionDocId === data.questionDocId
      );
      data.replies = state.cardList[index].replies;
      state.cardList.splice(index, 1);
      state.cardList.push(data);
    },
    refreshCardCommit(state) {
      state.cardList = [];
    },
    addCardCommit(state, payload) {
      state.haveCard = true;
      state.cardList.push(payload);
    },
    getRepliesCommit(state, payload) {
      const docId = payload.questionDocId;

      state.cardList.forEach(card => {
        if (card.questionDocId === docId) {
          card.replies.push(payload);
          return;
        }
      });
    },
    setIsLogin(state, isLogin) {
      state.isLogin = isLogin;
    },
    setUserData(state, userData) {
      state.userData = userData;
    },
    setChannelList(state) {
      var list = FirebaseService.getOwnedChannels();
      list.then(function(now) {
        state.userTableChannelData = now;
        var joined = now.joined_channels;
        var owned = now.owned_channels;

        for (var i in joined) {
          var temp = FirebaseService.getChannelDetail(joined[i]);
          temp.then(function(now) {
            if (state.allMyChannelData.indexOf(now) === -1)
              state.allMyChannelData.push(now);
          });
        }

        for (var i in owned) {
          var temp = FirebaseService.getChannelDetail(owned[i]);
          temp.then(function(now) {
            if (state.allMyChannelData.indexOf(now) === -1)
              state.allMyChannelData.push(now);
            if (state.createChannelData.indexOf(now) === -1)
              state.createChannelData.push(now);
          });
        }
      });
    }
  },
  actions: {
    removeReplyMutation(context, payload) {
      context.commit("removeReplyCommit", payload);
    },
    removeCardMutation(context, payload) {
      context.commit("removeCardCommit", payload);
    },
    editCardListMutation(context, payload) {
      context.commit("editCardListCommit", payload);
    },
    refreshCardMutation(context) {
      context.commit("refreshCardCommit");
    },
    addCardMutation(context, payload) {
      context.commit("addCardCommit", payload);
    },
    getRepliesMutation(context, payload) {
      context.commit("getRepliesCommit", payload);
    },
    async setLoginInfo({ commit }, payload) {
      await FirebaseService.firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in
          const userData = {
            isAnonymous: user.isAnonymous,
            userDisplayName: user.displayName,
            userEmailVerified: user.emailVerified,
            userEmail: user.email
          };

          commit("setIsLogin", true);
          commit("setUserData", userData);
          if (payload === "dashboard" && !user.isAnonymous) {
            commit("setChannelList");
          }
        } else {
          // User is signed out
          const userData = {
            isAnonymous: null,
            userDisplayName: null,
            userEmailVerified: null,
            userEmail: null
          };
          commit("setIsLogin", false);
          commit("setUserData", userData);
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
      commit("setIsLogin", false);
      commit("setUserData", userData);
    }
  }
});
