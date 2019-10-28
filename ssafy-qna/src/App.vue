<template>
  <v-app>
    <v-layout>
      <v-flex sm3 id="banner_background">
        <HeaderWeb />
      </v-flex>

      <v-flex sm9 id="content_background">
        <v-layout id="banner_mobile">
          <HeaderMobile />
        </v-layout>
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import HeaderMobile from "../src/components/HeaderMobile";
import HeaderWeb from "../src/components/HeaderWeb";
export default {
  name: "App",
  data: () => ({
    //
  }),
  watch: {
    $route(to, from) {
      this.PageFrom = from.name + " page";
      this.PageTo = to.name + " page";
    }
  },
  components: {
    HeaderMobile,
    HeaderWeb
  }
};

var agent = navigator.userAgent.toLowerCase();
if (agent.indexOf("chrome") === -1) {
  // alert("해당 홈페이지는 Chrome에 최적화 되어 있습니다.");
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Lexend+Deca|Saira+Extra+Condensed&display=swap");
@import url("https://fonts.googleapis.com/css?family=Do+Hyeon&display=swap");
@import url("https://fonts.googleapis.com/css?family=Raleway:700&display=swap");

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

body::-webkit-scrollbar {
  display: none;
}
#banner_background {
  display: block;
  background-color: rgb(36, 40, 43);
  text-align: center;
  position: fixed;
  width: 25%;
  z-index: 20;
  height: 100vh;
}
#banner_mobile {
  display: none;
  height: 50px;
  background-color: white;
  text-align: center;
}
#content_background {
  position: absolute;
  height: 100vh;
  z-index: 20;
  width: 75%;
  right: 0;
}
@media (max-width: 600px) {
  #banner_background {
    display: none;
  }
  #banner_mobile {
    display: block;
  }
  #content_background {
    height: 100vh;
    width: 100vw;
  }
}
</style>
