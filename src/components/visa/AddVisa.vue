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
import axios from "axios"
import cookies from "vue-cookies"
export default {
  data() {
    return {
      valid: true,
      student_id: "",
      studentRules: [(v) => !!v || "Student ID is required"],
      analyst: "",
      analystRules: [(v) => !!v || "Analyst is required"],
      picker: "",
      ex7: "",
      ex8: ""
    };
  },

  methods: {
    post_visa() {
      axios
        .request({
          url: `/api/visa`,
          method: `POST`,
          headers: {
            token: `${cookies.get(`token`)}`,
          },
          data: {
            student_id: this.student_id,
            applied: this.ex7,
            applied_at: this.picker,
            approved: this.ex8,
            analyst: this.analyst,
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
.calendar {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
