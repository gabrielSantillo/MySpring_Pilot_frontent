<template>
  <div>
    <v-tabs fixed-tabs background-color="#154734" dark>
      <v-tab> College </v-tab>
      <v-tab @click="student"> Student </v-tab>
      <v-tab @click="appointment"> Appointment </v-tab>
      <v-tab @click="programs"> Programs </v-tab>
      <v-tab @click="visa"> Visa </v-tab>
    </v-tabs>

    <section class="college_info">
      <div v-for="college in colleges" :key="college['college_id']">
        <p><b>College ID: </b>{{ college["college_id"] }}</p>
        <p><b>Name: </b>{{ college["name"] }}</p>
      </div>
    </section>

    <section class="edit_college_container">
      <div>
        <add-college></add-college>
      </div>

      <div>
        <edit-college></edit-college>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import AddCollege from './AddCollege.vue';
import EditCollege from './EditCollege.vue';
export default {
  components: { AddCollege, EditCollege },
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
      this.$router.push("/visa");
    },
  },

  data() {
    return {
      colleges: "",
    };
  },

  mounted() {
    axios
      .request({
        url: `http://127.0.0.1:5000/api/college`,
        headers: {
          token: `${cookies.get("token")}`,
        },
      })
      .then((response) => {
        this.colleges = response["data"];
      })
      .catch((error) => {
        error;
      });
  },
};
</script>

<style lang="scss" scoped>
.college_info {
  display: grid;
  place-items: center;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  width: 90%;
  margin-top: 50px;
  max-height: 80vh;
  overflow-y: scroll;

  > div {
    max-height: 400px;
    box-shadow: 3px 3px 16px gray;
    width: 70%;
    margin: 15px;
    padding: 5px;
  }
}

.edit_college_container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  margin: 100px;
  column-gap: 100px;

  > div {
    width: 60%;
  }
}
</style>
