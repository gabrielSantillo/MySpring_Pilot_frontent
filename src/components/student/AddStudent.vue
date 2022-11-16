<template>
  <div>
    <h1>Add Student</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="appointment_id"
        :rules="appointmentRules"
        label="Appointment ID"
        required
      ></v-text-field>

      <v-text-field
        v-model="program_id"
        :rules="programRules"
        label="Program ID"
        required
      ></v-text-field>

      <v-text-field
        v-model="english"
        :rules="englishRules"
        label="English"
        required
      ></v-text-field>

      <v-text-field
        v-model="app_form"
        :rules="appFormRules"
        label="Application through"
        required
      ></v-text-field>

      <v-text-field
        v-model="commission"
        :rules="commissionRules"
        label="Comission"
        required
      ></v-text-field>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="post_student"
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
    appointment_id: "",
    appointmentRules: [(v) => !!v || "Appointment ID is required"],
    program_id: "",
    programRules: [(v) => !!v || "Program ID is required"],
    english: "",
    englishRules: [(v) => !!v || "English is required"],
    app_form: "",
    appFormRules: [(v) => !!v || "Application form is required"],
    commission: "",
    commissionRules: [(v) => !!v || "Commission is required"],
  }),

  /* when adding a students this function is called to make a POST request and add this student to the database
  the token is sent as well as headers since all endpoints only works with valid tokens */
  methods: {
    post_student() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/student`,
          method: `POST`,
          headers: {
            token: `${cookies.get(`token`)}`,
          },
          /* this is the data being sent to the database */
          data: {
            appointment_id: this.appointment_id,
            course_id: this.program_id,
            english: this.english,
            app_form: this.app_form,
            comission: this.commission,
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
