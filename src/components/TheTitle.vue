<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-1">
      <div class="d-flex">
        <v-icon color="secondary" class="mx-2">mdi-{{ icon }}</v-icon>
        <h1 class="app-headline">{{ title }}</h1>
      </div>
      <component :is="component" v-bind="props" class="d-flex justify-end my-2" />
    </div>
  </div>
</template>

<script>
import GameAddDialog from "@/components/GameAddDialog";
import TeamAddDialog from "@/components/TeamAddDialog";
import RoundAddDialog from "@/components/RoundAddDialog";

export default {
  components: {
    GameAddDialog,
    TeamAddDialog,
    RoundAddDialog
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
    },
    props: {
      type: Object
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