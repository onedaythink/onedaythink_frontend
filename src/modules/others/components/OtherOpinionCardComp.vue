<template>
    <template v-if="opinion_list.length > 0">
        <v-card v-for="(opinion, index) in opinion_list" :key="index">
            <v-row>
                <v-col cols="3" class="dsssss">
                    <div>
                        <v-img class="align-end text-white xxx" :src=findImage(opinion.userImgPath) cover rounded>
                        </v-img>
                    </div>
                    <v-card-text>
                        {{ opinion.nickname }}
                        <br>
                        <v-icon color="pink" style="font-size: 12px;">mdi-heart</v-icon> {{ opinion.likeCount }}
                    </v-card-text>
                </v-col>
                <v-col cols="8">
                    <v-card-text>
                        <div>{{ opinion.opinion }}</div>
                    </v-card-text>
                    <v-card-actions class="like-talk-box">
                        <v-btn @click="likeControll(opinion.userOpiNo)" variant="outlined" color="pink" class="small">좋아요
                        </v-btn>
                        <template v-if="false">
                            <v-btn @click="goToChatRoomOther(opinion.chatRoom)" variant="outlined" color="blue-lighten-4"
                                class="btn-bold small">채팅방 입장</v-btn>
                        </template>
                        <template v-else>
                            <v-btn @click="createChatRoom(opinion.userOpiNo)" variant="outlined" color="blue-lighten-4"
                                class="btn-bold small">대화하고싶어요</v-btn>
                        </template>

                    </v-card-actions>
                </v-col>
            </v-row>
        </v-card>
    </template>

    <template v-else>
        <div style="text-align: center; color: gray;">Loading...</div>
        <!-- <div style="text-align: center; color: gray;">첫 번째로 당신의 의견을 작성해 보세요!</div> -->
    </template>
    <!-- 알람 모달창: 스낵바 -->
    <transition name="slide">
        <div v-if="snackbar" class="custom-snackbar">
            {{ message }}
        </div>
    </transition>
</template>

<script>
</script>

<script setup>
import { $getOpinionsByCreateAt, $likeControll } from '@/api/opinion'
import { $createChatRoom } from '@/api/chat'
import { useSubjectStore } from '@/store/subject'
import { useChatStore } from '@/store/chat'
import { useUserStore } from '@/store/user'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { findImage } from "@/api/index";

const userStore = useUserStore()
const subjectStore = useSubjectStore()
const opinion_list = ref({})

// 알림창 모달
let snackbar = ref(false)
let message = ref('')

async function getOpinionsByCreateAt() {
    await $getOpinionsByCreateAt(subjectStore.getSubject.subNo, userStore.getLoginUser.userNo)
        .then(res => {
            // console.log(res.data)
            opinion_list.value = res.data
        })
        .catch(err => console.log(err))
}

async function likeControll(userOpiNo) {
    await $likeControll(userStore.getLoginUser.userNo, userOpiNo, userStore.getLoginUser.nickname)
        .then(async res => {
            if (res.data == 1) {
                await getOpinionsByCreateAt()
            }
        })
        .catch(err => console.log(err))
}

// async function createChatRoom(userOpiNo) {
//     await $createChatRoom(userOpiNo, userStore.getLoginUser.userNo, userStore.getLoginUser.nickname)
//         .then(res => {
//             console.log(res.data)
//             window.alert(res.data.msg)
//         })
//         .catch(err => console.log(err))
// }

async function createChatRoom(userOpiNo) {
    await $createChatRoom(userOpiNo, userStore.getLoginUser.userNo, userStore.getLoginUser.nickname)
        .then(res => {
            // console.log(res.data)
            message.value = res.data.msg
            snackbar.value = true
            setTimeout(() => {
                snackbar.value = false
            }, 3000)
        })
        .catch(err => console.log(err))
}

function goToChatRoomOther(chatRoom) {
    // 채팅방 연결
    const router = useRouter()
    const chatStore = useChatStore()
    chatStore.setChatRoom(chatRoom)
    router.push({ path: '/chatroomother' });
}

// userImg 호출
// function findImage(userImg) {
//     if (userImg) {
//         // console.log(userImg);
//         const convertedPath = userImg.replace(/\\/g, '/');
//         return `http://localhost:8080/onedaythink/api/v1/imgfind/userImg?userImgPath=${convertedPath}`;
//     } else {
//         const defaultImg = 'src/main/resources/static/profileImages/default.png'
//         return `http://localhost:8080/onedaythink/api/v1/imgfind/userImg?userImgPath=${defaultImg}`;
//     }
// }



onMounted(async () => {
    getOpinionsByCreateAt()
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
    margin: 0px;
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
</style>

<style scoped>
/* 스낵바 설정 */
.custom-snackbar {
    background-color: #43a047;
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 16px;
    border-radius: 5px;
    margin-bottom: 20px;
    z-index: 1000;
    width: calc(70%);
    text-align: center;
    /* margin-left: -10px;
    margin-right: -10px; */
}

.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}

.slide-enter,
.slide-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

.like-talk-box {
    display: flex;
    justify-content: flex-end;
    font-size: 5px;
}

.dsssss {
    max-width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: auto 0;
}

.xxx {
    border-radius: 50%;
    width: 50px;
    height: 50px
}

</style>