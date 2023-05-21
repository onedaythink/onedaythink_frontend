<template>
  <v-container>
    <h2>정보수정 페이지</h2><br><br>
    <v-text-field
      v-model="userData.userId"
      color="primary"
      label="아이디"
      variant="underlined"
      disabled
    ></v-text-field>
    <v-text-field
      v-model="userData.userPwd"
      color="primary"
      label="비밀번호"
      variant="underlined"
      :disabled="!isPasswordEditable"
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
      :disabled="!isPasswordEditable"
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
      disabled
    ></v-text-field>
    <v-checkbox
      v-model="isPasswordEditable"
      label="비밀번호 수정"
    ></v-checkbox>
    <v-btn color="info" @click="updateUser" class="submit">확인</v-btn>
  </v-container>
</template>

<script>
export default {
  name: "SignUpdateComp"
}
</script>

<script setup>
import { useUserStore } from '@/store/user';
import { $updateUser, $checkNickname, $getUsers } from '@/api/user'
import { onMounted, nextTick, ref } from 'vue';
import { useRouter } from 'vue-router';

const user = ref({}) // 유저정보

const userData = ref({
      userId: null,
      nickname: null,
      email: null,
      userName: null,
      userPwd: null
  })

const isPasswordEditable = ref(false)

const passwordConfirmation = ref(null)
const checkNickname = ref(null)

const userStore = useUserStore()

// opinion 데이터 가져오기
async function getUsers() {
const res = await $getUsers(user.value.userNo);
}

function isClear() {
    if (checkNickname.value && passwordValueCheck.value && passwordDoubleCheck.value || passwordConfirmation.value === null) {
      return true;
    } else {
      return false;
    }
  }

function checkDuplicateNickname() {
    // 닉네임 중복 체크 로직 구현
    $checkNickname(userData)
    .then(res => {
      if (res.data != null) {
        checkNickname.value = true
      } else {
        checkNickname.value = false
      }
    })
    .catch(err => console.log(err))
    router
  }

  const passwordRegex = /^(?=.*\d)(?=.*[a-z]).{8,15}$/;
  const passwordValueCheck = ref(null)
  function pwdCheck() {
      passwordValueCheck.value = passwordRegex.test(userData.value.userPwd);
      console.log(passwordValueCheck.value)
  }
const passwordDoubleCheck = ref(null)
function pwdDoubleCheck() {
  if (userData.value.userPwd === passwordConfirmation.value || passwordConfirmation.value === null) {  
    passwordDoubleCheck.value = true
  } else {
    passwordDoubleCheck.value = false
  }
}

const router = useRouter()

// function updateUser() {
//   if (isClear()) {
//     $updateUser(userStore.value)
//     .then(res => {
//       console.log(res)
//       console.log(res.userStore.userdata)
//         if (res.data == 1) {
//           window.alert('회원정보가 저장 되었습니다.')
//           router.push('/mypage')
//         }
//     })
//     .catch(err => console.log(err))
//   } else {
//       window.alert('작성한 내용을 다시 확인해주세요.')
//   }
// }

async function updateUser(userData) {
  try {
    if (isClear()) {
    await $updateUser(userData)
    getUsers(userData.userNo, userData.userPwd, userData.nickname, userData.userId)
    }
  } catch (err) {
    console.log(err)
  }
}

onMounted( async () => {
  await nextTick()
  userData.value = userStore.getLoginUser
  await getUsers();
})


</script>

<style scoped>
.small {
  float: right;
}
.submit {
  float: right;
}
</style>