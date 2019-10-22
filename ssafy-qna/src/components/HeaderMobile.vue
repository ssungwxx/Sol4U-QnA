<template>
    <v-layout>
        <v-flex>
            <!-- =========================================================== -->
            <v-card
                class="mx-auto overflow-hidden"
                :height = size
                width="100%"
            >

                <v-app-bar class="bar_design">
                    <v-app-bar-nav-icon @click.stop="drawer = !drawer" style="margin-right:20px;" color="white"></v-app-bar-nav-icon>
                    SSAFY__{{code}}
                </v-app-bar>

                <v-navigation-drawer
                v-model="drawer" 
                absolute
                right
                temporary
                width = "150"
                style="padding-top:150px;"
                >
                <v-list nav dense>
                    <router-link to="/" class="RouterLink">
                        <p class="RouterLink_p">DashBoard</p>
                    </router-link>
                </v-list>
                </v-navigation-drawer>

            </v-card>
            <!-- =========================================================== -->
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        props: ['code'],
        data: () => ({
            drawer: false,
            group: null,
            size: window.outerHeight
        }),

        watch: {
            group () {
                this.drawer = false
            },
        }
    })
</script>

<style scoped>

.banner_mobile_font{
  font-size:26px;
}
.RouterLink_p{
    font-size:20px;
}
.bar_design{
    background-image: url('../assets/lol.png');
    color: white;
    
}
</style>