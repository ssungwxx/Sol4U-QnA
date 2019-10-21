<template>
    <v-container grid-list-md text-center>
        <v-layout justify-center wrap>
            
                <v-card>
                    <v-card-title>code</v-card-title>         
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field v-model="code"
                        :counter="4"
                        :rules="codeRules"
                        label="Code"
                        required
                        ></v-text-field>

                        <v-text-field v-model="title"
                        :counter="10"
                        :rules="titleRules"
                        label="title"
                        required
                        ></v-text-field>

                        <v-text-field v-model="start"
                        :counter="4"
                        :rules="codeRules"
                        label="Code"
                        required
                        ></v-text-field>

                        <v-text-field v-model="end"
                        :counter="4"
                        :rules="codeRules"
                        label="Code"
                        required
                        ></v-text-field>
                    <v-card-actions>
                        <v-btn color="white" text @click="submit">submit</v-btn>
                    </v-card-actions>
                    </v-form>

                </v-card>
            
        </v-layout>
    </v-container>
</template>


<script>
export default {
    data(){
        return {
        valid: true,
        dialog: false,
        
        };
    },
    methods: {
        
    }
}
</script>