<template>
  <div class="subject-card-wrapper">
    <sign-up-form-comp></sign-up-form-comp>
  </div>
</template>

<script>
import SignUpFormComp from "@/modules/member/components/SignUpFormComp.vue";

export default {
  name: "SignUpView",
  components: {
    SignUpFormComp,
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