<template>
  <div class="go-back">
    <v-btn @click="goBack" fab class="mx-2" dark color="#ec8506">
      <v-icon dark>mdi-keyboard-backspace</v-icon>
    </v-btn>
    <span>Back</span>
  </div>
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
.go-back {
  color: $accent;
  text-transform: uppercase;
  font-size: 12px;
}
</style>
