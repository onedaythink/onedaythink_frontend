<template>
  <v-card class="mx-auto" max-width="344" title="회원가입">
    <v-container>
      <v-btn color="primary" @click="checkDuplicateId" class="small">중복확인</v-btn>
      <v-text-field
        v-model="userData.userId"
        color="primary"
        label="아이디"
        variant="underlined"
      ></v-text-field>
      <div v-if="checkUserId == null"></div>
      <div v-else-if="!checkUserId">중복된 아이디가 존재합니다.</div>
      <div v-else>사용 가능한 아이디입니다.</div>
     <v-text-field
        v-model="userData.userPwd"
        color="primary"
        label="비밀번호"
        variant="underlined"
        :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
        @keyup="pwdCheck"
        ></v-text-field>
      <div v-if="passwordValueCheck != null && !passwordValueCheck">유효한 비밀번호가 아닙니다. 비밀번호는 소문자와 숫자를 합쳐서 8글자에서 15글자 이내로 작성해주세요</div>
      <v-text-field
        v-model="passwordConfirmation"
        color="primary"
        label="비밀번호 확인"
        variant="underlined"
        :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
        @keyup="pwdDoubleCheck"
        ></v-text-field>
        <div v-if="passwordDoubleCheck != null && !passwordDoubleCheck">비밀번호가 일치하지 않습니다.</div>
      <v-btn color="primary" @click="checkDuplicateNickname" class="small">중복확인</v-btn>
      <v-text-field
        v-model="userData.nickname"
        color="primary"
        label="닉네임"
        variant="underlined"
      ></v-text-field>
      <div v-if="checkNickname == null"></div>
      <div v-else-if="!checkNickname">중복된 닉네임이 존재합니다.</div>
      <div v-else>사용 가능한 닉네임입니다.</div>

      <v-text-field
        v-model="userData.userName"
        color="primary"
        label="이름"
        variant="underlined"
      ></v-text-field>

      <v-checkbox
        v-model="terms"
        color="secondary"
        label="하루생각 이용약관, 개인정보 수집 및 이용, 위치기반서비스 이용약관(선택), 프로모션 정보 수신(선택)에 모두 동의합니다."
      ></v-checkbox>
    </v-container>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>

      <router-link to="/">
        <v-btn color="success">
          <v-icon icon="mdi-chevron-left" start></v-icon>
          뒤로가기
        </v-btn>
      </router-link>
        <v-btn @click="registerUser()" color="success">
          회원가입
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "SignUpFormComp"
}
</script>

<script setup>
import { ref } from 'vue'
import { $registerUser, $checkUserId, $checkNickname } from '@/api/user';
import { useRouter } from 'vue-router';

  const userData = ref({
      userId: null,
      nickname: null,
      email: null,
      userName: null,
      userPwd: null
  })

  const showPassword = ref(false)

  const passwordConfirmation = ref(null)
  const terms = ref(false)

  const checkUserId = ref(null)
  const checkNickname = ref(null)

  function isClear() {
    if (checkUserId.value && checkNickname.value && passwordValueCheck.value && passwordDoubleCheck.value) {
      return true;
    } else {
      return false;
    }
  }

  function checkDuplicateId() {
    // console.log(userData)
    $checkUserId(userData.value)
    .then(res => {
      if (res.data != null && res.data !='') {
        // console.log(res.data)
        checkUserId.value = false
      } else {
        checkUserId.value = true
      }
    })
    .catch(err => console.log(err))
  }
  function checkDuplicateNickname() {
    // 닉네임 중복 체크 로직 구현
    $checkNickname(userData.value)
    .then(res => {
      if (res.data != null && res.data !='') {
        // console.log(res.data)
        checkNickname.value = false
      } else {
        checkNickname.value = true
      }
    })
    .catch(err => console.log(err))
    router
  }

  const passwordRegex = /^(?=.*\d)(?=.*[a-z]).{8,15}$/;
  const passwordValueCheck = ref(null)
  function pwdCheck() {
      passwordValueCheck.value = passwordRegex.test(userData.value.userPwd);
      // console.log(passwordValueCheck.value)
  }

  const passwordDoubleCheck = ref(null)
  function pwdDoubleCheck() {
    if (userData.value.userPwd == passwordConfirmation.value) {  
      passwordDoubleCheck.value = true
    } else {
      passwordDoubleCheck.value = false
    }
  }
  
  const router = useRouter()

  function registerUser() {
    if (isClear()) {
      $registerUser(userData.value)
      .then(res => {
        if (res.data == 1) {
          window.alert('회원가입에 성공했습니다.')
          router.push('/login')
        }
      })
      .catch(err => console.log(err))
    } else {
      window.alert('작성이 미완성되었습니다.')
    }
  }
</script>

<style scoped>
.v-card {

  height: 80vh;

  height: 150vh;

}

.small {
  float: right;
}
</style>