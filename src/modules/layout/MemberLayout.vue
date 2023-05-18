<template>
   <div class="v-app">
    <v-card>
      <v-layout>
        <v-app-bar color="white">
          <v-app-bar-title>
            <v-img width="50%" class="logo" src="@/assets/onedaythink.png" alt="하루생각"></v-img>
          </v-app-bar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-bell</v-icon>
          </v-btn>
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" location="right" temporary>
          <v-layout justify-center>
            <v-list>
              <v-list-item prepend-icon="mdi-face" title="오늘의 생각" value="memberMainView" to="/home"></v-list-item>
              <v-list-item prepend-icon="mdi-face" title="타인의 생각" value="ohterOpinionView" to="/others"></v-list-item>
              <v-list-item prepend-icon="mdi-face" title="타인과의 대화" value="chatWithOther" to="/chatwithother"></v-list-item>
              <v-list-item prepend-icon="mdi-face" title="하루봇과의 대화" value="chatWithHaru" to="/chatwithharubot"></v-list-item>
              <v-list-item prepend-icon="mdi-face" title="나의 공간" value="myPage" to="/mypage"></v-list-item>
              <br>
              <v-btn @click="logout()"><router-link to="/login">로그아웃</router-link></v-btn>
            </v-list>
          </v-layout>
        </v-navigation-drawer>
        <v-main class="mainview">
          <router-view></router-view>
          <sticky-haru-comp></sticky-haru-comp>
        </v-main>
      </v-layout>
    </v-card>
    <footer-comp></footer-comp>

  </div>
</template>

<script>
import FooterComp from '@/modules/layout/components/FooterComp.vue';
import StickyHaruComp from '@/modules/layout/components/StickyHaruComp.vue';
import { useUserStore } from '@/store/user'

export default {
  name:'MemberLayout',
  components: {
      FooterComp, StickyHaruComp
  },
  data: () => ({
    drawer: false,
    group: null
  }),
  watch: {
    group () {
      this.drawer = false
    },
  },
  setup() {
    const { logout } = useUserStore()

    return {
      logout
    }
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

.logo{
  left:-15px;
}

.mainview{
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-end;
}

</style>
