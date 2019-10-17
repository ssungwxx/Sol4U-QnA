<template>
  <v-app>
    <div class="backgroundImage">
      <div class="link_space">
        <div class="input_link">
          <v-text-field v-model="code" label="Code"></v-text-field>
          <SignUp></SignUp>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import SignUp from "../components/SignUp";
export default {
  components: {
    SignUp
  },
  data: () => ({
    code: ""
  })
};
</script>

<style>
.backgroundImage {
  border: 0;
  padding: 0;
  background-image: url("../assets/kong.jpg");
  min-height: 100%;
  background-position: center;
  background-size: cover;
  opacity: 0.85;
}

.link_space {
  margin-top: 250px;
  height: 80px;
  text-align: center;
}

.input_link {
  text-align: center;
  width: 400px;
  height: 80px;
  background-color: white;
  border-radius: 10px;
  opacity: 0.6;
  display: inline-block;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 10px;
}
</style>
