<template>
  <v-container style="position: relative;">
    <h2>정보수정 페이지</h2><br>
        <br>
    <div class="profile-image-container">
      <div class="profile-image">
        
        <v-btn icon size="70" v-bind="props" @click="openFileInput(); editProfile = true">
          <v-avatar v-if="userData.userImgPath && userData.userImgPath !== ''" size="70">
            <img :src="findUserImage(userData.userImgPath)" style="object-fit: cover; width: 100%; height: 100%;" >
          </v-avatar>
        </v-btn>
        <input type="file" accept="image/png" ref="fileInput" style="display: none" @change="onFileChange">
      </div>
    </div>
      <div class="button-container">
        <v-btn class="profile-button" variant="outlined" color="orange" @click="imgRollback();"> 
          이미지를 되돌리기
       </v-btn>
       <v-btn class="profile-button" variant="outlined" color="green" @click="imgRollbackDefault();"> 
          기본 이미지로 설정
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
      v-model="userData.userName"
      color="primary"
      label="이름"
      variant="underlined"
      disabled
    ></v-text-field>

    <v-text-field
      v-model="newUserUpdate.nickname"
      color="primary"
      label="닉네임"
      variant="underlined"
    ></v-text-field>
    <div v-if="checkNickname == null"></div>
    <div v-else-if="!checkNickname" >중복된 닉네임이 존재합니다.</div>
    <div v-else>사용 가능한 닉네임입니다.</div>
    <v-btn color="primary" @click="checkDuplicateNickname" class="small">닉네임 중복확인</v-btn>
    <br>
    <v-text-field
      v-model="newUserUpdate.email"
      color="primary"
      label="이메일"
      variant="underlined"
    ></v-text-field>
    <div v-if="checkEmail == null"></div>
    <div v-else-if="!checkEmail">중복된 이메일이 존재합니다.</div>
    <div v-else>사용 가능한 이메일입니다.</div>
    <v-btn color="primary" @click="checkDuplicateEmail" class="small">이메일 중복확인</v-btn>

    
    <br><br>
    <v-text-field
      v-model="newUserUpdate.userPwd"
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
    <v-btn class="submit" color="info" @click="updateUser()">확인</v-btn>
  
  </v-container>

  <div class="custom-snackbar" v-show="snackbar" @click="hideSnackbarAndRedirect" transition="slide">
    회원정보 수정이 <br>
    완료되었습니다.
  </div>
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
import { $updateUser, $checkNickname, $checkEmail, $updateUserProfile } from '@/api/user'
// import { $checkNickname, $getUsers, $updateUserProfile } from '@/api/user'

import { onMounted, nextTick, ref } from 'vue';
import { useRouter } from 'vue-router';

// 로그인 정보
const userStore = useUserStore()

const userData = userStore.getLoginUser // 유저 데이터 정보

// 유저 정보 업데이트
const newUserUpdate = ref({
  nickname: '',
  email: '',
  userPwd: '',
  userOriginImg: '',
  userImgPath: ''
}) 

function newUserDateInput(){
  newUserUpdate.value.nickname = userData.nickname != "null" ? userData.nickname : '';
  newUserUpdate.value.email = userData.email != "null" ? userData.email : '';
  // console.log(userData.nickname, userData.email)
  // console.log(newUserUpdate.value)
}

const router = useRouter()

const passwordConfirmation = ref(null)
const checkNickname = ref(null)
const checkEmail = ref(null)

const snackbar = ref(false); // 스낵바

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
    const response = await $updateUserProfile(formData); // file 업로드 api 호출
    if (response.data && response.data.userOriginImg) {

      // 응답의 data.userOriginImg 새 이미지 파일의 이름을 포함
      // 사용자 데이터의 userImgOrigin 값을 새 파일 이름으로 설정
      // userImgPath의 값은 server response로부터 받은 새로운 이미지 경로로 수정
      const imgData = { 
        userOriginImg : response.data.userOriginImg, 
        userImgPath : response.data.userImgPath
      }
      userStore.setLoginUserImg(imgData)

    } else {
      throw new Error('userOriginImg 또는 userImgPath 속성을 찾을 수 없음.');
    }
  } catch (error) {
    console.error('이미지 업로드 중 오류 발생:', error);
  }
}

function openFileInput() {
  // 저장된 원본 이미지의 정보를 저장
  originalUserImgOrigin.value = userData.userImgOrigin;
  originalUserImgPath.value = userData.userImgPath;
  fileInput.value.click()
}

function imgRollback() {
  // 원본 이미지 정보로 롤백
  const imgData = { 
        userOriginImg : originalUserImgOrigin.value, 
        userImgPath : originalUserImgPath.value
      }
    userStore.setLoginUserImg(imgData)
}

function imgRollbackDefault() {
  // 기본 이미지 정보로 롤백
  const imgData = { 
        userOriginImg : 'default.png', 
        userImgPath : 'src/main/resources/static/profileImages/default.png'
      }
  userStore.setLoginUserImg(imgData)
}

function checkDuplicateNickname() {
    // 닉네임 중복 체크 로직 구현
    $checkNickname(newUserUpdate.value)
    .then(res => {
      if (res.data != null && res.data !='') {
        console.log(res.data)
        checkNickname.value = false
      } else {
        checkNickname.value = true
      }
    })
    .catch(err => console.log(err))
    router
  }

function checkDuplicateEmail() {
  // 이메일 중복 체크 로직 구현
  $checkEmail(newUserUpdate.value)
  .then(res => {
    if (res.data != null && res.data !='' ) {
      console.log(res.data)
      checkEmail.value = false
    } else {
      checkEmail.value = true
    }
  })
  .catch(err => console.log(err))
  router
}

const passwordRegex = /^(?=.*\d)(?=.*[a-z]).{8,15}$/;
const passwordValueCheck = ref(null)
function pwdCheck() {
    passwordValueCheck.value = passwordRegex.test(newUserUpdate.value.userPwd);
    console.log(passwordValueCheck.value)
}
const passwordDoubleCheck = ref(null)

function pwdDoubleCheck() {
  if (newUserUpdate.value.userPwd === passwordConfirmation.value) {  
    passwordDoubleCheck.value = true
  } else {
    passwordDoubleCheck.value = false
  }
}

// user 데이터 가져오기
async function getUser(user) {
  // const res = await $getUsers(userData.userNo);
  userStore.setLoginUser(user)
}

function blankCheckInputFormData(formData, label, data){
  if (data != '' && data != null && data != 'null') {
    formData.append(label, data);
    console.log(`check : ${data}`)
  }
}

// 스낵바 클릭시 숨김 기능.
function hideSnackbarAndRedirect() {
  snackbar.value = false;
  router.push('/mypage');
}

async function updateUser() {

  console.log(newUserUpdate.value)

  let formData = new FormData();
  blankCheckInputFormData(formData,'userNo', userStore.getLoginUser.userNo)
  blankCheckInputFormData(formData,'nickname', newUserUpdate.value.nickname)
  blankCheckInputFormData(formData,'email', newUserUpdate.value.email)
  blankCheckInputFormData(formData,'userPwd', newUserUpdate.value.userPwd)
  blankCheckInputFormData(formData,'userOriginImg', userData.userOriginImg)
  blankCheckInputFormData(formData,'userImgPath', userData.userImgPath)
  console.log(newUserUpdate.value)
  
// $updateUser(formData)
//   .then(res => {
//     if(res.data != null && res.data != ''){
//       getUser(res.data)

//       snackbar.value = true; // 스낵바 표시
//       setTimeout(() => {
//         snackbar.value = false; // 2초 후에 스낵바 숨김
//       }, 2000);
//       // window.alert("회원정보수정에 성공했습니다.")
//       router.push('/mypage')
//     } else {
//       console.error('회원정보 수정 중 오류 발생');
//     }
//   })
//   .catch(err => console.log(err))
// }

$updateUser(formData)
    .then(res => {
      if(res.data != null && res.data != ''){
        getUser(res.data)
        snackbar.value = true;
      } else {
        console.error('회원정보 수정 중 오류 발생');
      }
    })
    .catch(err => console.log(err))
}

onMounted(async () => {
  await nextTick()
  newUserDateInput()
})


</script>

<style scoped>
.small {
  float: right;
}
.submit {
  float: right;
}

.button-container {
    display: flex;
    justify-content: center;
    margin-top: 5px;
  }

  .profile-button {
    margin: 0 5px;
  }
.profile-image-container {
  display: flex;
  justify-content: center;
}

.profile-image {
  display: flex;
  align-items: center;
}

/* 스낵바 설정 */
.custom-snackbar {
    background-color: #43a047; 
    color: white;  
    position: absolute;  
    top: 50%;  
    left: 50%; 
    transform: translate(-50%, -50%); 
    padding: 16px;
    border-radius: 5px;
    margin-bottom: 20px;
    z-index: 1000; 
    white-space: pre-wrap; 
    text-align: center; 
    display: flex;       
    align-items: center; 
    justify-content: center; 
}

.slide-enter-active, .slide-leave-active {
  transition: all .3s ease;
}
.slide-enter, .slide-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>