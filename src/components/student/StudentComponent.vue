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
        <p><b>Student ID: </b>{{ student["student_id"] }}</p>
        <p>
          <b>name:</b> {{ student["first_name"] }}{{ student["last_name"] }}
        </p>
        <p>
          <b>Email: </b>
          <a :href="`mailto:student['email']`">{{ student["email"] }}</a>
        </p>
        <p>
          <b>Program: </b>
          <a :href="student['course_url']" target="_blank">{{
            student["course_name"]
          }}</a>
        </p>
        <p><b>Program ID: </b> {{ student["course_id"] }}</p>
        <p><b>College:</b> {{ student["college"] }}</p>
        <p><b>App_form:</b> {{ student["app_form"] }}</p>
        <p><b>Intake: </b> {{ student["intake"] }}</p>
        <p><b>English: </b> {{ student["english"] }}</p>
        <p><b>contract: </b> {{ student["contract_signed"] }}</p>
        <p><b>Tuition: </b> ${{ student["tuition"] }}</p>
        <p><b>Comission: </b> {{ student["commission"] }}</p>
        <p><b>Appointment date: </b> {{ student["appointment_date"] }}</p>
        <p><b>Appointment ID: </b> {{ student["appointment_id"] }}</p>
        <p><b>Consultant ID: </b> {{ student["client_id"] }}</p>
      </div>
    </section>

    <section class="edit_student_container">
      <div>
        <add-student></add-student>
      </div>

      <div>
        <edit-student></edit-student>
      </div>
    </section>

    <section class="student_document">
      <student-document></student-document>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import AddStudent from "./AddStudent.vue";
import EditStudent from "./EditStudent.vue";
import StudentDocument from "./StudentDocument.vue";
export default {
  components: { AddStudent, EditStudent, StudentDocument },
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
        url: `${process.env.VUE_APP_BASE_DOMAIN}/api/student`,
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
  display: grid;
  place-items: center;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  width: 90%;
  margin-top: 50px;
  margin-left: 25px;
  margin-right: 25px;
  max-height: 80vh;
  overflow-y: scroll;

  > div {
    max-height: 400px;
    overflow-y: scroll;
    box-shadow: 3px 3px 8px gray;
    width: 100%;
  }
}

.edit_student_container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  margin: 100px;
  column-gap: 100px;

  > div {
    width: 60%;
  }
}

.student_document {
  display: grid;
  place-items: center;
  width: 100%;
  margin-bottom: 50px;
}
</style>
