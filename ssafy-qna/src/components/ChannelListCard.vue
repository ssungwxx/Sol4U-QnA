<template>
    <v-flex xs12 ma-2>
        <v-card :color='setColor'>

            <v-card-title class="codetitle">code번호 : {{CodeNumber}}</v-card-title>
            <v-card-text>
                <div class="channeinfo">
                    <p class="channeltitle">
                        <v-icon></v-icon>&nbsp;채널이름 : {{CodeName}}
                    </p>
                
                    <p class="channelduetime">
                        <v-icon></v-icon>&nbsp;채널 기간 : {{StartDay}} ~ {{EndDay}}
                    </p>
                </div>
            </v-card-text>

        </v-card>
    </v-flex>
</template>

<script>
import Vue from "vue";
import FirebaseService from "../services/FirebaseService";

export default {
    props : [
        'CodeNumber', 
        'CodeName',
        'StartDay',
        'EndDay',
        'setColor'
    ]
}
</script>

<style>

</style>