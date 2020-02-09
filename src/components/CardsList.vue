<template>
  <v-row>
    <v-col sm="6" md="4" cols="12" v-for="(item, i) in items" :key="i" class="mb-6">
      <v-lazy
        :options="{
          threshold: .5
        }"
        min-height="200"
        transition="fade-transition"
      >
        <transition-group appear name="fade-down" mode="in-out">
          <v-card :key="item.id" raised class="mx-auto">
            <v-img class="white--text align-end item-card" height="350" :src="item.imageUrl">
              <div class="title-wrap">
                <v-card-title class="d-flex align-center justify-space-between">
                  <slot name="title" :item="item" />
                </v-card-title>
              </div>
            </v-img>
          </v-card>
        </transition-group>
      </v-lazy>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
.title-wrap {
  background-color: rgba(0, 0, 0, 0.7);
}
</style>