import { defineStore } from 'pinia'
import { computed, ref } from 'vue'


export const useHaruChatStore = defineStore('haruchat', () => {

  const haruchat = ref(null)

  const getHaruchatChar = computed(() => haruchat.value)

  function setHaruchatChar(haruchatChar) {
    haruchat.value = haruchatChar
    console.log(haruchat.value)
  }

  return { getHaruchatChar, setHaruchatChar }
})