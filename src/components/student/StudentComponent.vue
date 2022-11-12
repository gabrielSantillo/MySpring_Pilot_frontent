<template>
  <v-tabs fixed-tabs background-color="#154734" dark>
    <v-tab> Student </v-tab>
    <v-tab @click="appointment"> Appointment </v-tab>
    <v-tab @click="college"> College </v-tab>
    <v-tab @click="programs"> Programs </v-tab>
    <v-tab @click="visa"> Visa </v-tab>
  </v-tabs>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {

    methods: {
        appointment() {
            this.$router.push('/appointment')
        },

        college() {
          this.$router.push('/college')
        },

        programs() {
          this.$router.push('/programs')
        },

        visa() {
          this.$router.push('/visa')
        }
    },
  data() {
   
  },
  mounted() {
    axios
      .request({
        url: `http://127.0.0.1:5000/api/student`,
        headers: {
          "token": `${cookies.get('token')}`,
        },
      })
      .then((response) => {
        response
      })
      .catch((error) => {
        error;
      });
  },
};
</script>

<style lang="scss" scoped></style>
