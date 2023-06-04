<template>
  <div class="subject-card-wrapper">
    <my-page-update-comp></my-page-update-comp>
  </div>
</template>

<script>
import MyPageUpdateComp from '@/modules/member/components/MyPageUpdateComp.vue';


export default {
  name: 'MyPageUpdateView',
  components: { MyPageUpdateComp }
};
</script>

<style scoped>
/* 스크롤바 관련 설정 */
.subject-card-wrapper {
  max-height: 500px;
  overflow-y: auto;
  margin-top: 30px;
  margin-bottom: 60px;
}

/* 스크롤바 숨기기 */
.subject-card-wrapper::-webkit-scrollbar {
  display: none;
}
</style>