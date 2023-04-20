<template>
 <v-footer class="bg-D1F0EE">
    <v-row justify="center" no-gutters>
      <v-col class="text-center mt-4" cols="12">
        PROJECT, <strong>ONEDAYTHINK.</strong> 2023.
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: 'FooterComp'
}
</script>

<style scoped>
@media (max-width: 767px) {
  .white--text {
    color: white;
  }
}

.bg-D1F0EE {
    background-color: #D1F0EE;
  }
</style>