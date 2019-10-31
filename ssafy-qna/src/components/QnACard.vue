<template>
  <v-flex xs12 round>
    <v-card class="cardChild">
      <v-card-text>
        <div>
          <p class="textQnA">{{card.question}}</p>
        </div>

        <div id="QnACardLike">
          <!-- 하트 같은 아이콘으로 좋아요 개수 표시 -->
          <v-card-actions>
            <div class="QnACardLikeAction">
              <v-btn v-if="!likeBool" @click="likeCheck(card.hitCount)" text icon color="#00000033">
                <v-icon>thumb_up_alt</v-icon>
              </v-btn>
              <v-btn v-else @click="likeCheck(card.hitCount)" text icon color="#ff0000">
                <v-icon>thumb_up_alt</v-icon>
              </v-btn>
              <!-- 하트 개수 표시 영역 -->
              <template v-if="likeCount(card.hitCount)">
                <v-icon color="#cd7f32" id="likeIcon">thumb_up_alt</v-icon>
                <!-- 하트 숫자 표시 -->
                <span id="likeCount">...{{card.hitCount}}</span>
              </template>
            </div>
            <v-btn icon small id="remove" @click="removeQ(card)">
              <v-icon small color="red">delete_forever</v-icon>
            </v-btn>
          </v-card-actions>
        </div>

        <div class="writeTimeText">
          <p id="timeText">
            <v-icon small>access_time</v-icon>
            &nbsp;
            {{card.created_at.string}}
          </p>
          <div id="optionBtn">
            <v-btn @click="replyOn()" text color="rgb(51, 150, 244)" id="replyBtn">
              답글 달기
              <v-icon large>reply</v-icon>
            </v-btn>
          </div>
          <v-spacer style="clear:both;"></v-spacer>
        </div>

        <div v-if="replyBool" pa-5 id="replyTextBox">
          <v-textarea
            @keyup.enter="submitButton()"
            outlined
            label="답변을 등록하세요."
            id="replyText"
            v-model="replyText"
          ></v-textarea>

          <v-btn dark color="rgb(51, 150, 244)" id="btnReply" @click="submitButton()">SUBMIT</v-btn>
          <v-spacer style="clear: both;"></v-spacer>
        </div>
        <template v-for="i in 0">
          <div class="QnACardReply" :key="i.created_at.string">
            <!-- 답변에 대한 공간 -->
            <div class="textReply">{{i.comment}}</div>
            <p class="writeTimeText">
              <v-icon small>access_time</v-icon>
              {{i.created_at.string}}
            </p>
          </div>
        </template>
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
    card: {},
    docId: { type: String }
  },
  data: () => ({
    // like or not check boolean var
    likeBool: false,
    replyBool: false,
    removeBool: false,
    replyText: "",
    replyList: {}
  }),
  computed: {
    getRepliesList() {
      // console.log(
      //   FirebaseService.getRepliesFromQuestion(
      //     this.docId,
      //     this.card.questionDocId
      //   )
      // );
      console.log("reply : " + this.$store.state.replyList);
    }
  },
  mounted() {},
  methods: {
    likeCheck(num) {
      if (this.likeBool) {
        this.likeBool = false;
        // console.log(this.getCard[this.cardId].questionDocId);
        FirebaseService.questionHit(this.docId, this.card.questionDocId, -1);
        // this.likeCnt = this.likeCnt == 0 ? 0 : this.likeCnt - 1;
      } else {
        this.likeBool = true;
        FirebaseService.questionHit(this.docId, this.card.questionDocId, 1);
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
    },
    submitButton() {
      var text = this.replyText;
      this.replyText = "";
      FirebaseService.addQuestionReply(
        this.docId,
        this.card.questionDocId,
        text
      );
    }
  },
  created() {
    const vueInstance = this;

    const questionDoc = FirebaseService.firestore
      .collection("QnAChannels")
      .doc(vueInstance.docId)
      .collection("Questions")
      .doc(vueInstance.card.questionDocId)
      .collection("Replies");

    questionDoc.onSnapshot(snapshots => {
      snapshots.docChanges().forEach(change => {
        const data = {
          comment: change.doc.data().comment,
          created_at: change.doc.data().created_at,
          replyer: change.doc.data().replyer
        };

        if (change.type === "added") {
          console.log("실시간으로 추가했닷");
          vueInstance.getRepliesList;
        }
        if (change.type === "modified") {
          console.log("실시간으로 수정했닷");
        }
        if (change.type === "removed") {
          console.log("실시간으로 제거했닷");
        }
      });
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

.QnACardReply {
  margin-left: 2%;
}

#QnACardLike {
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
  margin-bottom: 0px !important;
  bottom: 0px;
  font-family: "Lexend Deca", sans-serif;
  font-size: 0.7em;
}

.textQnA {
  padding: 3% 0% 0% 1%;
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.1em;
  color: midnightblue;
}

.textReply {
  font-family: "Lexend Deca", sans-serif;
  font-size: 0.9em;
  margin-bottom: 1%;
  color: cadetblue;
}

#replyBtn {
  font-family: "Lexend Deca", sans-serif;
  color: rgb(51, 150, 244);
}

#timeText {
  float: left;
  margin-bottom: 0px !important;
  bottom: 0px;
}

#optionBtn {
  float: right;
}
</style>