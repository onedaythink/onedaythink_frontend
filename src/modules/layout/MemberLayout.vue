<template>
    <header-comp></header-comp>
    <router-view></router-view>

    <div class="v-app" >
    
  <v-card>
  <v-layout>
    <v-app-bar
    color="white"
    >

    <v-app-bar-title>ONEDAY THINK</v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn>

    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>   
    </v-app-bar>
    <v-navigation-drawer
        v-model="drawer"
        location="right"
        temporary
      >
        <v-list
          :items="items"
        ></v-list>
      </v-navigation-drawer>
      <v-main >
        <router-view></router-view>
      </v-main>
    </v-layout>
    </v-card>
    
    <footer-comp></footer-comp>
  
    </div>
</template>

<script>

import HeaderComp from '@/modules/layout/components/HeaderComp.vue';
import FooterComp from '@/modules/layout/components/FooterComp.vue';
export default {
    name:'MemberLayout',
    components: {

        HeaderComp,
        FooterComp
    },
    data: () => ({
      drawer: false,
      group: null,
      items: [
        {
          title: 'Foo',
          value: 'foo',
        },
        {
          title: 'Bar',
          value: 'bar',
        },
        {
          title: 'Fizz',
          value: 'fizz',
        },
        {
          title: 'Buzz',
          value: 'buzz',
        },
      ],
    }),

    watch: {
      group () {
        this.drawer = false
      },
    }
}
</script>

<style>
 .v-app {
    width: 360px;
    height: 800px;
    margin: 0 auto;
  }

    @media (max-width: 767px) {
    .v-app {
      width: 100%;
      height: 100%;
    }
  }
</style>