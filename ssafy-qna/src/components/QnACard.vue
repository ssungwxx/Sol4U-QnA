<template>
  <v-flex xs12 round ma-3>
    <v-card class="mx-auto">
      <v-card-text>
        <p class="textQnA">{{getCard[cardId].question}}</p>
        <p class="writeTimeText">
          <v-icon small>access_time</v-icon>
          &nbsp;
          {{getCard[cardId].created_at.string}}
        </p>
        <div id="QnACardLike">
          <!-- 하트 같은 아이콘으로 좋아요 개수 표시 -->
          <v-card-actions class="QnACardLikeAction">
            <v-btn
              v-if="!likeBool"
              @click="likeCheck(getCard[cardId].hitCount)"
              text
              icon
              color="#00000033"
            >
              <v-icon>favorite_border</v-icon>
            </v-btn>
            <v-btn v-else @click="likeCheck(getCard[cardId].hitCount)" text icon color="#ff0000">
              <v-icon>favorite</v-icon>
            </v-btn>
            <!-- 하트 개수 표시 영역 -->
            <template v-if="likeCount(getCard[cardId].hitCount)">
              <v-icon color="#cd7f32" id="likeIcon">favorite</v-icon>
              <!-- 하트 숫자 표시 -->
              <span id="likeCount">...{{getCard[cardId].hitCount}}</span>
            </template>
          </v-card-actions>
        </div>

        <div id="QnACardReply">
          <!-- 답변에 대한 공간 -->
          <div class="textReply">
            <slot name="qnaReply"></slot>
          </div>
          <p class="writeTimeText">
            <v-icon small>access_time</v-icon>&nbsp;
            <slot name="qnaReplyTime"></slot>
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
import FirebaseService from "../services/FirebaseService";

export default {
  name: "QnACard",
  props: {
    cardId: { type: Number },
    docId: { type: String }
  },
  data: () => ({
    // like or not check boolean var
    likeBool: false
  }),
  computed: {
    getCard() {
      return this.$store.state.cardList;
    }
  },
  methods: {
    likeCheck(num) {
      if (this.likeBool) {
        this.likeBool = false;
        // console.log(this.getCard[this.cardId].questionDocId);
        FirebaseService.questionHit(
          this.docId,
          this.getCard[this.cardId].questionDocId,
          -1
        );
        // this.likeCnt = this.likeCnt == 0 ? 0 : this.likeCnt - 1;
      } else {
        this.likeBool = true;
        FirebaseService.questionHit(
          this.docId,
          this.getCard[this.cardId].questionDocId,
          1
        );
      }
      if (num >= 1 && num < 7) {
        document.getElementById("likeIcon").style.color = "#cd7f32";
        document.getElementById("likeCount").style.fontSize = "0.9em";
      } else if (num >= 7 && num < 15) {
        document.getElementById("likeIcon").style.color = "#c0c0c0";
        document.getElementById("likeCount").style.fontSize = "1.0em";
      } else if (num >= 15) {
        document.getElementById("likeIcon").style.color = "#ffd700";
        document.getElementById("likeCount").style.fontSize = "1.2em";
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
  font-family: "Lexend Deca", sans-serif;
  margin-top: 12px;
  margin-left: -5px;
  color: blueviolet;
  font-size: 0.8em;
}

.writeTimeText {
  font-family: "Lexend Deca", sans-serif;
  justify-content: center;
  font-size: 0.9em;
}

.textQnA {
  font-family: "Lexend Deca", sans-serif;
  font-size: 2em;
  color: midnightblue;
}

.textReply {
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.3em;
  margin-bottom: 1%;
  color: cadetblue;
}
</style>