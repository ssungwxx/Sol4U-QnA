<template>
  <v-flex xs12 round>
    <v-card class="cardChild">
      <v-card-text>
        <div>
          <p class="textQnA">{{getCard[cardId].question}}</p>
        </div>
        <p class="writeTimeText">
          <v-icon small>access_time</v-icon>
          &nbsp;
          {{getCard[cardId].created_at.string}}
          <v-btn icon small id="remove" @click="removeQ(getCard[cardId])">
            <v-icon small color="red">delete_forever</v-icon>
          </v-btn>
        </p>
        <div id="QnACardLike">
          <!-- 하트 같은 아이콘으로 좋아요 개수 표시 -->
          <v-card-actions>
            <div class="QnACardLikeAction">
              <v-btn
                v-if="!likeBool"
                @click="likeCheck(getCard[cardId].hitCount)"
                text
                icon
                color="#00000033"
              >
                <v-icon>thumb_up_alt</v-icon>
              </v-btn>
              <v-btn v-else @click="likeCheck(getCard[cardId].hitCount)" text icon color="#ff0000">
                <v-icon>thumb_up_alt</v-icon>
              </v-btn>
              <!-- 하트 개수 표시 영역 -->
              <template v-if="likeCount(getCard[cardId].hitCount)">
                <v-icon color="#cd7f32" id="likeIcon">thumb_up_alt</v-icon>
                <!-- 하트 숫자 표시 -->
                <span id="likeCount">...{{getCard[cardId].hitCount}}</span>
              </template>
            </div>
            <v-btn @click="replyOn()" text color="deep-purple accent-4" id="replyBtn">
              <v-icon large>reply</v-icon>
            </v-btn>
          </v-card-actions>
        </div>
        <div v-if="replyBool" pa-5 id="replyTextBox">
          <v-textarea outlined label="답변을 등록하세요." id="replyText" v-model="replyText"></v-textarea>

          <v-btn color="success" id="btnReply" @click="submitButton()">SUBMIT</v-btn>
          <v-spacer style="clear: both;"></v-spacer>
        </div>
        <div id="QnACardReply" v-for="i in replyCnt" :key="i">
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
    </v-card>
  </v-flex>
</template>

<script>
import FirebaseService from "../services/FirebaseService";
import QnAPage from "../views/QnAPage";

export default {
  name: "QnACard",
  props: {
    cardId: { type: Number },
    docId: { type: String }
  },
  data: () => ({
    // like or not check boolean var
    likeBool: false,
    replyCnt: 0,
    replyBool: false
  }),
  computed: {
    getCard() {
      var list = this.$store.state.cardList;
      return this.$store.state.cardList;
    }
  },
  mounted() {},
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
    },
    replyOn() {
      if (this.replyBool) {
        this.replyBool = false;
      } else {
        this.replyBool = true;
      }
    },
    async removeQ(id) {
      await FirebaseService.deleteQuestion(this.docId, id.questionDocId);
      await QnAPage.getQuestions;
    }
  },
  created() {
    const channelDoc = FirebaseService.firestore.collection("QnAChannels");

    channelDoc.get().then(doc => {
      doc.forEach(snapshots => {});
    });
  }
};
</script>

<style>
.cardChild {
}

#btnReply {
  float: right;
  font-family: "Lexend Deca", sans-serif;
}

#replyTextBox {
  padding: 1% 4%;
  width: 100%;
}

#QnACardReply {
  margin-left: 2%;
}

#QnACardLike {
  margin-bottom: 1%;
}

.QnACardLikeAction {
  width: 100%;
  text-align: left;
}

#likeCount {
  font-family: "Lexend Deca", sans-serif;
  margin-left: -5px;
  color: grey;
  font-size: 0.8em;
  vertical-align: bottom;
}

.writeTimeText {
  padding: 0% 0% 0% 1%;
  margin-bottom: 0px !important;
  font-family: "Lexend Deca", sans-serif;
  justify-content: center;
  font-size: 0.9em;
}

.textQnA {
  padding: 3% 0% 0% 1%;
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.5em;
  color: midnightblue;
}

.textReply {
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.3em;
  margin-bottom: 1%;
  color: cadetblue;
}

#replyBtn {
}
</style>