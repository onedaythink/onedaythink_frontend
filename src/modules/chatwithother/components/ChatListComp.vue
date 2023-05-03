<template>
    <template v-if="chatRooms.length > 0">
    <v-card class="mx-auto" v-for="(chatRoom, index) in chatRooms" :key="index">
        <v-row v-if="chatRoom.chatStatus == 'w'">
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
            <div>"{{chatRoom.toNickname}}님이 회원님과 대화하고싶어해요!"</div>
        </v-card-text>
        
        <v-card-actions class="button">
        <v-btn @click="goToChatRoomOther" variant="outlined" color="yellow-accent-4" class="btn-bold" >수락</v-btn>
        <v-btn variant="outlined" color="pink-lighten-4" class="btn-bold">거절</v-btn>
        </v-card-actions>
        </v-col>
        </v-row>

        <v-row v-else>
        <v-col cols="3" >
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
            <div>{{chatRoom.toNickname}} : "난 그렇게 생각하지 않.아.요."</div>
        </v-card-text>
        
        <v-card-actions class="button">
        <v-btn @click="goToChatRoomOther" variant="outlined" color="yellow-accent-4" class="btn-bold">입장</v-btn>
        <v-btn variant="outlined" color="pink-lighten-4" class="btn-bold">종료</v-btn>
        </v-card-actions>
        </v-col>
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

const router = useRouter()
const chatRooms = ref([])

function goToChatRoomOther() {
    // 채팅방 연결
    
    router.push('/chatroomother');
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