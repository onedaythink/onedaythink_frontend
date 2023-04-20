<template>
    <haeder-comp></haeder-comp>
    <router-view></router-view>
    <footer-comp></footer-comp>
</template>

<script>
import HaederComp from '@/modules/layout/components/HaederComp.vue';
import FooterComp from '@/modules/layout/components/FooterComp.vue';
export default {
    name:'MemberLayout',
    components: {
        HaederComp,
        FooterComp
    }
}
</script>

<style>

</style>