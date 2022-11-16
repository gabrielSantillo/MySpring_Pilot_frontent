<template>
  <div>
    <h1>Edit Student</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="client_id"
        :rules="studentRules"
        label="Student ID"
        required
      ></v-text-field>

      <v-text-field
        v-model="program_id"
        :rules="programRules"
        label="Program ID"
      ></v-text-field>

      <v-text-field
        v-model="english"
        :rules="englishRules"
        label="English"
      ></v-text-field>

      <v-text-field
        v-model="app_form"
        :rules="appFormRules"
        label="Application through"
      ></v-text-field>

      <v-text-field
        v-model="commission"
        :rules="commissionRules"
        label="Comission"
      ></v-text-field>

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
  data: () => ({
    valid: true,
    student_id: "",
    studentRules: [(v) => !!v || "Student ID is required"],
    program_id: "",
    english: "",
    app_form: "",
    commission: "",
  }),

  /* when edditing a student this function is called to make a PATCH request and add this edited student to the database
    the token is sent as well as headers since all endpoints only works with valid tokens */
  methods: {
    update() {
      /* Starting a object */
      let student_info = {};

      /* All of these if statements are verifying if any of the inputs weren't empties, and in case of true, will add this key value pair to the object in order to send the object to the database with these updates */
      if (this.student_id != "") {
        student_info["student_id"] = this.student_id;
      }
      if (this.program_id != "") {
        student_info["course_id"] = this.program_id;
      }
      if (this.english != "") {
        student_info["english"] = this.english;
      }
      if (this.app_form != "") {
        student_info["app_form"] = this.app_form;
      }
      if (this.commission != "") {
        student_info["commission"] = this.commission;
      }

      /* a PATCH request to the database to update the program
          note the header being sent as well */
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/student`,
          method: `PATCH`,
          headers: {
            token: `${cookies.get(`token`)}`,
          },
          data: student_info,
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
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style lang="scss" scoped></style>
