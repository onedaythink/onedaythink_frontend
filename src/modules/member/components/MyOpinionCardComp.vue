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
      <v-row class="d-flex justify-center">
        <v-col cols="8" class="button" :style="{ 'margin-left': '-100px' }">
          <v-btn color="light-blue-lighten-5" class="mx-auto mr-2" @click="helper">생각 도우미</v-btn>
          <v-btn color="light-blue-lighten-5" class="mx-auto mr-2" @click="save">저장</v-btn>
          <v-btn color="light-blue-lighten-5" class="mx-auto mr-2" @click="share">타인과 공유</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="textarea">
          <v-textarea
            name="helper-7-1"
            bg-color="blue-lighten-5"      
            label="생각 도우미"
            auto-grow
            v-model=opHelper
          ></v-textarea>
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
  const subjectContent = ref('');
  
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

  //gpt 관련 변수 선언
  const API_KEY = process.env.VUE_APP_GPT_API_KEY;
  const { Configuration, OpenAIApi } = require("openai");
  const opHelper = ref('');

function save() {
      opinion.userOpiNo = myOpinion.value.userOpiNo
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
    opinion.isPublic = 'n';
  } else if (opinion.isPublic == 'n') {
    opinion.isPublic = 'y';
  }
  save();
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

// 생각 도우미
async function helper() {
  console.log(op.value);
  const configuration = new Configuration({
    apiKey: API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  console.log(subjectContent);
  subjectContent.value = subjectStore.getSubject.content;
  
async function runPrompt() {
    const prompt = `[${subjectContent.value}] 이 내용을 참고해서 작성한 나의 생각을 보충해줘 [나의 생각:${op.value}] 제한 시간은 15초 이내야. 그 시간 내에 답변해줘`;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 700,
      temperature: 0.2,
    });

    console.log('- completion:\n' + response.data.choices[0].text);
    const completion = response.data.choices[0].text;
    console.log("testaslkdjasldj/" + completion);
    opHelper.value = completion;
}
  await runPrompt();
}




onMounted( async () => {
  await nextTick()
  getMyOpinion()
});

</script>



<style>
.textarea{
  margin-left: -10px;
}

.button{
  margin-left: 0px;
}

</style>