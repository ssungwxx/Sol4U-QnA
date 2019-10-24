<template>
  <v-app>
    <v-layout class="banner_mobile">
      <HeaderMobile/>
    </v-layout>
    <!-- create-->
    <v-layout>
      <v-flex sm3 class="banner_background">
        <HeaderWeb />
      </v-flex>
      <v-flex sm9 class>
        <div id="pageTitle">Create Channel</div>
        <v-container grid-list-lg fluid>
            <v-layout row wrap>
            <h1 class="head" >Create New Channel</h1>
            </v-layout>
        </v-container>
        
          <v-container grid-list-lg fluid>
            <v-layout row wrap>
              <v-flex xs12 ma-5>
                  <v-card>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-col cols="12" sm="12">
                            <label>Code</label>
                            <v-text-field v-model="code"
                            :counter=10
                            :rules="codeRules"
                            solo
                            label="Code"
                            required
                            clearable
                            ></v-text-field>
                        </v-col>
                        
                        <v-col cols="12" sm="12">
                            <label>Title</label>
                            <v-text-field v-model="title"
                            :counter="20"
                            :rules="titleRules"
                            solo
                            label="title"
                            required
                            clearable
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="12">
                            <label>Description</label>
                            <v-textarea v-model="description"
                            :counter="200"
                            :rules="descriptionRules"
                            solo
                            label="discription"
                            required
                            clearable
                            ></v-textarea>
                        </v-col>


                        
                        <v-col cols="12" sm="6" >
                            <label>Using time</label>
                            <v-select v-model="end"
                              :items="items"
                              label="using time"
                              solo
                            ></v-select>
                        </v-col>

                        <v-card-actions>
                            <v-btn class="ma-2" outlined color="indigo" @click="createChannel()">Create</v-btn>
                        </v-card-actions>
                    </v-form>
                  </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import Vue from "vue";
import HeaderMobile from "../components/HeaderMobile";
import HeaderWeb from "../components/HeaderWeb";
import FirebaseService from "../services/FirebaseService";
export default {
  components: {
    HeaderMobile,
    HeaderWeb
  },
  data(){
    return{
      valid: true,
      code: "",
      title:"",
      description:"",
      end:"",
      codeRules: [
        v => !!v || "Code is required"
      ],
      titleRules:[
        v => !!v || "title is required",
        v =>
        (v && v.length >=4)|| "title is too short",
        v =>
        (v && v.length <=30)|| "title is to long"
      ],
      descriptionRules:[
         v =>
        (v && v.length >=10)|| "description is too short",
      ],
      items: ['+ 1hours', '+ 2hours', '+ 3hours', '+ 4hours'],
      
    };
  },
  methods:{
    async createChannel() {
      
      let plustime ="";
      let endtime = new Date();
      if(this.end=="+ 1hours"){
        plustime=1;
      }else if(this.end=="+ 2hours"){
        plustime=2;
      }else if(this.end=="+ +3hours"){
        plustime=3;
      }else{
        plustime=4;
      }

      endtime.setHours(endtime.getHours()+plustime);
      console.log(endtime);
      console.log(endtime.getHours());
      if (this.$refs.form.validate()) {
        await FirebaseService.createChannel(this.code, this.title,this.description, endtime);
        alert(" success!");
        this.$refs.form.reset();
       
      }
    }
  },
  watch: {
    dialog: function() {
      if (this.$refs.form !== undefined) {
        this.$refs.form.reset();
      }
    }
  }
}
</script>

<style>

#pageTitle {
  height: 9%;
  background-color: #ffffff;
  padding: 2%;
  font-size: 1.1em;
}

</style>
