<template>
  <div class="subject-card-wrapper">
    <admin-opinion-comp></admin-opinion-comp>
  </div>
</template>

<script>
import AdminOpinionComp from '@/modules/admin/components/AdminOpinionComp.vue';

export default {
  name: 'AdminOpinionView',
  components: {
    AdminOpinionComp
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