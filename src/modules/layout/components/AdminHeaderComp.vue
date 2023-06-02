<template>
  <v-app-bar fixed color="#f2f2f2" app>
    <v-container fluid>
      <v-row no-gutters class="d-flex align-center">
        <v-col cols="auto" class="logo-container">
          <img class="logo-image" :src="require('@/assets/하루생각로고메모장.png')" alt="Logo">
        </v-col>
        <v-col cols="auto" class="menu-item">
          <router-link to="/admin" class="text">통계</router-link>
        </v-col>
        <v-col cols="auto" class="menu-item">
          <router-link to="/admin/report" class="text">신고관리</router-link>
        </v-col>
        <v-col cols="auto" class="menu-item">
          <router-link to="/admin/subject" class="text">논제관리</router-link>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto" class="menu-item">
          <!-- CSS class="text"를 적용하기 위해 router -to 대신 @click 이벤트 적용 -->
          <router-link 
          to="/login" 
          class="text sdsdsd" 
          @click.prevent="logout()" 
          style="align-items: center;"
          >
          로그아웃</router-link>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>


<script>
import { useUserStore } from '@/store/user'

export default {
  name: "AdminHeaderComp",
  setup() {
    const { logout } = useUserStore()

    return {
      logout
    }
  }
};
</script>

<style scoped>
@font-face {
    font-family: 'IBMPlexSansKR-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
.v-app-bar {
  height: 80px;
}

.logo-container {
  padding-left: 2vw;
}

.logo-image {
  height: 75px;
  margin-left: 34px;
  margin-top: 20px;
}

.text {
  font-family: 'IBMPlexSansKR-Regular';
  font-weight: 700;
  font-style: normal;
  font-size: 20px;
  line-height: 175px;
  color: #877b78;
  text-decoration: none;
}

.menu-item {
  margin-left: 2vw;
}

.menu-item:last-child {
  margin-right: 0;
}

@media (max-width: 768px) {
  .text {
    font-size: 18px;
  }
}

.sdsdsd {
  text-decoration: blink;
    color: brown;
}
</style>