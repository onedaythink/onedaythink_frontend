import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useChatStore = defineStore('chat', () => {

  const chatRoom = ref(null)

  const getChatRoom = computed(() => chatRoom.value)

  function setChatRoom (currnet_chatRoom) {
    chatRoom.value = currnet_chatRoom
  }

  return { getChatRoom, setChatRoom}
})
