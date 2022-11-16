<template>
  <div>
    <v-tabs fixed-tabs background-color="#154734" dark>
      <v-tab> Appointment </v-tab>
      <v-tab @click="student"> Student </v-tab>
      <v-tab @click="college"> College </v-tab>
      <v-tab @click="programs"> Programs </v-tab>
      <v-tab @click="visa"> Visa </v-tab>
    </v-tabs>

    <section class="appointment_info">
      <div
        v-for="appointment in appointments"
        :key="appointment['appointment_id']"
      >
        <p><b>Appointment ID:</b> {{ appointment["appointment_id"] }}</p>
        <p><b>Consultant ID: </b>{{ appointment["consultant_id"] }}</p>
        <p><b>Consultant name: </b>{{ appointment["consultant_name"] }}</p>
        <p>
          <b>Client name:</b> {{ appointment["client_first_name"] }}
          {{ appointment["client_last_name"] }}
        </p>
        <p><b>Client email: </b>{{ appointment["client_email"] }}</p>
        <p><b>Contract signed: </b>{{ appointment["contract_signed"] }}</p>
        <p><b>Consult date: </b>{{ appointment["consult_date"] }}</p>
      </div>
    </section>

    <section class="edit_appointment_container">
      <div>
        <add-appointment></add-appointment>
      </div>

      <div>
        <edit-appointment></edit-appointment>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import AddAppointment from "./AddAppointment.vue";
import EditAppointment from "./EditAppointment.vue";
export default {
  components: { AddAppointment, EditAppointment },
  methods: {
    /* these are functions to redirect the user to the other pages available*/
    student() {
      this.$router.push("/student");
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

  /* on mounted make a axios request that will get all of appointments in the database */
  mounted() {
    /* this api request needs a header when sending the request, this request is a token sent back when the user logs in */
    axios
      .request({
        url: `${process.env.VUE_APP_BASE_DOMAIN}/api/appointment`,
        headers: {
          token: `${cookies.get("token")}`,
        },
      })
      /* the response when success is added to the variable appointments, which is an array, to then print all appointment onto the page */
      .then((response) => {
        this.appointments = response["data"];
      })
      .catch((error) => {
        error;
      });
  },

  data() {
    /* this is a variable setted to be empty */
    return {
      appointments: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.appointment_info {
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
    box-shadow: 3px 3px 16px gray;
    width: 95%;
    padding: 10px;
  }
}

.edit_appointment_container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 100px;
  column-gap: 100px;

  > div {
    width: 60%;
  }
}
</style>
