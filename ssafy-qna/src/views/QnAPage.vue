<template>
    <v-app>
        <v-layout>
            <v-flex sm3 class="banner_background">
                <p class="banner">SSAFY</p>
                <p class="code_banner">
                    {{code}}
                </p>

                <v-layout>
                    <router-link to="/" class="RouterLink">
                            <p class="RouterLink_p">Join Page</p>
                    </router-link>
                </v-layout>
                <v-layout style=" font-size: 30px; text-align:center">
                    <br>
                    여기에 뭘 넣어야
                    <br>
                    할지 모르겠네요
                    <br>
                    하핫 ☞
                    <br>
                    콩이보고싶다
                    <br>
                    하지만 콩이는 나를
                    <br>
                    싫어한다
                    <br>
                    다함께 삼성으로
                    <br>
                    이번에 상타서 수상경력에 한개 더
                    <br>
                    심심해서 효과넣었어요
                </v-layout>
            </v-flex>
            <v-flex sm9 class="">
            </v-flex>
        </v-layout>
    </v-app>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  computed:
  {
    code: function () {
      return this.$route.params.code
    }
  }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lexend+Deca|Saira+Extra+Condensed&display=swap');
    .banner{
        font-size: 160px;
        color: white;
        font-weight: bolder;
        margin-top:-110px;
    }
    .code_banner{
        font-size: 7vw;
        margin-left:20px;
        font-weight: bold;
        font-family: 'Saira Extra Condensed', sans-serif;
    }
    .RouterLink{
        width:100%;
        font-size: 35px;
        color: black;
        text-decoration: None;
        text-align:center;
        font-family: 'Lexend Deca', sans-serif;
    }
    .RouterLink_p{
        color: black;
    }
    .banner_background {
        -webkit-animation-name: movingPara;
        -webkit-animation-duration: 10s;
        animation-name: movingPara;
        animation-duration: 10s;
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
    }

    @-webkit-keyframes movingPara {
        0% { background-color: #3399ff; }
        20% { background-color: #ff99ff; }
        40% { background-color: #ff9999; }
        50% { background-color: #ffb366; }
        80% { background-color: #adad85; }
        100% { background-color: #3399ff; }
    }
</style>
