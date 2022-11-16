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
import axios from "axios";
import cookies from "vue-cookies";
export default {
  /* these are variables starting as empty strings
  there are some rules as well applied to the input tags telling that they are mandatory to be filled before
  clicking the button to send
  this form is from the vuetify framework */
  data() {
    return {
      valid: true,
      college_id: "",
      collegeRules: [(v) => !!v || "College ID is required"],
      name: "",
      nameRules: [(v) => !!v || "Name is required"],
    };
  },

  /* when edditing a college this function is called to make a PATCH request and add this edited college to the database
    the token is sent as well as headers since all endpoints only works with valid tokens */
  methods: {
    update() {
      /* a PATCH request to the database to update the college
          note the header being sent as well */
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/college`,
          method: `PATCH`,
          headers: {
            token: `${cookies.get(`token`)}`,
          },
          /* sending the data to be updated in the database */
          data: {
            id: this.college_id,
            name: this.name,
          },
        })
        /* in case of success the response is to send an alert to the user */
        .then((response) => {
          response;
          alert("updated");
        })
        /* in case of failure the response is to send an alert to the user */
        .catch((error) => {
          alert("not updated");
          error;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
