<template>
  <div>
    <h1>Add Visa</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="student_id"
        :rules="studentRules"
        label="Student ID"
        required
      ></v-text-field>

      <h2>Applied?</h2>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-radio-group v-model="ex7" column>
            <v-radio label="Yes" color="success" value="1"></v-radio>
            <v-radio label="No" color="error" value="0"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>

      <h2>Application Date</h2>
      <v-row justify="start" class="calendar">
        <v-date-picker
          v-model="picker"
          year-icon="mdi-calendar-blank"
          prev-icon="mdi-skip-previous"
          next-icon="mdi-skip-next"
        ></v-date-picker>
      </v-row>

      <h2>Visa Approved?</h2>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-radio-group v-model="ex8" column>
            <v-radio label="Yes" color="success" value="1"></v-radio>
            <v-radio label="No" color="error" value="0"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>

      <v-text-field
        v-model="analyst"
        :rules="analystRules"
        label="Analyst"
        required
      ></v-text-field>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="post_visa">
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
      student_id: "",
      studentRules: [(v) => !!v || "Student ID is required"],
      analyst: "",
      analystRules: [(v) => !!v || "Analyst is required"],
      picker: "",
      ex7: "",
      ex8: "",
    };
  },

  /* when adding a visa this function is called to make a POST request and add this visa to the database
  the token is sent as well as headers since all endpoints only works with valid tokens */
  methods: {
    post_visa() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/visa`,
          method: `POST`,
          headers: {
            token: `${cookies.get(`token`)}`,
          },
          /* this is the data being sent to the database */
          data: {
            student_id: this.student_id,
            applied: this.ex7,
            applied_at: this.picker,
            approved: this.ex8,
            analyst: this.analyst,
          },
        })
        /* I'm gonna add some feedback so the user knows when the POST request was a success */
        .then((response) => {
          response;
        })
        /* Same for the failure, I'll add a feedback if something went wrong */
        .catch((error) => {
          error;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.calendar {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
