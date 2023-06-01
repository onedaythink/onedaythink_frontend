<template>
  <div class="v-app">
    <v-card>
      <v-layout id="loginback" >
        <v-main>
          <br><br><br>
          <v-img
            :width="250"
            aspect-ratio="1/1"
            cover
            src="~@/assets/하루생각로고메모장.png"
          ></v-img>
          <router-view></router-view>
        </v-main>
      </v-layout>
    </v-card>
 <!-- <footer-comp></footer-comp> -->
  </div>
</template>

<script>
//import FooterComp from "@/modules/layout/components/FooterComp.vue";

export default {
  name: "MainLayout",
  // components: {
  //   FooterComp,
  // },
};
</script>

<style>
#loginback {
  width: 360px;
  height: 800px;
  margin: 0 auto;
  background-image: url("~@/assets/backgroundpaper.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.v-img {
  margin: 0 auto;
  display: block;
}

@media (max-width: 767px) {
  .v-app {
    width: 100%;
    height: 100%;
  }
}

#think-field {
  background-color: #d1f0ee;
}
</style>
