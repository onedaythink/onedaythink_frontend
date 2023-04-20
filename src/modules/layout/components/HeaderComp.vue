<template>

<v-card>
 <v-layout>
  <v-app-bar
  color="white"
  >
  
  <v-app-bar-title></v-app-bar-title>
  
  <v-spacer></v-spacer>
  
    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>
    
    <v-btn icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn>
    
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    
  </v-app-bar>

  <v-main>

  </v-main>
  </v-layout>
</v-card>
</template>

<script>
export default {
  name:'HeaderComp'
}
</script>

<style>
 @media (max-width: 767px) {
    .v-app {
      width: 100%;
      height: 100%;
    }
  }
</style>