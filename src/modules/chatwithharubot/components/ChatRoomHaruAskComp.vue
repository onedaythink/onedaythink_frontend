<template>
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="d-flex justify-start">
          <v-img @click="$router.go(-1)"
            src="@/assets/back_arrow.png"
            class="back-arrow"
          ></v-img>
          <v-spacer></v-spacer>
        </v-col>
      </v-row>
  
    <v-card>
      <v-card-actions class="topic-btn">
        <v-spacer>하루에게 궁금한 것을 물어보세요</v-spacer>
      </v-card-actions>
    </v-card>
  
    <!-- Chat messages -->
  <v-row>
    <v-col cols="12" class="d-flex justify-center">
      <v-card class="chat-card-wrapper" style="overflow-y: auto;">
        <v-card-text>
          <!-- message -->
          <v-row v-for="message in messages" :key="message.id">
            <v-col cols="12">
              <!-- Removed the v-divider element -->
              <div class="d-flex" :class="message.sender.nickname === myName ? 'justify-end' : 'justify-start'">
                <div>
                  <v-card class="mx-2" :class="message.sender.nickname === myName ? 'chat-message-yellow' : 'chat-message-mint'" tile>
                    <v-card-text>
                      {{ message.content }}
                    </v-card-text>
                  </v-card>
                </div>
              </div>
              <div> 
                  <div class="d-flex grey--text" :class="message.sender.nickname === myName ? 'justify-end' : 'justify-start'">{{ message.sender.nickname }} {{ message.time }}</div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  
  <!-- Message input -->
  <v-row>
    <v-col cols="12">
      <v-textarea v-model="userMessage" outlined placeholder="메시지 입력" class="mb-2 message-input" @keyup.enter="sendMessage"></v-textarea>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" class="d-flex justify-end">
      <v-btn color="#FBF0A0" dark @click="sendMessage" class="send-btn">전송</v-btn>
    </v-col>
  </v-row>
  
    </v-container>
  </template>

<script>
export default {
    name: "ChatRoomHaruAskComp"
}
</script>
<script setup>
import { ref, nextTick } from "vue";
import { useUserStore } from '@/store/user';
import { $questionForHaru } from '@/api/flask';
  

const userStore = useUserStore()
const myName = userStore.getLoginUser.nickname
const otherName = ref('하루')
const messages = ref([])
const userMessage = ref("")

async function scrollToLatestMessage() {
      await nextTick()
      const container = document.querySelector(".chat-card-wrapper");
      container.scrollTop = container.scrollHeight;
  }

const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const hour = hours % 12;
    const time = `${ampm} ${hour}:${minutes < 10 ? "0" + minutes : minutes}`;
    return time;
  };

const sendMessage = () => {
      // userMessage가 비어있으면 함수를 종료합니다.
      if (userMessage.value == null || userMessage.value.trim() == "") {
        console.log(userMessage.value)
        return;
        
      }
      // messages 배열에 새로운 메시지를 추가합니다.
      const currentTime = getCurrentTime();
      messages.value.push({
        sender: { nickname: userStore.getLoginUser.nickname, avatarUrl: '' },
        content: userMessage.value,
        time: currentTime
      });
      receiveMessage()
      // userMessage를 초기화합니다.
      userMessage.value = "";

      // 스크롤을 최신 메시지로 이동시킵니다.
      scrollToLatestMessage();
    }


async function receiveMessage() {
  await $questionForHaru(userMessage.value)
  .then(res => {
    const answer = res.data
    messages.value.push({
      sender: { nickname: otherName.value, avatarUrl: '' },
      content: answer.content
    });
  })
  .catch(err => console.log(err))
      // 스크롤을 최신 메시지로 이동시킵니다.
      scrollToLatestMessage();
}

</script>
<style scoped>
.nickname {
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 13px;
  line-height: 17px;
  color: #000000;
}

.chat-card-wrapper{
  width: 100%;
  height: 300px;
  overflow-y: auto;
}

.chat-message-mint {
  background-color: #d1f0ee;
  border-radius: 6px;
}

.chat-message-yellow {
  background-color: #f5d76e;
  border-radius: 6px;
}

.chat-message-mint {
    background-color: #d1f0ee;
    border-radius: 6px;
  }
  .chat-card-wrapper::-webkit-scrollbar {
    width: 8px;
  }

  .chat-card-wrapper::-webkit-scrollbar-thumb {
    background-color: #B5B5B5;
    border-radius: 4px;
  }

  .chat-card-wrapper::-webkit-scrollbar-track {
    background-color: #F5F5F5;
  }

  /* 뒤로가기 버튼 스타일  */
  .back-arrow {
    width: 10px;
    height: 20px;
    cursor: pointer;
  }

  /* 신고하기 버튼 스타일 */
  .report-btn {
    background-color: #FF4C4C;
    color: white;
    border-radius: 5px;
  }

  /* 생각주제 버튼 스타일 */
  .topic-btn {
    background-color: #d1f0ee;
    color: #2C2C2C;
    border-radius: 3px;
  }

  /* 메시지 입력창 스타일 */
  .message-input {
    background-color: #F5F5F5;
    border: 1px solid #E0E0E0;
    border-radius: 10px;
  }

  /* 전송 버튼 스타일 */
  .send-btn {
    background-color: #FED800;
    color: #2C2C2C;
    border-radius: 5px;
  }
  </style>