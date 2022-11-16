<template>
  <div>
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
    </v-form>
    <br /><br />
    <h3>{{ message }}</h3>

    <get-student-files></get-student-files>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import GetStudentFiles from "./GetStudentFiles.vue";
export default {
  components: { GetStudentFiles },
  /* these are variables starting as empty strings
  there are some rules as well applied to the input tags telling that they are mandatory to be filled before
  clicking the button to send
  this form is from the vuetify framework */
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
    /* this function is called when the user wants to add files that belongs that a student */
    upload_image() {
      // Create a new FormData to conform to the ways of file-uploading
      // In reality, this is just another key-value pair data structure
      let form = new FormData();
      // Append both the uploaded_image and description
      form.append("student_id", this.student_id);
      form.append("uploaded_file", this.upload_file[0]);

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
        // in case of success fill in the variable that will tell the user that the file was uploaded
        .then((res) => {
          res;
          this.message = "File Uploaded";
        })
        // in case if failure fill in the variable that will tell the user that the file was uploaded
        .catch((err) => {
          this.message = "Sorry, there has been an error";
          err;
        });
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style scoped>
.student_id_input {
  border: solid 1px;
  margin-left: 25px;
  margin-right: 25px;
}
</style>
