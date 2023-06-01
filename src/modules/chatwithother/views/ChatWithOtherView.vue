<template>
  <div class="subject-card-wrapper">
      <chat-list-comp></chat-list-comp>
  </div>
</template>

<script>
import ChatListComp from '@/modules/chatwithother/components/ChatListComp.vue';
export default {
  name: 'ChatWithOtherView',
  components: {
      ChatListComp
  }
}
</script>

<style scoped>
/* 스크롤바 관련 설정 */
.subject-card-wrapper {
height: 600px;
overflow-y: auto;
margin-top: 60px;
margin-bottom: 60px;
}
/* 스크롤바 숨기기 */
.subject-card-wrapper::-webkit-scrollbar {
display: none;
}
</style>