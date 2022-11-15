<template>
  <div>
    <!-- Add my HTML tags for collecting the user input -->
    <input type="file" ref="upload_file" />
    <input type="text" ref="student_id" />
    <!-- Add my button for clicking -->
    <button @click="upload_image">UPLOAD</button>
    <!-- Add a simple message to show the user what happened -->
    <h3>{{ message }}</h3>

    <!--
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
        label="Upload file"
        v-model="upload_file"
        required
      ></v-file-input>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="upload_image"
      >
        Upload
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
    </v-form> -->
    
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  // Create a variable to show the user the status of the API
  data() {
    return {
      message: "",
      valid: true,
      student_id: "",
      upload_file: "",
      studentRules: [(v) => !!v || "Student ID is required"],
    };
  },
  methods: {
    upload_image() {
      // Create a new FormData to conform to the ways of file-uploading
      // In reality, this is just another key-value pair data structure
      let form = new FormData();
      // Append both the uploaded_image and description
      form.append("student_id", this.$refs["student_id"].value);
      form.append("uploaded_file", this.$refs["upload_file"]["files"][0]);

      // Make the axios request
      axios
        .request({
          // Standard url and method
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/image`,
          method: "POST",
          // THIS MUST BE HERE AND MATCH EXACTLY
          // This is what lets Flask know that you are sending a form that can contain files
          headers: {
            "Content-Type": "multipart/form-data",
            token: `${cookies.get(`token`)}`,
          },
          // The data is simply the form we created above
          data: form,
        })
        .then((res) => {
          res;
          this.message = "File Uploaded";
        })
        .catch((err) => {
          this.message = "Sorry, there has been an error";
          err;
        });
    },
  },
};
</script>

<style scoped></style>
