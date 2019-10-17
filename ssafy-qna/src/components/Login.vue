<template></template>

<script>
import FirebaseService from "@/services/FirebaseService";

export default {
    data() {
        return {};
    },
    methods: {
        async loginWithGoogle() {
            const result = await FirebaseService.loginWithGoogle();
            this.$store.state.accessToken = result.credential.accessToken;
            this.$store.state.user = result.user;
        },
        async loginWithAnonymous() {
            const result = await FirebaseService.loginWithAnonymous();
            this.$store.state.accessToken = result.credential.accessToken;
            this.$store.state.user = result.user;
        }
    }
};
</script>