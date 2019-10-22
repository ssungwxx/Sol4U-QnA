<template>
    <div class="my-2">
        <v-textarea name="msg" label="Default style" v-model="msg"></v-textarea>
        <v-btn small @click="createChannel">createChannel</v-btn>
        <v-btn small @click="addQuestion">Add</v-btn>
        <v-btn small @click="getDocByChannelCode">CheckDocNum</v-btn>
        <v-btn small @click="getQuestionsByDocId">getCommentList</v-btn>
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
                "1123",
                "Test방",
                "요약",
                new Date()
            );
            console.log("방 만들자");
        },
        async addQuestion() {
            await FirebaseService.addQuestion("hgn4gTsfTzgIHFGTI0ar", this.msg);
            this.msg = "";
        },
        async getDocByChannelCode() {
            let temp = await FirebaseService.getDocByChannelCode("1123");
            console.log(temp);
        },
        async getQuestionsByDocId() {
            let temp = await FirebaseService.getQuestionsByDocId(
                "hgn4gTsfTzgIHFGTI0ar"
            );

            temp.forEach(element => {
                console.log(element);
            });
        }
    }
};
</script>