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
        <p>Channel List You Created.</p>
      </div>

      <v-btn-toggle borderless style="margin-bottom: 10px">
          <v-btn>
            <span class="hidden-sm-and-down">Created</span>
            <v-icon right>question_answer</v-icon>
          </v-btn>
          <v-btn>
            <span class="hidden-sm-and-down">entered</span>
            <v-icon right>input</v-icon>
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
    currentTimestamp: ""
  }),
  computed: {
    getIsLogin: function() {
      return this.$store.getters.getIsLogin;
    },
    getUserData: function() {
      return this.$store.getters.getUserData;
    }
  },
  methods: {
    async getdashboard() {
      function compare(a, b) {
        if (a.closed_at.timestamp < b.closed_at.timestamp) return 1;
        if (a.closed_at.timestamp > b.closed_at.timestamp) return -1;
        return 0;
      }
      this.dashboards = await FirebaseService.getAllChannels();
      this.dashboards.sort(compare);
      this.currentTimestamp = parseInt(new Date().getTime() / 1000);
    },
    create() {
      this.$router.push("/channel/create");
    }
  },
  mounted() {
    this.getdashboard();
  }
};
</script>

<style>
#pageTitle {
  height: 6%;
  background-color: rgb(51, 150, 244);
  padding: 2%;
  font-size: 1.1em;
}
#create {
  float: right;
  margin-top: 70px;
  margin-right: 10px;
}
</style>