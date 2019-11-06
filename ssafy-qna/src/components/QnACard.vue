<template>
    <v-flex xs12 round>
        <v-card class="cardChild">
            <v-card-text>
                <div v-if="!checkBlind">
                    <p class="textQnA">{{card.question}}</p>
                </div>
                <div v-else class="blindText">
                    <p class="textQnA">관리자에 의해 블라인드 처리된 글 입니다.</p>
                    <v-btn small text color="error" @click="viewTextBlind()">원문 보기</v-btn>
                    <p class="blindTextP" v-if="blindTextBool">{{card.question}}</p>
                </div>

                <div id="QnACardLike">
                    <!-- 하트 같은 아이콘으로 좋아요 개수 표시 -->
                    <v-card-actions>
                        <div class="QnACardLikeAction">
                            <v-btn
                                v-if="!likeBool"
                                @click="likeCheck()"
                                text
                                icon
                                color="#00000033"
                            >
                                <v-icon>thumb_up_alt</v-icon>
                            </v-btn>
                            <v-btn v-else @click="likeCheck()" text icon color="rgb(51, 150, 244)">
                                <v-icon>thumb_up_alt</v-icon>
                            </v-btn>
                            <!-- 하트 개수 표시 영역 -->
                            <template v-if="likeCount(card.likeCount)">
                                <v-icon color="rgb(51, 150, 244)" id="likeIcon">thumb_up_alt</v-icon>
                                <!-- 하트 숫자 표시 -->
                                <span id="likeCount">...{{card.likeCount}}</span>
                            </template>
                        </div>

                        <!-- 시러요 -->
                        <div class="QnACardDisLikeAction" v-if="!checkUserWhoami">
                            <!-- 하트 개수 표시 영역 -->
                            <template v-if="disLikeCount(card.disLikeCount)">
                                <v-icon color="rgb(36, 40, 43)" id="disLikeIcon">thumb_down_alt</v-icon>
                                <!-- 하트 숫자 표시 -->
                                <span id="disLikeCount">...{{card.disLikeCount}}</span>
                            </template>
                            <v-btn
                                v-if="!disLikeBool"
                                @click="disLikeCheck()"
                                text
                                icon
                                color="#00000033"
                            >
                                <v-icon>thumb_down_alt</v-icon>
                            </v-btn>
                            <v-btn v-else @click="disLikeCheck()" text icon color="rgb(36, 40, 43)">
                                <v-icon>thumb_down_alt</v-icon>
                            </v-btn>
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
                    <div id="optionBtn" v-if="!checkBlind">
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

                    <v-btn
                        dark
                        color="rgb(51, 150, 244)"
                        id="btnReply"
                        @click="submitButton()"
                    >SUBMIT</v-btn>
                    <v-spacer style="clear: both;"></v-spacer>
                </div>
                <template v-for="i in card.replies">
                    <div v-if="!checkBlind" class="QnACardReply" :key="i.reply_doc_id">
                        <!-- 답변에 대한 공간 -->
                        <div class="textReply">{{i.comment}}</div>
                        <p class="writeTimeText">
                            <v-icon small>access_time</v-icon>
                            {{i.created_at.string}}
                            <v-btn
                                @click="deleteReply(i)"
                                class="deleteBtn"
                                v-if="isReplyer(i.replyer.user_id)"
                                x-small
                                icon
                                color="red"
                            >
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
        disLikeBool: false,
        replyBool: false,
        removeBool: false,
        replyText: "",
        replyList: [],
        listenerReply: null,
        blindTextBool: false
    }),
    computed: {
        checkBlind() {
            var like = this.card.likeCount;
            var disLike = this.card.disLikeCount;
            if (like < disLike) {
                // blind 처리
                return true;
            } else return false;
        },
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
        },
        checkUserInDisLike() {
            var flag = FirebaseService.checkUserInDisLikeList(
                this.docId,
                this.card.questionDocId
            );
            var bool = this;
            flag.then(function(item) {
                bool.disLikeBool = item;
            });
            return this.disLikeBool;
        }
    },
    mounted() {
        this.checkUserInLike;
        this.checkUserInDisLike;
    },
    methods: {
        deleteReply(data) {
            FirebaseService.deleteQuestionReply(
                this.docId,
                data.questionDocId,
                data.reply_doc_id
            );
        },
        viewTextBlind() {
            if (this.blindTextBool) {
                this.blindTextBool = false;
            } else this.blindTextBool = true;
        },
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
                FirebaseService.questionLike(
                    this.docId,
                    this.card.questionDocId,
                    -1
                );
            } else {
                this.likeBool = true;
                FirebaseService.questionLike(
                    this.docId,
                    this.card.questionDocId,
                    1
                );
                if (this.disLikeBool) {
                    this.disLikeCheck();
                }
            }
        },
        likeCount(num) {
            if (num > 0) {
                return true;
            } else return false;
        },
        disLikeCheck() {
            if (this.checkUserInDisLike) {
                this.disLikeBool = false;
                FirebaseService.questionDisLike(
                    this.docId,
                    this.card.questionDocId,
                    -1
                );
            } else {
                this.disLikeBool = true;
                FirebaseService.questionDisLike(
                    this.docId,
                    this.card.questionDocId,
                    1
                );
                if (this.likeBool) {
                    this.likeCheck();
                }
            }
        },
        disLikeCount(num) {
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
                    questionDocId: vueInstance.card.questionDocId,
                    reply_doc_id: change.doc.id
                };

                if (change.type === "added") {
                    vueInstance.$store.dispatch("getRepliesMutation", data);
                }
                if (change.type === "modified") {
                }
                if (change.type === "removed") {
                    vueInstance.$store.dispatch("removeReplyMutation", data);
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
.blindText p {
    color: white;
    font-style: italic;
}

.blindText {
    padding: 1vw;
    background-color: rgb(36, 40, 43);
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

.blindTextP {
    padding: 1vw;
    font-size: 0.7em;
    color: beige;
}

.QnACardLikeAction {
    width: 100%;
    text-align: left;
}

.QnACardDisLikeAction {
    width: 100%;
    text-align: right;
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