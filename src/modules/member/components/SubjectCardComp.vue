<template>
  <v-card
  >
    <v-img
     :src= findImage(subjectImg)
      width="256px"
      height="256px"
      cover
    ></v-img>

    <v-card-title>
      2023.04.23 Sunday
    </v-card-title>

    <v-card-subtitle>
      오늘의 사유
    </v-card-subtitle>

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
        <v-card-text>
          {{ subjectText }}  
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
    name : 'SubjectCardComp'
}
</script>

<script setup>
import { $postMainSubject } from '@/api/subject';
import { ref, onMounted, nextTick } from 'vue';
import {useSubjectStore} from '@/store/subject';



const subjectStore = useSubjectStore()
const subjectText = ref('')
const subjectImg = ref('')
const today = new Date();
const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, '0');
const date = today.getDate().toString().padStart(2, '0');
const yyyymmdd = `${year}${month}${date}`;

const show = ref(false)

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

onMounted( async () => {
  await nextTick()
  postMainSubject();
})

</script>

<style>

</style>