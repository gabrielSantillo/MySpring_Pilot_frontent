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
          ref="email"
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
          ref="password"
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
import cookies from "vue-cookies"
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

    show1: false,
    show2: true,
    show3: false,
    show4: false,
    rules: {
      required: (value) => !!value || "Password Required.",
    },
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },

    login() {
      axios
        .request({
          url: `http://127.0.0.1:5000/api/client-login`,
          method: `POST`,
          data: {
            email: this.$refs[`email`][`value`],
            password: '123',
          },
        })
        .then((response) => {
            cookies.set("client_id", response['data']['client_id'])
            cookies.set(`customer_token`, response[`data`][`token`]) 
          
            this.$router.push('/dashboard')
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
