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

const userStore = useUserStore()
const myName = userStore.getLoginUser.nickname
// const otherName = ref('')
const messages = ref([])
const userMessage = ref("")

const selectedChar = ref({});
const haruChatStore = useHaruChatStore();

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
  console.log('test')
  stomp.connect({}, () => {
    stompClient.value = stomp;

      // 과거의 채팅 기록 조회
      // loadChatHistory()

      // api 테스트
      // 지금은 테스트를 위해서 여기에 axios 를 만들었지만
      // 실제로 하실 때에는 api/ 폴더에 하루챗.js 만들어서 해주세요!
      // const axios = createJsonAxiosInstance()
      // axios.get('haruchat/test')
      // .then(res => {console.log(res.data)})
      // .catch(err => console.log(err))

      // 스크롤을 가장 아랫부분으로 내리기
      scrollToLatestMessage();
    });
}


const haruList = ref([])

function getSelectedChar() {
  selectedChar.value = haruChatStore.getSelectedChar;
  const l = []
  for (let char in selectedChar.value) {
      l.push(selectedChar.value[char].haruName)
    }
    haruList.value = l
    console.log(haruList.value)
}

const searchTerm = ref('');
const showModal = ref(false)
const searchBox = ref('')
const userMessageInput = ref('')

async function sentenceCompeletion(event) {
      const input = event.target.value;
      const lastCharacter = input[input.length - 1];
      if (lastCharacter === '@') {
        // '@' 문자가 입력되었을 때 처리할 로직을 작성합니다.
        console.log('자동 완성 기능을 실행합니다.');
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
const filteredItems = computed(() => {
  if (searchTerm.value === '') {
    return haruList.value;
  }
  return haruList.value.filter(haru => haru.includes(searchTerm.value));
});

const target = []

function personaCheck(item) {
  userMessage.value = userMessage.value.slice(0, userMessage.value.length - 1);
  userMessage.value += item
  target.push(item)
  console.log(target)
  closeModal()
}


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
      // userMessage를 초기화합니다.
      userMessage.value = "";

      // 스크롤을 최신 메시지로 이동시킵니다.
      scrollToLatestMessage();
    }
 
  // 과거의 대화목록을 가져와서 띄워주기
async function loadChatMessageHistory() {
  // await $questionForHaru(userMessage.value)
  // .then(res => {
  //   const answer = res.data
  //   messages.value.push({
  //     sender: { nickname: otherName.value, avatarUrl: '' },
  //     content: answer.content
  //   });
  // })
  // .catch(err => console.log(err))
  //     // 스크롤을 최신 메시지로 이동시킵니다.
  //     scrollToLatestMessage();
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
  await loadChatMessageHistory();
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