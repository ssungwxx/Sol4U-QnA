<template>
    <v-app>
        <v-layout class="banner_mobile">
            <HeaderMobile :maxheight="maxheight"/>
        </v-layout>
        <v-layout>
            <v-flex sm3 class="banner_background">
                <HeaderWeb />
            </v-flex>

            <v-flex sm9 class="content_background">
                <!-- title -->
                <div id="pageTitle">Channel list</div>

                <!-- body -->
                <div id="pageBody">
                    <div id="pageHeader">
                        <h1>Channel List</h1>
                        <p>Channel List You Created.</p>
                    </div>
                
                   <!-- 정렬-->

                    <v-card>
                        <v-container grid-list-lg fluid>
                            <v-layout row wrap>
                                <!-- channel list-->
                                <ChannelCard />
                            </v-layout>
                        </v-container>
                    </v-card> 
                </div>


            </v-flex>



        </v-layout>
    </v-app>
</template>

<script>
import Vue from "vue";
import HeaderMobile from "../components/HeaderMobile";
import HeaderWeb from "../components/HeaderWeb";
import ChannelCard from "../components/ChannelListCard";
export default {
    components: {
        HeaderMobile,
        HeaderWeb,
        ChannelCard
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
.content_background {
  height: 100%;
}

#pageTitle {
  height: 9%;
  background-color: #ffffff;
  padding: 2%;
  font-size: 1.1em;
}
</style>