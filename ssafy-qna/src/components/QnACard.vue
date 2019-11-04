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
              <v-btn v-if="!likeBool" @click="likeCheck()" text icon color="#00000033">
                <v-icon>thumb_up_alt</v-icon>
              </v-btn>
              <v-btn v-else @click="likeCheck()" text icon color="#ff0000">
                <v-icon>thumb_up_alt</v-icon>
              </v-btn>
              <!-- 하트 개수 표시 영역 -->
              <template v-if="likeCount(card.likeCount)">
                <v-icon color="#ffd700" id="likeIcon">thumb_up_alt</v-icon>
                <!-- 하트 숫자 표시 -->
                <span id="likeCount">...{{card.likeCount}}</span>
              </template>
            </div>
            <v-btn
              class="deleteBtn"
              v-if="checkUserWhoami"
              small
              id="remove"
              @click="removeQ(card)"
            >
              질문 삭제하기
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
        <template v-for="i in card.replies">
          <div class="QnACardReply" :key="i.created_at.string">
            <!-- 답변에 대한 공간 -->
            <div class="textReply">{{i.comment}}</div>
            <p class="writeTimeText">
              <v-icon small>access_time</v-icon>
              {{i.created_at.string}}
              <v-btn class="deleteBtn" v-if="isReplyer(i.replyer.user_id)" x-small icon color="red">
                <v-icon>delete_outline</v-icon>
              </v-btn>
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
    replyList: [],
    listenerReply: null
  }),
  computed: {
    checkUserWhoami() {
      let user = FirebaseService.firebase.auth().currentUser.uid;
      let id = this.card.questioner.user_id;
      if (user === id) {
        return true;
      } else return false;
    },
    checkUserInLike() {
      var flag = FirebaseService.checkUserInLikeList(
        this.docId,
        this.card.questionDocId
      );
      var bool = this;
      flag.then(function(item) {
        bool.likeBool = item;
      });
      return this.likeBool;
    }
  },
  mounted() {
    this.checkUserInLike;
  },
  methods: {
    isReplyer(id) {
      // 삭제 버튼 활성화? 비활성화?
      let user = FirebaseService.firebase.auth().currentUser.uid;
      if (user === id) {
        return true;
      } else return false;
    },
    likeCheck() {
      if (this.checkUserInLike) {
        this.likeBool = false;
        FirebaseService.questionLike(this.docId, this.card.questionDocId, -1);
      } else {
        this.likeBool = true;
        FirebaseService.questionLike(this.docId, this.card.questionDocId, 1);
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
      this.replyBool = false;
    }
  },
  created() {
    const vueInstance = this;
    this.getLikeList;
    const questionDoc = FirebaseService.firestore
      .collection("QnAChannels")
      .doc(vueInstance.docId)
      .collection("Questions")
      .doc(vueInstance.card.questionDocId)
      .collection("Replies");

    vueInstance.listenerReply = questionDoc.onSnapshot(snapshots => {
      snapshots.docChanges().forEach(change => {
        const data = {
          comment: change.doc.data().comment,
          created_at: change.doc.data().created_at,
          replyer: change.doc.data().replyer,
          questionDocId: vueInstance.card.questionDocId
        };

        if (change.type === "added") {
          console.log("Card 실시간으로 추가했닷");
          vueInstance.$store.dispatch("getRepliesMutation", data);
        }
        if (change.type === "modified") {
          //   console.log(data);
          console.log("Card 실시간으로 수정했닷");
        }
        if (change.type === "removed") {
          console.log(data);
          console.log("Card 실시간으로 제거했닷");
        }
      });
    });
  },
  destroyed() {
    this.listenerReply();
  }
};
</script>

<style>
.cardChild {
}

.deleteBtn {
  right: 0px;
  margin-left: 1vw;
  color: red;
  font-family: "Lexend Deca", sans-serif;
}

#remove {
  color: red;
  font-family: "Lexend Deca", sans-serif;
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
  margin: 1vw;
  background-color: aliceblue;
  padding: 1vw;
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
  color: brown;
}

.textQnA {
  padding: 3% 0% 0% 1%;
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.1em;
  color: navy;
}

.textReply {
  font-family: "Lexend Deca", sans-serif;
  font-size: 1em;
  margin-bottom: 0.1vh;
  color: mediumslateblue;
}

#replyBtn {
  font-family: "Lexend Deca", sans-serif;
  color: rgb(51, 150, 244);
}

#timeText {
  float: left;
  color: brown;
  margin-bottom: 0px !important;
  bottom: 0px;
}

#optionBtn {
  float: right;
}
</style>