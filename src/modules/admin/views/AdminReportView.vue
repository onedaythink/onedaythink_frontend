<template>
  <div class="subject-card-wrapper">
    <admin-report-comp></admin-report-comp>
  </div>
</template>

<script>
import AdminReportComp from '@/modules/admin/components/AdminReportComp.vue';

export default {
  name: 'AdminReportView',
  components: {
    AdminReportComp
  },
};
</script>

<style>
/* 스크롤바 관련 설정 */
/* .subject-card-wrapper {
  height: 2000px;
  margin-top: 60px;
  margin-bottom: 60px;
} */

/* 스크롤바 숨기기 */
.subject-card-wrapper::-webkit-scrollbar {
  display: none;
}
</style>