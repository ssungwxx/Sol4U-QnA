import Vue from "vue";
import Vuex from "vuex";
import FirebaseService from "./services/FirebaseService";

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
            state.allMyChannelData.push(now);
          });
        }

        for (var i in owned) {
          var temp = FirebaseService.getChannelDetail(owned[i]);
          temp.then(function(now) {
            state.allMyChannelData.push(now);
            state.createChannelData.push(now);
          });
        }
      });
    }
  },
  actions: {
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
          if (payload === "dashboard") {
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
