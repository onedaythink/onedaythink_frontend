<template>
  <template v-if="haruChatRooms.length > 0">
    <v-card class="mx-auto" v-for="(haruChatRoom, index) in haruChatRooms" :key="index">
      <v-row>
        <template v-if="haruChatRoom.userNo == 0">
          <v-col cols="3">
            <v-img class="align-end text-white" :src="haruChatRoom.haruImg" cover rounded
              style="border-radius: 50%; width: 70px; height: 70px; margin-top: 20px;">
            </v-img>
            <v-card-text style="font-size: 13px;text-align: center;">
              {{ haruChatRoom.haruName }}
            </v-card-text>
          </v-col>
          <v-col cols="9">
            <v-card-text>
              <div>
                {{ haruChatRoom.lastMessage.length > 30 ? haruChatRoom.lastMessage.substring(0, 20) + '...' :
                  haruChatRoom.lastMessage }}
              </div>
            </v-card-text>

            <v-card-actions class="button">
              <v-btn @click="goToChatRoomHaru(haruChatRoom)" variant="outlined" color="yellow-accent-4"
                class="btn-bold">입장</v-btn>
              <v-btn @click="modalSwitch(haruChatRoom.chatRoomNo)" variant="outlined" color="pink-lighten-4"
                class="btn-bold">종료</v-btn>
            </v-card-actions>
          </v-col>
        </template>
        <template v-else>
          <v-col cols="3">
            <v-img class="align-end text-white" :src="findImage(haruChatRoom.userImg)" cover rounded
              style="border-radius: 50%; width: 70px; height: 70px;">
            </v-img>
            <v-card-text>
              {{ haruChatRoom.userNickName }}
            </v-card-text>
          </v-col>
          <v-col cols="9">
            <v-card-text>
              <div>" {{ haruChatRoom.lastMessage }} "</div>
            </v-card-text>

            <v-card-actions class="button">
              <v-btn @click="goToChatRoomHaru(haruChatRoom)" variant="outlined" color="yellow-accent-4"
                class="btn-bold">입장</v-btn>
              <v-btn @click="modalSwitch(haruChatRoom.chatRoomNo)" variant="outlined" color="pink-lighten-4"
                class="btn-bold">종료</v-btn>
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
    <div style="text-align: center; color: gray;">활성화된 채팅방이 존재하지 않습니다.</div>
  </template>
</template>

<script>
export default {
  name: 'HaruChatListComp'
};
</script>

<script setup>
import { useRouter } from 'vue-router';
import { useHaruChatStore } from '@/store/haruchat';
import { useUserStore } from '@/store/user';
import { $getHaruChatRooms } from '@/api/personachat';
import { ref, nextTick, onMounted } from 'vue';
import { $closeHaruChatRoom, $getSelectedCahr } from '@/api/haruChat'

const router = useRouter()
const haruChatRooms = ref([])
const haruChatStore = useHaruChatStore()

// 채팅방 입장
function goToChatRoomHaru(haruChatRoom) {
  haruChatStore.setHaruChatRoom(haruChatRoom)
  haruChatStore.setChatRoomNo(haruChatRoom.chatRoomNo)
  console.log(haruChatRoom)
  getSelectedCahr(haruChatRoom.chatRoomNo)
  router.push({ path: '/chatroompersona' })
}

const userStore = useUserStore()
// 채팅방 리스트
function getHaruChatRooms() {
  $getHaruChatRooms(userStore.getLoginUser.userNo)
    .then(res => {
      console.log(res.data)
      haruChatRooms.value = res.data
    })
    .catch(err =>
      console.log(err)
    )
}

// 채팅방 입장 전 해당 채팅방과 연계되어 있는 하루봇 리스트를 조회해서 스토어에 담기
function getSelectedCahr(chatRoomNo) {
  $getSelectedCahr(chatRoomNo)
    .then(res => {
      const haruchatChar = res.data
      for (const h of haruchatChar) {
        h.userNo = userStore.getLoginUser.userNo
      }
      haruChatStore.setHaruchatChar(haruchatChar);
    })
    .catch(err => console.log(err))
}

// 채팅방 종료
function closeChatRoom(chatRoomNo) {
  $closeHaruChatRoom(chatRoomNo)
    .then(res => {
      console.log(res.data)
      getHaruChatRooms()
    })
    .catch(err => console.log(err))
}

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


onMounted(async () => {
  await nextTick()
  getHaruChatRooms()
})


</script>

<style scoped>
.btn-bold {
  font-weight: bold;
}

.v-row {
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
  margin:0px;
  margin-left: 5px;
  align-items: center;
}

.v-card-text {
  flex: 1 1 auto;
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.0178571429em;
  padding: 8px;
  text-transform: none;
}

.button {
  align-items: center;
  display: flex;
  flex: none;
  min-height: 52px;
  padding: 0.5rem;
  justify-content: center;
}
</style>