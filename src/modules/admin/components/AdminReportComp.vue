<template>
  <v-table class="custom-table" density="compact">
    <thead>
      <tr>
        <th class="text-left th-header">
          사용자 닉네임
        </th>
        <th class="text-left th-header">
          신고사유
        </th>
        <th class="text-left th-header">
          현재상태
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in ReportList" :key="item.userNo">
        <td>{{ item.nickName }}</td>
        <td>{{ getReportReason(item.rtno) }}</td>
        <td style="display: flex;
    justify-content: space-between;">
          <select v-model="item.reportResult">
            <option value="W">대기 상태</option>
            <option value="Y">승인</option>
            <option value="N">거절</option>
          </select>
          <v-btn class="ml-4 small confirm">확인</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  name: "ReportManagementView",
  methods: {
    getReportReason(reportType) {
      if (reportType === 2) {
        return "부적절한 내용";
      } else if (reportType === 3) {
        return "욕설";
      } else if (reportType === 4) {
        return "스팸";
      } else if (reportType === 5) {
        return "기타";
      } else {
        return reportType;
      }
    },
    getReportStatus(status) {
      if (status === 'W') {
        return "대기 상태";
      } else if (status === 'Y') {
        return "승인";
      } else if (status === 'N') {
        return "거절";
      }
    }
  }
};
</script>
<script setup>
import { ref, onMounted } from 'vue';
import { $getReport } from '@/api/report';

const ReportList = ref([]);

async function getReport() {
  try {
    const res = await $getReport();
    if (res.data != null || res.data != '') {
      ReportList.value = res.data;
    }
  } catch (err) {
    console.log(err);
  }
}

onMounted(getReport);
</script>

<style scoped>
.th-header {
  background-color: #F5F5F5;
  color: #000000;
  font-weight: bold;
}

.custom-table {
  width: 80%;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
}

.confirm {
  font-size: 12px;
  padding: 4px 8px;
  background-color: rgb(251, 240, 160);
  width: 19px;
  height: 26px;
  margin: 2px;
}
</style>
