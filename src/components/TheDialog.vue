<template>
  <div>
    <v-btn
      class="px-0"
      :small="simple"
      fab
      :text="simple"
      @click.prevent="dialog = true"
      :color="color"
    >
      <v-icon dark>mdi-{{ activator }}</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title>
          <h3>{{ header }}</h3>
          <v-spacer></v-spacer>
          <v-btn small fab text @click="close">
            <v-icon dark>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-form v-model="valid" lazy-validation ref="form" @submit.prevent="onSubmit">
          <v-card-text>
            <v-container>
              <slot />
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="secondary darken-1" rounded text @click="close">Cancel</v-btn>
            <v-btn color="secondary darken-1" rounded text type="submit" :disabled="!valid">Submit</v-btn>
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
    color: {
      type: String,
      default: "secondary"
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
