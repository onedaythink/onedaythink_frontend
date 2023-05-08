<template>
  <v-container fluid>
    <v-row class="mt-5">
      <v-col cols="12" md="6">
        <v-card class="mb-5 pa-3" flat tile style="margin-top: 50px">
          <v-card-title>회원 관리</v-card-title>
          <div class="chart-section">
            <v-list>
              <v-list-item v-if="userList.length > 0">
                <v-list-item-content> ● 전체 회원 수 : {{ totalUserCount }} 명</v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content v-if="userList.length > 0"> ● 이용제한 회원 수 : {{ totalblacklistCount }} 명</v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content v-if="userList.length > 0"> ● 탈퇴한 회원 수 : {{ totalSignOutCount }} 명</v-list-item-content>
              </v-list-item>
            </v-list>
            <div class="chart-container">
              <canvas id="pie-chart" ref="chartRef"></canvas>
            </div>
          </div>
        </v-card>
      </v-col> 

      <v-col cols="12" md="6">
        <v-card class="mb-5 pa-3" flat tile  style="margin-top: 50px">
          <v-card-title>신고 건수</v-card-title>
          <v-list>
            <!-- <v-list-item v-if="reportList.length > 0"> -->
            <v-list-item>
              <v-list-item-content> ● 전체 신고 건수 : {{ totalReportCount }} 건</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content> ● 처리 대기 중 신고 건수 : {{ pendingReportCount }} 건</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content> ● 처리된 신고 건수 : {{ approvedReportCount }} 건</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col> 
    </v-row>

    <v-row class="mt-5">
      <v-col cols="12" md="6">
        <v-card class="pa-3" flat tile>
          <v-card-title>채팅방 관리</v-card-title>
          <v-list>
            <v-list-item v-if="chatList.length > 0">
              <v-list-item-content> ● 전체 채팅방 수 : {{ totalChatRoomsCount }} 개</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content> ● 활성화 채팅방 수 : {{ liveChatRoomsCount }} 개</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content> ● 비활성화 채팅방 수 : {{ deadChatRoomsCount }} 개</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="pa-3" flat tile>
          <v-card-title>논제 관리</v-card-title>
          <v-list>
            <v-list-item>
              <v-list-item-content> ● 전체 논제 건수 : {{ totalSujectCount }} 건</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content> ● 미사용 논제 건수 : {{ unUseSujectCount }} 건</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content> ● 사용된 논제 수 : {{ useSujectCount }} 건</v-list-item-content>
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
}
</script>

<script setup>

import { ref, onMounted, nextTick, computed, watch } from 'vue'
import { $getUsers } from '@/api/user';
// import { $getChatRooms } from '@/api/chat';

import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(PieController, ArcElement, Tooltip, Legend);



const userList = ref([]);
const chatList = ref([]);


// 전체 회원 조회
async function getUsers() {
  await $getUsers()
    .then((res) => {
      if (res.data != null || res.data != "") {
        userList.value = res.data;
      }
    })
    .catch((err) => console.log(err));
}

// 전체 회원 수 계산
const totalUserCount = computed(() => {
  return userList.value.length;
});

// 이용제한 회원수 계산
const totalblacklistCount = computed(() => {
  return userList.value.filter(user => user.blackList === 'y').length;
});

// 탈퇴한 회원수 계산
const totalSignOutCount = computed(() => {
  return userList.value.filter(user => user.status === 'y').length;
});

// // 전체 채팅방 조회
// async function getChatRooms() {
//   await $getChatRooms()
//     .then((res) => {
//       if (res.data != null || res.data != "") {
//         chatList.value = res.data;
//       }
//     })
//     .catch((err) => console.log(err));
// }

// 전체 채팅방 수 계산
const totalChatRoomsCount = computed(() => {
  return chatList.value.length;
});

// 살아있는 채팅방 수 계산
const liveChatRoomsCount = computed(() => {
  return chatList.value.filter(user => user.blackList === 'y').length;
});

// 닫힌 채팅방 수 계산
const deadChatRoomsCount = computed(() => {
  return chatList.value.filter(user => user.status === 'y').length;
});

const chartRef = ref(null);


// 데이터 갱신
onMounted(async () => {
  await nextTick()
  getUsers();


const data = {
    labels: ['전체 회원', '이용제한 회원', '탈퇴한 회원'],
    datasets: [
      {
        label: '회원 수',
        data: [totalUserCount.value, totalblacklistCount.value, totalSignOutCount.value],
        backgroundColor: ['red', 'orange', 'yellow'],
      },
    ],
  };

  const config = {
  type: 'pie',
  data: data,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '회원 관리 차트',
      },
    },
  },
};

  const pieChart = new Chart(chartRef.value.getContext('2d'), config);

watch([totalUserCount, totalblacklistCount, totalSignOutCount], () => {
  pieChart.data.datasets[0].data = [
    totalUserCount.value,
    totalblacklistCount.value,
    totalSignOutCount.value,
  ];
  pieChart.update();
  
});
});

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
.chart-section {
  display: flex;
  justify-content: space-between;
}
.chart-container {
  width: 500px;
  height: 300px;
}
</style>