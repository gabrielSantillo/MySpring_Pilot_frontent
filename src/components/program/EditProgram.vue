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

  methods: {
    update() {
      let program_info = {};
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

      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/courses`,
          method: `PATCH`,
          headers: {
            token: `${cookies.get(`token`)}`,
          },
          data: program_info,
        })
        .then((response) => {
          response;
          alert("updated");
        })
        .catch((error) => {
          alert("not updated");
          error;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
