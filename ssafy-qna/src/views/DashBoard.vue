<template>
  <v-app>
    <!-- title -->
    <div id="pageTitle">DashBoard</div>

    <!-- body -->
    <div id="pageBody">
      <div v-if="getIsLogin&&!getUserData.isAnonymous" id="create">
        <v-btn @click="create">create</v-btn>
      </div>
      <div id="pageHeader">
        <h1>Channel List</h1>
        <p>정렬 버튼 작동안한다 이것들아. 고쳐 놓거라</p>
      </div>

      <v-btn-toggle style="margin-bottom: 10px;">
        <v-btn @click="setlist('allrooms')">
          <span class="hidden-sm-and-down">ALL ROOMS</span>
          <v-icon right>list_alt</v-icon>
        </v-btn>
        <v-btn @click="setlist('cerate')">
          <span class="hidden-sm-and-down">CREATED</span>
          <v-icon right>add_circle</v-icon>
        </v-btn>
      </v-btn-toggle>

      <!-- 정렬-->
      <v-layout v-for="(i) in dashboards.length" :key="i" style="margin-bottom:8px;">
        <!-- channel list-->
        <!-- vuex에 저장해야함 -->
        <ChannelCard
          v-if="dashboards[i-1].closed_at.timestamp.seconds > currentTimestamp"
          :CodeNumber="dashboards[i-1].channel_code"
          :CodeName="dashboards[i-1].channel_name"
          :StartDay="dashboards[i-1].created_at.string"
          :EndDay="dashboards[i-1].closed_at.string"
          :TimeStampStartDay="dashboards[i-1].created_at.timestamp"
          :TimeStampEndDay="dashboards[i-1].closed_at.timestamp"
          :ChannelDocId="dashboards[i-1].channel_doc_id"
          :ChannelOwner="dashboards[i-1].channel_owner.user_email"
          setColor
        />

        <ChannelCard
          v-else
          :CodeNumber="dashboards[i-1].channel_code"
          :CodeName="dashboards[i-1].channel_name"
          :StartDay="dashboards[i-1].created_at.string"
          :EndDay="dashboards[i-1].closed_at.string"
          :TimeStampStartDay="dashboards[i-1].created_at.timestamp"
          :TimeStampEndDay="dashboards[i-1].closed_at.timestamp"
          :ChannelDocId="dashboards[i-1].channel_doc_id"
          :ChannelOwner="dashboards[i-1].channel_owner.user_email"
          setColor="#d9d9d9"
        />
      </v-layout>
    </div>
  </v-app>
</template>

<script>
import Vue from "vue";
import ChannelCard from "../components/ChannelListCard";
import FirebaseService from "../services/FirebaseService";
import { mapActions } from "vuex";

export default {
  components: {
    ChannelCard
  },
  data: () => ({
    dashboards: [],
    getdata: [],
    currentTimestamp: "",
    getchannel: "allrooms"
  }),
  async mounted() {
    await this.setLoginInfo();
    this.getdashboard();
  },
  computed: {
    getIsLogin: function() {
      return this.$store.getters.getIsLogin;
    },
    getUserData: function() {
      return this.$store.getters.getUserData;
    }
  },
  methods: {
    ...mapActions(["setLoginInfo", "setLogout"]),
    async getdashboard() {
      function compare(a, b) {
        if (a.closed_at.timestamp < b.closed_at.timestamp) return 1;
        if (a.closed_at.timestamp > b.closed_at.timestamp) return -1;
        return 0;
      }
      
      if(this.getchannel =="allrooms"){
        this.getdata = await FirebaseService.getOwnedChannels();
         this.getdata.owned_channels.forEach(element => {
           this.dashboards.push(element);
         }); 
         this.getdata.joined_channels.forEach(element=>{
           this.dashboards.push(element);
         });
      }else if(this.getchannel == "create"){
        this.getdata = await FirebaseService.getOwnedChannels();
         this.getdata.owned_channels.forEach(element => {
           this.dashboards.push(element);
         }); 
      }

      this.dashboards.sort(compare);
      this.currentTimestamp = parseInt(new Date().getTime() / 1000);
    },
    create() {
      this.$router.push("/channel/create");
    },
    setlist(channel){
      this.getchannel = channel;
      console.log(this.getchannel)
    }
  }
};
</script>

<style>
#pageTitle {
  background-color: rgb(51, 150, 244);
  padding: 1%;
  font-size: 1.1em;
}
#create {
  float: right;
  margin-top: 70px;
  margin-right: 10px;
}

@media (max-width: 1200px) {
  #pageTitle {
    display: none;
  }
}
</style>