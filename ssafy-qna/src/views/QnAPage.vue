<template>
  <v-app>
    <!-- title -->
    <div id="pageTitle">DashBoard.Channel "{{channelNum}}"</div>
    <!-- page on qna page -->
    <div id="pageBody">
      <!-- header on qna page -->
      <!-- add qna point -->
      <div id="pageHeader">
        <p id="channelNumber">@{{channelNum}}</p>
        <p id="channelTitle">{{qnaTitle}}</p>
        <p id="channelDes">{{qnaDes}}</p>
        <p id="channelClose">[{{closeAt}}에 종료 됩니다.]</p>

        <div v-if="checkChannelIsLive()" style="width:100%;">
          <v-textarea
            outlined
            name="input-7-4"
            label="질문을 입력하세요."
            id="qnaText"
            v-model="qnaText"
            @keyup.enter="submitButton()"
          ></v-textarea>
        </div>

        <v-btn-toggle borderless>
          <v-btn @click="setSortTag('created')">
            <span class="hidden-sm-and-down">Created</span>
            <v-icon right>access_time</v-icon>
          </v-btn>
          <v-btn @click="setSortTag('favorite')">
            <span class="hidden-sm-and-down">Favorite</span>
            <v-icon right>thumb_up_alt</v-icon>
          </v-btn>
        </v-btn-toggle>
        <v-btn color="rgb(51, 150, 244)" dark id="btnQuestion" @click="submitButton()">SUBMIT</v-btn>
        <v-spacer style="clear: both;"></v-spacer>
      </div>

      <v-container grid-list-lg fluid>
        <v-layout row wrap id="cardMother">
          <!-- 답글 예시 -->
          <template v-for="i in getCardList">
            <QnACard :card="i" :docId="code" :key="i.questionDocId"></QnACard>
          </template>
        </v-layout>
      </v-container>
    </div>
    <go-top
      v-bind:max-width="200"
      style="background-color: rgb(51, 150, 244); width: 50px; height: 50px;"
    ></go-top>
  </v-app>
</template>

<script>
import Vue from "vue";
import QnACard from "../components/QnACard";
import FirebaseService from "../services/FirebaseService";
import { log } from "util";
import GoTop from "@inotom/vue-go-top";

export default Vue.extend({
  computed: {
    code: function() {
      return this.$route.params.code;
    },
    getCardList() {
      var temp = this.$store.state.cardList;
      if (this.sortTag === "favorite") {
        function compare(a, b) {
          if (a.likeCount < b.likeCount) return 1;
          if (a.likeCount > b.likeCount) return -1;
          return 0;
        }
        return temp.sort(compare);
      } else {
        function compare(a, b) {
          if (a.created_at.timestamp < b.created_at.timestamp) return 1;
          if (a.created_at.timestamp > b.created_at.timestamp) return -1;
          return 0;
        }
        return temp.sort(compare);
      }
    }
  },
  components: {
    QnACard,
    GoTop
  },
  data: () => ({
    // channel detail part
    qnaTitle: "--",
    qnaDes: "---",
    qnaText: "",
    channelNum: "",
    closeAt: "---",
    // card list part
    // button groups
    sortTag: "created"
  }),
  methods: {
    submitButton() {
      // 질문 작성 제출 버튼 클릭 이벤트
      var temp = this.qnaText;
      this.qnaText = "";
      FirebaseService.addQuestion(this.code, temp);
    },
    setChannel() {
      // 채널 디테일 정보 받아오기
      const channel = FirebaseService.getChannelDetail(this.code);
      channel.then(data => {
        this.qnaTitle = data.channel_name;
        this.qnaDes = data.channel_description;
        this.closeAt = data.closed_at.string;
        this.channelNum = data.channel_code;
      });
    },
    async checkChannelIsLive() {
      if (this.code != "")
        return await FirebaseService.checkChannelIsLive(this.code);
      else return true;
    },
    setSortTag(tag) {
      this.sortTag = tag;
    },
    checkHaveList() {
      return this.$store.state.haveCard;
    }
  },
  mounted() {
    this.setChannel();
  },
  created() {
    var vueInstance = this;
    vueInstance.$store.dispatch("refreshCardMutation");
    const channelDoc = FirebaseService.firestore
      .collection("QnAChannels")
      .doc(this.code)
      .collection("Questions");

    channelDoc.onSnapshot(snapshots => {
      snapshots.docChanges().forEach(change => {
        const data = {
          questioner: change.doc.data().questioner,
          question: change.doc.data().question,
          created_at: change.doc.data().created_at,
          likeCount: change.doc.data().likeCount,
          likeList: change.doc.data().likeList,
          questionDocId: change.doc.id,
          replies: []
        };

        if (change.type === "added") {
          vueInstance.$store.dispatch("addCardMutation", data);
        }
        if (change.type === "modified") {
          console.log("실시간으로 수정했닷");
          vueInstance.$store.dispatch("editCardListMutation", data);
        }
        if (change.type === "removed") {
          console.log("실시간으로 제거했닷");
          vueInstance.$store.dispatch("removeCardMutation", data);
        }
      });
    });

    channelDoc.get().then(doc => {
      doc.forEach(snapshots => {});
    });
  }
});
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Lexend+Deca|Saira+Extra+Condensed&display=swap");
@import url("https://fonts.googleapis.com/css?family=Do+Hyeon&display=swap");
@import url("https://fonts.googleapis.com/css?family=Raleway:700&display=swap");

#btnQuestion {
  float: right;
  font-family: "Lexend Deca", sans-serif;
}

#pageTitle {
  position: fixed;
  height: 50px !important;
  width: 100%;
  background-color: rgb(51, 150, 244);
  color: white;
  font-family: "Lexend Deca", sans-serif;
  padding: 2%;
  font-size: 1.2em;
  z-index: 10;
}

#pageHeader {
  padding: 12px;
  margin-top: 50px;
}

#pageBody {
  padding: 3% 5%;
  background-color: white;
}

#channelNumber {
  font-size: 2em;
  font-family: "Lexend Deca", sans-serif;
  color: black;
  height: 5%;
}

#channelTitle {
  font-size: 1.5em;
  color: navy;
  margin-top: -1%;
  font-family: "Lexend Deca", sans-serif;
}

#channelDes {
  font-size: 1em;
  font-family: "Lexend Deca", sans-serif;
  color: mediumslateblue;
  height: 2%;
  margin-top: -1%;
  margin-bottom: 3%;
}

#channelClose {
  font-size: 0.7em;
  color: brown;
  font-family: "Lexend Deca", sans-serif;
}
</style>
