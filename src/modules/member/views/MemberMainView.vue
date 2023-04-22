<template>
    <div class="subject-card-wrapper">
        <subject-card-comp></subject-card-comp>
        <my-opinion-card-comp></my-opinion-card-comp>
    </div>
</template>

<script>
import SubjectCardComp from '@/modules/member/components/SubjectCardComp.vue';
import MyOpinionCardComp from '@/modules/member/components/MyOpinionCardComp.vue';

export default {
    name: 'MemberMainView',
    components: {
        SubjectCardComp, MyOpinionCardComp
    }
}

</script>

<style>
  .subject-card-wrapper {
  margin-top: 100x;
  margin-bottom: 60px;
}


</style>