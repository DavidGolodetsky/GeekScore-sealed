<template>
  <v-carousel cycle :show-arrows="isArrows" :height="carouselHeight" v-if="items">
    <v-carousel-item v-for="(item, i) in items" :key="i" :src="require(`@/assets/img/${item.img}.jpg`)">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="secondary"></v-progress-circular>
          </v-row>
        </template>
      <div class="title display-3">{{ item.text }}</div>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
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