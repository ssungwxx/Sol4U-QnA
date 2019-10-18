<template>
  <v-row>
    <v-btn color="primary" dark @click.stop="dialog = true">Sign Up</v-btn>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>
          <span class="headline">Sign Up</span>
        </v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-text>
            <v-container>
              <v-text-field
                v-model="id"
                :counter="15"
                :rules="idRules"
                label="ID*"
                hint="Password must be at least 8 characters"
                required
              ></v-text-field>
              <v-text-field
                v-model="pw"
                :append-icon="show ? 'visibility' : 'visibility_off'"
                :type="show ? 'text':'password'"
                :counter="15"
                :rules="pwRules"
                label="Password*"
                hint="Password must be at least 8 characters"
                @click:append="show = !show"
                required
              ></v-text-field>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="close">Close</v-btn>
            <v-btn color="green darken-1" text @click="reset">Reset</v-btn>
            <v-btn color="green darken-1" text @click="submit">Submit</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      valid: true,
      dialog: false,
      id: '',
      idRules: [
        v => !!v || 'ID is required',
        v =>
          (v && v.length <= 15 && v.length >= 6) ||
          'ID must be at least 6 and less than 15 characters'
      ],
      pw: '',
      pwRules: [
        v => !!v || 'Password is required',
        v =>
          (v && v.length <= 15 && v.length >= 8) ||
          'Password must be at least 8 and less than 15 characters'
      ]
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        alert('Sign up success!')
        this.reset()
        this.dialog = false
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    close () {
      this.dialog = false
      this.reset()
    }
  },
  watch: {
    dialog: function () {
      if (this.$refs.form !== undefined) {
        this.reset()
      }
    }
  }
}
</script>
