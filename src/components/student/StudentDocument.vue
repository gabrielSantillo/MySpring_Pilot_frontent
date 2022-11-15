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
    upload_image() {
      // Create a new FormData to conform to the ways of file-uploading
      // In reality, this is just another key-value pair data structure
      let form = new FormData();
      // Append both the uploaded_image and description
      form.append("uploaded_image", this.$refs["upload_file"]["files"][0]);
      form.append("description", this.$refs["file_description"].value);
      // Make the axios request
      axios
        .request({
          // Standard url and method
          url: `${process.env["VUE_APP_BASE_URL"]}/api/image`,
          method: "POST",
          // THIS MUST BE HERE AND MATCH EXACTLY
          // This is what lets Flask know that you are sending a form that can contain files
          headers: {
            "Content-Type": "multipart/form-data",
            token: `${cookies.get(`token`)}` 
          },
          // The data is simply the form we created above
          data: form,
        })
        .then((res) => {
          res;
        })
        .catch((err) => {
          this.message = "Sorry, there has been an error";
          err;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
