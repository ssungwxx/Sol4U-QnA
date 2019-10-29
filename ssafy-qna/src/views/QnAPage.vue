<template>
    <v-app>
        <!-- title -->
        <div id="pageTitle">DashBoard.Channel "{{code}}"</div>
        <!-- page on qna page -->
        <div id="pageBody">
            <!-- header on qna page -->
            <!-- add qna point -->
            <div id="pageHeader">
                <p id="channelNumber">@{{code}}</p>
                <p id="channelTitle">{{qnaTitle}}</p>
                <p id="channelDes">{{qnaDes}}</p>
                <p id="channelClose">[{{closeAt}}에 종료 됩니다.]</p>

                <div v-if="checkChannelIsLive()" style="width:100%;">
                    <v-textarea
                        outlined
                        name="input-7-4"
                        label="질문을 입력하세요."
                        id="qnaText"
                        v-model="qnaText"
                        @keyup.enter="submitButton()"
                    ></v-textarea>
                </div>

                <v-btn-toggle borderless>
                    <v-btn @click="sort('created')">
                        <span class="hidden-sm-and-down">Created</span>
                        <v-icon right>access_time</v-icon>
                    </v-btn>
                    <v-btn @click="sort('favorite')">
                        <span class="hidden-sm-and-down">Favorite</span>
                        <v-icon right>thumb_up_alt</v-icon>
                    </v-btn>
                </v-btn-toggle>
                <v-btn color="success" id="btnQuestion" @click="submitButton()">SUBMIT</v-btn>
                <v-spacer style="clear: both;"></v-spacer>
            </div>

            <v-container grid-list-lg fluid>
                <v-layout v-if="haveList" row wrap id="cardMother">
                    <!-- 답글 예시 -->
                    <template v-for="i in getCardList">
                        <QnACard :card="i" :docId="channelDocId" :key="i.questionDocId"></QnACard>
                    </template>
                </v-layout>
            </v-container>
        </div>
    </v-app>
</template>

<script>
import Vue from "vue";
import QnACard from "../components/QnACard";
import FirebaseService from "../services/FirebaseService";
import { log } from "util";

export default Vue.extend({
    computed: {
        code: function() {
            return this.$route.params.code;
        },
        getCardList() {
            var temp = this.$store.state.cardList;
            return temp;
        }
    },
    components: {
        QnACard
    },
    data: () => ({
        qnaTitle: "--",
        qnaDes: "---",
        qnaText: "",
        cardNum: 0,
        channelDocId: "",
        haveList: false,
        icon: "created",
        closeAt: "---"
    }),
    methods: {
        submitButton() {
            this.cardNum += 1;
            var temp = this.qnaText;
            this.qnaText = "";
            FirebaseService.addQuestion(this.channelDocId, temp);
            this.getQuestions();
        },
        getDocId() {
            var temp = FirebaseService.getDocByChannelCode(this.code);
            return temp;
        },
        async getQuestions() {
            var temp = FirebaseService.getQuestionsByDocId(this.channelDocId);
            this.cardNum = temp.length;
            this.haveList = true;
            var tt = this;
            temp.then(function(now) {
                tt.$store.dispatch("getCardMutation", now);
            });
            return temp;
        },
        setChannel(now) {
            this.channelDocId = now;
            console.log(now);
            const channel = FirebaseService.getChannelDetail(now);
            channel.then(data => {
                this.qnaTitle = data.channel_name;
                this.qnaDes = data.channel_description;
                this.closeAt = data.closed_at.string;
            });
        },
        async checkChannelIsLive() {
            if (this.channelDocId != "")
                return await FirebaseService.checkChannelIsLive(
                    this.channelDocId
                );
            else return true;
        },
        sort() {
            console.log(this.icon);
        }
    },
    mounted() {
        var temp = this.getDocId();
        var vueQna = this;
        temp.then(function(now) {
            vueQna.setChannel(now);
            vueQna.getQuestions();
        });
    },
    created() {
        const channelDoc = FirebaseService.firestore
            .collection("QnAChannels")
            .doc("YBrlA3mK73iZyUHXqQb3")
            .collection("Questions");

        channelDoc.onSnapshot(snapshots => {
            snapshots.docChanges().forEach(change => {
                const data = {
                    questioner: change.doc.data().questioner,
                    question: change.doc.data().question,
                    created_at: change.doc.data().created_at,
                    hitCount: change.doc.data().hitCount,
                    hitList: change.doc.data().hitCount
                };

                if (change.type === "added") {
                    console.log("New post: ", change.doc.data());
                }
                if (change.type === "modified") {
                    console.log("Modified post: ", change.doc.data());
                    console.log(this);
                }
                if (change.type === "removed") {
                    console.log("Removed post: ", change.doc.data());
                }
            });
        });

        channelDoc.get().then(doc => {
            doc.forEach(snapshots => {});
        });
    }
});
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Lexend+Deca|Saira+Extra+Condensed&display=swap");
@import url("https://fonts.googleapis.com/css?family=Do+Hyeon&display=swap");
@import url("https://fonts.googleapis.com/css?family=Raleway:700&display=swap");

#btnQuestion {
    float: right;
    font-family: "Lexend Deca", sans-serif;
}

#pageTitle {
    height: 60px !important;
    background-color: rgb(51, 150, 244);
    color: white;
    font-family: "Lexend Deca", sans-serif;
    padding: 2%;
    font-size: 1.2em;
}

#pageHeader {
    padding: 12px;
}

#pageBody {
    padding: 3% 5%;
    background-color: white;
}

#channelNumber {
    font-size: 2em;
    font-family: "Lexend Deca", sans-serif;
    color: black;
    height: 5%;
}

#channelTitle {
    font-size: 1.5em;
    color: navy;
    margin-top: -1%;
    font-family: "Lexend Deca", sans-serif;
}

#channelDes {
    font-size: 1em;
    font-family: "Lexend Deca", sans-serif;
    color: mediumslateblue;
    height: 2%;
    margin-top: -1%;
    margin-bottom: 3%;
}

#channelClose {
    font-size: 0.7em;
    color: brown;
    font-family: "Lexend Deca", sans-serif;
}
</style>
