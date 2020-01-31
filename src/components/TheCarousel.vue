<template>
  <v-carousel v-if="items">
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="require(`@/assets/img/${item.img}.jpg`)"
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
      <div class="title display-3">{{ item.name }}</div>
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