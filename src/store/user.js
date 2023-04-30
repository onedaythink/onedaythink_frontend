import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {

  // 로그인 시 header 에 전달된 jwt 와 refrechindex 정보를 전역에 저장

  const userJwt = ref(null)

  const router = useRouter()

  const getLoginUserJwt = computed(() => userJwt.value)

  const logout = () => {
    setLoginUserJwt(null)
    router.push('/')
  }
  function setLoginUserJwt (jwt) {
    userJwt.value = jwt
    console.log(userJwt.value)
  }

  return { getLoginUserJwt, setLoginUserJwt, logout }
})
