import { defineStore } from 'pinia'
import { computed, ref } from 'vue'


export const useHaruChatStore = defineStore('haruchat', () => {

  const haruchat = ref([])
  const selectedchar = ref({})
  const chatRoomNo = ref(null)
  const getHaruchatChar = computed(() => haruchat.value)
  const getSelectedChar =  computed(() => selectedchar.value)

  function setHaruchatChar(haruchatchar) {
    selectedchar.value = haruchatchar
    console.log("store 저장된 값" + selectedchar.value)
  }

  function setChatRoomNo(chatRoomNumber){ 
    
    chatRoomNo.value = chatRoomNumber
    console.log("chatRoomNo : "+chatRoomNo.value)
  }

  return {
    getHaruchatChar,
    setHaruchatChar,
    getSelectedChar,
    setChatRoomNo
  }

})