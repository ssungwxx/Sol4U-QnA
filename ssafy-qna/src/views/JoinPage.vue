<template>
    <v-app>
  <div class = "backgroundImage">
    <div class = "link_space">
      <div class = "input_link">
        
      </div>
    </div>
  </div>
  </v-app>
</template>

<script>
export default ({
  data: () => ({
    code: ''
  })
})
</script>

<style>
  .backgroundImage{
    border:0;
    padding:0;
    background-image:url("../assets/kong.jpg");
    min-height:100%;
    background-position: center;
    background-size: cover;
    opacity: 0.85;
  }

  .link_space{
    margin-top:250px;
    height: 80px;
    text-align:center;
  }

  .input_link{
    width:400px;
    height:80px;
    background-color:white;
    border-radius: 10px;
    opacity:0.6;
    display: inline-block;
  }
</style>
