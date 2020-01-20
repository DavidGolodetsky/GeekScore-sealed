<template>
  <div>
    <v-data-table :headers="headers" :items="desserts" :items-per-page="5" class="elevation-1"></v-data-table>
    <match-add />
  </div>
</template>

<script>
import MatchAdd from "@/components/MatchAdd";

export default {
  components: {
    MatchAdd
  },
  data() {
    return {
      headers: [
        { text: "David", value: "david" },
        { text: "Lyuba", value: "lyuba" },
        { text: "Date", value: "date" }
      ]
    };
  }
};
</script>
