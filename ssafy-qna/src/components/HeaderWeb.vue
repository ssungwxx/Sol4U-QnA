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
          <v-flex sm1></v-flex>
          <v-flex sm10>
            <v-text-field
              label="Code"
              height="20px"
              solo
              v-model="routercode"
            ></v-text-field>
          </v-flex>
          <v-flex sm1></v-flex>
        </v-layout>
        <v-layout class="banner_search_icon">
          <v-flex sm1></v-flex>
          <v-flex sm10>
            <router-link :to="'/qna/'+routercode" style="text-decoration: None;">
              <!-- 여기에 vuex에 Guest아이디로 넘겨주는 기능 추가하면됨 -->
              <v-btn
                class="ma-2"
                style="width:100%;"
                outlined
                color="white"
              >
                <v-icon color="white">fa-search</v-icon>
              </v-btn>
            </router-link>
          </v-flex>
          <v-flex sm2></v-flex>
        </v-layout>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
      data: () => ({
        routercode: ""
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
}
.banner_search_icon{
  text-align: center;
}
</style>