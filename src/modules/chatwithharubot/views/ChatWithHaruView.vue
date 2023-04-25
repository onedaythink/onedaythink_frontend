<template>
    <div class="button-wrapper">
     <v-btn variant="outlined" color="blue-lighten-3" class="btn-bold">하루봇들과 대화하기♥</v-btn>   
    </div>
    <div class="subject-card-wrapper">
        <chat-list-haru-comp></chat-list-haru-comp>
    </div>
</template>

<script>
import ChatListHaruComp from '@/modules/chatwithharubot/components/ChatListHaruComp.vue';

export default {
    name: 'ChatWithHaruView',
    components: {
        ChatListHaruComp
    }
}

</script>

<style>
/* 스크롤바 관련 설정 */
.subject-card-wrapper {
  height: 500px;
  overflow-y: auto;
  margin-top: 60px;
  margin-bottom: 60px;
}

/* 스크롤바 숨기기 */
.subject-card-wrapper::-webkit-scrollbar {
  display: none;
}

.button-wrapper {
    margin-top: 30px;
    text-align : center;
}
</style>