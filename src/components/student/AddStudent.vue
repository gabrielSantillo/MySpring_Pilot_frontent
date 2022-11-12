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
import cookies from "vue-cookies"
export default {
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

  methods: {
    post_student() {
      axios
        .request({
          url: `http://127.0.0.1:5000/api/student`,
          method: `POST`,
          headers: {
            token: `${cookies.get(`token`)}`
          },
          data: {
            appointment_id: this.appointment_id,
            course_id: this.program_id,
            english: this.english,
            app_form: this.app_form,
            comission: this.commission,
          },
        })
        .then((response) => {
          response;
        })
        .catch((error) => {
          error;
        });
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style lang="scss" scoped></style>
