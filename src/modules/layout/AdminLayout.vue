<template>
    <admin-header-comp></admin-header-comp>
    <router-view></router-view>
    <admin-footer-comp></admin-footer-comp>
</template>

<script>
import AdminHeaderComp from '@/modules/admin/components/AdminHeaderComp.vue';
import AdminFooterComp from '@/modules/admin/components/AdminFooterComp.vue';
export default {
    name:'AdminLayout',
    components: {
        AdminHeaderComp,
        AdminFooterComp
    }
}
</script>

<style>

</style>