<template>
  <div class="v-app">
    <v-card>
      <v-layout>
        <v-main>
          <br><br><br>
          <v-img
            :width="353"
            aspect-ratio="1/1"
            cover
             src="@/assets/onedaythink_haru0.png"
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
  },
};
</script>

<style>
.v-app {
  width: 360px;
  height: 800px;
  margin: 0 auto;
}
.v-img {
  margin: 0 auto; /* 수평 가운데 정렬 */
  display: block; /* inline 요소가 아니라 block 요소로 변경 */
}
@media (max-width: 767px) {
  .v-app {
    width: 100%;
    height: 100%;
  }
}
#think-field{
  background-color: #D1F0EE;
}

</style>