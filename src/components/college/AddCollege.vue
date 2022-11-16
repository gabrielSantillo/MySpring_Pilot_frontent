<template>
  <div>
    <h1>Add College</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="post_college"
      >
        Add
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  /* these are variables starting as empty strings
  there are some rules as well applied to the input tags telling that they are mandatory to be filled before
  clicking the button to send
  this form is from the vuetify framework */
  data() {
    return {
      valid: true,
      name: "",
      nameRules: [(v) => !!v || "Name is required"],
    };
  },

  /* when adding a college this function is called to make a POST request and add this college to the database
  the token is sent as well as headers since all endpoints only works with valid tokens */
  methods: {
    post_college() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/college`,
          method: `POST`,
          headers: {
            token: `${cookies.get(`token`)}`,
          },
          /* this is the data being sent to the database */
          data: {
            name: this.name,
          },
        })
        /* I'm gonna add some feedback so the user knows when the POST request was a success */
        .then((response) => {
          response;
        })
        /* Same for the failure, I'll add a feedback if something went wrong */
        .catch((error) => {
          error;
        });
    },

    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style lang="scss" scoped></style>
