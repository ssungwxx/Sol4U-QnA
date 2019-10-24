<template>
  <v-app>
    <v-layout>
      <v-flex sm3 class="banner_background">
        <HeaderWeb />
      </v-flex>

      <v-flex sm9 id="content_background">
    <v-layout class="banner_mobile">
      <HeaderMobile :maxheight="maxheight" />
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

            <div>
              <v-textarea
                outlined
                name="input-7-4"
                label="질문을 입력하세요."
                id="qnaText"
                v-model="qnaText"
              ></v-textarea>
            </div>

            <v-btn color="success" id="btnQuestion" @click="submitButton()">SUBMIT</v-btn>
            <v-spacer style="clear: both;"></v-spacer>
          </div>
          <v-card flat>
            <v-container grid-list-lg fluid>
              <v-layout row wrap id="cardMother">
                <!-- 답글 예시 -->
                <QnACard>
                  <span slot="qnaMain">에에?</span>
                  <span slot="qnaMainTime">time to test</span>
                  <span slot="qnaReply">답글 에에에??</span>
                  <span slot="qnaReplyTime">time to reply</span>
                </QnACard>
              </v-layout>
            </v-container>
          </v-card>
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
import { log } from "util";
export default Vue.extend({
  computed: {
    code: function() {
      return this.$route.params.code;
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
    maxheight: 0,
    qnaText: ""
  }),
  mounted() {
    this.heightm();
  },
  methods: {
    heightm() {
      const offsety = document.documentElement.offsetHeight;
      const outy = window.outerHeight;
      if (offsety > outy) {
        this.maxheight = offsety;
      } else {
        this.maxheight = outy;
      }
    },
    submitButton() {
      console.log(this.qnaText);
      var temp = this.qnaText;
      this.qnaText = "";
      var card = document.createElement("");
    }
  }
});
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Lexend+Deca|Saira+Extra+Condensed&display=swap");
@import url("https://fonts.googleapis.com/css?family=Do+Hyeon&display=swap");
@import url("https://fonts.googleapis.com/css?family=Raleway:700&display=swap");
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
  background-color: #666666;
  text-align: center;
}
.banner_mobile {
  display: none;
  height: 50px;
  background-color: #bfbfbf;
  text-align: center;
}
#content_background {
  height: 100%;
}
#pageTitle {
  height: 9%;
  background-color: #ffffff;
  padding: 2%;
  font-size: 1.1em;
}

#pageHeader {
  height: 15%;
}

#pageBody {
  padding: 3% 5%;
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
}
</style>
