<template>
  <v-btn @click="goBack" outlined fab class="mx-2" dark color="#ec8506">
    <v-icon dark>mdi-keyboard-backspace</v-icon>
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
