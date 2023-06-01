<template>
    <div class="subject-card-wrapper">
        <other-opinion-card-comp></other-opinion-card-comp>
    </div>
</template>

<script>
import OtherOpinionCardComp from '@/modules/others/components/OtherOpinionCardComp.vue';

export default{
    name : "OtherOpinionView",
    components : {
        OtherOpinionCardComp
    }
}
</script>

<style scoped>
/* 스크롤바 관련 설정 */
  .subject-card-wrapper {
  height: 600px;
  overflow-y: auto;
  margin-top: 60px;
  margin-bottom: 60px;
}

/* 스크롤바 숨기기 */
.subject-card-wrapper::-webkit-scrollbar {
  display: none;
}

</style>