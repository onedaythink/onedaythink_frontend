<template>
  <div class="subject-card-wrapper">
    <main-comp></main-comp>
  </div>
</template>

<script>
import MainComp from '@/modules/member/components/MainComp.vue';


export default {
  name: 'MainView',
  components: {
    MainComp
  },
};
</script>

<style scoped>
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