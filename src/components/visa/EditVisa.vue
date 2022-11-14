<template>
  <div>
    <h1>Edit Visa</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="visa_id"
        :rules="visaRules"
        label="Visa ID"
        required
      ></v-text-field>
      <v-text-field v-model="student_id" label="Student ID"></v-text-field>

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

      <v-text-field v-model="analyst" label="Analyst"></v-text-field>

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
  data() {
    return {
      valid: true,
      visa_id: "",
      student_id: "",
      visaRules: [(v) => !!v || "Visa ID is required"],
      analyst: "",
      picker: "",
      ex7: "",
      ex8: "",
    };
  },

  methods: {
    update() {
      let visa_info = {};
      if (this.visa_id != "") {
        visa_info["visa_id"] = this.visa_id;
      }

      if (this.student_id != "") {
        visa_info["student_id"] = this.student_id;
      }

      if (this.ex7 != "") {
        visa_info["applied"] = this.ex7;
      }

      if (this.picker != "") {
        visa_info["applied_at"] = this.picker;
      }

      if (this.ex8 != "") {
        visa_info["approved"] = this.ex8;
      }

      if (this.analyst != "") {
        visa_info["analyst"] = this.analyst;
      }

      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/visa`,
          method: `PATCH`,
          headers: {
            token: `${cookies.get(`token`)}`,
          },
          data: visa_info,
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

<style lang="scss" scoped>
.calendar {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
