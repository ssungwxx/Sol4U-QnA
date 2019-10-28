<template>
  <v-flex xs12 ma-2>
    <v-card :color="setColor">
      <v-card-title class="codetitle">Code : {{CodeNumber}}</v-card-title>
      <v-card-text>
        <div class="channeInfo">
          <p class="channelTitle">채널이름 : {{CodeName}}</p>

          <p class="channelDuetime">{{StartDay}} ~ {{EndDay}}</p>
        </div>
      </v-card-text>
      <div id="ChannelMenu">
        <v-btn text small color="primary">Primary</v-btn>
      </div>
    </v-card>
  </v-flex>
</template>

<script>
import Vue from "vue";
import FirebaseService from "../services/FirebaseService";

export default {
  props: ["CodeNumber", "CodeName", "StartDay", "EndDay", "setColor"]
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
  font-size: 0.6em;
}
</style>