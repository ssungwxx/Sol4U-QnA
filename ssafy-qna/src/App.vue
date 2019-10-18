<template>
  <v-app>
      <router-view/>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  })
}

var agent = navigator.userAgent.toLowerCase();
if ( agent.indexOf('chrome') !== -1) {
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
