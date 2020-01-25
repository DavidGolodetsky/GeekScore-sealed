<template>
  <v-btn @click="goBack" color="orange darken-2" text dark>
    <v-icon dark left>mdi-arrow-left</v-icon>Back
  </v-btn>
</template>

<script>
export default {
  methods: {
    goBack() {
      return this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="scss">
</style>
