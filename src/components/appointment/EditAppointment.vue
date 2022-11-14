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

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="update"
      >
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
  data() {
    return {
      valid: true,
      appointment_id: "",
      apointmentRules: [(v) => !!v || "Appointment ID is required"],
      first_name: "",
      last_name: "",
      email: "",
      contract: "",
      ex8: ""
    };
  },

  methods: {
    update() {
      let appointment_info = {};

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

      axios
        .request({
          url: `http://127.0.0.1:5000/api/appointment`,
          method: `PATCH`,
          headers: {
            token: `${cookies.get(`token`)}`,
          },
          data: appointment_info,
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
