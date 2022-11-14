<template>
  <div>
    <h1>Student Document</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="student_id"
        :rules="studentRules"
        label="Student ID"
        required
      ></v-text-field>

      <v-file-input
        outlined
        dense
        show-size
        counter
        multiple
        label="File input"
        ref="myfile"
        v-model="files"
        v-on:change="handleFileUpload()"
        required
      ></v-file-input>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="upload">
        Upload
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
      student_id: "",
      studentRules: [(v) => !!v || "Student ID is required"],
      files: "",
    };
  },

  methods: {

    upload() {
      let formData = new FormData();

      formData.append("file", this.file);

      axios
        .request({
          url: `/api/image`,
          method: `POST`,
          headers: {
            token: `${cookies.get(`token`)}`,
            "Content-Type": "multipart/form-data",
          },
          data: {
            student_id: this.student_id,
            upload_file: this.file,
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
