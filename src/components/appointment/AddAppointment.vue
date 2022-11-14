<template>
  <div>
    <h1>Add Appointment</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="first_name"
        :rules="firstNameRules"
        label="First name"
        required
      ></v-text-field>

      <v-text-field
        v-model="last_name"
        :rules="lastNameRules"
        label="Last name"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="Email"
        required
      ></v-text-field>

      <v-row justify="start">
        <v-date-picker
          v-model="picker"
          year-icon="mdi-calendar-blank"
          prev-icon="mdi-skip-previous"
          next-icon="mdi-skip-next"
        ></v-date-picker>
      </v-row>

      <v-row justify="center">
        <v-col>
          <v-time-picker v-model="e7" format="24hr"></v-time-picker>
        </v-col>
      </v-row>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="post_appointment"
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
    first_name: "",
    firstNameRules: [(v) => !!v || "First name is required"],
    last_name: "",
    lastNameRules: [(v) => !!v || "Program ID is required"],
    email: "",
    emailRules: [(v) => !!v || "English is required"],
    e7: null,
    picker: null
  }),

  methods: {
    post_appointment() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/appointment`,
          method: `POST`,
          headers: {
            token: `${cookies.get(`token`)}`,
          },
          data: {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            date: this.picker + " " + this.e7,
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

<style lang="scss" scoped>
.mr-4 {
  margin-top: 50px;
}
</style>
