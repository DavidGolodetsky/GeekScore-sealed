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
          <v-card :key="item.id" raised class="mx-auto app-card">
            <router-link :to="setRoute(item.id)">
              <v-img
                :lazy-src="lazyImg"
                class="white--text align-end item-card"
                height="350"
                :src="item.imageUrl"
              >
                <div class="title-wrap">
                  <v-card-title class="d-flex align-center justify-space-between">
                    <span class="card-list-name">{{ item.name }}</span>
                    <slot name="action" :item="item" />
                  </v-card-title>
                </div>
              </v-img>
            </router-link>
          </v-card>
        </v-lazy>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import lazy from "@/assets/scripts/lazy";

export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    route: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      lazyImg: lazy.img
    };
  },
  methods: {
    setRoute(id) {
      const route = this.route;
      route.params = {
        [Object.keys(this.route.params)[0]]: id
      };
      return route;
    }
  }
};
</script>

<style scoped lang="scss">
.title-wrap {
  background-color: rgba(0, 0, 0, 0.7);
}
.app-card {
  transition: 0.3s;
  &:hover {
    transition: 0.3s;
    box-shadow: 7px 9px 20px -6px rgba(0, 0, 0, 0.75);
  }
}
</style>