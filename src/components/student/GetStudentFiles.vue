1.37 KB

<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="student_id_input"
        :rules="studentRules"
        label="Student ID"
        required
      ></v-text-field>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="get_files_name"
      >
        Get files
      </v-btn>
    </v-form>

    <section>
      <div v-for="(path, index) in images_src" :key="index">
        <img :src="path" />
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  data() {
    /* these are variables starting as empty strings and empty arrays
    there are some rules as well applied to the input tags telling that they are mandatory to be filled before
    clicking the button to send
    this form is from the vuetify framework */
    return {
      valid: true,
      student_id_input: "",
      studentRules: [(v) => !!v || "Student ID is required"],
      files: [],
      images_src: [],
    };
  },
  methods: {
    // Axios request that will get all files name that belongs to a student
    // note the token being sent as well
    get_files_name() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/image-length`,
          headers: {
            token: `${cookies.get("token")}`,
          },
          /* data being sent but as params since this is a GET request*/
          params: {
            student_id: this.student_id_input,
          },
        })
        .then((response) => {
          /* looping through the response since the response at data could have more than one file belonging to a student */
          for (let i = 0; i < response["data"].length; i++) {
            this.files.push(response["data"][i]);
          }
          /* calling the function with the array with the files's name as argument */
          this.get_files(this.files);
        })
        .catch((error) => {
          error;
        });
    },

  /* function that will get all file path to pass them as paths in the src attribute of the image */
    get_files(files_name) {
      /* for loop through the files_name. For every file name send back its path */
      for (let i = 0; i < files_name.length; i++) {
        axios
          .request({
            // Standard URL and params
            url: `${process.env.VUE_APP_BASE_DOMAIN}/api/image`,
            headers: {
              token: `${cookies.get("token")}`,
            },
            params: {
              file_name: files_name[i]["file_name"],
            },
            // THIS MUST BE HERE EXACTLY THE SAME
            // This lets axios know to expect a blob (one way to represent a file)
            responseType: "blob",
          })
          .then((response) => {
            // Cool built in function that allows us to take file data and create a URL for it
            // This is so we can use it for things like image src and such
            let src = URL.createObjectURL(response["data"]);
            /* adding this paths since they strings to the images_src array to then, loop through this array and print the images onto the page */
            this.images_src.push(src);
          })
          .catch((err) => {
            err;
          });
      }
    },
  },
};
</script>

<style scoped>
.get_image {
  margin: 25px;
}

input {
  border: solid 1px;
  margin-right: 25px;
}
</style>
