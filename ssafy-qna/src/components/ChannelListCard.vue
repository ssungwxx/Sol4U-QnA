<template>
<div style="width:100%;">
  <v-layout>
  <v-flex sm12 ma-2>
    <v-card :color="setColor">
    <v-btn text width="100%" height="100%" @click="JoinDashBoard">
      <div id="channelWidth">
      <v-card-title class="codeTitle">Code : {{CodeNumber}}</v-card-title>
      <v-card-text style="margin-top:10px;">
        <div class="channeInfo">
          <p class="channelTitle">채널이름 : {{CodeName}}</p>

          <p class="channelDuetime">{{StartDay}} ~ {{EndDay}}</p>
        </div>
      </v-card-text>
      </div>
    </v-btn>
    </v-card>
  </v-flex>
  <v-flex v-if="this.check === true" sm1 id="ChannelMenu">
    <div>
     <v-btn class="ma-2" tile outlined color="success" width="100%" @click="test">
      <v-icon left>mdi-pencil</v-icon> Edit
    </v-btn>
    <v-btn class="ma-2" tile outlined color="error" width="100%" @click="channelDelete">
      <v-icon left>mdi-delete</v-icon>
      Del
    </v-btn>
    </div>
  </v-flex>
  </v-layout>
    <div v-if="this.check === true" id="mobileMenu">
     <v-btn text small color="success" @click="test">Edit</v-btn>
     <v-btn text small color="error" @click="channelDelete">Delete</v-btn>
    </div>
</div>
</template>

<script>
import Vue from "vue";
import FirebaseService from "../services/FirebaseService";
import { mapActions } from "vuex";

export default {
  props: ["CodeNumber", "CodeName", "StartDay", "EndDay", "setColor","ChannelDocId","ChannelOwner"],
  
  data: () => ({
    check: false
  }),
  methods: {
    test () {
      alert("아직 작업안했어요 제가 할겁니다 건들지마세요")
    },
    JoinDashBoard () {
      this.$router.push("/qna/"+this.ChannelDocId);
    },
    checkOwner () {
      const vuexUserEmail = this.$store.getters.getUserData.userEmail
      console.log("owner   "+this.ChannelOwne6r)
      console.log(vuexUserEmail)
      if(vuexUserEmail === this.ChannelOwner){
        this.check = true
      }
      console.log(this.check)
    },
    async channelDelete () {
      await FirebaseService.deleteChannel(this.ChannelDocId);
      alert("'"+this.CodeNumber+"' 채널을 삭제했습니다")
    }
  },
  mounted() {
    this.checkOwner();
  }
};
</script>

<style>
#ChannelMenu {
  top: 0;
  right: 0;
}

.channelTitle {
  font-size: 1em;
}

.channelDuetime {
  font-size: 0.8em;
}

.codeTitle{
  font-size: 2em;
  display: inline;
}

#channelWidth{
  display: contents;
  padding-top : 0px;
}
#mobileMenu{
  display: none;
}


@media (max-width:1400px) {
  #channelWidth{
    display: block;
    padding-top: 20px;
  }
  #ChannelMenu{
    display:none;
  }
  #mobileMenu{
    display: block;
    margin-top:-5px;
    margin-bottom:-10px;

  }
}
</style>