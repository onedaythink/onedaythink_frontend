import { defineStore } from 'pinia'
import { computed, ref } from 'vue'


export const useHaruChatStore = defineStore('haruchat', () => {

  const haruchat = ref([])
  const selectedchar = ref({})
  const haruChatRoom = ref(null)
  const chatRoomNo = ref(null)
  const getHaruchatChar = computed(() => haruchat.value)
  const getSelectedChar =  computed(() => selectedchar.value)
  const getChatRoomNo = computed(() => chatRoomNo.value)
  const getHaruChatRoom = computed(() => haruChatRoom.value)

  function setHaruchatChar(haruchatchar) {
    selectedchar.value = haruchatchar
  }

  function setChatRoomNo(chatRoomNumber){ 
    chatRoomNo.value = chatRoomNumber
    // console.log("chatRoomNo : "+chatRoomNo.value)
  }

  function setHaruChatRoom (current_chatRoom){
    haruChatRoom.value = current_chatRoom;
  }

  return {
    getHaruchatChar,
    setHaruchatChar,
    getSelectedChar,
    setChatRoomNo,
    getChatRoomNo,
    getHaruChatRoom,
    setHaruChatRoom
    
  }

})