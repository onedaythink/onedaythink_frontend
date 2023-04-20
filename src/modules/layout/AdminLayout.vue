<template>
    <admin-haeder-comp></admin-haeder-comp>
    <router-view></router-view>
    <admin-footer-comp></admin-footer-comp>
</template>

<script>
import AdminHaederComp from '@/modules/layout/components/AdminHaederComp.vue';
import AdminFooterComp from '@/modules/layout/components/AdminFooterComp.vue';
export default {
    name:'AdminLayout',
    components: {
        AdminHaederComp,
        AdminFooterComp
    }
}
</script>

<style>

</style>