<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
export default {
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
