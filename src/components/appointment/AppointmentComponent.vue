<template>
  <v-tabs fixed-tabs background-color="#154734" dark>
    <v-tab> Appointment </v-tab>
    <v-tab @click="student"> Student </v-tab>
    <v-tab @click="college"> College </v-tab>
    <v-tab @click="programs"> Programs </v-tab>
    <v-tab @click="visa"> Visa </v-tab>
  </v-tabs>
</template>

<script>
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
        this.$router.push('/visa')
    }
  },
};
</script>

<style lang="scss" scoped></style>
