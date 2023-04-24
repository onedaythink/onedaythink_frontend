<template>
  <div class="subject-card-wrapper">
    <login-comp></login-comp>
  </div>
</template>

<script>
import LoginComp from '@/modules/member/components/LoginComp.vue';


export default {
  name: 'LoginView',
  components: {
    LoginComp
  },
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