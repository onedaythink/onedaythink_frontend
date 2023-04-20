<template>
    <header-comp></header-comp>
    <router-view></router-view>
    <footer-comp></footer-comp>
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

</style>