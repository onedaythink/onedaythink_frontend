<template>
  <v-container fluid>
    <v-row class="mt-5">
      <v-col cols="12" md="6">
        <v-card class="mb-5 pa-3" flat tile style="margin-top: 50px">
          <v-card-title>회원 관리</v-card-title>
          <v-list>
            <v-list-item>
              <v-list-item-content> ● 전체 회원 수: {{ totalMembers }} 명</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content> ● 일일 가입 회원 수: {{ dailyJoinedMembers }} 명</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content> ● 탈퇴한 회원 수: {{ withdrawnMembers }} 명</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="mb-5 pa-3" flat tile  style="margin-top: 50px">
          <v-card-title>신고 건수</v-card-title>
          <v-list>
            <v-list-item>
              <v-list-item-content> ● 처리 대기 중 신고 건수: {{ pendingReports }} 건</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content> ● 승인 신고 건수: {{ approvedReports }} 건</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col> 
    </v-row>

    <v-row class="mt-5">
      <v-col cols="12" md="6">
        <v-card class="pa-3" flat tile>
          <v-card-title>대화방 관리</v-card-title>
          <v-list>
            <v-list-item>
              <v-list-item-content> ● 일일 개설된 대화방 수: {{ dailyCreatedRooms }} 개</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="pa-3" flat tile>
          <v-card-title>논제 제안 건수</v-card-title>
          <v-list>
            <v-list-item>
              <v-list-item-content> ● 새로운 논제 제안 건수: {{ newProposals }} 건</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content> ● 반영 처리 된 논제 건수: {{ implementedProposals }} 건</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content> ● 누적 논제 수: {{ totalProposals }} 건</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AdminStatisticsView",
  data() {
    return {
      totalMembers: 1000,
      dailyJoinedMembers: 50,
      withdrawnMembers: 10,
      pendingReports: 30,
      approvedReports: 20,
      dailyCreatedRooms: 15,
      newProposals: 10,
      implementedProposals: 5,
      totalProposals: 150,
    };
  },
};
</script>

<style scoped>
.v-card {
  display: flex;
  flex-direction: column;
  height: 400px;
  border: 1px solid rgba(0, 0, 0, 0.12);
}

.v-card-title {
  flex-shrink: 0;
}

.v-list {
  flex-grow: 1;
}

body {
  margin-bottom: 4rem;
}
</style>