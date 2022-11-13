<template>
  <div>
    <h1>Edit Appointment</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="student_id"
        :rules="studentRules"
        label="Student ID"
        required
      ></v-text-field>

      <v-text-field
        v-model="program_id"
        :rules="programRules"
        label="Program ID"
      ></v-text-field>

      <v-text-field
        v-model="english"
        :rules="englishRules"
        label="English"
      ></v-text-field>

      <v-text-field
        v-model="app_form"
        :rules="appFormRules"
        label="Application through"
      ></v-text-field>

      <v-text-field
        v-model="commission"
        :rules="commissionRules"
        label="Comission"
      ></v-text-field>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="update">
        Update
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
