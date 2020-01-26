<template>
  <div>
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
          name: "7 Wonders Duel",
          img: "7wonders"
        },
        {
          name: "Star Realms",
          img: "star-realms"
        },
        {
          name: "Hive",
          img: "hive"
        }
      ]
    };
  }
};
</script>


