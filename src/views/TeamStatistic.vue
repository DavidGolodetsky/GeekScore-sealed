<template>
  <div>
    <div v-if="teamId">Statistic</div>
    <the-go-back />
  </div>
</template>

<script>
export default {
  props: {
    teamId: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>


