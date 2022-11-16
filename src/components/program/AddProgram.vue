<template>
  <div>
    <h1>Add Program</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="college_id"
        :rules="collegetRules"
        label="College ID"
        required
      ></v-text-field>

      <v-text-field
        v-model="program_name"
        :rules="programRules"
        label="Program name"
        required
      ></v-text-field>

      <v-text-field
        v-model="program_url"
        :rules="programUrlRules"
        label="Program URL"
        required
      ></v-text-field>

      <v-text-field
        v-model="tuition"
        :rules="tuitionRules"
        label="Tuition"
        required
      ></v-text-field>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="post_program"
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
  data: () => ({
    valid: true,
    college_id: "",
    collegeRules: [(v) => !!v || "College ID is required"],
    program_name: "",
    programRules: [(v) => !!v || "Program name is required"],
    program_url: "",
    programUrlRules: [(v) => !!v || "Program URL is required"],
    tuition: "",
    tuitionRules: [(v) => !!v || "Tuition form is required"],
  }),

  /* when adding a programs this function is called to make a POST request and add this program to the database
  the token is sent as well as headers since all endpoints only works with valid tokens */
  methods: {
    post_program() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/courses`,
          method: `POST`,
          headers: {
            token: `${cookies.get(`token`)}`,
          },
          /* this is the data being sent to the database */
          data: {
            college_id: this.college_id,
            course_name: this.program_name,
            course_url: this.program_url,
            intake: "fall 2023", /* this is being sent as a hard code because I realized that this information doesn't belong to a college, but a student. So I still need to change my tables and some procedures. */
            tuition: this.tuition,
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
  },
};
</script>

<style lang="scss" scoped></style>
