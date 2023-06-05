<template>
    <v-container fluid>
      <v-row class="back-header" style="margin-bottom: 0px;">
        <v-col cols="3" class="d-flex justify-start">
          <v-img @click="$router.go(-1)"
            src="@/assets/back_arrow.png"
            class="back-arrow"
          ></v-img>
          <v-spacer></v-spacer>
        </v-col>
      </v-row>
    
      <div class="loading-box" v-if="loading">
          <div class="circles">
            <i></i>
            <i></i>
            <i></i>
          </div>
          <p style="color:#877b78; font-size: 13px;">하루가 질문에 대한 대답을 고민하고 있습니다. <br><span >{{ test_text }}</span></p>
      </div>
    <v-card>  
      <v-card-actions class="topic-btn">
        <v-spacer>하루에게 궁금한 것을 물어보세요</v-spacer>
      </v-card-actions>
    </v-card>
    <br>
    <!-- Chat messages -->
  <v-row>
    <v-col cols="12" class="d-flex justify-center">
      <v-card class="chat-card-wrapper" style="overflow-y: auto;">
        <v-card-text>
          <!-- message -->
          <v-row v-for="message in messages" :key="message.id">
            <v-col cols="12">
              <!-- Removed the v-divider element -->
              <div class="d-flex" style="align-items: center;" :class="message.sender.nickname === myName ? 'justify-end' : 'justify-start'">
                <div>
                  <v-card class="mx-2" :class="message.sender.nickname === myName ? 'chat-message-yellow' : 'chat-message-mint'" tile>
                    <v-card-text class="text-box">
                      {{ message.content }}
                    </v-card-text>
                  </v-card>
                </div>
                <div v-if="message.sender.nickname === myName">
                      <v-img class="align-end text-white" :src=findImage(message.userImgPath) cover rounded
                            style="border-radius: 50%; width: 40px; height: 40px;">
                      </v-img>
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
  <v-row class="textArea">
    <v-col cols="12">
      <v-textarea v-model="userMessage"  variant="filled" no-resize="True" outlined placeholder="메시지 입력" class="mb-2 message-input" @keyup.shift.enter="inputBlank" @keyup.enter="sendMessage" ></v-textarea>
    </v-col>
  </v-row>
  <v-row class="button">
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
import { findImage } from "@/api/index";
  

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

const loading = ref(false);
const enterSwitch = ref(true)
function inputBlank() {
  enterSwitch.value = false
}

const sendMessage = async () => {
      if(!enterSwitch.value) {
        enterSwitch.value = true
        return 
      }
      // userMessage가 비어있으면 함수를 종료합니다.
      if (userMessage.value == null || userMessage.value.trim() == "") {
        userMessage.value = '';
        return;
        
      }
      // messages 배열에 새로운 메시지를 추가합니다.
      const currentTime = getCurrentTime();
      messages.value.push({
        sender: { nickname: userStore.getLoginUser.nickname, avatarUrl: '' },
        content: userMessage.value,
        time: currentTime
      });
      const msg = userMessage.value.trim()
      userMessage.value = '';
      await receiveMessage(msg)
      // userMessage를 초기화합니다.

      // 스크롤을 최신 메시지로 이동시킵니다.
      scrollToLatestMessage();
    }


async function receiveMessage(msg) {
  loading.value = true
  await $questionForHaru(msg)
  .then(res => {
    const answer = res.data
    messages.value.push({
      sender: { nickname: otherName.value, avatarUrl: '' },
      content: answer.content
    });
  })
  .catch(err => console.log(err))
    loading.value = false
    // 스크롤을 최신 메시지로 이동시킵니다.
    scrollToLatestMessage();
}

// function findImage(userImg) {
//   if (userImg) {
//     console.log(userImg);
//     const convertedPath = userImg.replace(/\\/g, '/');
//     return `http://localhost:8080/onedaythink/api/v1/imgfind/userImg?userImgPath=${convertedPath}`;
//   } else {
//     const defaultImg = 'src/main/resources/static/profileImages/default.png'
//     return `http://localhost:8080/onedaythink/api/v1/imgfind/userImg?userImgPath=${defaultImg}`;
//   }
// }

</script>
<style scoped>
:root {
  --v-layout-top: 0px;
}
.nickname {
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 13px;
  line-height: 17px;
  color: #000000;
}

.textArea{
  margin-right: 8px;
}

.button{
  margin-right: 3px;
  margin-top: -30px;
 
}
.chat-card-wrapper{
  width: 100%;
  height: 300px;
  overflow-y: auto;
  margin-right: 15px;
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



  .loading-box {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 100; 
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 300px;
  text-align: center;
  background: #fffeef;
  box-shadow: 0 3px 0 rgba(0, 0, 0, .2);
}

.loading-box .circles {
  padding-top: 10px;
}

.loading-box .circles i {
  animation: scaleBounce .3s alternate infinite;
  display: inline-block;
  margin: 0 4px;
  width: 10px;
  height: 10px;
  background: #ffe101;
  border-radius: 50em;
}

.loading-box .circles i:nth-child(2) {
  animation-delay: .1s;
}

.loading-box .circles i:nth-child(3) {
  animation-delay: .2s;
}

.loading-box p {
  margin-top: 20px;
  font-size: 18px;
}

@keyframes scaleBounce {
  from {
    transform: scale(.7)
  }

  to {
    transform: scale(1.3)
  }
}
.text-box {
  padding: 0.5rem;
}

</style>