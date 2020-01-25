<template>
  <div>
    <h1>View Listing</h1>
    <loader v-if="!apt" />
    <div v-else class="content">
      <img
        src="@/assets/aaron-huber-G7sE2S4Lab4-unsplash.jpg"
        width="800"
        quality="100"
        class="rounded-lg"
      />
      <h1 class="py-1 text-base text-gray-700">{{apt.address.area}}</h1>
      <ul class="py-2 flex justify-between text-gray-600 text-sm">
        <li>
          <b>{{apt.details.bedrooms}}</b> bedrooms
        </li>
        <li>
          <b>{{apt.details.bathrooms}}</b> bathrooms
        </li>
        <li>
          Sleeps
          <b>{{apt.details.sleeps}}</b>
        </li>
      </ul>
      <ul class="pt-2 flex justify-between">
        <rating-stars :rating="apt.details.rating" />

        <li class="text-lg">
          <span class="text-brand text-sm font-thin">$</span>
          {{apt.price.nightly}}
          <span class="text-xs text-gray-600 font-thin">/ night</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Loader from "@/components/UI/Loader";
import RatingStars from "@/components/UI/RatingStars";

export default {
  components: { Loader, RatingStars },
  data() {
    return {
      aptId: this.$route.params.id,
      apt: null
    };
  },
  computed: {
    ...mapState(["firebase"])
  },
  methods: {
    fetchAptData() {
      this.firebase.db
        .collection("apartments")
        .doc(this.aptId)
        .get()
        .then(doc => {
          this.apt = doc.data();
        });
    }
  },
  mounted() {
    this.fetchAptData();
  }
};
</script>

<style>
</style>
