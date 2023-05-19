<template>
  <v-container fluid style="height: 300px">
    <v-row
      justify="center"
      align="center"
      class="d-flex flex-column align-content-center"
    >
      <h5>나의 공간</h5>
      <!-- <br /> -->
      <v-menu min-width="200px" rounded>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar color="brown" size="large">
              <span class="text-h5">{{ user.initials }}</span>
            </v-avatar>
          </v-btn> <span>{{ user.nickname }}</span><br>
        </template>
        <v-card>
          <v-card-text class="small">
            <div class="mx-auto text-center">
              <v-avatar color="brown">
                <span class="text-h5">{{ user.initials }}</span>
              </v-avatar>
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
              :src="findImage(subjectImg)"
              width="200px"
              height="160px"
              cover
          ></v-img>

          <v-card-title>{{ foramtDate }}</v-card-title>
          <v-card-subtitle>{{ opinion.content }}</v-card-subtitle>
          <v-card-actions>
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
                <v-textarea v-model="opinion.opinion"></v-textarea>
                <v-btn type="submit" class="mr-2" @click="updateOpinion">수정하기</v-btn>
                <v-btn type="submit" @click="deleteOpinion(opinion)">삭제하기</v-btn>
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
import { $postMainSubject } from '@/api/subject';
import { useUserStore } from '@/store/user';
import { $getMyOpinions, $addOpinion, $deleteOpinion, $getOpinion } from '@/api/opinion';
import { onMounted, nextTick, ref, computed } from 'vue';

import {useSubjectStore} from '@/store/subject';


// 회원탈퇴 관련 import
import { $deleteUser } from '@/api/user';
import { useRouter } from 'vue-router';

const user = ref({})
const show = ref(false)

const userStore = useUserStore() // 회원탈퇴 관련
const router = useRouter() // 회원탈퇴 알림창 관련

const myOpinionList = ref([])
const dialog = ref(false) // 회원탈퇴 알림창 관련

  const op = ref('')

  const myOpinion = ref({
    opinion : ''
  })

  const subjectStore = useSubjectStore()
  const subjectText = ref('')
  const subjectImg = ref('')

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


  // 날짜 데이터
  const foramtDate = ref('')
  function formattedDate() {
    const d = new Date();
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'long',
    };


  const dateParts = d.toLocaleDateString('ko-KR', options).split('.');
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];
  const weekday = dateParts[3];
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekdayKor = weekdays[Number(weekday)]
  foramtDate.value = `${year}년 ${month}월 ${day}일 ${weekdayKor}요일`;
}

  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const date = today.getDate().toString().padStart(2, '0');
  const yyyymmdd = `${year}${month}${date}`;

  const opinion = {
    opinion : '',
    isPublic : 'n',
    createAt : yyyymmdd
  }

  function postMainSubject() {
  
  $postMainSubject(yyyymmdd)
  
  .then(res => {
    subjectStore.setSubject(res.data)
    subjectText.value = subjectStore.getSubject.content
    // 이미지경로값:C://사용자/test.png
    subjectImg.value = subjectStore.getSubject.subImgPath

  }).catch(err => {
    console.log(err)
  })
}

  // opinion 데이터 가져오기
  async function getMyOpinionList() {
  const res = await $getMyOpinions(user.value.userNo);
  myOpinionList.value = res.data.reverse(); // 의견의 순서를 역순으로 변경
  subjectImg.value = myOpinionList.value[0].subjectImg;
}

  // subject 이미지 가져오기
  console.log(opinion.subjectImg)
  function findImage(subjectImg) {
    if (!subjectImg) {
      return '';
    }
    const convertedPath = subjectImg.replace(/\\/g, '/');
    return `http://localhost:8080/onedaythink/api/v1/imgfind/subjectImg?subjectImgPath=${convertedPath}`;
  }
  console.log(findImage(opinion.subjectImg))

  // 회원 탈퇴 알림창
  async function deleteUser() {
    dialog.value = true;
  }


async function getMyOpinion() {
  await $getOpinion(userStore.getLoginUser.userNo, yyyymmdd)
  .then(res => {
    if (res.data != null || res.data != '') {
      myOpinion.value = res.data
    }
    op.value = myOpinion.value.opinion
  }).catch(err => console.log(err))
}

// 나의 의견 수정
function updateOpinion() {
      opinion.userOpiNo = myOpinion.value.userOpiNo
      opinion.opinion = op.value
      opinion.userNo = userStore.getLoginUser.userNo
      // 저장 버튼을 클릭했을 때의 동작
      $addOpinion(opinion.value)
      .then(res => {
        getMyOpinion(opinion.value.userNo, opinion.value.createAt)
      }).catch(err => {
        console.log(err)
      })
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


// 나의 의견 삭제
async function deleteOpinion(opinion) {
    try {
        await $deleteOpinion(opinion);
        alert('의견이 성공적으로 삭제되었습니다.');
        getMyOpinionList();
    } catch (err) {
        console.error(err);
        alert('의견 삭제에 실패하였습니다. 다시 시도해주세요.');
    }
}


onMounted(async () => {
  await nextTick();
  user.value = userStore.getLoginUser;
  await getMyOpinionList();
  formattedDate();
  postMainSubject();
  console.log(findImage(myOpinionList.value[0].subjectImg)); // 배열의 첫 번째 요소의 이미지를 테스트로 출력해봅니다.
});


</script>