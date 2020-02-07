<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-6">
      <div class="d-flex">
        <v-icon color="secondary" class="mr-2">mdi-{{ icon }}</v-icon>
        <h1 class="app-headline">{{ title }}</h1>
      </div>
      <component :is="component" class="d-flex justify-end my-2" />
    </div>
  </div>
</template>

<script>
import GameAddDialog from "@/components/GameAddDialog";
import TeamAddDialog from "@/components/TeamAddDialog";

export default {
  components: {
    GameAddDialog,
    TeamAddDialog
  },
  props: {
    icon: {
      type: String
    },
    title: {
      type: String,
      required: true
    },
    component: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss">
.app-headline {
  color: $secondary;
  font-size: 25px;
}
</style>