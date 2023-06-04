<template>
  <div class="v-app">
    <v-card flat="True">
      <v-layout id="loginback" class="main-container">
        <v-main>
          <br><br><br>
          <v-img
            :width="250"
            src="~@/assets/하루생각로고메모장.png"
          ></v-img>
          <router-view></router-view>
        </v-main>
      </v-layout>
    </v-card>
 <footer-comp></footer-comp>
  </div>
</template>

<script>
import FooterComp from "@/modules/layout/components/FooterComp.vue";

export default {
  name: "MainLayout",
  components: {
    FooterComp,
  }
};
</script>

<style scoped>
#loginback {
  width: 420px;
  height: 700px;
  margin: 0 auto;
  background-image: url("~@/assets/backgroundpaper.png");
  background-repeat: no-repeat;
  background-size: cover;
}

@media (max-width: 420px) {
  #loginback {
    width: 100%;
  }
}

.v-img {
  margin: 0 auto;
  display: block;
}

@media (max-width: 420px) {
  .v-app {
    width: 100%;
    height: 100%;
  }
}

#think-field {
  background-color: #d1f0ee;
}
/* 
.main-container {
  width: 420px;
  height: 700px;
} */
</style>
