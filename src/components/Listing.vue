<template>
  <section
    class="card m-3 w-64 relative text-gray-800 rounded-lg shadow cursor-pointer hover:shadow-lg"
  >
    <img
      src="@/assets/aaron-huber-G7sE2S4Lab4-unsplash.jpg"
      width="400"
      quality="100"
      class="rounded-t-lg"
    />
    <div class="p-3 bg-white rounded-b-lg">
      <h1 class="py-1 text-base text-gray-700">{{apt.address.area}}</h1>
      <ul class="py-2 flex justify-between text-gray-600 text-sm">
        <li>
          <b>{{apt.details.bedrooms}}</b> bedrooms
        </li>
        <!-- <li>{{apt.details.bathrooms}} bathrooms</li> -->
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

      <!-- <div class="price">${{apt.price.monthly}} monthly</div> -->
      <router-link :to="`/listing/${id}`" class="absolute top-0 right-0 bottom-0 left-0" />
    </div>
  </section>
</template>

<script>
import RatingStars from "@/components/UI/RatingStars";

export default {
  name: "Listing",
  props: ["apt", "id"],
  components: { RatingStars }
};
</script>

<style lang="scss">
.card {
  transition: all 0.3s ease-out;
}
</style>
