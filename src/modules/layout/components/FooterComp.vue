<template>
 <v-footer class="bg-D1F0EE footer">
    <v-row justify="center" no-gutters>
      <v-col class="text-center" cols="12">
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
@media (max-width: 420px) {
  .white--text {
    color: white;
  }
}
.bg-D1F0EE {
    background-color: #eaf8f8;
  }

.footer {
  height: 80px;
  width: 420px;
  margin: 0 auto;
}
</style>