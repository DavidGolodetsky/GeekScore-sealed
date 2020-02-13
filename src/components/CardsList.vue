<template>
  <div>
    <v-row>
      <v-col sm="6" md="4" cols="12" v-for="(item, i) in items" :key="i" class="mb-6">
        <v-lazy
          :options="{
          threshold: .5
        }"
          min-height="200"
          transition="fade-transition"
        >
          <v-card :key="item.id" raised class="mx-auto">
            <v-img
              :lazy-src="lazyImg"
              class="white--text align-end item-card"
              height="350"
              :src="item.imageUrl"
            >
              <div class="title-wrap">
                <v-card-title class="d-flex align-center justify-space-between">
                  <slot name="title" :item="item" />
                </v-card-title>
              </div>
            </v-img>
          </v-card>
        </v-lazy>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      lazyImg:
        "data:image/png;base64,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"
    };
  }
};
</script>

<style scoped lang="scss">
.title-wrap {
  background-color: rgba(0, 0, 0, 0.7);
}
</style>