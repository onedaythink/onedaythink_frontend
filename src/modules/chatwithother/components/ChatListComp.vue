<template>
    <template v-if="chatRooms.length > 0">
        <v-card class="mx-auto" v-for="(chatRoom, index) in chatRooms" :key="index">
            <v-row>
                <template v-if="chatRoom.lastMessage != null && chatRoom.lastMessage != ''">
                    <v-col cols="3" style="display: flex;  flex-direction: column; align-items: center; text-align: center;"> 
                        <v-img class="align-end text-white" src="https://i.ibb.co/jfvCkSZ/basicprofile.jpg" cover rounded
                            style="border-radius: 50%; width: 50px; height: 50px; margin-top: 20px;">
                        </v-img>
                        <template v-if="chatRoom.fromUserNo == userStore.getLoginUser.userNo">
                            <v-card-text>
                                {{ chatRoom.toNickname }}
                            </v-card-text>
                        </template>
                        <template v-else>
                            {{ chatRoom.fromNickname }}
                        </template>
                    </v-col>
                    <v-col cols="9">
                        <v-card-text>
                            <div>{{ chatRoom.sendNickname }} : {{ chatRoom.lastMessage }} </div>
                        </v-card-text>
                        <v-card-actions class="button">
                            <v-btn @click="goToChatRoomOther(chatRoom)" variant="outlined" color="yellow-accent-4"
                                class="btn-bold">입장</v-btn>
                            <v-btn variant="outlined" color="pink-lighten-4" class="btn-bold"
                                @click="modalSwitch(chatRoom.chatRoomNo)">종료</v-btn>
                        </v-card-actions>
                    </v-col>
                </template>
                <template v-else>
                    <v-col cols="3" style="text-align: center;">
                        <v-img class="align-end text-white" src="https://i.ibb.co/jfvCkSZ/basicprofile.jpg" cover rounded
                            style="border-radius: 50%; width: 50px; height: 50px;  margin-top: 20px;">
                        </v-img>
                        <template v-if="chatRoom.fromUserNo == userStore.getLoginUser.userNo">
                            <v-card-text>
                                {{ chatRoom.toNickname }}
                            </v-card-text>
                        </template>
                        <template v-else>
                            {{ chatRoom.fromNickname }}
                        </template>
                    </v-col>
                    <v-col cols="9">
                        <template v-if="chatRoom.fromUserNo == userStore.getLoginUser.userNo">
                            <v-card-text>
                                <div>"{{ chatRoom.toNickname }} 에게 초대 메세지를 보냈습니다!" </div>
                            </v-card-text>
                        </template>
                        <template v-else>
                            <v-card-text>
                                <div>"{{ chatRoom.fromNickname }} 님이 회원님과 대화하고싶어해요!" </div>
                            </v-card-text>
                        </template>
                        <v-card-actions class="button">
                            <v-btn @click="goToChatRoomOther(chatRoom)" variant="outlined" color="yellow-accent-4"
                                class="btn-bold">입장</v-btn>
                            <v-btn variant="outlined" color="pink-lighten-4" class="btn-bold"
                                @click="modalSwitch(chatRoom.chatRoomNo)">종료</v-btn>
                        </v-card-actions>
                    </v-col>
                </template>
            </v-row>
        </v-card>
        <br>
        <v-dialog v-model="showConfirmationDialog" max-width="500px">
            <v-card>
                <v-card-title class="headline">정말로 종료하시겠습니까?</v-card-title>
                <v-card-actions>
                    <v-btn color="red" text @click="confirmExit">종료</v-btn>
                    <v-btn text @click="cancelExit">취소</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </template>
    <template v-else>
        <div style="text-align:center;">활성화된 채팅방이 존재하지 않습니다.</div>
    </template>
</template>

<script>
export default {
    name: 'ChatListComp'
}
</script>

<script setup>
import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router';
import {$getChatRooms, $closeChatRoom} from '@/api/chat'
import { ref, nextTick, onMounted, onBeforeUnmount, watch } from 'vue'
import { useChatStore } from '@/store/chat';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const router = useRouter()
const chatRooms = ref([])

function goToChatRoomOther(chatRoom) {
    // 채팅방 연결
    const chatStore = useChatStore()
    chatStore.setChatRoom(chatRoom)
    console.log(chatRoom)
    router.push({ path: '/chatroomother' });
}

const userStore = useUserStore()

function closeChatRoom(chatRoomNo){

    $closeChatRoom(chatRoomNo)
        .then(res => {
            console.log(res.data)
            getChatRooms()
        })
        .catch(err => console.log(err))
}

onMounted(async () => {
    await nextTick()
    getChatRooms()
})

function getChatRooms() {
    $getChatRooms(userStore.getLoginUser.userNo)
    .then(res => {
        chatRooms.value = res.data.map(room => {
        return {
          ...room,
          lastMessage: ref(room.lastMessage)
        };
      });
      for(let i of chatRooms.value) {
        console.log(i)
        init(i)
      }
    })
    .catch(err => console.log(err))
}

watch(chatRooms, (newChatRooms) => {
  newChatRooms.forEach((room) => {
    watch(() => room.lastMessage, (newValue) => {
      console.log(`Updated lastMessage in chatRoomNo ${room.chatRoomNo}:`, newValue);
    });
  });
}, { deep: true });

const activeSubscriptions = [];

function init(chatRoom) {
  const stompClient = ref(null);
  const socket = new SockJS('http://localhost:8080/onedaythink/stomp/ws');
  const stomp = Stomp.over(socket);
  console.log(chatRoom.chatRoomNo);

  // Check if a subscription already exists for the chat room
  if (activeSubscriptions.includes(chatRoom.chatRoomNo)) {
    // Subscription already exists, no need to create a new one
    return;
  }

  stomp.connect({}, () => {
    stompClient.value = stomp;
    const subscriptionId = `sub-${chatRoom.chatRoomNo}`;
    // 채팅방 구독(subscribe) 요청
    const subscription = stomp.subscribe(`/sub/chat/room/${chatRoom.chatRoomNo}`, (res) => {
      console.log(res);
      const chatMsg = JSON.parse(res.body); // 구독하게 되면 받아오게 되는 메세지
      console.log(chatMsg);
      const writer = chatMsg.sendNickname;

      // Update the lastMessage property of the chatRoom
      chatRoom.lastMessage = chatMsg.chatMsgContent; // Assuming the message is stored in the 'message' property
      chatRoom.sendNickname = chatMsg.sendNickname;

    },  { id: subscriptionId });

    // Store the chat room subscription ID in the activeSubscriptions array
    activeSubscriptions.push(chatRoom.chatRoomNo);
  });
}


onBeforeUnmount(() => {
    // chatRooms.value.forEach((chatRoom) => {
    //     if (chatRoom.stompClient.value) {
    //     chatRoom.stompClient.value.disconnect();
    //     }
    // })
})

// 모달 부분
const showConfirmationDialog = ref(false)
const removeChatRoomNo = ref(0)
function modalSwitch(chatRoomNo) {
    showConfirmationDialog.value = true
    removeChatRoomNo.value = chatRoomNo
}

function confirmExit() {
    closeChatRoom(removeChatRoomNo.value);
    showConfirmationDialog.value = false;
}

function cancelExit() {
    removeChatRoomNo.value = 0
    showConfirmationDialog.value = false;
}
</script>

<style>
.btn-bold {
    font-weight: bold;
}

.v-row {
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 auto;
    margin-left: 5px;
}

.v-card-text {
    flex: 1 1 auto;
    font-size: 0.875rem;
    font-weight: 400;
    letter-spacing: 0.0178571429em;
    padding: 8px;
    text-transform: none;
}

.buttton {
    align-items: center;
    display: flex;
    flex: none;
    min-height: 52px;
    padding: 0.5rem;
    margin-left: 100px;
}
</style>