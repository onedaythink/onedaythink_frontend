import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

export const useSubjectStore = defineStore('subejct', () => {

  const subject = ref(null)

  const router = useRouter()

  const getSubject = computed(() => subject.value)

  const removeSubject = () => {
    setSubject(null)
    router.push('/')
  }
  function setSubject (currnet_subject) {
    subject.value = currnet_subject
    console.log(subject.value)
  }

  return { getSubject, setSubject, removeSubject }
})
