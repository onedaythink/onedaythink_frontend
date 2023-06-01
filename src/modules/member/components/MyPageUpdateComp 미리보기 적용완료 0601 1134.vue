<template>
  <v-container>
    <h2>정보수정 페이지</h2><br>
        <br>
    <div class="profile-image-container">
      <div class="profile-image">
        
        <v-btn icon size="70" v-bind="props" @click="openFileInput(); editProfile = true">
          <v-avatar v-if="userData.userImgPath && userData.userImgPath !== ''" size="70">
            <img :src="findUserImage(userData.userImgPath)">
          </v-avatar>
        </v-btn>
        <input type="file" accept="image/png" ref="fileInput" style="display: none" @change="onFileChange">
      </div>
    </div>
      <div>
        <v-btn class="profile-image-container" @click="imgRollback();"> 
          이미지를 되돌려요
       </v-btn>
      </div>
      <div>
       <v-btn class="profile-image-container" @click="imgRollbackDefault();"> 
          기본 이미지를 사용해요
       </v-btn> 
    </div>
    <br>
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
    <!-- <v-btn color="info" @click="updateUser" class="submit">확인</v-btn> -->
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
// import { $updateUser, $checkNickname, $getUsers, $updateUserProfile } from '@/api/user'
import { $checkNickname, $getUsers, $updateUserProfile } from '@/api/user'

import { onMounted, nextTick, ref } from 'vue';
import { useRouter } from 'vue-router';

const userData = ref({}) // 유저 데이터 정보

// 로그인 정보
const userStore = useUserStore() // 회원탈퇴 관련

const router = useRouter() // 회원탈퇴 알림창 관련

const isPasswordEditable = ref(false)

const passwordConfirmation = ref(null)
const checkNickname = ref(null)

// userImg 호출
function findUserImage(userImg) {
  console.log(userImg)
  if (userImg) {
    console.log(userImg);
    const convertedPath = userImg.replace(/\\/g, '/');
    return `http://localhost:8080/onedaythink/api/v1/imgfind/userImg?userImgPath=${convertedPath}`;
  } else {
    return `http://localhost:8080/onedaythink/api/v1/imgfind/userImg?userImgPath=`;
  }
}

// 프로필 이미지 변경
const editProfile = ref(false)
const selectedFile = ref(null)
const selectedImageUrl = ref('src/main/resources/static/profileImages/'); // 수정된 이미지 경로
let fileInput = ref(null)

// 유저의 원본 이미지 정보를 저장하는 레퍼런스
const originalUserImgOrigin = ref('')
const originalUserImgPath = ref('')

// 프로필 이미지 변경
async function onFileChange(e) {
  selectedFile.value = e.target.files[0];

  let formData = new FormData();
  formData.append('userNo', userStore.getLoginUser.userNo);
  formData.append('upfile', selectedFile.value); // 서버로 보내는 파일의 이름을 원래 이름 그대로 유지합니다.

  const reader = new FileReader();
  reader.onload = function(event) {
    selectedImageUrl.value = event.target.result;
  }
  reader.readAsDataURL(selectedFile.value);

  try {
    const response = await $updateUserProfile(formData);   // API를 호출하여 파일을 업로드합니다.
    if (response.data && response.data.userOriginImg) { // 응답에 data 속성과 filename 속성이 있는지 확인합니다.

      // 응답의 data.userOriginImg 새 이미지 파일의 이름을 포함한다고 가정합니다.
      userData.value.userImgOrigin = response.data.userOriginImg; // 사용자 데이터의 userImgOrigin 값을 새 파일 이름으로 설정합니다.

      // userImgPath의 값은 server response로부터 받은 새로운 이미지 경로로 수정합니다.
      userData.value.userImgPath = response.data.userImgPath;
    } else {
      throw new Error('userOriginImg 또는 userImgPath 속성을 찾을 수 없음.');
    }
  } catch (error) {
    console.error('이미지 업로드 중 오류 발생:', error);
  }
}

function openFileInput() {
  // 저장된 원본 이미지의 정보를 저장
  originalUserImgOrigin.value = userData.value.userImgOrigin;
  originalUserImgPath.value = userData.value.userImgPath;
  fileInput.value.click()
}

function imgRollback() {
  // 원본 이미지 정보로 롤백
  userData.value.userImgOrigin = originalUserImgOrigin.value;
  userData.value.userImgPath = originalUserImgPath.value;
}

function imgRollbackDefault() {
  // 기본 이미지 정보로 롤백
  userData.value.userImgOrigin = 'default.png';
  userData.value.userImgPath = 'src/main/resources/static/profileImages/default.png';
}

// function isClear() {
//     if (checkNickname.value && passwordValueCheck.value && passwordDoubleCheck.value || passwordConfirmation.value === null) {
//       return true;
//     } else {
//       return false;
//     }
//   }

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

  // user 데이터 가져오기
  async function getUsers() {
  const res = await $getUsers(userData.value.userNo);
  getUsers.value = res.userData
}

// async function updateUser() {
//   try {
//     if (isClear() && userData.value.userImgPath !== originalUserImgPath.value) {
//       // Check if the image upload was successful before updating the user data
      
//       let formData = new FormData();
//       formData.append('upfile', selectedFile.value); 
//       for (let key in userData.value) {
//         formData.append(key, userData.value[key]);
//       }

//       await $updateUser(userData);  // 수정된 formData 전송
//       getUsers(); 
//     } else {
//       window.alert('작성한 내용을 다시 확인해주세요.');
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }

onMounted( async () => {
  await nextTick()
  userData.value = userStore.getLoginUser
  getUsers
})


</script>

<style scoped>
.small {
  float: right;
}
.submit {
  float: right;
}
.profile-image-container {
  display: flex;
  justify-content: center;
}

.profile-image {
  display: flex;
  align-items: center;
}
</style>