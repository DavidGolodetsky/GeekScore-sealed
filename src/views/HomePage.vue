<template>
  <div class="page">
    <the-carousel :items="games" />
  </div>
</template>

<script>
import TheCarousel from "@/components/TheCarousel";

export default {
  components: {
    TheCarousel
  },
  data() {
    return {
      games: [
        {
          text: "Add your amazing games",
          img: "7wonders"
        },
        {
          text: "Store your matches",
          img: "star-realms"
        },
        {
          text: "See the statistics",
          img: "hive"
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.page {
  padding-top: 80px;
}
</style>


