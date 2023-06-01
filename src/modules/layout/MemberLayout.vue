<template>
  <div class="v-app">
    <v-card>
      <v-layout class="right-sidebar">
        <v-app-bar color="white">
          <v-app-bar-title>
            <v-img class="logo" src="@/assets/headerlogo.png" alt="하루생각"></v-img>
          </v-app-bar-title>
          <v-spacer></v-spacer>
          <v-btn icon style="font-size: 16px; color:#877b78" @click="modalSwitch">
            <v-icon>mdi-bell</v-icon>
          </v-btn>
          <v-app-bar-nav-icon style="font-size: 16px; color:#877b78" variant="text"
            @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" location="right" temporary>
          <layout justify-center>
            <v-list style="display: flex; flex-direction: column;">
              <v-list-item prepend-icon="mdi-face" title="오늘의 생각" value="memberMainView" to="/home"></v-list-item>
              <v-list-item prepend-icon="mdi-face" title="타인의 생각" value="ohterOpinionView" to="/others"></v-list-item>
              <v-list-item prepend-icon="mdi-face" title="타인과의 대화" value="chatWithOther"
                to="/chatwithother"></v-list-item>
              <v-list-item prepend-icon="mdi-face" title="하루봇과의 대화" value="chatWithHaru"
                to="/chatwithharubot"></v-list-item>
              <v-list-item prepend-icon="mdi-face" title="나의 공간" value="myPage" to="/mypage"></v-list-item>
              <br>
              <v-btn  class="my-btn" @click="logout()"><router-link to="/login">로그아웃</router-link></v-btn>
            </v-list>
          </layout>
        </v-navigation-drawer>
        <v-main class="mainview">
          <router-view></router-view>
          <sticky-haru-comp></sticky-haru-comp>
        </v-main>
      </v-layout>
    </v-card>
    <footer-comp></footer-comp>
  </div>

  <v-dialog v-model="openModal" max-width="500px">
    <v-card>
      <v-card-title>알림</v-card-title>
      <v-btn @click="beforeAllEditNotify">전체삭제</v-btn>
      <v-card-text>
        <!-- 알림 내용을 여기에 표시 -->
        <template v-if="notifyList.length > 0">
          <div v-for="notify in notifyList" :key="notify">
            <v-row>
              <v-col v-if="notify.type == 'invite'" cols="10" @click="goToChatRoomOther(notify)">
                {{ notify.message }}
              </v-col>
              <v-col v-else cols="10">
                {{ notify.message }}
              </v-col>
              <v-col cols="2" class="text-right">
                <span class="mdi mdi-close-circle" @click="beForeEditNotify(notify)"></span>
              </v-col>
            </v-row>
          </div>
        </template>
        <template v-else>
          <div>알림이 존재하지 않습니다.</div>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" text @click="modalSwitch">닫기</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import FooterComp from '@/modules/layout/components/FooterComp.vue';
import StickyHaruComp from '@/modules/layout/components/StickyHaruComp.vue';

export default {
  name: 'MemberLayout',
  components: {
    FooterComp, StickyHaruComp
  },
  data: () => ({
    drawer: false,
    group: null
  }),
  watch: {
    group() {
      this.drawer = false
    },
  }
}
</script>

<script setup>

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useUserStore } from '@/store/user';
import { ref, nextTick, onBeforeMount, onMounted } from 'vue';
import { $getNotifies, $editNotify } from '@/api/notify';
import { useRouter } from 'vue-router';
import { useChatStore } from '@/store/chat';

const router = useRouter()

function goToChatRoomOther(notifyDetail) {
  // 채팅방 연결
  const chatStore = useChatStore()
  const chatRoom = {
    chatRoomNo: notifyDetail.chatRoomNo,
    fromNickname: notifyDetail.inviteNickname,
    toNickname: userStore.getLoginUser.nickname
  }
  chatStore.setChatRoom(chatRoom)
  console.log(notifyDetail)
  console.log(chatRoom)
  beForeEditNotify(notifyDetail)
  modalSwitch()
  router.push({ path: '/chatroomother' });
}


const userStore = useUserStore()

const logout = userStore.logout

const stompClient2 = ref(null);
const socket2 = new SockJS('http://localhost:8080/onedaythink/stomp/notify/ws');
const stomp2 = Stomp.over(socket2);
// 채팅방에 대한 구독(subscribe)을 담을 ref 변수
const subscription2 = ref(null);

// WebSocket 연결 생성 함수
function createWebSocketConnection() {
  console.log('socket function test')
  console.log(socket2)
  stomp2.connect({}, () => {
    stompClient2.value = stomp2;
    // 아직 읽지 않은 알림 목록 조회
    console.log('socket test')
    loadNotifyHistory()

    subscription2.value = stomp2.subscribe(`/sub/notify/users/${userStore.getLoginUser.userNo}`, (res) => {
      console.log(res);
      const msg = JSON.parse(res.body); // 구독하게 되면 받아오게 되는 메세지
      console.log(msg);

      notifyList.value.push(msg)

    })

    const sendData = JSON.stringify({
      userNo: userStore.getLoginUser.userNo,
      nickname: userStore.getLoginUser.nickname
    })
    stomp2.send('/pub/notify/enter', {}, sendData)

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
function beForeEditNotify(item) {
  const data = {
    notifyList: [
      item
    ]
  }
  const index = notifyList.value.indexOf(item);
  if (index > -1) {
    notifyList.value.splice(index, 1);
  }
  editNotify(data)
}

// 2) 전체 삭제를 누를 때
function beforeAllEditNotify() {
  const data = {
    notifyList: []
  }
  for (let i in notifyList.value) {
    data['notifyList'].push(notifyList.value[i])
  }
  notifyList.value = []
  editNotify(data)
}

function editNotify(data) {
  $editNotify(data)
    .then(res => {
      console.log(res.data)
    })
    .catch(err => console.log(err))
}

// stomp 접속 연결 해제
onBeforeMount(() => {
  if (stompClient2.value) {
    stompClient2.value.disconnect();
  }
})

onMounted(async () => {
  await nextTick()
  createWebSocketConnection();
})

const openModal = ref(false)

// modal 스위치하는 버튼
function modalSwitch() {
  openModal.value = !openModal.value
  console.log(openModal.value)
}

</script>

<style>

.my-btn {
  all: unset;
  font-size: 15px;
}

.v-app {
  width: 420px;
  height: 800px;
  margin: 0 auto;
}

@media (max-width: 767px) {
  .v-app {
    width: 100%;
    height: 100%;
  }
}

.logo {
  left: -15px;
}

.mainview {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  /* justify-content: flex-end; */
  position: relative;
  width: 420px;
  height: 700px;
}
</style>
