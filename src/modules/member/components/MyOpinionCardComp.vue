<template>
    <v-container fluid >
      <v-row>
        <v-col cols="12" class="textarea">
          <v-textarea
            name="input-7-1"
            bg-color="yellow-lighten-5"      
            label="나의 생각"
            auto-grow
            v-model=op
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

  const opinion = {
    opinion : '',
    isPublic : 'n',
    createAt : yyyymmdd
  }

  const op = ref('')
  
  const myOpinion = ref({
    opinion : ''
  })

function save() {
      opinion.opinion = op.value
      opinion.userNo = userStore.getLoginUser.userNo
      opinion.subNo = subjectStore.getSubject.subNo
      // 저장 버튼을 클릭했을 때의 동작
      $addOpinion(opinion)
      .then(res => {
        getMyOpinion(opinion.userNo, opinion.createAt)
      }).catch(err => {
        console.log(err)
      })


    }

function share() {
      if (opinion.isPublic == 'y') {
        opinion.isPublic = 'n'
      } else {
        opinion.isPublic = 'y'
      }
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
