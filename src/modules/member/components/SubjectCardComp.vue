<template>
  <div> <v-img :src=findImage(subjectImg) width="256px" height="256px" cover></v-img>

    <span> {{ foramtDate }}</span>
    <h3> {{ subjectText }} </h3>
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

const foramtDate = ref('')
function formattedDate() {
  const d = new Date()
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'long',
  };
  const dateParts = d.toLocaleDateString('ko-KR', options).split('.');
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2].slice(0);
  const weekday = dateParts[2].slice(-1);
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekdayKor = weekdays[Number(weekday)];
  foramtDate.value = `${year}년 ${month}월 ${day}일 ${weekdayKor}요일`;
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
  $postMainSubject(yyyymmdd).then(res => {
    subjectStore.setSubject(res.data)
    subjectText.value = subjectStore.getSubject.content
    // 이미지경로값:C://사용자/test.png
    subjectImg.value = subjectStore.getSubject.subImgPath

  }).catch(err => {
    console.log(err)
  })
}

function findImage(subjectImg) {
  const convertedPath = subjectImg.replace(/\\/g, '/');
  return `http://localhost:8080/onedaythink/api/v1/imgfind/subjectImg?subjectImgPath=${convertedPath}`;
}

onMounted(async () => {
  await nextTick()
  formattedDate()
  postMainSubject();
})

</script>

<style></style>