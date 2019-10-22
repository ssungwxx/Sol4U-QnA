<template>
  <v-app>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </v-app>
</template>

<script>
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
  }
};

var agent = navigator.userAgent.toLowerCase();
if (agent.indexOf("chrome") === -1) {
  // alert("해당 홈페이지는 Chrome에 최적화 되어 있습니다.");
}
</script>

<style>
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
</style>
