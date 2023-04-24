<template>
  <v-app class="app"> 
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script>

<style>
@font-face {
    font-family: 'ELAND_Choice_M';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts-20-12@1.0/ELAND_Choice_M.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
.app{
  font-family: 'ELAND_Choice_M';
}
</style>
