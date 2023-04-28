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
      <v-spacer>생각주제</v-spacer>
      <v-btn
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="show = !show"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>
           I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>

    <v-row>
      <v-col cols="12" class="text-center">
        <h3 class="grey--text">{{ otherName }}님과의 대화</h3>
      </v-col>
    </v-row>

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
                <span class="grey--text">{{ message.sender.nickname }} {{ message.time }}</span>
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
    <v-textarea v-model="userMessage" outlined placeholder="메시지 입력" class="mb-2 message-input" @keyup.enter="sendMessageAndClear"></v-textarea>
  </v-col>
</v-row>
<v-row>
  <v-col cols="12" class="d-flex justify-end">
    <v-btn color="#FBF0A0" dark @click="sendMessage" class="send-btn">전송</v-btn>
  </v-col>
</v-row>

<!-- Add this button after the '전송' button -->
<v-btn color="#FBF0A0" dark @click="receiveMessage">Receive</v-btn>

  </v-container>
</template>
<script>
export default {
  name: "ChatRoom",
  data: () => ({
    show: false,
    otherName: "하루",
    myName: "후니",
    messages: [], // 채팅 메시지 배열
    userMessage: '',
  }),
  watch: {
    messages() {
      this.$nextTick(() => {
      const container = this.$el.querySelector(".chat-card-wrapper");
      container.scrollTop = container.scrollHeight;
    });
    },
  },
  methods: {
    // 사용자가 새로운 메시지를 입력하면 호출되는 함수
    sendMessage() {
      // userMessage가 비어있으면 함수를 종료합니다.
      if (!this.userMessage) {
        return;
      }
      // messages 배열에 새로운 메시지를 추가합니다.
      const currentTime = this.getCurrentTime();
      this.messages.push({
        sender: { nickname: this.myName, avatarUrl: '' },
        content: this.userMessage,
        time: currentTime,
      });
      // userMessage를 초기화합니다.
      this.userMessage = "";

      // 스크롤을 최신 메시지로 이동시킵니다.
      this.scrollToLatestMessage();
    },
    // sendMessage 메소드를 호출하고 userMessage를 초기화하는 함수
    sendMessageAndClear() {
      this.sendMessage();
      this.userMessage = "";
    },
    getCurrentTime() {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "pm" : "am";
      const hour = hours % 12;
      const time = `${ampm} ${hour}:${minutes < 10 ? "0" + minutes : minutes}`;
      return time;
    },
    receiveMessage() {
    const currentTime = this.getCurrentTime();
    this.messages.push({
      sender: { nickname: this.otherName, avatarUrl: '' },
      content: "미라니가 뭘 바라고 있는지 몰라서 그래??",
      time: currentTime,
    });
        // 스크롤을 최신 메시지로 이동시킵니다.
        this.scrollToLatestMessage();
  },
  
    scrollToLatestMessage() {
      this.$nextTick(() => {
        const container = this.$el.querySelector(".chat-card-wrapper");
        container.scrollTop = container.scrollHeight;
      });
    },
    goToChatWithHaru() {
      this.$router.push('/chatwithharubot');
    },
  },
};
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