<template>
  <v-footer padless>
    <v-layout
      justify-space-between
      py-2
      wrap
      primary
      text-center
      white--text
      xs12
    >
      <v-container class="d-flex flex-wrap justify-space-between">
        <small class="mr-6"
          >&copy; {{ new Date().getFullYear() }} — Geek Score</small
        >
        <small>Contact: geekscore.info@gmail.com</small>
      </v-container>
    </v-layout>
  </v-footer>
</template>

<script>
export default {};
</script>
