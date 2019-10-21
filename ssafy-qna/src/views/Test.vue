<template>
    <div class="my-2">
        <v-textarea name="msg" label="Default style" v-model="msg"></v-textarea>
        <v-btn small @click="createChannel">createChannel</v-btn>
        <v-btn small @click="addQuestion">Add</v-btn>
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
            await FirebaseService.createChannel("11", "1123");
            console.log("방 만들자");
        },
        async addQuestion(msg) {
            await FirebaseService.addQuestion(msg);
            console.log(this.msg);
            this.msg = "";
        }
    }
};
</script>