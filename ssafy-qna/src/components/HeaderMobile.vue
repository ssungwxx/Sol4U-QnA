<template>
    <v-layout>
        <v-flex xs2/>
        <v-flex xs10>
            <div>
                <p class="banner_mobile_font">
                Sol4U__{{code}}
                </p>
            </div>
        </v-flex>
        <v-flex xs2  style="background-color:red;">
            <!-- =========================================================== -->




            <!-- =========================================================== -->
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        props: ['code']
    })
</script>

<style scoped>

.banner_mobile_font{
  font-size:26px;
}
</style>