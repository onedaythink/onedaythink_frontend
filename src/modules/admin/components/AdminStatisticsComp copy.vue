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
                <canvas id="pie-chart" ref="chartRef_user"></canvas>
              </div>
            </div>
          </v-card>
        </v-col> 
      </v-row>

      <v-row class="mt-5">
        <v-col cols="12" md="6">
          <v-card class="pa-3" flat tile>
            <v-card-title>채팅방 관리</v-card-title>
            <div class="chart-section">
              <v-list>
                <v-list-item v-if="chatList.length > 0">
                  <v-list-item-content> ● 전체 채팅방 수 : {{ totalChatRoomsCount }} 개</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content v-if="chatList.length > 0"> ● 활성화 채팅방 수 : {{ liveChatRoomsCount }} 개</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content v-if="chatList.length > 0"> ● 비활성화 채팅방 수 : {{ deadChatRoomsCount }} 개</v-list-item-content>
                </v-list-item>
              </v-list>
              <div class="chart-container">
                <canvas id="pie-chart_chatRoom" ref="chartRef_chatRoom"></canvas>
              </div>
            </div>
          </v-card>
        </v-col>

      <v-col cols="12" md="6">
        <v-card class="pa-3" flat tile>
          <v-card-title>논제 관리</v-card-title>
          <div class="chart-section">
              <v-list>
                <v-list-item v-if="subjectList.length> 0">
              <v-list-item-content> ● 전체 논제 건수 : {{ totalSubjectCount }} 건</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content v-if="subjectList.length> 0"> ● 미사용 논제 건수 : {{ unUseSubjectCount }} 건</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content v-if="subjectList.length> 0"> ● 사용된 논제 수 : {{ usedSubjectCount }} 건</v-list-item-content>
            </v-list-item>
          </v-list>
          <div class="chart-container">
                <canvas id="pie-chart_subject" ref="chartRef_subject"></canvas>
              </div>
          </div>
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
import { $getChatRoomsAll } from '@/api/chat';
import { $getSubjects } from '@/api/subject';

import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(PieController, ArcElement, Tooltip, Legend);



const userList = ref([]);
const chatList = ref([]);
const subjectList = ref([]);


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


// 전체 채팅방 조회
async function getChatRoomsAll() {
  await $getChatRoomsAll()
    .then((res) => {
      if (res.data != null || res.data != "") {
        chatList.value = res.data;
      }
    })
    .catch((err) => console.log(err));
}

// 전체 채팅방 수 계산
const totalChatRoomsCount = computed(() => {
  return chatList.value.length;
});

// 살아있는 채팅방 수 계산
const liveChatRoomsCount = computed(() => {
  return chatList.value.filter(chatroom => chatroom.isClose === 'n').length;
});

// 닫힌 채팅방 수 계산
const deadChatRoomsCount = computed(() => {
  return chatList.value.filter(chatroom => chatroom.isClose === 'y').length;
});


// 전체 논제 조회
async function getSubjects() {
  await $getSubjects()
    .then((res) => {
      if (res.data != null || res.data != "") {
        subjectList.value = res.data;
      }
    })
    .catch((err) => console.log(err));
}

// 전체 논제 수 계산
const totalSubjectCount = computed(() => {
  return subjectList.value.length;
});

// 미사용된 논제 수 계산
const unUseSubjectCount = computed(() => {
  return subjectList.value.filter(subject => subject.subDate === null).length;
});

// 사용한 논제 수 계산
const usedSubjectCount = computed(() => {
  return subjectList.value.filter(subject => subject.subDate !== null).length;
});


const chartRef_user = ref(null);
const chartRef_chatRoom = ref(null);
const chartRef_subject = ref(null);


// 데이터 갱신
onMounted(async () => {
  await nextTick()
  getUsers();
  getChatRoomsAll();
  getSubjects();


const data_user = {
    labels: ['전체 회원', '이용제한 회원', '탈퇴한 회원'],
    datasets: [
      {
        label: '회원 수',
        data: [totalUserCount.value, totalblacklistCount.value, totalSignOutCount.value],
        backgroundColor: ['red', 'orange', 'yellow'],
      },
    ],
  };

  const data_chatRoom = {
    labels: ['전체 채팅방', '활성화된 채팅방', '닫힌 채팅방'],
    datasets: [
      {
        label: '채팅방 수',
        data: [totalChatRoomsCount.value, liveChatRoomsCount.value, deadChatRoomsCount.value],
        backgroundColor: ['red', 'orange', 'yellow'],
      },
    ],
  };

  const data_subject = {
    labels: ['전체 논제', '미사용 논제', '사용된 논제'],
    datasets: [
      {
        label: '논제 수',
        data: [totalSubjectCount.value, unUseSubjectCount.value, usedSubjectCount.value],
        backgroundColor: ['red', 'orange', 'yellow'],
      },
    ],
  };

  const config_user = {
  type: 'pie',
  data: data_user,
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

  const config_chatRoom = {
    type: 'pie',
    data: data_chatRoom,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: '채팅방 관리 차트',
          },
        },
      },
    };

  const config_subject = {
  type: 'pie',
  data: data_subject,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '논제 관리 차트',
        },
      },
    },
  };

  const pieChart_user = new Chart(chartRef_user.value.getContext('2d'), config_user);

  watch([totalUserCount, totalblacklistCount, totalSignOutCount], () => {
    pieChart_user.data.datasets[0].data = [
      totalUserCount.value,
      totalblacklistCount.value,
      totalSignOutCount.value,
    ];
    pieChart_user.update();

  });

    const pieChart_chatRoom = new Chart(chartRef_chatRoom.value.getContext('2d'), config_chatRoom);

    watch([totalChatRoomsCount, liveChatRoomsCount, deadChatRoomsCount], () => {
      pieChart_chatRoom.data.datasets[0].data = [
        totalChatRoomsCount.value,
        liveChatRoomsCount.value,
        deadChatRoomsCount.value,
      ];
      pieChart_chatRoom.update();
          
  });

  const pieChart_subject = new Chart(chartRef_subject.value.getContext('2d'), config_subject);

  watch([totalSubjectCount, unUseSubjectCount, usedSubjectCount], () => {
    pieChart_subject.data.datasets[0].data = [
      totalSubjectCount.value,
      unUseSubjectCount.value,
      usedSubjectCount.value,
  ];
  pieChart_subject.update();
      
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