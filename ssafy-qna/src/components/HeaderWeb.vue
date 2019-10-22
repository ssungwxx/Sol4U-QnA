<template>
    <div>
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
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
       
    })
</script>

<style scoped>
.code_banner {
  font-size: 5vw;
  margin-left: 20px;
  font-weight: bold;
  font-family: 'Raleway', sans-serif;
  color: #e6e6e6;
}
.GithubAddress{
  width: 100%;
  color: black;
  text-decoration: None;
  text-align: left;
  font-family: "Lexend Deca", sans-serif;
  margin-left:2vw;
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
.banner_search{
  text-align: center;
  margin-top: 7vw;
}
</style>