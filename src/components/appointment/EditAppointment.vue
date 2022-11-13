<template>
  <div>
    <h1>Edit Appointment</h1>
        <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="first_name"
        :rules="firstNameRules"
        label="First name"
        required
      ></v-text-field>

      <v-text-field
        v-model="last_name"
        :rules="lastNameRules"
        label="Last name"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="email"
        required
      ></v-text-field>

      <v-row justify="start">
        <v-date-picker
          v-model="picker"
          year-icon="mdi-calendar-blank"
          prev-icon="mdi-skip-previous"
          next-icon="mdi-skip-next"
        ></v-date-picker>
      </v-row>

      <v-row justify="center">
        <v-col>
          <v-time-picker v-model="e7" format="24hr"></v-time-picker>
        </v-col>
      </v-row>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="post_appointment"
      >
        Add
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
