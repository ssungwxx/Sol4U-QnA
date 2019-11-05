<template>
  <div style="width:100%;">
    <v-layout>
      <v-flex sm12>
        <v-card :color="setColor">
          <v-btn text width="100%" height="100%" @click="JoinDashBoard">
            <div id="channelWidth">
              <v-card-title class="codeTitle">Code : {{CodeNumber}}</v-card-title>
              <v-card-text style="margin-top:10px;">
                <div class="channeInfo">
                  <p class="channelTitle">{{CodeName}}</p>

                  <p class="channelDuetimeWeb">[{{StartDay}} ~ {{EndDay}}]</p>
                  <p class="channelDuetimeMobile">[{{mobileStartDay}} ~ {{mobileEndDay}}]</p>
                </div>
              </v-card-text>
            </div>
          </v-btn>
        </v-card>
      </v-flex>
      <v-flex v-if="this.check === true" sm1 id="ChannelMenu">
        <div>
          <v-btn id="menuBtnEdit" tile outlined color="success" width="100%" @click="modifyPage">
            <v-icon left>mdi-pencil</v-icon>Edit
          </v-btn>
          <v-btn id="menuBtnDel" tile outlined color="error" width="100%" @click="channelDelete">
            <v-icon left>mdi-delete</v-icon>Del
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
    <div v-if="this.check === true" id="mobileMenu" style="height:45px; padding-top:10px;">
      <v-btn style="width:49%; margin-right:2%;" small color="success" @click="modifyPage">Edit</v-btn>
      <v-btn style="width:49%;" small color="error" @click="channelDelete">Delete</v-btn>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import FirebaseService from "../services/FirebaseService";
import { mapActions } from "vuex";

export default {
  props: [
    "CodeNumber",
    "CodeName",
    "StartDay",
    "description",
    "EndDay",
    "setColor",
    "ChannelDocId",
    "ChannelOwner",
    "TimeStampStartDay",
    "TimeStampEndDay"
  ],

  data: () => ({
    check: false,
    mobileStartDay: "",
    mobileEndDay: ""
  }),
  methods: {
    modifyPage() {
      alert("수정페이지로 넘어갑니다.")
      this.$router.push({name:"modifychannel", params: {"code": this.CodeNumber, "title": this.CodeName, "description": this.description, "docId": this.ChannelDocId}})
    },
    async JoinDashBoard() {
      this.$router.push("/qna/" + this.ChannelDocId);
      await FirebaseService.joinTheChannel(this.ChannelDocId)
    },
    checkOwner() {
      const vuexUserEmail = this.$store.getters.getUserData.userEmail;
      if (vuexUserEmail === this.ChannelOwner) {
        this.check = true;
      }
    },
    async channelDelete() {
      await FirebaseService.deleteChannel(this.ChannelDocId);
      alert("'" + this.CodeNumber + "' 채널을 삭제했습니다");
      await location.reload();
    }
  },
  mounted() {
    this.checkOwner();
    this.mobileStartDay = this.StartDay.replace("년 ", ".");
    this.mobileStartDay = this.mobileStartDay.replace("월 ", ".");
    this.mobileStartDay = this.mobileStartDay.replace("일 ", "_");
    this.mobileStartDay = this.mobileStartDay.replace("시 ", ":");
    this.mobileStartDay = this.mobileStartDay.replace("분 ", ":");
    this.mobileStartDay = this.mobileStartDay.replace("초", "");

    this.mobileEndDay = this.EndDay.replace("년 ", ".");
    this.mobileEndDay = this.mobileEndDay.replace("월 ", ".");
    this.mobileEndDay = this.mobileEndDay.replace("일 ", "_");
    this.mobileEndDay = this.mobileEndDay.replace("시 ", ":");
    this.mobileEndDay = this.mobileEndDay.replace("분 ", ":");
    this.mobileEndDay = this.mobileEndDay.replace("초", "");
  }
};
</script>

<style>
#ChannelMenu {
  top: 0;
  right: 0;
  margin: 0.4vh 2vw;
  padding: 0.3vw 0;
}

.channeInfo {
  padding: 0.5vw;
}

#menuBtnEdit {
  margin-top:17px;
  margin-bottom:17px;
  border: 0;
}

#menuBtnDel {
  border: 0;
}

.channelTitle {
  font-size: 1em;
  color: rgb(51, 150, 244);
  margin-top: 3vh;
  font-family: "Lexend Deca", sans-serif;
}

.codeTitle {
  font-size: 2em;
  display: inline;
  font-family: "Lexend Deca", sans-serif;
}

#channelWidth {
  display: contents;
  padding-top: 0px;
}
#mobileMenu {
  display: none;
}

.channelDuetimeWeb {
  display: block;
  font-size: 0.9em;
  color: brown;
  font-family: "Lexend Deca", sans-serif;
}

.channelDuetimeMobile {
  display: none;
  color: brown;
  font-family: "Lexend Deca", sans-serif;
  font-size: 0.7em;
}

@media (max-width: 1200px) {
  #channelWidth {
    display: block;
    padding-top: 20px;
  }
  #ChannelMenu {
    display: none;
  }
  #mobileMenu {
    display: block;
    margin-top: -5px;
    margin-bottom: -10px;
  }
  .channelDuetimeWeb {
    display: none;
  }

  .channelDuetimeMobile {
    display: block;
  }
}
</style>