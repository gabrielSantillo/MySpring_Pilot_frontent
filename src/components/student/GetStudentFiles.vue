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
        <img :src="path">
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  data() {
    return {
      valid: true,
      student_id_input: "",
      studentRules: [(v) => !!v || "Student ID is required"],
      files: [],
      images_src: [],
    };
  },
  methods: {
    // Axios request
    get_files_name() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/image-length`,
          headers: {
            token: `${cookies.get("token")}`,
          },
          params: {
            student_id: this.student_id_input,
          },
        })
        .then((response) => {
          for (let i = 0; i < response["data"].length; i++) {
            this.files.push(response["data"][i]);
          }
          this.get_files(this.files);
        })
        .catch((error) => {
          error;
        });
    },

    get_files(files_name) {
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
