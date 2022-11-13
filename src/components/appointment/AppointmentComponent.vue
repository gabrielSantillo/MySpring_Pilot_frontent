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
        <p><b>Consultant: </b>{{ appointment["consultant"] }}</p>
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
        
      </div>

      <div>
        
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  methods: {
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

  mounted() {
    axios
      .request({
        url: `http://127.0.0.1:5000/api/appointment`,
        headers: {
          token: `${cookies.get("token")}`,
        },
      })
      .then((response) => {
        this.appointments = response["data"];
      })
      .catch((error) => {
        error;
      });
  },

  data() {
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
