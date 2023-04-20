<template>
    <div class="v-app" >
    <header-comp></header-comp>
    <router-view></router-view>
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