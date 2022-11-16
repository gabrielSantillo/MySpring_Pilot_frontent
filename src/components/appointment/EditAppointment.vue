<template>
  <div>
    <h1>Edit Appointment</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="appointment_id"
        :rules="apointmentRules"
        label="Appointment ID"
        required
      ></v-text-field>

      <v-text-field v-model="consultant_id" label="Consultand ID">
      </v-text-field>

      <v-text-field
        v-model="first_name"
        :rules="firstNameRules"
        label="First Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="last_name"
        :rules="lastNameRules"
        label="Last Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="Email"
        required
      ></v-text-field>

      <h2>Contract signed?</h2>

      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-radio-group v-model="ex8" column>
            <v-radio label="Yes" color="success" value="1"></v-radio>
            <v-radio label="No" color="error" value="0"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>

      <div class="time-container">
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
      </div>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="update">
        Add
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
      appointment_id: "",
      apointmentRules: [(v) => !!v || "Appointment ID is required"],
      first_name: "",
      last_name: "",
      email: "",
      contract: "",
      ex8: "",
    };
  },

  /* when edditing an appointment this function is called to make a PATCH request and add this edited appointment to the database
the token is sent as well as headers since all endpoints only works with valid tokens */
  methods: {
    update() {
      /* Starting a object */
      let appointment_info = {};

      /* All of these if statements are verifying if any of the inputs weren't empties, and in case of true, will add this key value pair to the object in order to send the object to the database with these updates */
      if (this.appointment_id != "") {
        appointment_info["appointment_id"] = this.appointment_id;
      }

      if (this.first_name != "") {
        appointment_info["first_name"] = this.first_name;
      }

      if (this.last_name != "") {
        appointment_info["last_name"] = this.last_name;
      }

      if (this.email != "") {
        appointment_info["email"] = this.email;
      }

      if (this.ex8 != "") {
        appointment_info["contract_signed"] = this.ex8;
      }

      /* a PATCH request to the database to update the appointment
    note the header being sent as well */
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/appointment`,
          method: `PATCH`,
          headers: {
            token: `${cookies.get(`token`)}`,
          },
          /* sending the data to be updated in the database */
          data: appointment_info,
        })
        /* in case of success the response is to send an alert to the user */
        .then((response) => {
          response;
          alert("updated");
        })
        .catch((error) => {
          /* in case of failure the response is to send an alert to the user */
          alert("not updated");
          error;
        });
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style lang="scss" scoped>
.mr-4 {
  margin-top: 50px;
}

.time-container {
  margin-top: 30px;
}
</style>
