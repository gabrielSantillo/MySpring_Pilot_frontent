<template>
  <div>
    <h1>Edit Program</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="program_id"
        :rules="programRules"
        label="Program ID"
        required
      ></v-text-field>

      <v-text-field v-model="college_id" label="College ID"></v-text-field>

      <v-text-field v-model="program_name" label="Program name"></v-text-field>

      <v-text-field v-model="program_url" label="Program URL"></v-text-field>

      <v-text-field v-model="tuition" label="Tuition"></v-text-field>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="update">
        Update
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
      program_id: "",
      programRules: [(v) => !!v || "Program ID is required"],
      college_id: "",
      program_name: "",
      program_url: "",
      tuition: "",
    };
  },

  /* when edditing a program this function is called to make a PATCH request and add this edited college to the database
    the token is sent as well as headers since all endpoints only works with valid tokens */
  methods: {
    update() {
      /* Starting a object */
      let program_info = {};

      /* All of these if statements are verifying if any of the inputs weren't empties, and in case of true, will add this key value pair to the object in order to send the object to the database with these updates */
      if (this.program_id != "") {
        program_info["course_id"] = this.program_id;
      }

      if (this.college_id != "") {
        program_info["college_id"] = this.college_id;
      }

      if (this.program_name != "") {
        program_info["course_name"] = this.program_name;
      }

      if (this.program_url != "") {
        program_info["course_url"] = this.program_url;
      }

      program_info["intake"] = "fall 2023";

      if (this.tuition != "") {
        program_info["tuition"] = this.tuition;
      }

      /* a PATCH request to the database to update the program
          note the header being sent as well */
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/courses`,
          method: `PATCH`,
          headers: {
            token: `${cookies.get(`token`)}`,
          },
          /* sending the data to be updated in the database */
          data: program_info,
        })
        /* in case of success the response is to send an alert to the user */
        .then((response) => {
          response;
          alert("updated");
        })
        /* in case of failure the response is to send an alert to the user */
        .catch((error) => {
          alert("not updated");
          error;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
