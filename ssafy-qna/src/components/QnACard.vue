<template>
  <v-flex xs12>
    <v-card class="mx-auto">
      <v-card-text>
        <p class="display-1 text--primary">여기에 질문에 대한 Text가 들어간다.</p>
        <p class="writeTimeText">
          <v-icon small>access_time</v-icon>&nbsp;누가 언제 썼는지
        </p>
        <div id="QnACardLike">
          <!-- 하트 같은 아이콘으로 좋아요 개수 표시 -->
          <v-card-actions class="QnACardLikeAction">
            <v-btn v-if="!likeBool" @click="likeCheck()" text icon color="#00000033">
              <v-icon>favorite_border</v-icon>
            </v-btn>
            <v-btn v-else @click="likeCheck()" text icon color="#ff0000">
              <v-icon>favorite</v-icon>
            </v-btn>
            <!-- 하트 개수 표시 영역 -->
            <template v-if="likeCount(likeCnt)">
              <v-icon color="#cd7f32" id="likeIcon">favorite</v-icon>
              <!-- 하트 숫자 표시 -->
              <span id="likeCount">...{{likeCnt}}</span>
            </template>
          </v-card-actions>
        </div>

        <div id="QnACardReply">
          <!-- 답변에 대한 공간 -->
          <div class="text--primary">이쯤에 답글이 들어가는건 어떨까</div>
          <p class="writeTimeText">
            <v-icon small>access_time</v-icon>&nbsp;누가 언제 썼는지
          </p>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="deep-purple accent-4">
          <v-icon large>reply</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: "QnACard",
  data: () => ({
    // like or not check boolean var
    likeBool: false,
    // like number count var
    likeCnt: 0
  }),
  props: {},
  methods: {
    likeCheck() {
      if (this.likeBool) {
        this.likeBool = false;
        // this.likeCnt = this.likeCnt == 0 ? 0 : this.likeCnt - 1;
      } else {
        this.likeBool = true;
        this.likeCnt += 1;
        if (this.likeCnt >= 1 && this.likeCnt < 10) {
          document.getElementById("likeIcon").style.color = "#cd7f32";
          document.getElementById("likeCount").style.fontSize = "0.9em";
        } else if (this.likeCnt >= 10 && this.likeCnt < 20) {
          document.getElementById("likeIcon").style.color = "#c0c0c0";
          document.getElementById("likeCount").style.fontSize = "1.0em";
        } else if (this.likeCnt >= 20) {
          document.getElementById("likeIcon").style.color = "#ffd700";
          document.getElementById("likeCount").style.fontSize = "1.2em";
        }
      }
    },
    likeCount(num) {
      if (num > 0) {
        return true;
      } else return false;
    }
  }
};
</script>

<style>
#QnACardReply {
  margin-left: 2%;
}

#QnACardLike {
  margin-bottom: 1%;
}

#likeCount {
  margin-top: 12px;
  margin-left: -5px;
  color: blueviolet;
  font-size: 0.8em;
}

.writeTimeText {
  text-justify: auto;
  font-size: 0.9em;
}
</style>