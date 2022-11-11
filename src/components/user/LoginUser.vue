<template>
  <div class="container">
    <img src="https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="">
    <v-form ref="form" v-model="valid" lazy-validation class="login_form">
      <div>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
          class="input"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          required
          class="input"
        ></v-text-field>
      </div>

      <div>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Login
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: "",
    passwordRules: [(v) => !!v || "Password is required"],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
    display: grid;
    grid-template-columns: 4fr 4fr;

    > img {
    height: 128%;
    width: 100%;
    background-size: cover;
    background-position: center;
    }
}

.login_form {
  display: grid;
  place-items: center;

  > div > .input {
    width: 400px;
  }
}
</style>
