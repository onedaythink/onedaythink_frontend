<template>
  <v-container>
    <h2>정보수정 페이지</h2><br><br>
      <!-- 프로필 이미지  -->
    <div class="profile-image-container">
      <div class="profile-image">
        <v-btn icon size="70" v-bind="props" @click="openFileInput(); editProfile = true">
          <v-avatar v-if="userData.userImgPath || previewImg" size="70">
            <img :src="findUserImage(userData.userImgPath, previewImg)">
          </v-avatar>
        </v-btn>
        <input type="file" accept="image/*" ref="fileInput" style="display: none" @change="onFileChange">

        <!-- 미리보기 이미지 업로드 취소  -->
        <v-btn v-if="previewImg" icon size="70" @click="cancelUpload">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
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
    },
    cancelUpload: function () {
      this.previewImg = null;
    }
  }
}
</script>

<script setup>
import { useUserStore } from '@/store/user';
import { $updateUser, $checkNickname, $getUsers, $resizeAndSaveImage } from '@/api/user'
import { onMounted, nextTick, ref } from 'vue';
import { useRouter } from 'vue-router';

const userData = ref({}) // 유저 데이터 정보

// 로그인 정보
const userStore = useUserStore() // 회원탈퇴 관련

const router = useRouter() // 회원탈퇴 알림창 관련

const isPasswordEditable = ref(false)

const passwordConfirmation = ref(null)
const checkNickname = ref(null)

// 프로필 이미지 변경
const editProfile = ref(false)
const selectedFile = ref(null)
let fileInput = ref(null)
const previewImg = ref(null) // 미리보기 이미지
const selectedImageUrl = ref('/src/main/resources/static/profileImages/'); // 수정된 이미지 경로


// 기존 이미지, 미리보기 이미지 호출
function findUserImage(userImg, previewImg) {
  if (previewImg) {
    console.log("previewImg: ", previewImg); // previewImg 확인
    return previewImg;
  } else if (userImg) {
    console.log("userImg: ", userImg); // userImg 확인
    const convertedPath = userImg.replace(/\\/g, '/');
    return `http://localhost:8080/onedaythink/api/v1/imgfind/userImg?userImgPath=${convertedPath}`;
  } else {
    return `http://localhost:8080/onedaythink/api/v1/imgfind/userImg?userImgPath=`;
  }
}

async function onFileChange(e) {
  selectedFile.value = e.target.files[0];
  let formData = new FormData();
  formData.append('upfile', selectedFile.value);
  console.log("formData: ", formData); // formData 확인
  
  // Add a call to your back-end to resize and save the image
  const response = await $resizeAndSaveImage(formData);
  console.log("resizeAndSaveImage formData: ", formData); // formData 확인

  // Check if the resizing and saving was successful
  if (response && response.success) {
    // Update the selected image URL with the new path returned by the back-end
    selectedImageUrl.value = response.updatedImgPath;
    console.log("selectedImageUrl: ", selectedImageUrl); // selectedImageUrl 확인
    console.log("response: ", response); // selectedImageUrl 확인
    console.log("response.updatedImgPath: ", response.updatedImgPath); // selectedImageUrl 확인
    console.log("selectedImageUrl.value: ", selectedImageUrl.value); 

    const reader = new FileReader();
    reader.onload = (e) => {
      // Set the preview image URL to the new path
      previewImg.value = e.target.result;
      console.log("previewImg: ", previewImg); // previewImg 확인
    };
    reader.readAsDataURL(selectedFile.value);
  } else {
    // If there was an error, reset the preview image
    previewImg.value = null;
    window.alert('리사이징 및 이미지 저장 실패');
  }
}

function cancelUpload() {
  previewImg.value = null;
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
// user 데이터 가져오기
async function getUsers() {
const res = await $getUsers(userData.value.userNo);
  getUsers.value = res.userData
}

async function updateUser() {
  try {
    if (isClear()) {
      const formData = new FormData();
      // selectedFile.value가 null이 아닌 경우에만 formData에 추가
      if (selectedFile.value) {
        formData.append('upfile', selectedFile.value);
        console.log("formData: ", formData); // formData 확인
      }
      console.log("formData: ", formData); // formData 확인

      // 유저 정보를 formData에 추가
      Object.entries(userData.value).forEach(([key, value]) => {
        formData.append(key, value);
        console.log("formData: ", formData); // formData 확인
      });
      // 이미지 파일과 함께 유저 정보를 back-end에 전달
      const response = await $updateUser(formData);
      // 서버로부터 응답을 받은 후 userData.userImgPath를 업데이트하고 
      if (response.success) {
        userData.value.userImgPath = response.updatedImgPath;
        previewImg.value = null;
      }
      getUsers(); 
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