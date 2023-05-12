<template>
    <template v-if="chatRooms.length > 0">
    <v-card class="mx-auto" v-for="(chatRoom, index) in chatRooms" :key="index">
        <v-row>
        <template v-if="chatRoom.lastMessage != null && chatRoom.lastMessage != ''">
            <v-col cols="3">
            <v-img
                class="align-end text-white"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                cover
                rounded
                style="border-radius: 50%; width: 70px; height: 70px;"  
            >
            </v-img>
                <v-card-text>
                    {{chatRoom.toNickname}}
                </v-card-text>
                </v-col>
                <v-col cols="9">
                <v-card-text>
                    <div>{{chatRoom.sendNickname}} : {{ chatRoom.lastMessage }} </div>
                </v-card-text>
                <v-card-actions class="button">
            <v-btn @click="goToChatRoomOther(chatRoom)" variant="outlined" color="yellow-accent-4" class="btn-bold" >입장</v-btn>
            <v-btn variant="outlined" color="pink-lighten-4" class="btn-bold">종료</v-btn>
            </v-card-actions>
            </v-col>
        </template>
        <template v-else>
            <v-col cols="3">
            <v-img
                class="align-end text-white"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                cover
                rounded
                style="border-radius: 50%; width: 70px; height: 70px;"  
            >
            </v-img>
                <v-card-text>
                {{chatRoom.fromNickname}}
                </v-card-text>
                </v-col>
                <v-col cols="9">
                <template v-if="chatRoom.fromUserNo == userStore.getLoginUser.userNo">
                    <v-card-text>
                        <div>"{{chatRoom.toNickname}} 에게 초대 메세지를 보냈습니다!" </div>
                    </v-card-text>
                </template>
                <template v-else>
                    <v-card-text>
                        <div>"{{chatRoom.toNickname}} 님이 회원님과 대화하고싶어해요!" </div>
                    </v-card-text>
                </template>
                <v-card-actions class="button">
            <v-btn @click="goToChatRoomOther(chatRoom)" variant="outlined" color="yellow-accent-4" class="btn-bold" >입장</v-btn>
            <v-btn variant="outlined" color="pink-lighten-4" class="btn-bold">종료</v-btn>
            </v-card-actions>
            </v-col>
        </template>
        </v-row>
    </v-card>
    <br>
    </template>
    <template v-else>
        <div>활성화된 채팅방이 존재하지 않습니다.</div>
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
import {$getChatRooms} from '@/api/chat'
import { ref, nextTick, onMounted } from 'vue'
import { useChatStore } from '@/store/chat';

const router = useRouter()
const chatRooms = ref([])

function goToChatRoomOther(chatRoom) {
    // 채팅방 연결
    const chatStore = useChatStore()
    chatStore.setChatRoom(chatRoom)
    console.log(chatRoom.value)
    router.push({path:'/chatroomother'});
}

const userStore = useUserStore()

function getChatRooms() {
    $getChatRooms(userStore.getLoginUser.userNo)
    .then(res => {
        console.log(res.data)
        chatRooms.value = res.data
    })
    .catch(err => console.log(err))
}

onMounted( async () => {
    await nextTick()
    getChatRooms()
})

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