import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // QnACard
    cardList: [],
    haveCard: false
  },
  mutations: {
    getCardCommit(state, payload) {
      state.haveCard = true;
      state.cardList = payload;
    }
  },
  actions: {
    getCardMutation(context, payload) {
      context.commit("getCardCommit", payload);
    }
  }
});
