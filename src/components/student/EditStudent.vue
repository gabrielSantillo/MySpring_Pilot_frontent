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
  data: () => ({
    valid: true,
    student_id: "",
    studentRules: [(v) => !!v || "Student ID is required"],
    program_id: "",
    english: "",
    app_form: "",
    commission: "",
  }),

  methods: {
    update() {
        
    let student_info = {}
    if(this.student_id != "") {
        student_info['student_id'] = this.student_id
    }
    if(this.program_id != "") {
        student_info['course_id'] = this.program_id
    }
    if(this.english != "") {
        student_info["english"] = this.english
    }
    if(this.app_form != "") {
        student_info["app_form"] = this.app_form
    }
    if(this.commission != "") {
        student_info["commission"] = this.commission
    }

      axios
        .request({
          url: `/api/student`,
          method: `PATCH`,
          headers: {
            token: `${cookies.get(`token`)}`,
          },
          data: student_info,
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
