<template>
    <div>
        <div style="display:inline-block; margin-top:2vw; margin-bottom:8vw;">
          <v-img src = "../assets/Icon.png" style="height:5vw; width:5vw;" />
        </div>
        <router-link to="/" class="RouterLink">
          <span class="code_banner">SSAFY</span>
        </router-link>
        
        <v-layout v-if="getIsLogin" class="googleloginid">
          <router-link v-if="!getUserData.isAnonymous" to="/dashboard" class="RouterLink_google">
            <p class="RouterLink_p_google">{{getUserData.userDisplayName}}&nbsp;님</p>
          </router-link>
          <div v-else class="RouterLink_google">
            <p  class="RouterLink_p_google">익명 로그인입니다</p>
          </div>
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
            <v-btn
              class="ma-2"
              style="width:100%;"
              outlined
              color="white"
              @click="checkChannel"
            >
              <v-icon color="white">fa-search</v-icon>
              </v-btn>
          </v-flex>
          <v-flex sm2></v-flex>
        </v-layout>
        <v-layout class="banner_dashboard">
          <router-link to="/dashboard" class="RouterLink">
            <p class="RouterLink_p">DashBoard</p>
          </router-link>
        </v-layout>
        <v-layout>
          <a href="https://lab.ssafy.com/s1-final/s1p1351008" class="GithubAddress">
            <div class="RouterLink_p">Gitlab</div>
          </a>
        </v-layout>
        <v-layout>
          <button text small class="logout RouterLink_p" @click="logout">
            LOGOUT
          </button>
        </v-layout>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import FirebaseService from "../services/FirebaseService";
    import { mapActions } from "vuex";
    export default Vue.extend({
      data: () => ({
        routercode: ""
      }),
      computed: {
        
        getIsLogin: function() {
        return this.$store.getters.getIsLogin;
        },
        getUserData: function() {
          return this.$store.getters.getUserData;
        }
      },
      methods: {
        ...mapActions(["setLoginInfo", "setLogout"]),
        async checkChannel(){
          const docId = await FirebaseService.getDocByChannelCode(this.routercode);
          if (docId == false){
            alert("채널정보가 없습니다. 다시 확인해주세요");
          }
          else{
            this.$router.push('/qna/'+docId);
          }
        },
        async logout() {
          await FirebaseService.logout();
          this.setLogout();
          this.$router.push('/');
        },

      }
    })
</script>

<style scoped>
.code_banner {
  font-size: 5vw;
  font-weight: bold;
  font-family: 'Raleway', sans-serif;
  color: rgb(51, 150, 244);
}
.googleloginid{
  width: 100%;
  color: black;
  text-align: center;
  font-family: "Lexend Deca", sans-serif;
}
.RouterLink_google {
  width: 100%;
  color: white;
  text-decoration: underline;
  text-align: left;
  font-family: "Lexend Deca", sans-serif;
  margin-left:2vw;
}
.RouterLink_p_google {
  color: white;
  font-family: 'Do Hyeon', sans-serif;
  font-size: 2vw;
}
.GithubAddress{
  width: 100%;
  color: black;
  text-decoration: None;
  text-align: left;
  font-family: "Lexend Deca", sans-serif;
  margin-left:2vw;
  margin-top: 1vw;
}
.RouterLink {
  width: 100%;
  color: black;
  text-decoration: None;
  text-align: left;
  font-family: "Lexend Deca", sans-serif;
  margin-left:2vw;
}
.banner_dashboard {
  margin-top: 3vw;
}
.RouterLink_p {
  color: white;
  font-family: 'Do Hyeon', sans-serif;
  font-size: 3vw;
}
.banner_search{
  text-align: center;
}
.banner_search_icon{
  text-align: center;
}
.logout{
  width: 100%;
  color: white;
  text-align: left;
  margin-top: 2vw;
  margin-left: 2vw;
  
}
</style>