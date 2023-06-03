<template>
  <div>
    <v-card>
      <v-row>
        <v-col cols="12">
          <p class="formatted-date">{{ foramtDate }} </p>
          <h4 class="mt-2">오늘의 사유</h4>
          <div class="mainbox">
            <v-img class="mt-5" :src="findImage(subjectImg)" width="256px" height="256px" contain></v-img>
            <h1 class="  subject-text mt-3">"{{ subjectText }}"</h1>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'SubjectCardComp'
}
</script>

<script setup>
import { $postMainSubject } from '@/api/subject';
import { ref, onMounted, nextTick } from 'vue';
import { useSubjectStore } from '@/store/subject';
import { findImage } from '@/api/index';

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
  // const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  // const weekdayKor = weekdays[Number(weekday)]
  // console.log(weekday)
  // console.log(weekdays)
  // console.log(weekdayKor)
  foramtDate.value = `${year}년 ${month}월 ${day}일 ${weekday}`;
}

const subjectStore = useSubjectStore()
const subjectText = ref('')
const subjectImg = ref('')

const today = new Date();
const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, '0');
const date = today.getDate().toString().padStart(2, '0');
const yyyymmdd = `${year}${month}${date}`;



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

// function findImage(subjectImg) {
//   if (subjectImg != '') {
//   const convertedPath = subjectImg.replace(/\\/g, '/');
//   return `http://localhost:8080/onedaythink/api/v1/imgfind/subjectImg?subjectImgPath=${convertedPath}`;
//   }
// }

onMounted(async () => {
  await nextTick()
  formattedDate()
  postMainSubject();
})

</script>

<style scoped>
.v-row {
  margin: 0px;
}

.mainbox {

  display: flex;
  flex-direction: column;
  align-items: center;
}

.formatted-date {
  color: #877b78;
  font-size: 10px;
}

.subject-text {
  display: flex;
  align-items: center;
  width: 95%;
  color: #877b78;
  font-size: 15px;

}</style>