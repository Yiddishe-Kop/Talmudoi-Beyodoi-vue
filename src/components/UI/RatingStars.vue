<template>
  <div class="rating text-yellow-500">
    <span v-for="(rate, i) in 5" :key="i" v-html="ratingStar(i)"></span>
  </div>
</template>

<script>
export default {
  name: "RatingStars",
  props: ["rating"],
  methods: {
    ratingStar(i) {
      return this.rating > i ? "&starf;" : "&star;";
    }
  }
};
</script>

<style>
</style>
