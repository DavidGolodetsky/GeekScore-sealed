<template>
  <div>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">
        <div>
          <v-btn class="mx-2" fab :text="simple" dark v-on="on" color="secondary">
            <v-icon :small="simple" dark>mdi-{{ activator }}</v-icon>
          </v-btn>
        </div>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ header }}</span>
        </v-card-title>
        <v-form v-model="valid" lazy-validation ref="form" @submit.prevent="onSubmit">
          <v-card-text>
            <v-container>
              <slot />
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="close">Close</v-btn>
            <v-btn color="blue darken-1" text type="submit" :disabled="!valid">Submit</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    activator: {
      type: String,
      required: true
    },
    header: {
      type: String,
      required: true
    },
    submitLogic: {
      type: Function,
      required: true
    },
    simple: {
      type: Boolean
    }
  },
  data() {
    return {
      dialog: false,
      valid: true
    };
  },
  methods: {
    validateForm() {
      let form = this.$refs.form;
      if (form.validate()) {
        return true;
      }
    },
    onSubmit() {
      if (this.validateForm()) {
        this.submitLogic();
        this.close();
      }
    },
    close() {
      this.dialog = false;
    }
  }
};
</script>


<style scoped lang="scss">
.button-text {
  text-transform: uppercase;
  font-size: 12px;
  color: $secondary;
}
</style>
