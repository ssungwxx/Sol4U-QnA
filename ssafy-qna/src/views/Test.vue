<template>
    <div class="my-2">
        <v-textarea name="msg" label="Default style" v-model="msg"></v-textarea>
        <v-btn small @click="createChannel">create Channel</v-btn>
        <v-btn small @click="addQuestion">add Question</v-btn>
        <v-btn small @click="getDocByChannelCode">get Doc By Channel Code</v-btn>
        <v-btn small @click="getQuestionsByDocId">get Questions By Doc Id</v-btn>
        <v-btn small @click="qustionHit">qustion Hit</v-btn>
        <v-btn small @click="getAllChannels">get All Channels</v-btn>
        <v-btn small @click="joinTheChannel">join The Channel</v-btn>
        <v-btn small @click="exitTheChannel">exit The Channel</v-btn>
        <v-btn small @click="deleteChannel">delete Channel</v-btn>
        <v-btn small @click="deleteQuestion">delete Question</v-btn>
        <v-btn small @click="changChannelDetail">chang Channel Detail</v-btn>
        <v-btn small @click="checkChannelIsLive">check Channel IsLive</v-btn>
        <v-btn small @click="checkUserIsLogin">check User IsLogin</v-btn>
    </div>
</template>

<script>
import FirebaseService from "../services/FirebaseService";

export default {
    data: () => ({
        msg: "입력하세요"
    }),
    methods: {
        async createChannel() {
            await FirebaseService.createChannel(
                "1111",
                "Test방",
                "요약",
                new Date()
            );
            console.log("방 만들자");
        },
        async addQuestion() {
            await FirebaseService.addQuestion("YBrlA3mK73iZyUHXqQb3", this.msg);
            this.msg = "";
        },
        async getDocByChannelCode() {
            let temp = await FirebaseService.getDocByChannelCode("1234");
            console.log(temp);
        },
        async getQuestionsByDocId() {
            let temp = await FirebaseService.getQuestionsByDocId(
                "YBrlA3mK73iZyUHXqQb3"
            );

            temp.forEach(element => {
                console.log(element);
            });
        },
        qustionHit() {
            FirebaseService.qustionHit(
                "YBrlA3mK73iZyUHXqQb3",
                "0cu1vt8YT89N0QMxbAOZ",
                1
            );
        },
        async getAllChannels() {
            await FirebaseService.getAllChannels();
        },
        async joinTheChannel() {
            await FirebaseService.joinTheChannel("7COxqkB4q2O6h3LP5Mw8");
        },
        async exitTheChannel() {
            await FirebaseService.exitTheChannel("7COxqkB4q2O6h3LP5Mw8");
        },
        async deleteChannel() {
            await FirebaseService.deleteChannel("Lm9AmvkazrJq84NoAkXA");
        },
        async deleteQuestion() {
            await FirebaseService.deleteQuestion(
                "YBrlA3mK73iZyUHXqQb3",
                "0cu1vt8YT89N0QMxbAOZ"
            );
        },
        async changChannelDetail() {
            await FirebaseService.changChannelDetail(
                "kmyX1pw69Ub7qAapVNWk",
                "제목 수정",
                "내용 수정"
            );
        },
        async checkChannelIsLive() {
            let flag = await FirebaseService.checkChannelIsLive("1234");
            console.log(flag);
        },
        async checkUserIsLogin() {
            let user = await FirebaseService.checkUserIsLogin();
            console.log(user);
        }
    }
};
</script>