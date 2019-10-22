<template>
    <div id="containerHome">
        <!-- <ImageBanner imgSrc="https://picsum.photos/1600/900" id="imgBanner"> -->
        <ImageBanner id="imgBanner">
            <div
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
        <v-col sm="3" cols="12">
          <v-text-field v-model="code" label="Code Number" id="inputCode" ></v-text-field>
          <router-link :to="'/qna/'+code">
            <!-- 여기에 vuex에 Guest아이디로 넘겨주는 기능 추가하면됨 -->
            <v-btn
              class="ma-2"
              style="width:200px"
              outlined
              color="indigo"
              @click="loginWithAnonymous"
            >
              <v-icon color="indigo">fa-user-secret</v-icon>&nbsp;Login as Guest
            </v-btn>
          </router-link>

          <router-link :to="'/channel/create'">
            <v-btn class="ma-2" style="width:180px" outlined color="indigo">Create</v-btn>
          </router-link>
          <v-btn class="ma-2" style="width:200px" outlined color="red" @click="loginWithGoogle">
            <v-icon color="red">fa-google</v-icon>&nbsp;Login with Google
          </v-btn>

          <v-btn class="ma-2" style="width:200px" outlined color="red" @click="logout">
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


export default {
  components: {
    ImageBanner,
    SignUp
  },
  data: () => ({
    code: ""
  }),
  methods: {
    async loginWithGoogle() {
      await FirebaseService.loginWithGoogle();
    },
    async loginWithAnonymous() {
      await FirebaseService.loginWithAnonymous();
    },
    async logout() {
      await FirebaseService.logout();
    }
  }
};
</script>

<style>
#rowField {
  margin-left: 8%;
  margin-top: 30%;
}

#imgBanner {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 1;
}

#contentField {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 5;
}

#containerHome {
  position: fixed;
  height: 100vh;
  width: 100vw;
}

.fontBanner {
  margin: -20% 0 0 10%;
  font-size: 1em;
}
</style>
