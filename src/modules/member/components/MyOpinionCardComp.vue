<template>
    <v-container fluid >
      <v-row>
        <v-col cols="12" class="textarea">
          <v-textarea
            name="input-7-1"
            bg-color="yellow-lighten-5"      
            label="나의 생각"
            auto-grow
            v-model="opinion.opinion"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row >
        <v-col cols="8" class="button" justify="start">
          <v-btn color="light-blue-lighten-5" class="mr-auto" @click="save">저장</v-btn>
          <v-btn color="light-blue-lighten-5" class="mr-auto" @click="share">타인과 공유</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>

<script>
export default {
  name : 'MyOpinionCardComp'
}
</script>

<script setup>
import { $addOpinion, $getOpinion } from '@/api/opinion'
import { useUserStore } from '@/store/user'
import { useSubjectStore } from '@/store/subject'
import { onMounted, nextTick, ref } from 'vue'

const userStore = useUserStore()
const subjectStore = useSubjectStore()


const today = new Date();
const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, '0');
const date = today.getDate().toString().padStart(2, '0');
const yyyymmdd = `${year}${month}${date}`;


const opinion = ref({
  userNo : userStore.getLoginUser.userNo,
  subNo : '',
  subDate : yyyymmdd,
  opinion : "",
  isPublic : "n"
})

function save() {
  opinion.value.subNo = subjectStore.getSubject.subNo
      // 저장 버튼을 클릭했을 때의 동작
      $addOpinion(opinion).then(res => {
        console.log(res.data)
        getMyOpinion()
      }).catch(err => {
        console.log(err)
      })


    }

function share() {
      if (opinion.value.isPublic == 'y') {
        opinion.value.isPublic = 'n'
      } else {
        opinion.value.isPublic = 'y'
      }
    }

function getMyOpinion() {

  $getOpinion(opinion.value.userNo, opinion.value.subDate)
  .then(res => {
    if (res.data != null || res.data != '') {
      opinion.value = res.data
    }
    console.log(res.data)
  }).catch(err => console.log(err))

  
}

onMounted( async () => {
  await nextTick()
  getMyOpinion()
})

</script>

<style>
.textarea{
  margin-left: -10px;
}

.button{
  margin-left: 0px;
}

</style>
