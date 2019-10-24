<template>
    <div>
        <div style="display:inline-block; margin-top:2vw; margin-bottom:10vw;">
          <v-img src = "../assets/Icon.png" style="height:5vw; width:5vw;" />
        </div>
        <span class="code_banner">SSAFY</span>
        <v-layout>
          <router-link to="/dashboard" class="RouterLink">
            <p class="RouterLink_p">DashBoard</p>
          </router-link>
        </v-layout>
        <v-layout>
          <a href="https://lab.ssafy.com/s1-final/s1p1351008" class="GithubAddress">
            <div class="RouterLink_p">Gitlab</div>
          </a>
        </v-layout>
        <v-layout class="banner_search">
          <v-row>
            <v-col sm="9">
            <v-text-field
              label="Code"
              solo
              v-model="code"
            ></v-text-field>
            </v-col>
            <v-col> 
            <router-link :to="'/qna/'+code">
              <v-img style="width:45px;" src="../assets/search-icon.png"></v-img>
            </router-link>
            </v-col>
          </v-row>
        </v-layout>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
      data: () => ({
        code: ""
      })
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
  padding-left:20px;
}
</style>