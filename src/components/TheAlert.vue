<template>
  <div>
    <transition appear name="fade-down">
      <v-alert dismissible :value="true" :type="type" @input="onClose()">{{ text }}</v-alert>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  methods: {
    onClose() {
      this.$emit("dismissed");
    }
  }
};
</script>