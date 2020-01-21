<template>
  <div>
    <v-app-bar color="primary" dense dark>
      <router-link class="logo" :to="{name: 'home'}">GeekStat</router-link>
      <v-spacer />
      <!-- TODO: if menu is needed? -->
      <!-- <v-menu bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="n in 3" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>-->
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "TheHeader"
};
</script>

<style scoped lang="scss">
.logo {
  color: $accent;
  font-size: 18px;
  font-weight: 600;
}
</style>
