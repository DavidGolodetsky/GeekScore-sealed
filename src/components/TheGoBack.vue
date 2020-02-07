<template>
  <div @click="goBack" class="d-flex align-center go-back">
    <v-icon class="mr-2" color="secondary" dark>mdi-arrow-left</v-icon>
    <span v-if="backTitle" class="back-title">{{ backTitle }}</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["backTitle"])
  },
  methods: {
    goBack() {
      return this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="scss">
.go-back {
  cursor: pointer;
}
.back-title {
  color: $secondary;
  font-size: 22px;
  font-weight: 600;
}
</style>