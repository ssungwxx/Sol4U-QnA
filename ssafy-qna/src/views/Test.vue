<template>
    <div class="my-2">
        <v-textarea name="msg" label="Default style" v-model="msg"></v-textarea>
        <v-btn small @click="createChannel">createChannel</v-btn>
        <v-btn small @click="addQuestion">addQuestion</v-btn>
        <v-btn small @click="getDocByChannelCode">getDocByChannelCode</v-btn>
        <v-btn small @click="getQuestionsByDocId">getQuestionsByDocId</v-btn>
        <v-btn small @click="increaseQustionHit">increaseQustionHit</v-btn>
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
                "1234",
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
        increaseQustionHit() {
            FirebaseService.increaseQustionHit("YBrlA3mK73iZyUHXqQb3", 0);
        }
    }
};
</script>