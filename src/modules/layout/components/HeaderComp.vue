<template>

  <v-card max-width="448" class="mx-auto" color="grey-lighten-3">
   <v-layout>
    <v-app-bar
    color="white"
    >
    
    <v-app-bar-title></v-app-bar-title>
    
    <v-spacer></v-spacer>
    
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      
      <v-btn icon @click="modalSwitch">
        <v-icon class="" style="font-size: 9px;">mdi-bell</v-icon>
      </v-btn>
      
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      
    </v-app-bar>
  
    <v-main>
      
    </v-main>
    </v-layout>
  </v-card>

  <v-dialog v-model="openModal" max-width="500px">
      <v-card>
        <v-card-title>알림</v-card-title>
        <v-card-text>
          <!-- 알림 내용을 여기에 표시 -->
          <div v-for="notification in notifications" :key="notification.id">
            {{ notification.message }}
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="modalSwitch">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

</template>
  
<script>
export default {
  name:'HeaderComp'
}
</script>

<!-- <script setup> -->
import SockJS from 'socketjs-client';
import Stomp from 'stompjs';
import { useUserStore } from '@/store/user';
import { ref, nextTick, onBeforeMount, onMounted } from 'vue';
import {$getNotifies, $editNotify} from '@/api/notify';

const userStore = useUserStore()
const stompClient = ref(null);
const socket = new SockJS('http://localhost:8080/onedaythink/stomp/notify/ws');
const stomp = Stomp.over(socket);

// WebSocket 연결 생성 함수
function createWebSocketConnection() {
  console.log('test')
  stomp.connect({}, () => {
    stompClient.value = stomp;
      // 아직 읽지 않은 알림 목록 조회
      loadNotifyHistory()
    });
}

const notifyList = ref([])

function loadNotifyHistory() {
  $getNotifies(userStore.getLoginUser.userNo)
  .then(res => {
    console.log(res.data)
    notifyList.value = res.data
  })
  .catch(err => console.log(err))
}

// 읽음처리하는 함수
// 1) 하나씩 삭제할 때
function beForeEditNotify(item){
  let notifyList = {"notiNo" : item}
  const data = {
            notifyList : [
              {'notiNo' : item}
            ]
        }
  editNotify(data)
}

// 2) 전체 삭제를 누를 때
function beforeAllEditNotify(){
  const data = {
            notifyList : []
        }
    for(let i in notifyList) {
        let notifyData = {}
        notifyData['notiNo'] = notifyList[i]
        data['notifyList'].push(notifyData)
    }
    // 예시 데이터
    // {
    //     "notifyList" : [
    //         {"notiNo" : "10"},
    //         {
    //          "notiNo" : "20"
    //         }
    //     ]
    // }
  editNotify(data)
}

function editNotify(data){
  $editNotify(data)
  .then(res => {
    console.log(res.data)
  })
  .catch(err => console.log(err))
}

onMounted(async () => {
  await nextTick()
  await createWebSocketConnection();
  await loadNotifyHistory();
})

// stomp 접속 연결 해제
onBeforeMount(() => {
  if (stompClient.value) {
    stompClient.value.disconnect();
  }
})

const openModal = ref(false)

// modal 스위치하는 버튼
function modalSwitch() {
  openModal.value = !openModal.value
  console.log(openModal.value)
}

</script>

<style>

</style>