<template>
  <v-app>
    <v-layout class="banner_mobile">
      <HeaderMobile :code="code" />
    </v-layout>

    <v-layout>
      <v-flex sm3 class="banner_background">
        <p class="banner">SSAFY</p>
        <p class="code_banner">{{code}}</p>
        <v-layout>
          <router-link to="/" class="RouterLink">
            <p class="RouterLink_p">Dashboard</p>
          </router-link>
        </v-layout>
        <v-layout style=" font-size: 30px; text-align:center">
          <br />창규야
          <br />일하자
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
.banner {
  font-size: 160px;
  color: white;
  font-weight: bolder;
  margin-top: -110px;
}
.code_banner {
  font-size: 7vw;
  margin-left: 20px;
  font-weight: bold;
  font-family: "Saira Extra Condensed", sans-serif;
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
  color: black;
}
.banner_background {
  display: block;
  background-color: #bfbfbf;
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
</style>
