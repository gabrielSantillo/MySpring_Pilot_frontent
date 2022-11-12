<template>
  <div>
    <v-tabs fixed-tabs background-color="#154734" dark>
      <v-tab> Student </v-tab>
      <v-tab @click="appointment"> Appointment </v-tab>
      <v-tab @click="college"> College </v-tab>
      <v-tab @click="programs"> Programs </v-tab>
      <v-tab @click="visa"> Visa </v-tab>
    </v-tabs>

    <section class="student_info">
      <div v-for="student in students" :key="student['student_id']">
        <nobr
          ><b>Student ID: </b>{{ student["student_id"] }} | <b>name:</b>
          {{ student["first_name"] }} {{ student["last_name"] }} | <b>Email</b>
          <a :href="`mailto:student['email']`">{{ student["email"] }}</a> |
          <b>Program:</b>
          <a :href="student['course_url']" target="_blank">{{
            student["course_name"]
          }}</a>
          | <b>College:</b> {{ student["college"] }} | <b>App_form:</b>
          {{ student["app_form"] }} | <b>Intake: </b> {{ student["intake"] }} |
          <b>English: </b> {{ student["english"] }} | <b>contract: </b>
          {{ student["contract_signed"] }} | <b>Tuition: </b> ${{
            student["tuition"]
          }}
          | <b>Comission: </b> {{ student["commission"] }} |
          <b>Appointment date: </b> {{ student["appointment_date"] }} |
          <b>Appointment ID: </b> {{ student["appointment_id"] }} |
          <b>Consultant ID: </b> {{ student["client_id"] }}</nobr
        >
      </div>
    </section>

    <section class="edit_student_container">
      <div>
        <h1>Add Student</h1>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-select
            v-model="select"
            :items="items"
            :rules="[(v) => !!v || 'Item is required']"
            label="Item"
            required
          ></v-select>

          <v-checkbox
            v-model="checkbox"
            :rules="[(v) => !!v || 'You must agree to continue!']"
            label="Do you agree?"
            required
          ></v-checkbox>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            Validate
          </v-btn>

          <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>

          <v-btn color="warning" @click="resetValidation">
            Reset Validation
          </v-btn>
        </v-form>
      </div>

      <div>
        <h1>Edit Student</h1>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-select
            v-model="select"
            :items="items"
            :rules="[(v) => !!v || 'Item is required']"
            label="Item"
            required
          ></v-select>

          <v-checkbox
            v-model="checkbox"
            :rules="[(v) => !!v || 'You must agree to continue!']"
            label="Do you agree?"
            required
          ></v-checkbox>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            Validate
          </v-btn>

          <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>

          <v-btn color="warning" @click="resetValidation">
            Reset Validation
          </v-btn>
        </v-form>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  methods: {
    appointment() {
      this.$router.push("/appointment");
    },

    college() {
      this.$router.push("/college");
    },

    programs() {
      this.$router.push("/programs");
    },

    visa() {
      this.$router.push("/visa");
    },
  },
  data() {
    return {
      students: [],
    };
  },
  mounted() {
    axios
      .request({
        url: `http://127.0.0.1:5000/api/student`,
        headers: {
          token: `${cookies.get("token")}`,
        },
      })
      .then((response) => {
        this.students = response["data"];
      })
      .catch((error) => {
        error;
      });
  },
};
</script>

<style lang="scss" scoped>
.student_info {
  max-height: 90vh;
  width: 90%;
  overflow-y: scroll;
  overflow-x: scroll;
  margin-top: 50px;
  margin-left: 25px;
  margin-right: 25px;
}

.edit_student_container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 100px;
  column-gap: 100px;
  
  > div {
    width: 60%;
  }
}
</style>
