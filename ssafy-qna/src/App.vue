<template>
  <v-app>
    <v-layout>
      <v-flex sm3 id="banner_background" :style="{display: loading}">
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
    <go-top
      v-bind:max-width="200"
      style="background-color: rgb(51, 150, 244); width: 50px; height: 50px;"
    ></go-top>
  </v-app>
</template>

<script>
import HeaderMobile from "../src/components/HeaderMobile";
import HeaderWeb from "../src/components/HeaderWeb";
import GoTop from "@inotom/vue-go-top";
export default {
  name: "App",
  data: () => ({
    loading: "none"
  }),
  watch: {
    $route(to, from) {
      this.PageFrom = from.name + " page";
      this.PageTo = to.name + " page";
    }
  },
  components: {
    HeaderMobile,
    HeaderWeb,
    GoTop
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  created() {
    setTimeout(() => (this.loading = "block"), 1000);
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
  height: 100vh;
}

#banner_mobile {
  display: none;
  height: 50px;
  background-color: rgb(36, 40, 43);
  text-align: center;
}
#content_background {
  position: absolute;
  height: 100vh;
  width: 75%;
  right: 0;
}
@media (max-width: 600px) {
  #banner_background {
    display: none;
    position: relative;
    width: 1px;
    height: 1px;
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

