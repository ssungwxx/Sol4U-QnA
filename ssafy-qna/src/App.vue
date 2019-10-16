<template>
  <v-app>
    <Home />
  </v-app>
</template>

<script>
import Home from './views/Home';

export default {
  name: 'App',
  components: {
    Home,
  },
  data: () => ({
    
  }),
};

var agent = navigator.userAgent.toLowerCase();
if ( agent.indexOf('chrome') != -1) {
     // chrome일 경우
}else{
     // chrome이 아닐 경우
     alert('해당 홈페이지는 Chrome에 최적화 되어 있습니다.');
}

</script>

<style>
body::-webkit-scrollbar {
    display: none;
}
</style>
