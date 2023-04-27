<template>
  <div>
    <v-container fluid>
      <v-row class="mt-5" align="center" justify="center">
        <v-col cols="12" md="6">
          <v-card class="mb-5 pa-3" flat tile style="margin-top: 50px">
            <v-card-title>채팅방 신고 목록</v-card-title>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>선택</th>
                    <th>신고대상 ID</th>
                    <th>신고 사유</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(report, index) in reports" :key="index">
                    <td><v-checkbox v-model="report.checked" /></td>
                    <td>{{ report.targetID }}</td>
                    <td>{{ report.reason }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-5 pa-3" flat tile style="margin-top: 50px">
            <v-card-title>신고 처리</v-card-title>
            <v-btn class="report-button1">신고 대상 ID 이용 제한 하기</v-btn>
            <v-btn class="report-button2">신고 반려 처리</v-btn>
            <v-btn class="report-button3">이용 제한 처리 완료</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "ReportManagementView",
  data() {
    return {
      reports: [
        // 예시 데이터입니다. 실제 데이터로 대체해주세요.
        { checked: false, targetID: "user1", reason: "부적절한 내용" },
        { checked: false, targetID: "user2", reason: "욕설" },
        { checked: false, targetID: "user3", reason: "스팸" },
      ],
    };
  },
};
</script>

<style scoped>
.container {
  font-family: "Inter", sans-serif;
}

.v-card {
  display: flex;
  flex-direction: column;
  height: 400px;
  border: 1px solid rgba(0, 0, 0, 0.12);
}

.v-card-title {
  font-size: 24px;
  color: #000000;
  text-align: center;
}

.v-simple-table th {
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  color: #000000;
}

.v-simple-table tbody tr {
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  color: #8d8787;
  border: 1px solid #000000;
}

.v-checkbox {
  margin: 0;
}
.report-button1 {
  width: 500px;
  height: 45px;
  margin-top: 40px;
  background: #FFD2D2;
  border-radius: 100px;
  font-family: 'Inter';
  font-style: normal;
font-weight: 400;
font-size: 25px;
line-height: 15px;
color: #000000;
}

.report-button2 {
  width: 500px;
  height: 45px;
  margin-top: 40px;
  background: #D9D9D9;
  border-radius: 100px;
  font-family: 'Inter';
  font-style: normal;
font-weight: 400;
font-size: 25px;
line-height: 15px;
color: #000000;
}

.report-button3 {
  width: 500px;
  height: 45px;
  margin-top: 40px;
  background: #FFE486;
  border-radius: 100px;
  font-family: 'Inter';
  font-style: normal;
font-weight: 400;
font-size: 25px;
line-height: 15px;
color: #000000;
}

</style>

