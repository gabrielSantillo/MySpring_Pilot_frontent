<template>
  <div>
    <h1>Edit Student</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="student_id"
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
  data: () => ({
    valid: true,
    student_id: "",
    studentRules: [(v) => !!v || "Student ID is required"],
    program_id: "",
    english: "",
    app_form: "",
    commission: "",
    student_info: "",
  }),

  methods: {
    update() {
      axios
        .request({
          url: `http://127.0.0.1:5000/api/student-by-id`,
          headers: {
            token: `${cookies.get(`token`)}`,
          },
          params: {
            student_id: this.student_id,
          },
        })
        .then((response) => {
          this.$student_info = response["data"];
        })
        .catch((error) => {
          error;
        });

      if (this.program_id == "") {
        this.program_id = this.$student_info["course_id"];
      }

      if (this.english == "") {
        this.english = this.$student_info["english"];
      }

      if (this.app_form == "") {
        this.english = this.$student_info["english"];
      }

      if (this.commission == "") {
        this.commission = this.$student_info["commission"];
      }

      axios
        .request({
          url: `http://127.0.0.1:5000/api/student`,
          method: `PATCH`,
          headers: {
            token: `${cookies.get(`token`)}`,
          },
          data: {
            student_id: this.student_id,
            course_id: this.program_id,
            english: this.english,
            app_form: this.app_form,
            comission: this.commission,
          },
        })
        .then((response) => {
          response
          alert('updated');
        })
        .catch((error) => {
            alert('not updated')
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
