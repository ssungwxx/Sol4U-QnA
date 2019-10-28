<template>
  <v-layout>
    <v-flex>
      <!-- =========================================================== -->
      <v-card
        class="mx-auto overflow-hidden"
        width="100%"
        height="100vh !important"
        color="rgba(0,0,0,0)"
      >
        <v-app-bar class="bar_design">
          <v-app-bar-nav-icon
            @click.stop="drawer = !drawer"
            style="margin-right:20px;"
            color="white"
          ></v-app-bar-nav-icon>SSAFY
        </v-app-bar>

        <v-navigation-drawer
          v-model="drawer"
          absolute
          right
          hide-overlay
          width="100%"
          id="drawers"
          style="padding-top:20px; background-color:#f2f2f2;"
        >
          <div style="text-align: left;">
            <v-btn text fab x-small id="btnBack" @click="btnBackClicked()">
              <v-icon>keyboard_tab</v-icon>
            </v-btn>
          </div>

          <v-list nav dense>
            <div style="display:inline-block; margin-bottom:70px;">
              <v-img src="../assets/Icon.png" style="height:40px; width:40px;" />
            </div>
            <span class="code_banner">SSAFY</span>
            <v-layout>
              <router-link to="/dashboard" class="RouterLink">
                <v-btn text @click="btnBackClicked()">
                  <div class="RouterLink_p">DASHBOARD</div>
                </v-btn>
              </router-link>
            </v-layout>
            <v-layout>
              <a href="https://lab.ssafy.com/s1-final/s1p1351008" class="GithubAddress">
                <v-btn text @click="btnBackClicked()">
                  <div class="RouterLink_p">Gitlab</div>
                </v-btn>
              </a>
            </v-layout>
            <v-layout class="banner_search">
              <v-flex sm10>
                <v-text-field label="Code" height="20px" solo v-model="routercode2"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout class="banner_search_icon">
              <v-flex>
                  <v-btn
                    class="ma-2"
                    style="width:100%;"
                    outlined
                    color="black"
                    @click="btnBackClickedAndRouter()"
                  >
                    <v-icon color="black">fa-search</v-icon>
                  </v-btn>
              </v-flex>
            </v-layout>
          </v-list>
        </v-navigation-drawer>
      </v-card>
      <!-- =========================================================== -->
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import FirebaseService from "../services/FirebaseService";

export default Vue.extend({
  props: ["maxheight"],
  data: () => ({
    drawer: false,
    group: null,
    routercode2: ""
  }),

  watch: {
    group() {
      this.drawer = false;
    }
  },
  methods: {
    btnBackClicked() {
      if (this.drawer) {
        this.drawer = false;
      } else {
        this.drawer = true;
      }
    },
    async btnBackClickedAndRouter() {
      if (this.drawer) {
        this.drawer = false;
      } else {
        this.drawer = true;
      }
      const docId = await FirebaseService.getDocByChannelCode(this.routercode2);
          if (docId == false){
            alert("채널정보가 없습니다. 다시 확인해주세요");
          }
          else{
            this.$router.push('/qna/'+docId);
          }
        }
    }
});
</script>

<style scoped>
#drawers {
  position: fixed;
  z-index: 30;
}

.banner_mobile_font {
  font-size: 26px;
}
.RouterLink_p {
  font-size: 20px;
}
.bar_design {
  background-image: url("../assets/lol.png");
  color: white;
}
.code_banner {
  font-size: 30px;
  font-family: "Do Hyeon", sans-serif;
}
.RouterLink {
  width: 100%;
  color: black;
  text-decoration: None;
  text-align: left;
  font-family: "Lexend Deca", sans-serif;
}
.RouterLink_p {
  color: black;
  font-family: "Do Hyeon", sans-serif;
  font-size: 1.5em !important;
}
.GithubAddress {
  width: 100%;
  color: black;
  text-decoration: None;
  text-align: left;
  font-family: "Lexend Deca", sans-serif;
}
.banner_search {
  text-align: center;
  margin-top: 60px;
}
.banner_search_icon {
  margin-left: -10px;
  margin-right: 10px;
}

#btnBack {
  background-color: #00000000;
}
</style>