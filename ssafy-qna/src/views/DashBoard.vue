<template>

    <v-app>
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
                <router-link style="width:100%; text-decoration:none;" :to="'/qna/'+dashboards[i-1].channel_code"> <!-- vuex에 저장해야함 -->
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
    </v-app>
</template>

<script>
import Vue from "vue";
import ChannelCard from "../components/ChannelListCard";
import FirebaseService from "../services/FirebaseService";
export default {
    components: {
        ChannelCard
    },
    data: () => ({
      dashboards: [],
      currentTimestamp: ''
    }),
    methods:{
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
    this.getdashboard();
  }
};
</script>

<style>
#pageTitle {
  height: 9%;
  background-color: rgb(51, 150, 244);
  padding: 2%;
  font-size: 1.1em;
}
</style>