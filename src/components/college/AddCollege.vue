<template>
  <div>
    <h1>Add College</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="post_college"
      >
        Add
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from "axios"
import cookies from "vue-cookies"
export default {
  data() {
    return {
      valid: true,
      name: "",
      nameRules: [(v) => !!v || "Name is required"],
    };
  },

  methods: {
    post_college() {
      axios
        .request({
          url: `/api/college`,
          method: `POST`,
          headers: {
            token: `${cookies.get(`token`)}`,
          },
          data: {
            name: this.name,
          },
        })
        .then((response) => {
          response;
        })
        .catch((error) => {
          error;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
