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
      <v-spacer>페르소나 챗</v-spacer>
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

    <!-- 하루봇 선택을 위한 모달 -->
    <v-dialog v-model="showModal" persistent max-width="500px">
      <v-card>
        <v-card-title>

          <input ref="searchBox" type="text" v-model="searchTerm">
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text>
          <ul>
            <li v-for="(item, index) in filteredItems" :key="index" @click="personaCheck(item)">{{ item }}</li>
          </ul>
          </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="closeModal">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card>
      <template v-for="item in target" :key="item">
        <span>{{ item }}&nbsp;</span>
      </template>
    </v-card>
    <v-textarea v-model="userMessage" ref="userMessageInput" outlined placeholder="메시지 입력" class="mb-2 message-input" @keyup="sentenceCompeletion" @keyup.enter="sendMessage"></v-textarea>
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
  name: "ChatRoomPersonaComp"
}
</script>
<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount,computed} from "vue";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useUserStore } from '@/store/user';
import { useHaruChatStore } from '@/store/haruchat';
import { useSubjectStore } from "@/store/subject";
import { $getHaruChatMessages, $sendMessage} from '@/api/haruChat';

const userStore = useUserStore()
const myName = userStore.getLoginUser.nickname
const messages = ref([])
const userMessage = ref("")

const subjectStore = useSubjectStore()
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

const stompClient = ref(null);
const socket = new SockJS('http://localhost:8080/onedaythink/stomp/ws');
const stomp = Stomp.over(socket);



// WebSocket 연결 생성 함수
function createWebSocketConnection() {
  stomp.connect({}, () => {
    stompClient.value = stomp;

      // 과거의 채팅 기록 조회
      loadChatMessageHistory()

      // 스크롤을 가장 아랫부분으로 내리기
      scrollToLatestMessage();
    });
}


// 하루봇 스토어
const haruChatStore = useHaruChatStore();
// 선택된 하루에 대한 모든 정보를 담는 변수
const selectedChar = ref({});
// 현재 페르소나 챗에 저장되어 있는 페르소나를 담아놓는 배열
const haruList = ref([])

// 스토어에 저장되어 있는 선택된 페르소나를 haruChat 변수에 담는 함수
function getSelectedChar() {
  selectedChar.value = haruChatStore.getSelectedChar;
  const l = []
  for (let char in selectedChar.value) {
      l.push(selectedChar.value[char].haruName)
    }
    haruList.value = l
    target.value = l
}

// 모달에서 검색하고 있는 문장
const searchTerm = ref('');
// 모달 온오프 여부
const showModal = ref(false)
// 모달의 검색창 포커스 확인 여부
const searchBox = ref('')
const userMessageInput = ref('')

// 문장 자동완성 관련 함수. textarea 에 @ 가 입력되면 모달창이 열리도록 설정
async function sentenceCompeletion(event) {
      const input = event.target.value;
      const lastCharacter = input[input.length - 1];
      if (lastCharacter === '@') {
        // '@' 문자가 입력되었을 때 처리할 로직을 작성합니다.
        showModal.value = true
        await nextTick(() => {
          searchBox.value.focus();
        });
      }
    }

function closeModal() {
    showModal.value = false;
    userMessageInput.value.focus();
} 

// 모달창이 열렸을 때, 검색문장이 없으면 전체 하루리스트를 띄우고, 있다면 filter를 걸어서 해당 하루만 띄우는 함수
const filteredItems = computed(() => {
  if (searchTerm.value === '') {
    return haruList.value;
  }
  return haruList.value.filter(haru => haru.includes(searchTerm.value));
});

// 모달에서 선택된 하루이름을 담는 배열
const target = ref([])
const firstSelect = ref(true)

// 모달에서 하루 선택 시 이미 담겨져 있다면 제거, 없다면 타겟 배열에 추가 후 모달 종료
function personaCheck(item) {
  if(firstSelect.value){
    target.value = []
    firstSelect.value = false
  }
  userMessage.value = userMessage.value.slice(0, userMessage.value.length - 1);
  let i = target.value.indexOf(item)
  if ( i >= 0 ) {
    target.value.pop(i)
  } else {
    userMessage.value += item
    target.value.push(item)
  }
  closeModal()
}


const sendMessage = () => {
      // userMessage가 비어있으면 함수를 종료합니다.
      if (userMessage.value == null || userMessage.value.trim() == "") {
        return;
        
      }
      // messages 배열에 새로운 메시지를 추가합니다.
      const currentTime = getCurrentTime();
      messages.value.push({
        sender: { nickname: userStore.getLoginUser.nickname, avatarUrl: '' },
        content: userMessage.value,
        time: currentTime
      });
      const sendData = {
        // chatRoomNo 은 페이지에 접속 할 때, 스토어에 저장된 챗정보에서 가지고 와야 한다.
          "chatRoomNo" : 11,
          "userNo" : userStore.getLoginUser.userNo,
          "subject" : subjectStore.getSubject.content,
          "userMsg" : userMessage.value,
      }

      const haruName = {}
      const haruPrompt = {}
      const haruNo = []

      for(const item of selectedChar.value) {
        if (target.value.includes(item.haruName)) {
          haruName[item.haruNo] = item.haruName
          haruPrompt[item.haruNo] = item.haruPrompt
          haruNo.push(item.haruNo)
        }
      }
      sendData['haruName'] = haruName
      sendData['haruPrompt'] = haruPrompt 
      sendData['haruNo'] = haruNo 

      $sendMessage(sendData)
      .then(res => {
        console.log(res.data)
        for(const item of res.data) {
          messages.value.push({
          sender: { nickname: item.haruName, avatarUrl: item.haruImgPath},
          content: item.chatMsgContent
        });
        }
      })
      .catch(err => console.log(err))
      messageClear()

      // 스크롤을 최신 메시지로 이동시킵니다.
      scrollToLatestMessage();
    }
 
  // 과거의 대화목록을 가져와서 띄워주기
async function loadChatMessageHistory() {
  await $getHaruChatMessages(userStore.getLoginUser.userNo)
  .then(res => {
    for(const item of res.data) {
          messages.value.push({
          sender: { nickname: item.haruName, avatarUrl: item.haruImgPath},
          content: item.chatMsgContent
        });
        }
  })
  .catch(err => console.log(err))
      // 스크롤을 최신 메시지로 이동시킵니다.
      scrollToLatestMessage();
}

function messageClear() {
    // userMessage를 초기화합니다.
    userMessage.value = "";
    // 타겟 초기화
    target.value = haruList.value
    firstSelect.value = true
}

onBeforeUnmount(() => {
  if (stompClient.value) {
    stompClient.value.disconnect();
  }
})

// 컴포넌트가 마운트되면 WebSocket 연결 생성 함수 실행
onMounted(async () => {
  await nextTick();
  await createWebSocketConnection();
  getSelectedChar()
});

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