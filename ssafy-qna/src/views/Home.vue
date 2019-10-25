<template>
  <div id="containerHome">
    <!-- <ImageBanner imgSrc="https://picsum.photos/1600/900" id="imgBanner"> -->
    <ImageBanner id="imgBanner">
      <div
        id="bannerText"
        style="line-height:1.2em; color: white;"
        slot="text"
        class="font-weight-bold fontBanner"
      >
        Sol4U
        <br />SSAFY QnA Service
      </div>
    </ImageBanner>

    <div id="contentField">
      <v-row id="rowField">
        <v-col sm="6" cols="12">
          <v-text-field v-model="code" label="Code Number" id="inputCode"></v-text-field>
          <!-- 여기에 vuex에 Guest아이디로 넘겨주는 기능 추가하면됨 -->
          <v-btn
            class="ma-2 btnHome"
            style="width:200px"
            outlined
            color="indigo"
            @click="loginWithAnonymous"
          >
            <v-icon color="indigo">fa-user-secret</v-icon>&nbsp;Login as Guest
          </v-btn>

          <router-link :to="'/channel/create'">
            <v-btn
              class="ma-2 btnHome"
              style="width:200px"
              outlined
              color="indigo"
              @click="create()"
            >Create</v-btn>
          </router-link>
          <v-btn
            class="ma-2 btnHome"
            style="width:200px"
            outlined
            color="red"
            @click="loginWithGoogle"
          >
            <v-icon color="red">fa-google</v-icon>&nbsp;Login with Google
          </v-btn>

          <v-btn class="ma-2 btnHome" style="width:200px" outlined color="red" @click="logout">
            <v-icon color="red">fa-google</v-icon>&nbsp;Logout
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import ImageBanner from "../components/ImageBanner";
import SignUp from "../components/SignUp";
import FirebaseService from "../services/FirebaseService";
import { mapActions } from "vuex";

export default {
  components: {
    ImageBanner,
    SignUp
  },
  data: () => ({
    code: ""
  }),
  async mounted() {
    await this.setLoginInfo();
  },
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
    async loginWithGoogle() {
      await FirebaseService.loginWithGoogle();
      this.setLoginInfo();
    },
    async loginWithAnonymous() {
      if (this.code == "") {
        alert("DashBoard로 이동합니다");
        this.$router.push("/dashboard");
        this.setLoginInfo();
      } else {
        const docId = await FirebaseService.getDocByChannelCode(this.code);
        if (docId == false) {
          alert("채널정보가 없습니다. 다시 확인해주세요");
        } else {
          this.$router.push("/qna/" + this.code); // 여기 vuex로 처리하기
          await FirebaseService.loginWithAnonymous();
        }
      }
    },
    async logout() {
      await FirebaseService.logout();
      this.setLogout();
    },
    create() {}
  }
};
</script>

<style>
#rowField {
  margin-left: 8%;
  margin-top: 70%;
  position: fixed;
  bottom: 10%;
}

#imgBanner {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 1;
}

#contentField {
  min-width: 400px;
  min-height: 800px;
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 5;
}

#containerHome {
  position: fixed;
  min-width: 500px;
  min-height: 500px;
  height: 100vh;
  width: 100vw;
}

.fontBanner {
  position: absolute;
  top: 150px;
  margin-left: 10%;
  font-size: 1em;
}

.btnHome {
  font-size: 0.8em !important;
}

@media (max-height: 500px) {
  #bannerText {
    display: none;
  }
}
</style>
