<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" class="mx-auto" />
    <h1>Home Page</h1>
    <grid align="flex-start" justify="flex-start" class="my-4 -mx-3">
      <listing v-for="apt in listings" :key="apt.id" :apt="apt.data" :id="apt.id" />
    </grid>
  </div>
</template>

<script>
import Grid from "@/components/UI/Grid";
import Listing from "@/components/Listing";

export default {
  name: "home",
  components: { Grid, Listing },
  data() {
    return {
      listings: []
    };
  },
  methods: {
    fetchInitialData() {
      this.$store.state.firebase.db
        .collection("apartments")
        .get()
        .then(docs => {
          docs.forEach(doc => {
            this.listings.push({ id: doc.id, data: doc.data() });
          });
        });
    }
  },
  mounted() {
    this.fetchInitialData();
  }
};
</script>
