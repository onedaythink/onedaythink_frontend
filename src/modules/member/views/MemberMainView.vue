<template>
    <div class="subject-card-wrapper">
        <subject-card-comp></subject-card-comp>
    </div>
</template>

<script>
import SubjectCardComp from '@/modules/member/components/SubjectCardComp.vue';

export default {
    name: 'MemberMainView',
    components: {
        SubjectCardComp
    }
}

</script>

<style>
  .subject-card-wrapper {
  margin-top: 100x;
  margin-bottom: 60px;
}
</style>