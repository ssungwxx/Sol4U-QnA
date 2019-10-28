<template>
  <v-app>
    <v-layout>
      <v-flex sm3 class="banner_background">
        <HeaderWeb />
      </v-flex>

      <v-flex sm9 id="content_background">
        <v-layout class="banner_mobile">
          <HeaderMobile />
        </v-layout>
        <!-- title -->
        <div id="pageTitle">Channel "{{code}}"</div>
        <!-- page on qna page -->
        <div id="pageBody">
          <!-- header on qna page -->
          <!-- add qna point -->
          <div id="pageHeader">
            <p id="channelNumber">@{{code}}</p>
            <p id="channelTitle">{{qnaTitle}}</p>
            <p id="channelDes">{{qnaDes}}</p>

            <div v-if="checkChannelIsLive()">
              <v-textarea
                outlined
                name="input-7-4"
                label="질문을 입력하세요."
                id="qnaText"
                v-model="qnaText"
                @keyup.enter="submitButton()"
              ></v-textarea>
              <v-btn color="success" id="btnQuestion" @click="submitButton()">SUBMIT</v-btn>
            </div>

            <v-spacer style="clear: both;"></v-spacer>
          </div>
          <v-container grid-list-md fluid>
            <v-layout v-if="haveList" row wrap id="cardMother">
              <!-- 답글 예시 -->
              <template v-for="i in getCardList.length">
                <QnACard :cardId="i-1" :docId="channelDocId" :key="i"></QnACard>
              </template>
            </v-layout>
          </v-container>
        </div>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import Vue from "vue";
import QnACard from "../components/QnACard";
import HeaderMobile from "../components/HeaderMobile";
import HeaderWeb from "../components/HeaderWeb";
import FirebaseService from "../services/FirebaseService";
import { log } from "util";

export default Vue.extend({
  computed: {
    code: function() {
      return this.$route.params.code;
    },
    getCardList() {
      var temp = this.$store.state.cardList;
      return temp;
    }
  },
  components: {
    QnACard,
    HeaderMobile,
    HeaderWeb
  },
  data: () => ({
    qnaTitle: "Title 입력하는 곳",
    qnaDes: "설명을 입력하는 곳",
    qnaText: "",
    cardNum: 0,
    channelDocId: "",
    haveList: false
  }),
  methods: {
    submitButton() {
      this.cardNum += 1;
      var temp = this.qnaText;
      this.qnaText = "";
      FirebaseService.addQuestion(this.channelDocId, temp);
      this.getQuestions();
    },
    getDocId() {
      var temp = FirebaseService.getDocByChannelCode(this.code);
      return temp;
    },
    async getQuestions() {
      var temp = FirebaseService.getQuestionsByDocId(this.channelDocId);
      this.cardNum = temp.length;
      this.haveList = true;
      var tt = this;
      temp.then(function(now) {
        tt.$store.dispatch("getCardMutation", now);
      });
      return temp;
    },
    setChannel(now) {
      this.channelDocId = now;
    },
    async checkChannelIsLive() {
      if (this.channelDocId != "")
        return await FirebaseService.checkChannelIsLive(this.channelDocId);
      else return true;
    }
  },
  mounted() {
    var temp = this.getDocId();
    var vueQna = this;
    temp.then(function(now) {
      vueQna.setChannel(now);
      if (vueQna.$store.state.haveCard === false) {
        vueQna.getQuestions();
      }
    });
  }
});
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Lexend+Deca|Saira+Extra+Condensed&display=swap");
@import url("https://fonts.googleapis.com/css?family=Do+Hyeon&display=swap");
@import url("https://fonts.googleapis.com/css?family=Raleway:700&display=swap");

.v-textarea {
  width: 80%;
}

.banner_search {
  text-align: center;
  margin-top: 7vw;
}
.banner {
  font-size: 160px;
  color: white;
  font-weight: bolder;
  margin-top: -110px;
}
.banner_background {
  display: block;
  background-color: rgb(36, 40, 43);
  text-align: center;
  position: fixed;
  width: 25%;
  z-index: 20;
  height: 100vh;
}
.banner_mobile {
  display: none;
  height: 50px;
  background-color: white;
  text-align: center;
}
#content_background {
  position: absolute;
  height: 100vh;
  z-index: 20;
  width: 75%;
  right: 0;
}
#pageTitle {
  height: 60px !important;
  background-color: rgb(51, 150, 244);
  padding: 2%;
  font-size: 1.1em;
}

#pageHeader {
  height: 15%;
  padding: 12px;
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
#btnQuestion {
  float: right;
  margin-top: -3%;
  margin-bottom: 2%;
  font-family: "Lexend Deca", sans-serif;
}
@media (max-width: 600px) {
  .banner_background {
    display: none;
  }
  .banner_mobile {
    display: block;
  }
  #content_background {
    height: 100vh;
    width: 100vw;
  }
}
</style>
