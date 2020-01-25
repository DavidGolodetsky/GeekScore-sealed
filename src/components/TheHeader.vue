<template>
  <div>
    <v-app-bar color="primary" dense dark>
      <router-link class="logo" :to="{name: 'home'}">GeekStat</router-link>
      <v-spacer />
    </v-app-bar>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.logo {
  color: $accent;
  font-size: 18px;
  font-weight: 600;
}
</style>
