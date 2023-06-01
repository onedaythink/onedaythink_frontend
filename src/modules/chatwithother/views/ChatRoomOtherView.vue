<template>
  <v-container fluid class="subject-card-wrapper">
    <v-row class="topMenuBar" style="margin-bottom: 0px;">
      <v-col cols="3" class="d-flex justify-start">
        <v-img @click="$router.go(-1)" src="@/assets/back_arrow.png" class="back-arrow"></v-img>
       
        
      </v-col>
      <v-spacer></v-spacer><v-spacer></v-spacer>
      <v-btn @click="openReportModal()" class="report-btn">
          신고하기
        </v-btn>
    </v-row>
<br>
    <!-- Add the modal for reporting -->
    <v-dialog v-model="reportDialog" max-width="290" persistent>
      <v-card>
        <v-card-title class="headline">신고 사유 선택</v-card-title>
        <v-card-text>
          <v-radio-group v-model="reportReason" row>
            <v-radio label="부적절한 내용" value="2"></v-radio>
            <v-radio label="욕설" value="3"></v-radio>
            <v-radio label="스팸" value="4"></v-radio>
            <v-radio label="기타" value="5"></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="reportDialog = false">취소</v-btn>
          <v-btn color="blue darken-1" text @click="createReport">제출</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col cols="12" class="text-center">
        <h3 class="grey--text">{{ otherName }}님과의 대화</h3>
      </v-col>
    </v-row>
    <v-card>
      <v-card-actions class="topic-btn">
        <v-spacer>생각주제</v-spacer>
        <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-card-text>
            {{ todaySubjectContent }}
          </v-card-text>
        </div>
      </v-expand-transition>
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
                <div class="d-flex" :class="message.sender.nickname === myName ? 'justify-end' : 'justify-start'">
                  <div>
                    <v-card class="mx-2"
                      :class="message.sender.nickname === myName ? 'chat-message-yellow' : 'chat-message-mint'" tile>
                      <v-card-text>
                        {{ message.content }}
                      </v-card-text>
                    </v-card>
                  </div>
                </div>
                <div>
                  <div class="d-flex grey--text"
                    :class="message.sender.nickname === myName ? 'justify-end' : 'justify-start'">{{
                      message.sender.nickname }} {{ message.time }}</div>
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
        <v-textarea v-model="userMessage" outlined placeholder="메시지 입력" class="mb-2 message-input"
        @keyup.shift.enter="inputBlank" @keyup.enter="sendMessage"></v-textarea>
      </v-col>
    </v-row>
    <v-row class="sendButtonRow">
      <v-col cols="12" class="d-flex justify-end">
        <v-btn color="#FBF0A0" dark @click="sendMessage" class="send-btn">전송</v-btn>
      </v-col>
    </v-row>

    <!-- Add this button after the '전송' button -->
    <!-- <v-btn color="#FBF0A0" dark @click="receiveMessage">Receive</v-btn> -->

  </v-container>
</template>
  
<script>
export default {
  name: "ChatRoom"
}
</script>


<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount} from "vue";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useUserStore } from "@/store/user";
import { useChatStore } from "@/store/chat";
import { $getChatMessages } from '@/api/chat';
import { $createReport } from "@/api/report";
import { useSubjectStore } from "@/store/subject";

const userStore = useUserStore()
const subjectStore = useSubjectStore()
const chatStore = useChatStore()
const todaySubjectContent = subjectStore.getSubject.content


const show = ref(false);
const reportDialog = ref(false);
const reportReason = ref('');
const otherName = ref(''); // 상대방 닉네임
const myName = userStore.getLoginUser.nickname; // 나의 닉네임
const messages = ref([]); // 채팅 메시지 배열
const userMessage = ref(""); // 전송하려는 메세지 콘텐츠
const chatRoomNo = ref(chatStore.getChatRoom.chatRoomNo); // 채팅방 이름을 저장할 ref 변수
reportDialog.value = false;


const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const hour = hours % 12;
  const time = `${ampm} ${hour}:${minutes < 10 ? "0" + minutes : minutes}`;
  return time;
};

async function scrollToLatestMessage() {
  await nextTick()
  const container = document.querySelector(".chat-card-wrapper");
  container.scrollTop = container.scrollHeight;
}

function openReportModal() {
  reportDialog.value = true;
}

//신고하기

async function createReport() {
  await $createReport(chatRoomNo.value, reportReason.value)
    .then(res => {
      console.log(res.data)
    })
    .catch(err => console.log(err))
}



const chatHistory = ref(null)

function loadChatHistory() {
  $getChatMessages(chatRoomNo.value)
    .then(res => {
      chatHistory.value = res.data
      console.log(res.data)
      // for문을 돌면서 해당 메세지의 sendUserNo 이 `나` 일 경우 오른쪽,
      // 상대방일 경우 왼쪽에 추가
      chatHistory.value.forEach(chatMsg => {
        if (myName == chatMsg.sendNickname) {
          messages.value.push({
            sender: { nickname: myName, avatarUrl: "" },
            content: chatMsg.chatMsgContent,
            time: chatMsg.chatCreateAt,
          });
        } else {
          console.log(otherName)
          // otherName.value = chatMsg.sendNickname
          messages.value.push({
            sender: { nickname: chatMsg.sendNickname, avatarUrl: "" },
            content: chatMsg.chatMsgContent,
            time: chatMsg.chatCreateAt,
          });
        }
      });
      scrollToLatestMessage();
    })
    .catch(err => console.log(err))
}


// WebSocket 연결을 담을 ref 변수
const stompClient = ref(null);

// 채팅방에 대한 구독(subscribe)을 담을 ref 변수
const subscription = ref(null);

const socket = new SockJS('http://localhost:8080/onedaythink/stomp/ws');
const stomp = Stomp.over(socket);


// function findOtherName(chatRoom) {
//   console.log(chatRoom)
//   if (myName == chatRoom.fromNickname) {
//     otherName.value = chatRoom.toNickname
//   } else {
//     otherName.value = chatRoom.fromNickname
//   }
// }

// WebSocket 연결 생성 함수
function createWebSocketConnection() {

  stomp.connect({}, () => {
    stompClient.value = stomp;

    if (myName == chatStore.getChatRoom.fromNickname) {
      otherName.value = chatStore.getChatRoom.toNickname
    } else {
      otherName.value = chatStore.getChatRoom.fromNickname
    }

    // 과거의 채팅 기록 조회
    loadChatHistory()


    // 채팅방 구독(subscribe) 요청
    subscription.value = stomp.subscribe(`/sub/chat/room/${chatRoomNo.value}`, (res) => {
      console.log(res);
      const chatMsg = JSON.parse(res.body); // 구독하게 되면 받아오게 되는 메세지
      console.log(chatMsg);
      const writer = chatMsg.sendNickname;

      if (myName == writer) {
        const currentTime = getCurrentTime();
        messages.value.push({
          sender: { nickname: myName, avatarUrl: "" },
          content: chatMsg.chatMsgContent,
          time: currentTime,
        });
      } else {
        otherName.value = chatMsg.sendNickname
        const currentTime = getCurrentTime();
        messages.value.push({
          sender: { nickname: writer, avatarUrl: "" },
          content: chatMsg.chatMsgContent,
          time: currentTime,
        });
      }
      scrollToLatestMessage();
    });

    //3. send(path, header, message)로 메세지를 보낼 수 있음
    const sendData = JSON.stringify({
      chatRoomNo: chatRoomNo.value,
      chatSendUserNo: userStore.getLoginUser.userNo,
      sendNickname: myName
    })
    stomp.send('/pub/chat/enter', {}, sendData)
  });
}

const enterSwitch = ref(true)
function inputBlank() {
  enterSwitch.value = false
}

const sendMessage = () => {
  if(!enterSwitch.value) {
        enterSwitch.value = true
        return 
  }

  // userMessage가 비어있으면 함수를 종료합니다.
  if (userMessage.value == null || userMessage.value.trim() == "") {
    userMessage.value = ''
    console.log(userMessage.value)
    return;

  } else {
    console.log(userMessage.value)
    // messages 배열에 새로운 메시지를 추가합니다.
    // const currentTime = getCurrentTime();
    console.log(myName + ":" + userMessage.value);
    const sendData = JSON.stringify({
      chatRoomNo: chatRoomNo.value,
      chatSendUserNo: userStore.getLoginUser.userNo,
      sendNickname: myName,
      chatMsgContent: userMessage.value
    })
    userMessage.value = '';
    console.log(sendData)
    stomp.send('/pub/chat/message', {}, sendData)
  }
  // 스크롤을 최신 메시지로 이동시킵니다.
  scrollToLatestMessage();
};


// 컴포넌트가 마운트되면 WebSocket 연결 생성 함수 실행
onMounted(async () => {
  await createWebSocketConnection();
});


onBeforeUnmount(() => {
    if (stompClient.value) {
      stompClient.value.disconnect();
    }
})


</script>

<style scoped>
.nickname {
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 13px;
  line-height: 17px;
  color: #000000;
}

.textArea{
  margin-right: 1px;
}
.chat-card-wrapper {
  width: 100%;
  height: 300px;
  overflow-y: auto;
  margin-right: 12px;
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
  background-color: #ffa1a1;
  color: white;
  border-radius: 5px;
}

/* 생각주제 버튼 스타일 */
.topic-btn {
  background-color: #fdfdef;
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
  margin-right: 10px;
}

.topMenuBar{
  margin-right: 30px;
}

.sendButtonRow{
    margin-top: -25px;
 }

 /* 스크롤바 관련 설정 */
.subject-card-wrapper {
  height: 600px;
  overflow-y: auto;
  margin-top: 10px;
  margin-bottom: 60px;
}

/* 스크롤바 숨기기 */
.subject-card-wrapper::-webkit-scrollbar {
  display: none;
}
/* .v-main{
    --v-layout-top: 0px !important; 
} */

</style>