<template>
  <div>
    <the-carousel :items="games" />
  </div>
</template>

<script>
import TheCarousel from "@/components/TheCarousel";
import { mapActions } from "vuex";

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
          text: "Store your rounds",
          img: "star-realms"
        },
        {
          text: "See the statistics",
          img: "hive"
        }
      ]
    };
  },
  created() {
    this.clearBackTitle();
  },
  methods: {
    ...mapActions(["clearBackTitle"])
  }
};
</script>


