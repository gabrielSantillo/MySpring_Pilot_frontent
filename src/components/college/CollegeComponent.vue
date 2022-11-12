<template>
  <div>
    <v-tabs fixed-tabs background-color="#154734" dark>
      <v-tab> College </v-tab>
      <v-tab @click="student"> Student </v-tab>
      <v-tab @click="appointment"> Appointment </v-tab>
      <v-tab @click="programs"> Programs </v-tab>
      <v-tab @click="visa"> Visa </v-tab>
    </v-tabs>
  </div>
</template>

<script>
export default {
  methods: {
    student() {
      this.$router.push("/student");
    },

    appointment() {
      this.$router.push("/appointment");
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
