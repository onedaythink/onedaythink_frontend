<template>
    <div class="subject-card-wrapper">
        <chat-room-persona-comp></chat-room-persona-comp>
    </div>
</template>

<script>
import ChatRoomPersonaComp from '@/modules/chatwithharubot/components/ChatRoomPersonaComp.vue';

export default {
    name: 'ChatRoomPersonaView',
    components: {
        ChatRoomPersonaComp
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


</style>