<template>
  <div>
    <h1 class="mb-6 app-title">{{ team.name }} Statistic for game {{ team.gameName }}</h1>
    <chart-bars class="mb-6" :team="team" />
    <the-go-back />
  </div>
</template>

<script>
import ChartBars from "@/components/ChartBars.vue";

export default {
  components: {
    ChartBars
  },
  props: {
    team: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
.app-title {
  color: $primary;
}
</style>
