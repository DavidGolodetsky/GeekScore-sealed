<template>
  <div>
    <v-row justify="end">
      <v-col sm="6" md="4" cols="12">
        <v-text-field clearable append-icon="mdi-magnify" dark label="Search" v-model="search"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        sm="6"
        md="4"
        cols="12"
        v-for="(item, i) in filteredItems.slice().reverse()"
        :key="i"
        class="mb-6"
      >
        <v-lazy
          :options="{
          threshold: .5
        }"
          min-height="200"
          transition="fade-transition"
        >
          <v-card dark :key="item.id" raised class="mx-auto app-card">
            <router-link :to="setRoute(item.id)">
              <div class="title-wrap">
                <v-card-title class="d-flex justify-space-between">
                  <span class="card-list-name">{{ item.name }}</span>
                  <slot name="action" :item="item" />
                </v-card-title>
              </div>
              <v-img
                :lazy-src="lazyImg"
                class="white--text align-end item-card"
                height="350"
                :src="item.imageUrl"
              >
                <div class="title-wrap">
                  <!-- TODO:put in loop -->
                  <v-card-title v-if="showBottmPlate(item)" class="card-list-actions">
                    <v-btn
                      v-if="item.bggURL"
                      :href="item.bggURL"
                      class="px-0 mx-1"
                      target="_blank"
                      rel="noopener noreferrer"
                      small
                      text
                      fab
                      @click.stop
                      color="#fff"
                    >
                      <v-icon dark>mdi-cards</v-icon>
                    </v-btn>
                    <v-btn
                      v-if="item.rulesURL"
                      :href="item.rulesURL"
                      class="px-0 mx-1"
                      target="_blank"
                      rel="noopener noreferrer"
                      small
                      text
                      fab
                      @click.stop
                      color="#fff"
                    >
                      <v-icon dark>mdi-book-open-variant</v-icon>
                    </v-btn>
                    <v-btn
                      v-if="item.melodiceURL"
                      :href="item.melodiceURL"
                      class="px-0 mx-1"
                      target="_blank"
                      rel="noopener noreferrer"
                      small
                      text
                      fab
                      @click.stop
                      color="#fff"
                    >
                      <v-icon dark>mdi-music</v-icon>
                    </v-btn>
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
      lazyImg: lazy.img,
      search: ""
    };
  },
  computed: {
    filteredItems() {
      if (this.search) {
        return this.items.filter(item => {
          return this.search
            .toLowerCase()
            .split(" ")
            .every(v => item.name.toLowerCase().includes(v));
        });
      }
      return this.items;
    }
  },
  methods: {
    setRoute(id) {
      let route = { ...this.route };
      route.params = {
        [Object.keys(this.route.params)[0]]: id
      };
      return route;
    },
    showBottmPlate(item) {
      if (item.bggURL || item.melodiceURL || item.rulesURL) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style scoped lang="scss">
.title-wrap {
  background-color: rgba(0, 0, 0, 0.9);
}
.app-card {
  transition: 0.3s;
  &:hover {
    transition: 0.3s;
    box-shadow: 7px 9px 20px -6px rgba(0, 0, 0, 0.75);
  }
}
.card-list-name {
  color: $secondary;
}

.v-image__image--preload {
  -webkit-filter: none;
  filter: none;
}

.card-list-actions {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
</style>