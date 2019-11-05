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
      </div>

      <v-btn-toggle style="margin-bottom: 10px;">
        <v-btn @click="setlist('allrooms')">
          <span class="hidden-sm-and-down">ALL ROOMS</span>
          <v-icon right>list_alt</v-icon>
        </v-btn>
        <v-btn @click="setlist('create')">
          <span class="hidden-sm-and-down">CREATED</span>
          <v-icon right>add_circle</v-icon>
        </v-btn>
      </v-btn-toggle>

      <!-- 정렬-->
      <v-layout v-for="i in list" style="margin-bottom:8px;">
        <!-- channel list-->
        <!-- vuex에 저장해야함 -->
        <ChannelCard
          v-if="i.closed_at.timestamp.seconds > currentTimestamp"
          :CodeNumber="i.channel_code"
          :CodeName="i.channel_name"
          :StartDay="i.created_at.string"
          :EndDay="i.closed_at.string"
          :TimeStampStartDay="i.created_at.timestamp"
          :TimeStampEndDay="i.closed_at.timestamp"
          :description="i.channel_description"
          :ChannelDocId="i.channel_doc_id"
          :ChannelOwner="i.channel_owner.user_email"
          setColor
        />

        <ChannelCard
          v-else
          :CodeNumber="i.channel_code"
          :CodeName="i.channel_name"
          :StartDay="i.created_at.string"
          :EndDay="i.closed_at.string"
          :TimeStampStartDay="i.created_at.timestamp"
          :TimeStampEndDay="i.closed_at.timestamp"
          :description="i.channel_description"
          :ChannelDocId="i.channel_doc_id"
          :ChannelOwner="i.channel_owner.user_email"
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
import { async } from "q";

export default {
  components: {
    ChannelCard
  },
  data: () => ({
    currentTimestamp: "",
    getChannel: "allrooms",
    list: [],
    listBool: false
  }),
  created() {
    this.$store.state.userTableChannelData = [];
    this.$store.state.createChannelData = [];
    this.$store.state.allMyChannelData = [];
  },
  mounted() {
    this.setLoginInfo();
    this.getChannelList;
  },
  computed: {
    getChannelList: function() {
      this.currentTimestamp = parseInt(new Date().getTime() / 1000);
      this.setlist(this.getChannel);
    },
    getIsLogin: function() {
      return this.$store.getters.getIsLogin;
    },
    getUserData: function() {
      return this.$store.getters.getUserData;
    }
  },
  methods: {
    setLoginInfo() {
      this.$store.dispatch("setLoginInfo", "dashboard");
    },
    create() {
      this.$router.push("/channel/create");
    },
    setlist(channel) {
      this.getChannel = channel;
      if (channel === "allrooms") {
        var temp = this.$store.state.allMyChannelData;
        this.list = temp;
      } else {
        var temp = this.$store.state.createChannelData;
        this.list = temp;
      }
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