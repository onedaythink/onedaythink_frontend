<template>
  <div class="subject-card-wrapper">
    <my-page-comp></my-page-comp>
  </div>
</template>

<script>
import MyPageComp from '@/modules/member/components/MyPageComp.vue';


export default {
  name: 'MyPageView',
  components: { MyPageComp }
};
</script>

<style>
/* 스크롤바 관련 설정 */
.subject-card-wrapper {
  max-height: 500px;
  overflow-y: auto;
  margin-top: 60px;
  margin-bottom: 60px;
}

/* 스크롤바 숨기기 */
.subject-card-wrapper::-webkit-scrollbar {
  display: none;
}
</style>