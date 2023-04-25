<template>
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
      <v-list>
        <v-list-item prepend-icon="mdi-face" title="오늘의 생각" value="memberMainView" to="/home"></v-list-item>
        <v-list-item prepend-icon="mdi-face" title="타인의 생각" value="ohterOpinionView" to="/others"></v-list-item>
        <v-list-item prepend-icon="mdi-face" title="타인과의 대화" value="chatWithOther" to="/chatwithother"></v-list-item>
        <v-list-item prepend-icon="mdi-face" title="하루봇과의 대화" value="chatWithHaru"></v-list-item>
        <v-list-item prepend-icon="mdi-face" title="나의 공간" value="myPage"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main >
      <router-view> </router-view>
    </v-main>
  </v-layout>
  </v-card>
  
  <footer-comp></footer-comp>

  </div>
</template>

<script>
import FooterComp from '@/modules/layout/components/FooterComp.vue';
export default {
  name:'MemberLayout',
  components: {
      FooterComp
  },
  data: () => ({
    drawer: false,
    group: null
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