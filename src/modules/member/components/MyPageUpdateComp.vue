<template>
  <v-container>
    <h2>정보수정 페이지</h2><br><br>
  <div>
    프로필 이미지<br>
    <v-btn icon v-bind="props" @click="openFileInput(); editProfile = true">
      <v-avatar v-if="selectedImageUrl" size="large">
        <img :src="selectedImageUrl + userData.userImgPath">
      </v-avatar>
    </v-btn>
    <input type="file" accept="image/*" ref="fileInput" style="display: none" @change="onFileChange">
    <br>
  </div>
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
      :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
      :type="showPassword ? 'text' : 'password'"
      @click:append="showPassword = !showPassword"
      @keyup="pwdCheck"
      disabled
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

    <v-text-field
      v-model="userData.email"
      color="primary"
      label="이메일"
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
  name: "SignUpdateComp",
  methods: {
    openFileInput: function () {
      this.$refs.fileInput.click();
    }
  }
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
      userPwd: null,
      userOriginImg: null,
      userImgPath: null
  })

const isPasswordEditable = ref(false)

const passwordConfirmation = ref(null)
const checkNickname = ref(null)

// 로그인 정보
const userStore = useUserStore()

// 유저 정보
async function getUsers() {
  try {
    const res = await $getUsers(user.value.userNo);
    if (res.data.userImgPath) {
      userData.value = res.data;
      selectedImageUrl.value = userData.value.userImgPath;
    } else {
      console.error('Invalid image URL:', res.data.userImgPath);
    }
  } catch (error) {
    console.error('Error while fetching user data:', error);
  }
}


// 프로필 이미지 변경
const editProfile = ref(false)
const selectedFile = ref(null)
const selectedImageUrl = ref('/src/main/resources/static/profileImages/'); // 수정된 이미지 경로
let fileInput = ref(null)

async function onFileChange(e) {
  selectedFile.value = e.target.files[0];
  let formData = new FormData();
  formData.append('file', selectedFile.value);

  console.log("formData: ", formData); // Check your formData

  const reader = new FileReader();
  reader.onload = function(event) {
    selectedImageUrl.value = event.target.result;
  }
  reader.readAsDataURL(selectedFile.value);
  try {
    const response = await $updateUser(formData);   // Call your API to upload the file
    userData.value.userImgPath = response.data.url; // Assuming response.data.url contains the image URL
  } catch (error) {
    console.error('Error while uploading the image:', error);
  }
}

function openFileInput() {
  fileInput.value.click()
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

async function updateUser() {
  try {
    if (isClear()) {
      await $updateUser(userData.value);
      getUsers(); // Fetch user data after successful update
    } else {
      window.alert('작성한 내용을 다시 확인해주세요.');
    }
  } catch (err) {
    console.log(err);
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