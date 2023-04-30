import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {

  // 로그인 시 header 에 전달된 jwt 와 refrechindex 정보를 전역에 저장

  const user = ref(null)

  const router = useRouter()

  const getLoginUser = computed(() => user.value)

  const logout = () => {
    setLoginUser(null)
    router.push('/')
  }
  function setLoginUser (current_user) {
    user.value = current_user
    console.log(user.value)
  }

  return { getLoginUser, setLoginUser, logout }
})
