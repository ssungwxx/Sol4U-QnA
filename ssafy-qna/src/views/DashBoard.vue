<template>
    <v-app>
        
        <v-layout>
            <v-flex sm3 class="banner_background">
                <HeaderWeb />
            </v-flex>

            <v-flex sm9 class="content_background">
              <v-layout class="banner_mobile">
                <HeaderMobile :maxheight="maxheight"/>
              </v-layout>
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
                            <v-layout v-for="(i) in dashboards.length" :key="i">
                                <!-- channel list-->
                                <router-link style="width:100%; text-decoration:none;" :to='"/qna/"+dashboards[i-1].channel_code'> <!-- vuex에 저장해야함 -->
                                <ChannelCard v-if="dashboards[i-1].closed_at.timestamp.seconds > currentTimestamp"
                                 :CodeNumber='dashboards[i-1].channel_code'
                                 :CodeName='dashboards[i-1].channel_name'
                                 :StartDay='dashboards[i-1].created_at.string'
                                 :EndDay='dashboards[i-1].closed_at.string'
                                 setColor="" />

                                <ChannelCard v-else
                                 :CodeNumber='dashboards[i-1].channel_code'
                                 :CodeName='dashboards[i-1].channel_name'
                                 :StartDay='dashboards[i-1].created_at.string'
                                 :EndDay='dashboards[i-1].closed_at.string'
                                 setColor="#d9d9d9" />
                                 </router-link>
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
import FirebaseService from "../services/FirebaseService";
export default {
    components: {
        HeaderMobile,
        HeaderWeb,
        ChannelCard
    },
    data: () => ({
      maxheight: 0,
      dashboards: [],
      currentTimestamp: ''
    }),
    methods:{
      heightm () {
        const offsety = document.documentElement.offsetHeight;
        const outy = window.outerHeight;
        if (offsety > outy) {
          this.maxheight = offsety;
        } else {
          this.maxheight = outy;
        }
      },
      async getdashboard () {
        function compare (a, b){
          if (a.closed_at.timestamp < b.closed_at.timestamp)
            return 1;
          if (a.closed_at.timestamp > b.closed_at.timestamp)
            return -1;
          return 0;
        }
        this.dashboards = await FirebaseService.getAllChannels()
        this.dashboards.sort(compare);
        this.currentTimestamp = parseInt(new Date().getTime()/1000)
        console.log(this.dashboards)
      }
    },
    mounted() {
      this.heightm();
      this.getdashboard();
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
@media (max-width: 600px) {
  .banner_background {
    display: none;
  }
  .banner_mobile {
    display: block;
  }
}
</style>