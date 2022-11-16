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
        <edit-visa></edit-visa>
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
import AddVisa from "./AddVisa.vue";
import EditVisa from "./EditVisa.vue";
export default {
  components: { AddVisa, EditVisa },
  methods: {
    /* these are functions to redirect the user to the other pages available*/
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

  /* this is a variable setted to be empty */
  data() {
    return {
      visas: [],
    };
  },

  /* on mounted make a axios request that will get all visas in the database */
  mounted() {
    /* this api request needs a header when sending the request, this header is a token sent back when the user logs in */
    axios
      .request({
        url: `${process.env.VUE_APP_BASE_DOMAIN}/api/visa`,
        headers: {
          token: `${cookies.get("token")}`,
        },
      })
      /* the response when success is added to the variable visas, which is an array. This array will be looped in order to print all visas onto the page */
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
