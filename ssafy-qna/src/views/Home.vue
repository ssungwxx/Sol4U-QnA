<template>
  <div id="containerHome">

     <ImageBanner imgSrc="https://picsum.photos/1600/900" id="imgBanner">
      <div style="line-height:1.2em; color: white;" slot="text"
      class="font-weight-bold fontBanner">Sol4U
      <br> SSAFY QnA Service</div>
    </ImageBanner>

    <div id="contentField">
      <v-row id="rowField">
        <v-col sm="3" cols="12">
          <v-text-field
            label="Code Number"
            id="inputCode"
          ></v-text-field>


        </v-col>
      </v-row>
    </div>

  </div>
</template>

<script>
import ImageBanner from '../components/ImageBanner';


export default {
  components: {
    ImageBanner,    
  },
};
</script>

<style>
  
  #rowField {
    margin-left: 8%;
    margin-top: 30%;
  }

  #imgBanner {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 1;
  }

  #contentField {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 5;
  }

  #containerHome {
    position: fixed;
    height: 100vh;
    width: 100vw;   
  }

  .fontBanner{
    margin: -20% 0 0 10%;
    font-size: 1.0em
  }

</style>

