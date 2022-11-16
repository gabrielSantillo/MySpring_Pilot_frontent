<template>
  <div class="container">
    <img
      src="https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      alt=""
    />
    <v-form ref="form" v-model="valid" lazy-validation class="login_form">
      <div class="input_div">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
          class="input"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          hint="At least 8 characters"
          class="input"
          counter
          @click:append="show1 = !show1"
        ></v-text-field>
      </div>

      <div class="button_div">
        <v-btn :disabled="!valid" color="success" class="mr-4" @click="login">
          Login
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  /* these are variables starting as empty strings
  there are some rules as well applied to the input tags telling that they are mandatory to be filled before
  clicking the button to send
  this form is from the vuetify framework */
  data: () => ({
    password: "",
    valid: true,
    name: "",
    passwordRules: [(v) => !!v || "Password is required"],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],

    show1: false,
    show2: true,
    show3: false,
    show4: false,
    rules: {
      required: (value) => !!value || "Password Required.",
    },
  }),

  methods: {
    reset() {
      this.$refs.form.reset();
    },

  /* this function is called when the user attempt to login to the system */
    login() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/client-login`,
          method: `POST`,
          /* this is the data being sent to the database */
          data: {
            email: this.email,
            password: this.password,
          },
        })
        /* in case of response of success set as cookies the token to be able to do all you need inside the system */
        .then((response) => {
          cookies.set("client_id", response["data"]["client_id"]);
          cookies.set(`token`, response[`data`][`token`]);

        /* push the user to the student page that is the main page of the system. Everything is around a student */
          this.$router.push("/student");
        })
        .catch((error) => {
          error;
        });
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

.input_div {
  margin-top: 100px;
}

.button_div {
  transform: translateY(-75px);
}
</style>
