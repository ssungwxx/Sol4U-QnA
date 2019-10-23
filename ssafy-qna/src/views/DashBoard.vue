<template>
    <v-app>
        <v-layout class="banner_mobile">
            <HeaderMobile :maxheight="maxheight"/>
        </v-layout>
        <v-layout>
            <v-flex sm3 class="banner_background">
                <DashBoardHeader />
            </v-flex>
        </v-layout>
    </v-app>
</template>

<script>
import Vue from "vue";
import HeaderMobile from "../components/HeaderMobile";
import DashBoardHeader from "../components/DashBoardHeader";
export default {
    components: {
        HeaderMobile,
        DashBoardHeader
    }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Lexend+Deca|Saira+Extra+Condensed&display=swap");
@import url("https://fonts.googleapis.com/css?family=Do+Hyeon&display=swap");
@import url("https://fonts.googleapis.com/css?family=Raleway:700&display=swap");

.banner {
  font-size: 160px;
  color: white;
  font-weight: bolder;
  margin-top: -110px;
}
.banner_background {
  display: block;
  background-color: #666666;
  text-align: center;
}
.banner_mobile {
  display: none;
  height: 50px;
  background-color: #bfbfbf;
  text-align: center;
}

</style>