<template>
  <v-app>
    <v-layout class="banner_mobile">
      <HeaderMobile :code="code" />
    </v-layout>

    <v-layout>
      <v-flex sm3 class="banner_background">
        <p class="code_banner">{{code}}</p>
        <v-layout>
          <router-link to="/" class="RouterLink">
            <p class="RouterLink_p">계기반</p>
          </router-link>
        </v-layout>
        <v-layout>
          <a href="https://lab.ssafy.com/s1-final/s1p1351008" class="GithubAddress"><div style="color:yellow; font-family: 'Do Hyeon', sans-serif;">우리의 개발 주소</div></a>
        </v-layout>
        <v-layout style=" font-size: 30px; text-align:center">
          <div style="font-size:150px; color:red;">ㅎ</div><br>
          <div style="font-size:110px; color:purple;">ㅎ</div><br>
          <div style="font-size:60px; color:yellow;">ㅎ</div><br>
          <div style="font-size:40px; color:blue;">ㅎ</div><br>
          <div style="font-size:20px; color:Green;">ㅎ</div><br>
          <div style="font-size:10px; color:white;">ㅎ</div><br>

        </v-layout>
      </v-flex>
      <v-flex sm9 class>
        <v-card>
          <v-container grid-list-lg fluid>
            <v-layout row wrap>
              <QnACard />
            </v-layout>
          </v-container>
        </v-card>
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
  }
});
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Lexend+Deca|Saira+Extra+Condensed&display=swap");
@import url('https://fonts.googleapis.com/css?family=Do+Hyeon&display=swap');
.banner {
  font-size: 160px;
  color: white;
  font-weight: bolder;
  margin-top: -110px;
}
.code_banner {
  font-size: 8vw;
  margin-left: 20px;
  font-weight: bold;
  font-family: "Saira Extra Condensed", sans-serif;
  color: red;
}
.RouterLink {
  width: 100%;
  font-size: 35px;
  color: black;
  text-decoration: None;
  text-align: center;
  font-family: "Lexend Deca", sans-serif;
}
.RouterLink_p {
  color: blue;
  font-family: 'Do Hyeon', sans-serif;
  font-size: 80px;
}
.banner_background {
  display: block;
  background-image: url('../assets/hahat.jpg')  
}
.banner_mobile {
  display: none;
  height: 50px;
  background-color: #bfbfbf;
  text-align: center;
}

@media (max-width: 600px) {
  .banner_background {
    display: none;
  }
  .banner_mobile {
    display: block;
  }
}
.GithubAddress{
  font-size:30px;
  text-decoration:none;
}
</style>
