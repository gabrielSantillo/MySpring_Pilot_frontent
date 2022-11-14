<template>
  <div>
    <v-tabs fixed-tabs background-color="#154734" dark>
      <v-tab> Programs </v-tab>
      <v-tab @click="student"> Student </v-tab>
      <v-tab @click="appointment"> Appointment </v-tab>
      <v-tab @click="college"> College </v-tab>
      <v-tab @click="visa"> Visa </v-tab>
    </v-tabs>

    <section class="program_info">
      <div v-for="program in programs" :key="program['course_id']">
        <p><b>Program ID: </b> {{ program["course_id"] }}</p>
        <p>
          <b>Program: </b>
          <a :href="program['course_url']" target="_blank">{{
            program["course_name"]
          }}</a>
        </p>
        <p><b>Tuition: </b> ${{ program["tuition"] }}</p>
        <p><b>College ID: </b> {{ program["college_id"] }}</p>
        <p><b>College Name: </b> {{ program["college_name"] }}</p>
      </div>
    </section>

    <section class="edit_program_container">
      <div>
        <add-program></add-program>
      </div>

      <div>
        <edit-program></edit-program>
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
import AddProgram from "./AddProgram.vue";
import EditProgram from './EditProgram.vue';
export default {
  components: { AddProgram, EditProgram },
  data() {
    return {
      programs: "",
    };
  },
  methods: {
    student() {
      this.$router.push("/student");
    },

    appointment() {
      this.$router.push("/appointment");
    },

    college() {
      this.$router.push("/college");
    },

    visa() {
      this.$router.push("/visa");
    },
  },

  mounted() {
    axios
      .request({
        url: `${process.env.VUE_APP_BASE_DOMAIN}/api/courses`,
        headers: {
          token: `${cookies.get("token")}`,
        },
      })
      .then((response) => {
        this.programs = response["data"];
      })
      .catch((error) => {
        error;
      });
  },
};
</script>

<style lang="scss" scoped>
.program_info {
  display: grid;
  place-items: center;
  grid-template-columns: repeat(auto-fit, minmax(415px, 1fr));
  gap: 20px;
  width: 90%;
  margin-top: 50px;
  margin-left: 25px;
  margin-right: 25px;
  max-height: 80vh;
  overflow-y: scroll;

  > div {
    max-height: 400px;
    box-shadow: 3px 3px 8px gray;
    width: 100%;
    padding: 5px;
    margin: 5px;
  }
}

.edit_program_container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  margin: 100px;
  column-gap: 100px;

  > div {
    width: 60%;
  }
}
</style>
