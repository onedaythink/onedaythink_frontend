<template>
  <v-container fluid style="height: 300px">
    <v-row
      justify="center"
      align="center"
      class="d-flex flex-column align-content-center"
    >
      <h5>나의 공간</h5>
      <v-menu min-width="300px" rounded>
          <template v-slot:activator="{ props }" >
            <v-btn icon size="70" v-bind="props">
              <v-avatar size="70">
                <img 
                  :src="findUserImage(user.userImgPath)" 
                  class="rounded-circle" 
                  style="object-fit: cover;"
                >
              </v-avatar>
            </v-btn>
          <span>{{ user.nickname }}</span><br>
        </template>
        <v-card>
          <v-card-text class="small">
            <div class="mx-auto text-center">
              <h3>{{ user.nickname }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
                <v-btn rounded variant="text" router-link to="/mypageupdate"> 내 정보 수정하기 </v-btn>
                  <v-divider class="my-3"></v-divider>
                  <v-btn rounded variant="text" @click="deleteUser"> 탈퇴하기 </v-btn>
                </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-row>

    <!-- 탈퇴하기 확인창 -->
    <v-dialog v-model="dialog" max-width="350">
      <v-card>
        <v-card-title class="headline">회원 탈퇴</v-card-title>
        <v-card-text>정말로 탈퇴하시겠습니까?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="confirmDeleteUser">탈퇴하기</v-btn>
          <v-btn color="green darken-1" text @click="dialog = false">돌아가기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- div 카드시작점 -->
    <template v-if="myOpinionList.length > 0">
      <div class="mypage-card mt-10" v-for="opinion, idx in paginatedOpinions" :key="idx">
        <v-card class="mx-auto" max-width="344">
          <v-img
            :src= findImage(opinion.subImgPath)
            width="445px"
            height="160px"
            contain
            class="d-flex align-center justify-center"
          ></v-img>

          <v-card-title>{{ formattedDate(opinion.createAt) }}</v-card-title>
          <v-card-subtitle style="white-space: pre-wrap;">{{ opinion.content }}</v-card-subtitle>
          <v-card-actions> 어떤 생각을 했을까?
            <v-spacer></v-spacer>
            <v-btn
              :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              @click="show = !show"
            ></v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>
              <v-card-text >
                <v-textarea  variant="filled" no-resize="True" v-model="opinion.opinion"></v-textarea>
                   <transition name="slide">
                    <div v-if="snackbar" class="custom-snackbar">
                      완료되었습니다.
                    </div>
                  </transition>
                <div class="btn-container">
                  <v-btn type="submit" class="mypage-btn" variant="outlined" color="blue" @click="save(opinion)">다시 생각해요</v-btn>
                  <v-btn type="submit" class="mypage-btn" variant="outlined" color="green" @click="share(opinion)">{{ buttonLabel }}</v-btn>
                  <v-btn type="submit" class="mypage-btn" variant="outlined" color="pink" @click="opDelete(opinion)">생각을 비워요</v-btn>             
                </div>
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </div>
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        :total-visible="5"
        :prev-icon="$vuetify.icons.prev"
        :next-icon="$vuetify.icons.next"
      ></v-pagination>
    </template>
    <template v-else>
      <div>작성한 의견이 존재하지 않습니다.</div>
    </template>
  </v-container>
</template>

<script>
export default {
  name:"MyPageComp"
}
</script>

<script setup>
import { useUserStore } from '@/store/user';

import { $getMyOpinions, $updateOpinion, $deleteOpinion, $getOpinion } from '@/api/opinion';
import { onMounted, nextTick, ref, computed } from 'vue';

// 회원탈퇴 관련 import
import { $deleteUser } from '@/api/user';
import { useRouter } from 'vue-router';

import { format } from 'date-fns';

const user = ref({}) // 유저정보
const show = ref(false)

const userStore = useUserStore() // 회원탈퇴 관련
const router = useRouter() // 회원탈퇴 알림창 관련

const myOpinionList = ref([])
const dialog = ref(false) // 회원탈퇴 알림창 관련

const op = ref('') // 의견 수정, 비활성화

const myOpinion = ref({ // 의견 수정, 비활성화
  opinion : ''
})

const snackbar = ref(false); // 스낵바

const buttonLabel = ref('생각을 숨길래요'); // 버튼 문구 변수

function formattedDate(createAt) {
  return format(new Date(createAt), 'yyyy년 MM월 dd일');
}

// subjectImg 호출
async function getMyOpinion() {
  await $getOpinion(userStore.getLoginUser.userNo, yyyymmdd)
  .then(res => {
    if (res.data != null || res.data != '') {
      myOpinion.value = res.data
    }
    op.value = myOpinion.value.opinion
  }).catch(err => console.log(err))
}

// subjectImg 호출
const today = new Date();
const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, '0');
const date = today.getDate().toString().padStart(2, '0');
const yyyymmdd = `${year}${month}${date}`;

// subjectImg 호출
function findImage(subjectImg) {
  console.log(paginatedOpinions.value)
  console.log(subjectImg)
  if (subjectImg) {
    console.log(subjectImg);
    const convertedPath = subjectImg.replace(/\\/g, '/');
    return `http://localhost:8080/onedaythink/api/v1/imgfind/subjectImg?subjectImgPath=${convertedPath}`;
  } else {
    return null;
  }
}

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

// 페이지네이션 관련 변수
const currentPage = ref(1); // 현재 페이지 상태
const itemsPerPage = 1; // 페이지 당 항목 수

// 페이지네이션에 따른 의견 리스트 계산
const paginatedOpinions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return myOpinionList.value.slice(start, end);
});

  // 총 페이지 수 계산
const totalPages = computed(() => {
  return Math.ceil(myOpinionList.value.length / itemsPerPage);
});

  // opinion 데이터 가져오기
async function getMyOpinionList() {
  const res = await $getMyOpinions(user.value.userNo);
  myOpinionList.value = res.data.reverse(); // 의견의 순서를 역순으로 변경
}

// 회원 탈퇴 알림창
async function deleteUser() {
  dialog.value = true;
}

// 회원 탈퇴
async function confirmDeleteUser() {
  try {
    await $deleteUser(user.value);
    alert('회원 탈퇴가 성공적으로 완료되었습니다.');
    dialog.value = false;    // dialog 상태 초기화
    router.push('/');
  } catch (err) {
    console.error(err);
    alert('회원 탈퇴에 실패하였습니다. 다시 시도해주세요.');
  }
}

// 나의 의견 수정
async function save(opinion) {
  try {
    await $updateOpinion(opinion)
    getMyOpinionList(opinion.userNo, opinion.createAt)
    
    // Show snackbar
    snackbar.value = true;

    // Set snackbar to false after 3 seconds
    setTimeout(() => {
      snackbar.value = false;
    }, 2000);

  } catch (err) {
    console.log(err)
  }
}

// 나의 의견 공유 활성화/비활성화
async function share(opinion) {
  if (opinion.isPublic == 'y') {
    opinion.isPublic = 'n';
    buttonLabel.value = '생각을 공유할래요';  // 공유를 비활성화 할 경우 이 문구로 변경
  } else if (opinion.isPublic == 'n') {
    opinion.isPublic = 'y';
    buttonLabel.value = '생각을 숨길래요';  // 공유를 활성화 할 경우 이 문구로 변경
  }
  try {
    console.log(opinion)
    await $updateOpinion(opinion)
    getMyOpinionList(opinion.userNo, opinion.createAt)

  // Show snackbar
  snackbar.value = true;

  // Set snackbar to false after 3 seconds
  setTimeout(() => {
    snackbar.value = false;
  }, 2000);

  } catch (err) {
    console.log(err)
  }
}

// 나의 의견 삭제
async function opDelete(opinion) {
  if (opinion.withdraw == 'n') {
    opinion.withdraw = 'y';
  } else if (opinion.withdraw == 'y') {
    opinion.withdraw = 'n';
  }
  try {
    console.log(opinion)
    await $deleteOpinion(opinion)
    getMyOpinionList(opinion.userNo, opinion.createAt)

  // Show snackbar
  snackbar.value = true;

  // Set snackbar to false after 3 seconds
  setTimeout(() => {
    snackbar.value = false;
  }, 2000);

  } catch (err) {
    console.log(err)
  }
}

// 페이지 갱신
onMounted(async () => {
  await nextTick();
  user.value = userStore.getLoginUser;
  await getMyOpinionList();
  getMyOpinion()

});

</script>

<style scoped>
.v-img > div > img {
  border-radius: 50%;
  object-fit: cover;
}

.v-btn:active {
  box-shadow: 0px 0px 50px rgba(115, 142, 212, 0.5) !important;
}

.d-flex {
  display: flex;
}

.align-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}
</style>


<style scoped>

/* 스낵바 설정 */
.custom-snackbar {
  background-color: #43a047; 
  color: white;  
  position: absolute;  
  bottom: 50px;  
  left: 50%; 
  transform: translate(-50%, 0); 
  padding: 16px;
  border-radius: 5px;
  margin-bottom: 20px;
  z-index: 1000; 
}

.btn-container {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.mypage-btn {
  width: 100px;
  font-size: 11px;
  margin: 0px;
}


.slide-enter-active, .slide-leave-active {
  transition: all .3s ease;
}
.slide-enter, .slide-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>