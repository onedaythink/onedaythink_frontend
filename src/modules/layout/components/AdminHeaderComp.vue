<template>
  <v-app-bar fixed color="#D9D9D9" app>
    <v-container fluid>
      <v-row no-gutters class="d-flex align-center">
        <v-col cols="auto" class="logo-container">
          <img class="logo-image" :src="require('@/assets/onedaythink.png')" alt="Logo">
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
          <router-link to="/login" class="text" @click.prevent="logout()">로그아웃</router-link>
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
.v-app-bar {
  height: 113px;
}

.logo-container {
  padding-left: 2vw;
}

.logo-image {
  height: 75px;
  margin-left: 34px;
  margin-top: 70px;
}

.text {
  font-family: "IBM Plex Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 175px;
  color: #000000;
  text-decoration: none;
}

.menu-item {
  margin-left: 2vw;
  margin-top: 45px;
}

.menu-item:last-child {
  margin-right: 0;
}

@media (max-width: 768px) {
  .text {
    font-size: 18px;
  }
}
</style>