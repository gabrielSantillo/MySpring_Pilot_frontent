<template>
  <div>
    <h1>Edit College</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="college_id"
        :rules="collegeRules"
        label="College ID"
        required
      ></v-text-field>

      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="update">
        Update
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from "axios"
import cookies from "vue-cookies"
export default {
  data() {
    return {
      valid: true,
      college_id: "",
      collegeRules: [(v) => !!v || "College ID is required"],
      name: "",
      nameRules: [(v) => !!v || "Name is required"],
    };
  },
  methods: {
    update() {
      axios
        .request({
          url: `/api/college`,
          method: `PATCH`,
          headers: {
            token: `${cookies.get(`token`)}`,
          },
          data: {
            id: this.college_id,
            name: this.name
          },
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
