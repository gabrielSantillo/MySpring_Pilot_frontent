<template>
  <div>
    <v-tabs fixed-tabs background-color="#154734" dark>
      <v-tab> Visa </v-tab>
      <v-tab @click="student"> Student </v-tab>
      <v-tab @click="appointment"> Appointment </v-tab>
      <v-tab @click="college"> College </v-tab>
      <v-tab @click="programs"> Programs </v-tab>
    </v-tabs>

    <section class="visa_info">
      <div v-for="visa in visas" :key="visa['visa_id']">
        <p><b>Visa ID: </b>{{ visa["visa_id"] }}</p>
        <p><b>Student ID: </b>{{ visa["student_id"] }}</p>
        <p>
          <b>Student name: </b>{{ visa["first_name"] }} {{ visa["last_name"] }}
        </p>
        <p><b>Applied: </b>{{ visa["applied"] }}</p>
        <p><b>Date applied: </b>{{ visa["applied_at"] }}</p>
        <p><b>Approved: </b>{{ visa["approved"] }}</p>
        <p><b>Analyst: </b>{{ visa["analyst"] }}</p>
      </div>
    </section>

    <section class="edit_visa_container">
      <div>
        <add-visa></add-visa>
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
import AddVisa from './AddVisa.vue';
export default {
  components: { AddVisa },
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

    programs() {
      this.$router.push("/programs");
    },
  },

  data() {
    return {
      visas: [],
    };
  },

  mounted() {
    axios
      .request({
        url: `http://127.0.0.1:5000/api/visa`,
        headers: {
          token: `${cookies.get("token")}`,
        },
      })
      .then((response) => {
        this.visas = response["data"];
      })
      .catch((error) => {
        error;
      });
  },
};
</script>

<style lang="scss" scoped>
.visa_info {
  display: grid;
  place-items: center;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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

.edit_visa_container {
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
