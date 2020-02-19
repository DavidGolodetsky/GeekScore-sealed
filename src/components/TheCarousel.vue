<template>
  <v-carousel cycle :show-arrows="isArrows" :height="carouselHeight" v-if="items">
    <v-carousel-item v-for="(item, i) in items" :key="i">
      <v-img
        :lazy-src="lazyImg"
        class="white--text align-end item-card"
        :src="require(`@/assets/img/${item.img}.jpg`)"
      ></v-img>
      <div class="title display-3">{{ item.text }}</div>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import lazy from "@/assets/scripts/lazy";

export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      lazyImg: lazy.img
    };
  },
  computed: {
    carouselHeight() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return 550;
      }
      return 450;
    },
    isArrows() {
      return this.$vuetify.breakpoint.mdAndUp;
    }
  }
};
</script>

<style scoped lang="scss">
.title {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  padding: 15px;
  width: 100%;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
}
</style>