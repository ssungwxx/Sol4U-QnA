<template>
    <v-app>
        <router-view />
    </v-app>
</template>

<script>
export default {
    name: "App",
    data: () => ({
        //
    })
};

var agent = navigator.userAgent.toLowerCase();
if (agent.indexOf("chrome") === -1) {
    alert("해당 홈페이지는 Chrome에 최적화 되어 있습니다.");
}
</script>

<style>
body::-webkit-scrollbar {
    display: none;
}
</style>
