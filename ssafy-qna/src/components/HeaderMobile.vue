<template>
    <v-layout>
        <v-flex>
            <!-- =========================================================== -->
            <v-card
                class="mx-auto overflow-hidden"
                :height = 'he'
                width="100%"
                id="drawers"
                color="rgba(0,0,0,0)"
                @click="menuclick"
            >

                <v-app-bar class="bar_design">
                    <v-app-bar-nav-icon @click.stop="drawer = !drawer" style="margin-right:20px;" color="white"></v-app-bar-nav-icon>
                    SSAFY
                </v-app-bar>

                <v-navigation-drawer
                v-model="drawer" 
                absolute
                right
                temporary
                width = "75%"
                style="padding-top:20px; background-color:#f2f2f2;"
                >
                <v-list nav dense>
                    <div style="display:inline-block; margin-bottom:70px;">
                        <v-img src = "../assets/Icon.png" style="height:40px; width:40px;" />
                    </div>
                    <span class="code_banner">SSAFY</span>
                    <v-layout>
                        <router-link to="/dashboard" class="RouterLink">
                            <p class="RouterLink_p">DashBoard</p>
                        </router-link>
                    </v-layout>
                    <v-layout>
                        <a href="https://lab.ssafy.com/s1-final/s1p1351008" class="GithubAddress">
                            <div class="RouterLink_p">Gitlab</div>
                        </a>
                    </v-layout>
                    <v-layout class="banner_search">
                        <v-flex sm10>
                            <v-text-field
                            label="Code"
                            height="20px"
                            solo
                            v-model="routercode2"
                            ></v-text-field>
                        </v-flex>
                        </v-layout>
                        <v-layout class="banner_search_icon">
                        <v-flex>
                            <router-link :to="'/qna/'+routercode2" style="text-decoration: None;">
                            <!-- 여기에 vuex에 Guest아이디로 넘겨주는 기능 추가하면됨 -->
                            <v-btn
                                class="ma-2"
                                style="width:100%;"
                                outlined
                                color="black"
                            >
                                <v-icon color="black">fa-search</v-icon>
                            </v-btn>
                            </router-link>
                        </v-flex>
                    </v-layout>
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
        props: ['maxheight'],
        data: () => ({
            drawer: false,
            group: null,
            routercode2: "",
            he: 0
        }),

        watch: {
            group () {
                this.drawer = false
            },
        },
        mounted() {
            this.he = window.outerHeight;
      }
    })
</script>

<style scoped>
#drawers {
}

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
.code_banner{
    font-size:30px;
  font-family: 'Do Hyeon', sans-serif;
}
.RouterLink {
  width: 100%;
  color: black;
  text-decoration: None;
  text-align: left;
  font-family: "Lexend Deca", sans-serif;
}
.RouterLink_p {
  color: black;
  font-family: 'Do Hyeon', sans-serif;
  font-size: 25px;
}
.GithubAddress{
  width: 100%;
  color: black;
  text-decoration: None;
  text-align: left;
  font-family: "Lexend Deca", sans-serif;
}
.banner_search{
  text-align: center;
  margin-top: 60px;
}
.banner_search_icon{
    margin-left:-10px;
    margin-right:10px;
}
</style>