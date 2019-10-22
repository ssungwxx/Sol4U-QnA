<template>
  <v-app>
  <v-layout class="banner_mobile">
          <HeaderMobile :code="code" :maxheight="maxheight"/>
        </v-layout>
    <v-layout>
      <v-flex sm3 class="banner_background">
        <div style="display:inline-block; margin-top:2vw; margin-bottom:10vw;">
          <v-img src = "../assets/Icon.png" style="height:5vw; width:5vw;" />
        </div>
        <span class="code_banner">SSAFY</span>
        <v-layout>
          <router-link to="/" class="RouterLink">
            <p class="RouterLink_p">DashBoard</p>
          </router-link>
        </v-layout>
        <v-layout>
          <a href="https://lab.ssafy.com/s1-final/s1p1351008" class="GithubAddress">
            <div class="RouterLink_p">Gitlab</div>
          </a>
        </v-layout>
        <v-layout class="banner_search">

        </v-layout>
      </v-flex>



      <v-flex sm9 id="content_background">
        
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
            asd
            <div>
              <v-textarea outlined name="input-7-4" label="질문을 입력하세요."></v-textarea>
            </div>
          </div>
          <v-card flat>
            <v-container grid-list-lg fluid>
              <v-layout row wrap>
                <QnACard />
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
export default Vue.extend({
  computed: {
    code: function() {
      return this.$route.params.code;
    }
  },
  components: {
    QnACard,
    HeaderMobile
  },
  data: () => ({
    qnaTitle: "Title 입력하는 곳",
    qnaDes: "설명을 입력하는 곳",
    maxheight: 0
  }),
  mounted () {
    this.heightm()
  },
  methods: {
    heightm () {
      this.maxheight = document.documentElement.offsetHeight
    }
  }
});
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Lexend+Deca|Saira+Extra+Condensed&display=swap");
@import url('https://fonts.googleapis.com/css?family=Do+Hyeon&display=swap');
@import url('https://fonts.googleapis.com/css?family=Raleway:700&display=swap');
.banner_search{
  text-align: center;
  margin-top: 7vw;
}
.banner {
  font-size: 160px;
  color: white;
  font-weight: bolder;
  margin-top: -110px;
}
.code_banner {
  font-size: 5vw;
  margin-left: 20px;
  font-weight: bold;
  font-family: 'Raleway', sans-serif;
  color: #e6e6e6;
}
.RouterLink {
  width: 100%;
  color: black;
  text-decoration: None;
  text-align: left;
  font-family: "Lexend Deca", sans-serif;
  margin-left:2vw;
}
.RouterLink_p {
  color: white;
  font-family: 'Do Hyeon', sans-serif;
  font-size: 3vw;
}
.banner_background {
  display: block;
  background-color: #666666;
  text-align:center;
}
.banner_mobile {
  display: none;
  height: 50px;
  background-color: #bfbfbf;
  text-align: center;
}
#content_background{
  height:100%;
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
  color: black;
  height: 5%;
}

#channelTitle {
  font-size: 1.5em;
  color: navy;
  margin-top: -1%;
}

#channelDes {
  font-size: 1em;
  color: mediumslateblue;
  height: 2%;
  margin-top: -1%;
  margin-bottom: 3%;
}
.GithubAddress{
  width: 100%;
  color: black;
  text-decoration: None;
  text-align: left;
  font-family: "Lexend Deca", sans-serif;
  margin-left:2vw;
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
