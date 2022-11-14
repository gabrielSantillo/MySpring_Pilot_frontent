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
import axios from "axios"
import cookies from "vue-cookies"
export default {
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
  methods: {
    post_program() {
      axios
        .request({
          url: `http://127.0.0.1:5000/api/courses`,
          method: `POST`,
          headers: {
            token: `${cookies.get(`token`)}`,
          },
          data: {
            college_id: this.college_id,
            course_name: this.program_name,
            course_url: this.program_url,
            intake: 'fall 2023',
            tuition: this.tuition,
          },
        })
        .then((response) => {
          response;
        })
        .catch((error) => {
          error;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
